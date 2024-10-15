import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button, Image } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { ActivityIndicator } from 'react-native';

export default function ManageEvent1({ navigation }) {
    const [loading, setLoading] = useState(false)
    const [tempdata, settempdata] = useState([])
    const [oldtempdata, setoldtempdata] = useState([])
    const [data, setdata] = useState('')
   
    useEffect(() => {
        // navigation.addListener('focus', async () => {
        console.log('manageevent one page =======')
        getnewevent()
        getoldevent()
        // })
    }, [])

    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
    ];

    const getnewevent = async () => {
        const newarray = [];
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        fetch(global.url + 'getnewevent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temple_id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('json== getnewevent =>> ', json)
                if (json.success == true) {

                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        newarray.push({ type: 'item', name: json.data[i].name, created_at: json.data[i].created_at, date_time: json.data[i].date_time, id: json.data[i].id, image: json.data[i].image, images: json.data[i].images, name: json.data[i].name, temple: json.data[i].temple, updated_at: json.data[i].updated_at, description: json.data[i].description });
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                    settempdata(newarray)
                } else {
                    alert(json.message)
                }
                setLoading(false)
                console.log('newarraynewarray ==> ', newarray)

            })
    }
    // const getoldevent = async () => {
    //     const newarray = [];
    //     const result = await AsyncStorage.getItem('logindata')
    //     const screenData = JSON.parse(result)
    //     setLoading(true)
    //     fetch(global.url + 'getoldevent', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             temple_id: screenData.temple,
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             //console.log('json== getnewevent =>> ', json)
    //             if (json.success == true) {

    //                 let staticIndex = 0;
    //                 for (let i = 0; i < json.data.length; i++) {
    //                     newarray.push({ type: 'item', name: json.data[i].name, created_at: json.data[i].created_at, date_time: json.data[i].date_time, id: json.data[i].id, image: json.data[i].image, images: json.data[i].images, name: json.data[i].name, temple: json.data[i].temple, updated_at: json.data[i].updated_at, description: json.data[i].description });
    //                     if (i % 2 === 0 && staticIndex < staticData.length) {
    //                         newarray.push(staticData[staticIndex]);
    //                         staticIndex++;
    //                     }
    //                 }
    //                 setoldtempdata(newarray)
    //             } else {
    //                 alert(json.message)
    //             }
    //             setLoading(false)

    //         })
    // }
    const getoldevent = async () => {
        const newarray = [];
        const result = await AsyncStorage.getItem('logindata');
        const screenData = JSON.parse(result);
        setLoading(true);

        fetch(global.url + 'getoldevent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temple_id: screenData.temple,
            }),
        })
            .then((res) => res.json())
            .then(async (json) => {
                // Log the entire JSON response
                console.log('Response from getoldevent:', json);

                if (json.success) {
                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        newarray.push({
                            type: 'item',
                            name: json.data[i].name,
                            created_at: json.data[i].created_at,
                            date_time: json.data[i].date_time,
                            id: json.data[i].id,
                            image: json.data[i].image,
                            images: json.data[i].images,
                            temple: json.data[i].temple,
                            updated_at: json.data[i].updated_at,
                            description: json.data[i].description
                        });
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                    setoldtempdata(newarray);
                } else {
                    alert(json.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching old events:', error);
                setLoading(false);
            });
    };

    const datedis = (date) => {
        var servertime = new Date(date.replace(" ", "T"))
        const last = new Date(servertime).getTime();
        const now = new Date().getTime();
        if (last < now) {
            const distance = now - last;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (days == 0) {
                const timer = hours + ':' + minutes + ':' + seconds + ' ' + ' to go'
                return timer
            } else {
                const displaytime = days + ' days ago'
                return displaytime
            }
        }
    }

    const datetime = (value) => {
        var month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var strSplitDate = String(value).split(' ');
        var dates = new Date(strSplitDate[0]);
        var dd = dates.getDate();
        var mm = month[dates.getMonth()];
        var yyyy = dates.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy
        return conformdate
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
                <View style={{ backgroundColor: '#ffffff', padding: 9 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '20%' }}>
                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.addmintxt}>Posted By Admin</Text>
                            <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>
                                {datedis(item.created_at)}
                            </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <View>
                                <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 20 }}></View>
                    {item.image ?
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })} style={styles.main}>
                            <Image style={styles.mainimg} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image.split(',')[0]}} />
                        </TouchableOpacity>
                        :
                        null
                    }
                    {/* <Text>{item.image}</Text> */}
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })}>

                        <View>
                            <Text style={styles.maintxt}>
                                {item.name}
                            </Text>
                            <Text style={styles.maintxttwo}>
                                Event Date :{datetime(item.date_time)}

                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            );
        }
    };
    const renderoldItem = ({ item }) => {
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
                <View style={{ backgroundColor: '#ffffff', padding: 9 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '20%' }}>
                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.addmintxt}>Posted By Admin</Text>
                            <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>
                                {datedis(item.created_at)}
                            </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                            <View>
                                <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                            </View>
                        </View>
                    </View>

                    <View style={{ height: 20 }}></View>
                    {item.image ?
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })} style={styles.main}>
                            <Image resizeMode='stretch' style={styles.mainimg} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image.split(',')[0] }} />
                        </TouchableOpacity>
                        :
                        null
                    }
                    {/* <Text>{'https://www.app.gounderkudumbam.com/admin/public/images/6703ae01d497e.jpeg'}</Text> */}
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })}>

                        <View>
                            <Text style={styles.maintxt}>
                                {item.name}
                            </Text>
                            <Text style={styles.maintxttwo}>
                                Event Date :{datetime(item.date_time)}

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
            {loading && <ActivityIndicator size="large" color="#043b5a" />}
                <View style={{ margin: 20 }}>
                    <View style={{ height: 30 }}></View>
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
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.wel}>
                                WELCOME {global.uername},
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.done}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Temple: {global.templename}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <View style={{ width: '33%', alignSelf: 'center', }}>
                            <Text style={styles.title}>EVENTS</Text>
                        </View>
                        <TouchableOpacity style={{ width: '80%' }} onPress={() => navigation.navigate('ManageEvent')}>
                            <FastImage style={styles.titleimg} source={require('../../../assets/images/pluse.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>

                    <FlatList
                        data={tempdata}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}
                    />
                    <FlatList
                        data={oldtempdata}
                        keyExtractor={(item) => item.id}
                        renderItem={renderoldItem}
                        ItemSeparatorComponent={renderSeparator}
                    />
                    <View style={{ height: 35 }}></View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}