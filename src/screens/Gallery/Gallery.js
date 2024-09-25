import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { gettemples } from '../Apicall';
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, SearchBar } from "react-native-elements";
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
export default function Gallery({ navigation }) {
    const [temp, settemp] = useState([])
    const [searchtemp, setsearchtemp] = useState([])
    const [adver, setadver] = useState('')
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');


    useEffect(async () => {
        // navigation.addListener('focus', async () => {
            const result = await AsyncStorage.getItem('logindata')
            // //console.log(result)
            console.log('gallery page==========')
            const screenData = JSON.parse(result)
            // //console.log('screenData', screenData)
            gettemp()
            getadvertisement()
        // })
    }, [])

    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '', name: '' },
        { type: 'banner', id: 'banner2', created_at: '', name: '' },
        { type: 'banner', id: 'banner2', created_at: '', name: '' },
        { type: 'banner', id: 'banner2', created_at: '', name: '' },
        { type: 'banner', id: 'banner2', created_at: '', name: '' },
        { type: 'banner', id: 'banner2', created_at: '', name: '' },

    ];

    const getadvertisement = async () => {
        const newarray = []
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
                // //console.log('getadvertisement data ===>>', json)
                if (json.success == true) {

                    setadver(json.data)

                }
            })
    }


    const gettemp = () => {
        setLoading(true);
        const newarray = [];
        fetch(global.url + 'gettemples', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kulam_id: '0'
            })
        }).then((res) => res.json())
            .then((json) => {
                //console.log('========= gettemples ', json)
                var count = Object.keys(json.data).length;
                let staticIndex = 0;
                for (let i = 0; i < count; i++) {
                    if (json.data[i].name !== global.templename) {
                        //console.log('=== >>> ', json.data[i].name, '!==', global.templename)
                        global.bb = json.data[i].image.split(',')
                        newarray.push({ type: 'item', city: json.data[i].city, district: json.data[i].district, history: json.data[i].history, name: json.data[i].name, kulamname: json.data[i].kulamname, image: global.bb[0], images: json.data[i].image, id: json.data[i].id, updated_at: json.data[i].updated_at }); // Create your array of data
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                }
                settemp(newarray)
                setsearchtemp(newarray);
                //console.log('gettemples => ', newarray)
                setLoading(false)
            })
            .catch((err) => {
                //console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // const gettemp = () => {
    //     setLoading(true)
    //     const newarray = [];
    //     gettemples(global.url + 'gettemples').then(res => {
    //         var count = Object.keys(res.data).length;

    //         let staticIndex = 0;
    //         for (let i = 0; i < count; i++) {
    //             global.bb = res.data[i].image.split(',')
    //             newarray.push({ type: 'item', name: res.data[i].name, kulamname: res.data[i].kulamname, image: global.bb[0], images: res.data[i].image, id: res.data[i].id, updated_at: res.data[i].updated_at }); // Create your array of data
    //             if (i % 2 === 0 && staticIndex < staticData.length) {
    //                 newarray.push(staticData[staticIndex]);
    //                 staticIndex++;
    //             }
    //         }
    //         // setadver(newarray)

    //         // for (var i = 0; i < count; i++) {
    //         //     global.bb = res.data[i].image.split(',')
    //         //     newarray.push({ name: res.data[i].name, kulamname: res.data[i].kulamname, image: global.bb[0], images: res.data[i].image, id: res.data[i].id, updated_at: res.data[i].updated_at }); // Create your array of data
    //         // }

    //         settemp(newarray)
    //         //console.log('newarray', newarray)
    //         setLoading(false)
    //     })

    // }


    const searchFunction = (text) => {
        if (text) {
            const newData = searchtemp.filter(function (item) {
                return item.kulamname && item.kulamname.toUpperCase().includes(text.toUpperCase())
            });
            settemp(newData);
            setSearch(text);
        } else {
            gettemp();
            setSearch(text);
        }
    };


    const datetime = (value) => {

        if (value != null) {
            var month = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
            var strSplitDate = String(value).split(' ');
            var dates = new Date(strSplitDate[0]);
            var dd = dates.getDate();
            var mm = month[dates.getMonth()];
            var yyyy = dates.getFullYear();
            var conformdate = dd + ' ' + mm + ' ' + yyyy
            // //console.log(conformdate)
            return conformdate
        } else {
            return value
        }
    }

    const renderItem = ({ item }) => {
        if (item.type === 'banner') {
            return <View style={{ alignItems: 'center' }}>
                <BannerAd size={BannerAdSize.BANNER}
                    unitId={TestIds.BANNER}
                    requestOptions={
                        {
                            requestNonPersonalizedAdsOnly: true
                        }
                    } />
            </View>
        } else {
            return (
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails', item)} style={{ width: 350, height: 400, alignSelf: 'center', padding: 6 }}>
                        {item.image ?
                            <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image }} />
                            :
                            <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/noimg.jpg')} />
                        }
                        <Text style={styles.fnt}>
                            {item.name}
                        </Text>
                        <View style={styles.fnt1}>
                            <Text style={styles.fnt2}>
                                Updated {datetime(item.updated_at)}
                            </Text>
                            <Text style={styles.fnt2}>
                                District: {item.district}
                            </Text>
                            <Text style={styles.fnt2}>
                                City : {item.city}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    };

    const renderSeparator = () => {
        return (
            <View style={{ height: 10, backgroundColor: 'transparent' }} />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar animated={true} backgroundColor="#ffffff" />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ height: 30 }}></View>



                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                            <FastImage style={{ width: 20, height: 20, }} source={require('../../../assets/images/backPlain.png')} />
                        </TouchableOpacity>
                        <View style={{ width: '60%' }}>
                            <Text style={{ color: '#22242A',fontSize: 14,textAlign: 'center',fontFamily: 'Montserrat-Bold'}}>Gounder Kudumbam</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.wel}>
                                WELCOME {global.uername}
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Temple: {global.templename}</Text>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View>
                        <Text style={styles.wel}>பிற கோவில்கள்</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    {/* {adver ?
                        <View>
                            {adver.map((t, index) => (
                                <View style={{ width: '100%', height: 80, alignSelf: 'center' }}>
                                    <FastImage resizeMode='stretch' style={{ height: 50, width: '100%' }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                </View>
                            ))}
                        </View>
                        : null} */}
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '90%' }}>
                            <SearchBar
                                searchIcon={false}
                                clearIcon={false}
                                placeholder='Search By Kulam'
                                inputContainerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#cbcac6', borderBottomWidth: 1, width: '95%', alignSelf: 'center', color: '#cbcac6' }}
                                containerStyle={{ backgroundColor: 'transparent', color: '#cbcac6', borderBottomColor: 'transparent', borderTopColor: 'transparent', }}
                                onChangeText={(text) => searchFunction(text)}
                                value={search}></SearchBar>
                        </View>
                        <View style={{ width: '10%', alignSelf: 'center' }}>
                            <FastImage style={{ width: 40, height: 40 }} source={require('../../../assets/images/ser.png')} />
                        </View>
                    </View>

                    <FlatList
                        data={temp}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}

                    />


                    {/* <View style={{
                        flex: 1,
                        marginTop: 800,
                        position: 'absolute', zIndex: 1,
                        alignSelf: 'center', width: '100%'
                    }}>
                        <View style={{ position: 'relative', alignSelf: 'center' }}>
                            <BannerAd size={BannerAdSize.BANNER}
                                unitId={TestIds.BANNER}
                                requestOptions={
                                    {
                                        requestNonPersonalizedAdsOnly: true
                                    }
                                } />
                        </View>
                    </View> */}
                    {/* {temp ?
                        <View>

                            {temp.map((t, index) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails', t)} style={{ width: 350, height: 400, alignSelf: 'center', padding: 6 }}>
                                    {t.image ?
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                        :
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                                    }
                                    <Text style={styles.fnt}>
                                        {t.name}
                                    </Text>
                                    <Text style={styles.fnt1}>
                                        Updated {datetime(t.updated_at)}
                                    </Text>

                                </TouchableOpacity>
                            ))}

                        </View>
                        : null} */}




                    {/* <View style={{ height: 20 }}></View>
                    <View style={{ width: 350, height: 400, alignSelf: 'center' }}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Updated 23rd June 2023
                        </Text>

                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ width: 350, height: 400, alignSelf: 'center' }}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Updated 23rd June 2023
                        </Text>

                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ width: 350, height: 400, alignSelf: 'center' }}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Updated 23rd June 2023
                        </Text>

                    </View> */}
                </View>
            </ScrollView>
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
        </SafeAreaView>
    )
}