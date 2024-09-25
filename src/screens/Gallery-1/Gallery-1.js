import React, { useState, useRef, useEffect } from 'react';
import { FlatList, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';

export default function GalleryOne({ navigation }) {
    const [gallary, setgallary] = useState([])
    const [loading, setLoading] = useState(false);
    const [manger, setmanger] = useState(false);

    useEffect(async () => {
        // navigation.addListener('focus', async () => {
            const result = await AsyncStorage.getItem('logindata')
            //console.log(result)
            console.log('gallery one page ===========')
            const screenData = JSON.parse(result)
            //console.log('screenData', screenData)
            //console.log('is_content_manager>>>', screenData.is_content_manager)
            setmanger(screenData.is_content_manager)
            getgal()

        // })
    }, [])

    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
    ];
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

    const getgal = async () => {
        const newarray = []
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        fetch(global.url + 'getgallery', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
                temple_id: screenData.temple
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getgallery data ===>>', json.data)
                if (json.success == true) {
                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {

                        newarray.push({ type: 'item', created_at: json.data[i].created_at, id: json.data[i].id, image: json.data[i].image, images: json.data[i].images, updated_at: json.data[i].updated_at, name: json.data[i].name, temple_name: json.data[i].temple_name }); // Create your array of data
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                        setgallary(newarray)
                    }
                    //console.log('getgallery data ===>>', newarray)

                    setLoading(false)
                }
            })
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
                    <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails', item)} style={styles.alview}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20, borderWidth: 0, opacity: 0.5, backgroundColor: '#000000' }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image }} />
                        <View style={{ height: 20 }}></View>
                        <Text style={styles.fnt}>
                            {item.name}
                        </Text>
                        <Text style={styles.fnt1}>
                            Updated {datetime(item.updated_at)}
                        </Text>
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
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Kulam: {global.kulam}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Temple: {global.templename}</Text>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <View style={{ width: '20%', alignSelf: 'center' }}>
                            <Text style={styles.title}>Gallery</Text>
                        </View>


                    </View>
                    <View style={{ height: 10 }}></View>
                    <FlatList
                        data={gallary}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}

                    />
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