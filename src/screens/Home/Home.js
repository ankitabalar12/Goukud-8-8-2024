import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-community/async-storage";
// import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { getconfig } from '../Apicall';
export default function Home({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [refmodel, setRefmodel] = useState('0')
    const [loding, setLoading] = useState(false)
    const [tempdata, settempdata] = useState('')
    const [templeid, setTempalId] = useState('')




    useEffect(async () => {
        navigation.addListener('focus', async () => {
            getconfigdata()

            const modalopen = await AsyncStorage.getItem('akrefre')
            const firstmodal = JSON.parse(modalopen)
            // //console.log('firstmodel===>> ', firstmodal)
            console.log('home page =======')
            const result = await AsyncStorage.getItem('logindata')
            const screenData = JSON.parse(result)
            console.log(screenData)
            global.uername = screenData.name
            global.uerid = screenData.id
            global.templename = screenData.temple_name
            global.statusid = screenData.status
            global.templid = screenData.temple
            global.is_content_manager = screenData.is_content_manager
            console.log('is_content_manager', is_content_manager)

            if (screenData.is_admin != '') {
                setRefmodel(1);
            }



            gettempledetail()
            getuserProfile()

        })
    }, [])

    const getconfigdata = () => {
        getconfig(global.url + 'getconfig').then(res => {
            if (res.data) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == '4') {
                        global.logo = res.data[i].value
                    }
                }
            }
        })
    }

    const gettempledetail = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('screenData.temple> ', screenData.temple)
        setLoading(true)
        fetch(global.url + 'gettempledetail', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('gettempledetail data ===>>', json)
                if (json.success == true) {
                    setLoading(false)
                    settempdata(json.data)
                } else {

                }
                setLoading(false)
            })

        requeststatus()
    }

    const requeststatus = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        fetch(global.url + 'requeststatus', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
            }),
        })
            .then((res) => res.json())
            .then(async (json) => {

                console.log('requeststatusrequeststatus  =>', json)

                if (json.message !== "No askedreference found.") {
                    console.log('requeststatusrequeststatus  =>', json.data[0])
                    setRefmodel(json.data[0].status)
                } else {
                    //console.log('--------------')
                    setRefmodel('3')
                }
            })
        // .catch((err) => //console.log(err))
        getuserProfile();
    }
    const getuserProfile = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //alert(screenData.id);
        fetch(global.url + 'getuserprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
            }),
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('json=> ', json)

                global.kulam = json.data[0].kulam_name
                // //console.log('daata all =>', json.data[0].is_verified)
                // setRefmodel(json.data[0].is_verified)
            })
        // .catch((err) => //console.log(err))
    }



    const getuservideo = async () => {
        try {
            // if (templeId === null) {
            //     console.log('templeId is not set.');
            //     return;
            // }

            const response = await fetch(global.url + 'gettemplevideos', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    temple_id: global.templid,
                }),
            });
            console.log(response)
            const json = await response.json();
            console.log('Response JSON ===== 1:', json);
            navigation.navigate('VideoScreen', { youtubevide: global.templid });

        } catch (err) {
            console.log('Error fetching temple videos:', err);
        }
    }

    // const getuservideo = async () => {
    //     try {
    //         // Ensure that `global.templid` is set before making the request
    //         if (!global.templid) {
    //             console.log('Temple ID is not set.');
    //             Alert.alert('Error', 'Temple ID is not set. Please try again.');
    //             return; // Exit the function if templid is not set
    //         }

    //         // Fetch request to get temple videos
    //         const response = await fetch(`${global.url}gettemplevideos`, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 temple_id: global.templid,
    //             }),
    //         });

    //         // Check if the response status is OK
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! Status: ${response.status}`);
    //         }

    //         // Parse the JSON response
    //         const json = await response.json();
    //         console.log('Response JSON:', json);

    //         // Navigate to VideoScreen if `refmodel` is 1, otherwise show modal
    //         if (refmodel === '1') {
    //             navigation.navigate('VideoScreen', { youtubevide: global.templid });
    //         } else {
    //             // setIsModalVisible(true); // Display the modal if `refmodel` is not 1
    //         }
    //     } catch (err) {
    //         // Log error and display an alert to the user
    //         console.log('Error fetching temple videos:', err);
    //         Alert.alert('Error', 'Failed to fetch temple videos. Please try again later.');
    //     }
    // };






    const askref = async () => {
        setIsModalVisible(false);
        await AsyncStorage.setItem('akrefre', '1');
        navigation.navigate('Refrence')
    };

    // const evento = () => {
    //     if (refmodel == '1') {
    //         navigation.navigate('Events')

    //         // navigation.navigate('Refrence')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const manegh = () => {
    //     if (refmodel == '1') {
    //         navigation.navigate('ManageHistory')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const oldevent = () => {

    //     if (refmodel == '1') {
    //         navigation.navigate('Oldevent')
    //         // navigation.navigate('Event')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const callpag = () => {
    //     if (refmodel == '1') {
    //         navigation.navigate('Call')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }


    const callmag = () => {
        if (refmodel == '1') {
            navigation.navigate('ManageGallery1')
        } else {
            setIsModalVisible(true)
        }
    }

    // const event = () => {

    //     if (refmodel == '1') {
    //         // navigation.navigate('Oldevent')
    //         navigation.navigate('Event')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const gallery = () => {
    //     if (refmodel == '1') {
    //         navigation.navigate('Gallery')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const mangegallery = () => {
    //     if (refmodel == '1') {
    //         // navigation.navigate('GalleryOne')
    //         // navigation.navigate('ManageGallery1')
    //         navigation.navigate('VideoScreen')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    // const Callone = () => {
    //     if (refmodel == '1') {
    //         navigation.navigate('Callone')
    //     } else {
    //         setIsModalVisible(true)
    //     }
    // }
    const oldevento = () => {
        if (refmodel == '1') {
            navigation.navigate('Oldevent')
        } else {
            setIsModalVisible(true)
        }
    }

    const evento = () => {
        if (refmodel == '1') {
            navigation.navigate('Events')
        } else {
            setIsModalVisible(true)
        }
    }
    const manegh = () => {
        if (refmodel == '1') {
            navigation.navigate('ManageHistory')
        } else {
            setIsModalVisible(true)
        }
    }
    const oldevent = () => {

        if (refmodel == '1') {
            navigation.navigate('Oldevent')
        } else {
            setIsModalVisible(true)
        }
    }
    const callpag = () => {
        if (refmodel == '1') {
            navigation.navigate('Call')
        } else {
            setIsModalVisible(true)
        }
    }

    const gallery = () => {
        if (refmodel == '1') {
            navigation.navigate('Gallery')
        } else {
            setIsModalVisible(true)
        }
    }
    const mangegallery = () => {
        if (refmodel == '1') {
            // navigation.navigate('GalleryOne')
            navigation.navigate('ManageGallery1')
        } else {
            setIsModalVisible(true)
        }
    }
    const Callone = () => {
        if (refmodel == '1') {
            // navigation.navigate('Callone')
            navigation.navigate('Gallery')
            // Gallery
        } else {
            setIsModalVisible(true)
        }
    }
 const Detail = () => {

        if (refmodel == '1') {
            navigation.navigate('Detail')
        } else {
            setIsModalVisible(true)
        }
    }
    const Callsecon = () => {
        if (refmodel == '1') {
            navigation.navigate('Callone')
         
            // Gallery
        } else {
            setIsModalVisible(true)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar animated={true} backgroundColor="#ffffff" />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ height: 30 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        {/* <TouchableOpacity style={{ width: '20%' }}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/bell.png')} />
                        </TouchableOpacity> */}
                        <View style={{ width: '60%' }}>
<TouchableOpacity  onPress={() => navigation.navigate('AddVideoScreen')}>
                            <Text style={styles.name}>Gounder Kudumbam</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={{ width: '40%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                           
                            <Text style={styles.title}>
                                WELCOME {global.uername},
                            </Text>
                         
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>

                    {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <TouchableOpacity style={{ width: 350, height: 400, alignSelf: 'center' }}>
                                    <View>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Kulam: {global.kulam}</Text>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Temple: {global.templename}</Text>
                                    </View>
                                    <View style={{ height: 20 }}></View>
                                    {t.image ?
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + t.image.split(',')[0] }} />
                                        :
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />

                                    }
                                    <Text style={styles.alltxt1}>
                                        {t.name}
                                    </Text>
                                    <Text style={styles.alltxt}>
                                        Updated {t.updated_at}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        :
                        <View>
                            {loding ?
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="blue" animating={loding} />
                                </View>
                                : null}
                        </View>

                        // <TouchableOpacity style={{ width: 350, height: 400, alignSelf: 'center' }} onPress={() => mainimg()}>
                        //     <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        //     <Text style={styles.alltxt1}>
                        //         Shri Ponkaliaman
                        //     </Text>
                        //     <Text style={styles.alltxt}>
                        //         Shivgiri , Endor
                        //     </Text>
                        // </TouchableOpacity>
                    }



                    <View style={{ height: 20 }}></View>

                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '34%' }} onPress={() => oldevento()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>புதிய</Text>
                                <Text style={styles.fnttwo}>நிகழ்வுகள்</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '34%' }} onPress={() => manegh()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>கோவில்</Text>
                                <Text style={styles.fnttwo}>வரலாறு</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '34%' }} onPress={() => evento()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>பழைய</Text>
                                <Text style={styles.fnttwo}>நிகழ்வுகள்</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        {/* <TouchableOpacity style={{ width: '34%' }} onPress={() => Callone()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>கோவில்</Text>
                                <Text style={styles.fnttwo}>நிர்வாகம்</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ width: '34%' }} onPress={() => Callone()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>பிற</Text>
                                <Text style={styles.fnttwo}>கோவில்கள்</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '34%' }}
                            onPress={() => callpag()}
                            // onPress={() => gallery()}
                        >
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>அருமை</Text>
                                <Text style={styles.fnttwo}>பெரியவர்கள்</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => mangegallery()} style={{ width: '34%' }} >
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>பட</Text>
                                <Text style={styles.fnttwo}>தொகுப்பு</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', marginBottom: '5%' }}>
                        {/* <TouchableOpacity onPress={()=>{
                            navigation.navigate('ManageGallery1')
                        }} style={{ width: '34%' }} >
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>பட</Text>
                                <Text style={styles.fnttwo}>தொகுப்பு</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ width: '34%' }} onPress={() => Callsecon()}>
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>கோவில்</Text>
                                <Text style={styles.fnttwo}>நிர்வாகி</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => oldevent()} style={{ width: '34%' }} >
                            <View style={styles.boxview}>
                                <Text style={styles.fntone}>அனைத்து</Text>
                                <Text style={styles.fnttwo}>நிகழ்வுகள்</Text>
                            </View>
                        </TouchableOpacity>
                    </View>


                    {refmodel == '1' ?
                        <View style={{ flexDirection: 'row', width: '100%', }}>
                            <TouchableOpacity style={{ width: '34%', }} onPress={() => {
                                getuservideo()
                            }}>

                                <View style={[styles.boxview, {
                                    height: 35, justifyContent: 'center',

                                }]}>
                                    {/* <Text style={styles.fntone}>பட</Text> */}
                                    <Text style={[styles.fnttwo, { color: '#EBC130' }]}>வீடியோக்கள்</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        : null}
                    <View style={{ height: 20 }}></View>

                    {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <Text key={index} style={{ color: '#22242A', fontSize: 12, fontFamily: 'Montserrat-Regular' }}>
                                    {t.history}
                                </Text>
                            ))}
                        </View>
                        :
                        null
                        // <View>
                        //     <Text style={{ color: '#22242A', fontSize: 12, fontFamily: 'Montserrat-Regular' }}>Our Grandpa Kula deivam.. Its unique and old temple also The temple folloeing old cultures still same way..Yearly once Celebrating Functions its will be seen Unity of people from diffrent Cities at one place..</Text>
                        // </View>
                    }
                    <View style={{ height: 10 }}></View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <BannerAd size={BannerAdSize.BANNER}
                            unitId={TestIds.BANNER}
                            requestOptions={
                                {
                                    requestNonPersonalizedAdsOnly: true
                                }
                            } />
                    </View>
                    <View style={{ height: 10 }}></View>
                    {refmodel == '3' ?
                        <TouchableOpacity style={styles.ask} onPress={() => navigation.navigate('Refrence')}>
                            <Text style={{ color: 'white', fontSize: 11, alignSelf: 'center', fontFamily: 'Montserrat-Bold', }}>Ask Refrence</Text>
                        </TouchableOpacity>
                        : null}

                </View>
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                    {refmodel == '0' ?
                        <View style={{ backgroundColor: 'white', height: 100, borderRadius: 15, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#22242A' }}>request already sent screen</Text>
                        </View>
                        : null}
                    {refmodel == '2' ?
                        <View style={{ backgroundColor: 'white', height: 100, borderRadius: 15, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#22242A' }}>Request allready send, but your Request is rejected.</Text>
                        </View>
                        : null}
                    {refmodel == '3' ?
                        <View style={{ backgroundColor: 'white', height: 300, borderRadius: 15, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'column' }}>
                            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#22242A' }}>Hi, Sorry</Text>
                            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#8D92A3' }}>To view this section you should be a verified user</Text>
                            <FastImage style={{ height: 100, width: 100 }} source={require('../../../assets/images/cross.png')} />
                            <TouchableOpacity onPress={() => askref()} style={{ width: 100, backgroundColor: '#7B221E', height: 25, justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                                <Text style={{ color: 'white', fontFamily: 'Montserrat-Bold', fontSize: 11 }}>Ask Refrence</Text>
                            </TouchableOpacity>
                        </View>
                        : null}
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}
//work like this is ok?