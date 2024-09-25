import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, Linking, View, StatusBar, SafeAreaView, Button, Image } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";

import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

export default function Callone({ navigation }) {
    const [loding, setLoading] = useState(false)
    const [tempdata, settempdata] = useState('')
    const [adver, setadver] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredata, setFilteredData] = useState([]);

    useEffect(() => {
        navigation.addListener('focus', async () => {
            console.log('call one page ========')
            gettemplemember()
        })
    }, [])


    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
    ];

    const gettemplemember = async () => {
        const newarray = []
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        console.log(screenData.id, screenData.temple)
        setLoading(true)
        fetch(global.url + 'gettemplemanager', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
                temple_id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('------------  ', json)
                if (json.success == true) {
                    setLoading(false)
                    if (json.data == '') {
                        alert('temple manager not found')
                    }
                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        newarray.push({ type: 'item', photo: json.data[i].photo, kulamname: json.data[i].kulam_name, created_at: json.data[i].created_at, email: json.data[i].email, id: json.data[i].id, mobile: json.data[i].mobile_number, name: json.data[i].name, password: json.data[i].password, template_id: json.data[i].template_id, updated_at: json.data[i].updated_at, type: json.data[i].type });
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                    settempdata(newarray)
                    setFilteredData(newarray)
                    // settempdata(json.data)
                } else {
                    //console.log(json.message)
                }
                setLoading(false)
                console.log('gettemplemanager data ==1=>>', newarray)
            })
        getadvertisement()
    }

    const getadvertisement = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        fetch(global.url + 'getadvertisement', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('getadvertisement data =sd==>>', json)
                if (json.success == true) {
                    setadver(json.data)
                } else {

                }
            })
    }

    const dialCall = (mobile) => {
        //console.log('mobile>>', mobile)
        Linking.openURL(`tel:${mobile}`)
        // Linking.openURL(phoneNumber);
    };

    // const renderItem = ({ item }) => {
    //     if (item.type === 'banner') {
    //         return <View style={{ alignItems: 'center' }}>
    //             <BannerAd size={BannerAdSize.BANNER}
    //                 unitId={TestIds.BANNER}
    //                 requestOptions={
    //                     {
    //                         requestNonPersonalizedAdsOnly: true
    //                     }
    //                 } />
    //         </View>
    //     } else {
    //         return (
    //             <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, padding: 9 }}>
    //                 {/* {item.name ? */}
    //                 {/* // <TouchableOpacity onPress={() => navigation.navigate('Myprofile')} style={{ width: '30%' }}> */}
    //                 {item.photo == null ?
    //                     <FastImage resizeMode="contain" style={{ width: 60, height: 60 }} source={require('../../../assets/images/profile.png')} />
    //                     :
    //                     <FastImage resizeMode="contain" style={{ width: 60, height: 60, borderRadius: 30 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.photo }} />
    //                 }
    //                 {/* // </TouchableOpacity> */}
    //                 {/* : null} */}
    //                 <View style={{ width: '50%', alignSelf: 'center', padding: 5 }}>
    //                     {item.name ?
    //                         <View>
    //                             <Text style={styles.part}>{item.name}</Text>
    //                             <Text style={styles.titles}>{item.kulamname}</Text>

    //                         </View>
    //                         : null}
    //                 </View>
    //                 {/* {item.mobile ? */}
    //                 <TouchableOpacity onPress={() => dialCall(item.mobile)} activeOpacity={0.7} style={{ width: '20%', alignSelf: 'center' }}>
    //                     <FastImage style={{ height: 40, width: 40 }} source={require('../../../assets/images/call.png')} />
    //                 </TouchableOpacity>
    //                 {/* : null} */}
    //             </View>

    //         );
    //     }
    // };

    // const renderSeparator = () => {
    //     return (
    //         <View style={{ height: 10, backgroundColor: 'transparent' }} />
    //     );
    // };
    // const handleSearch = (query) => {
    //     setSearchQuery(query);

    //     if (query) {
    //         const filteredData = tempdata.filter((item) => {
    //             const idMatch = item.id && typeof item.id === 'string' && item.id.toLowerCase().includes(query.toLowerCase());
    //             const kulamMatch = item.kulamname && typeof item.kulamname === 'string' && item.kulamname.toLowerCase().includes(query.toLowerCase());
    //             const stateMatch = item.State && typeof item.State === 'string' && item.State.toLowerCase().includes(query.toLowerCase());
    //             const districtMatch = item.District && typeof item.District === 'string' && item.District.toLowerCase().includes(query.toLowerCase());
    //             const villageMatch = item.Village && typeof item.Village === 'string' && item.Village.toLowerCase().includes(query.toLowerCase());
    //             const templeMatch = item.Temple && typeof item.Temple === 'string' && item.Temple.toLowerCase().includes(query.toLowerCase());

    //             return idMatch || kulamMatch || stateMatch || districtMatch || villageMatch || templeMatch;
    //         });

    //         settempdata(filteredData);
    //     } else {
    //         setFilteredData(tempdata); // Show all data if the query is empty
    //     }
    // };


    const handleSearch = async (query) => {
        try {

            const filteredData = tempdata.filter((item) => {
                const idMatch = item.id && typeof item.id === 'string' && item.id.toLowerCase().includes(query.toLowerCase());
                const kulamMatch = item.kulamname && typeof item.kulamname === 'string' && item.kulamname.toLowerCase().includes(query.toLowerCase());
                const stateMatch = item.State && typeof item.State === 'string' && item.State.toLowerCase().includes(query.toLowerCase());
                const districtMatch = item.District && typeof item.District === 'string' && item.District.toLowerCase().includes(query.toLowerCase());
                const villageMatch = item.Village && typeof item.Village === 'string' && item.Village.toLowerCase().includes(query.toLowerCase());
                const templeMatch = item.Temple && typeof item.Temple === 'string' && item.Temple.toLowerCase().includes(query.toLowerCase());
                return idMatch || kulamMatch || stateMatch || districtMatch || villageMatch || templeMatch;
            });

            setFilteredData(filteredData)
        } catch (error) {
            console.error('Error filtering data:', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar animated={true} backgroundColor="#ffffff" />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ height: 30 }}>


                    </View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                            <FastImage style={{ width: 20, height: 20, }} source={require('../../../assets/images/backPlain.png')} />
                        </TouchableOpacity>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.name}>Gounder Kudumbam</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.serchview}>
                        <TouchableOpacity style={styles.flexdreactionview}>
                            <Image source={require('../../../assets/images/search.png')} style={styles.sarechimg}></Image>
                            <TextInput
                                placeholder="Search state, District, Village, Temple, kulam"
                                alue={searchQuery}
                                // placeholderTextColor={'#'}
                                onChangeText={handleSearch}
                                style={styles.serachtext}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <Text style={styles.others}>கோவில் நிர்வாகம்</Text>
                    <View style={{ height: 30 }}></View>
                    {/* <FlatList
                        data={filteredata}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    /> */}

                    {loding ? (
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator size="large" color="blue" animating={loding} />
                        </View>
                    ) : (
                        <View>
                            {filteredata && Array.isArray(filteredata) && filteredata.map((item, index) => (
                                item.type === 'banner' ? (
                                    <View key={index} style={{ alignItems: 'center' }}>
                                        <BannerAd
                                            size={BannerAdSize.BANNER}
                                            unitId={TestIds.BANNER}
                                            requestOptions={{
                                                requestNonPersonalizedAdsOnly: true
                                            }}
                                        />
                                    </View>
                                ) : (
                                    <View key={index} style={{ flexDirection: 'row', width: '100%', borderWidth: 0, padding: 9 }}>
                                        {item.photo == null ? (
                                            <FastImage
                                                resizeMode="contain"
                                                style={{ width: 60, height: 60 }}
                                                source={require('../../../assets/images/profile.png')}
                                            />
                                        ) : (
                                            <FastImage
                                                resizeMode="contain"
                                                style={{ width: 60, height: 60, borderRadius: 30 }}
                                                source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.photo }}
                                            />
                                        )}
                                        <View style={{ width: '50%', alignSelf: 'center', padding: 5 }}>
                                            {item.name && (
                                                <View>
                                                    <Text style={styles.part}>{item.name}</Text>
                                                    <Text style={styles.titles}>{item.kulamname}</Text>
                                                </View>
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => dialCall(item.mobile)}
                                            activeOpacity={0.7}
                                            style={{ width: '20%', alignSelf: 'center' }}>
                                            <FastImage
                                                style={{ height: 40, width: 40 }}
                                                source={require('../../../assets/images/call.png')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                )
                            ))}
                        </View>
                    )}


                    {/* <View>
                        {loding ?
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}>
                                <ActivityIndicator size="large" color="blue" animating={loding} />
                            </View>
                            : null}
                    </View> */}

                    {/* {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <View style={{ flexDirection: 'row', width: '100%', borderWidth: 0, padding: 9 }}>
                                    <TouchableOpacity onPress={() => navigation.navigate('Myprofile')} style={{ width: '30%' }}>
                                        {t.profile_image == null ?
                                            <FastImage style={{ width: 60, height: 60 }} source={require('../../../assets/images/profile.png')} />
                                            :
                                            <FastImage style={{ width: 60, height: 60 }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.profile_image }} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{ width: '50%', alignSelf: 'center' }}>
                                        <Text style={styles.part}>{t.name}</Text>
                                        <Text style={styles.titles}>{t.email}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => dialCall(t.mobile)} activeOpacity={0.7} style={{ width: '20%', alignSelf: 'center' }}>
                                        <FastImage style={{ height: 40, width: 40 }} source={require('../../../assets/images/call.png')} />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </View>
                        : null} */}

                    <View style={{ height: 20 }}></View>
                    {adver ?
                        <View>
                            {adver.map((t, index) => (
                                <View style={{ width: '100%', height: 80, alignSelf: 'center' }}>
                                    <FastImage resizeMode='stretch' style={{ height: 50, width: '100%' }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                </View>
                            ))}
                        </View>
                        : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}