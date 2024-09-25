import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, ActivityIndicator, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import AsyncStorage from "@react-native-community/async-storage";
import AutoLink from 'react-native-autolink';
export default function ManageHistory({ navigation }) {
    const [loding, setLoading] = useState(false)
    const [tempdata, settempdata] = useState('')
    const [onedate, setonedate] = useState('')

    useEffect(() => {
        // navigation.addListener('focus', async () => {
        console.log('manage history =======')
        gettemplehistory()
        // })
    }, [])

    const gettemplehistory = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('screenData.temple', screenData.temple)
        setLoading(true)
        fetch(global.url + 'gettemplehistory', {
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
                //console.log('gettemplehistory data ===>>', json)
                setLoading(false)
                if (json.success == true) {
                    if (json.data == '') {
                        alert(json.message)
                    }

                    settempdata(json.data)
                    setonedate(json.data[0].created_at)

                } else {
                    // alert(json.message)
                }
            })
    }

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

                    <View style={{ height: 10 }}></View>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}></View>
                        <View style={{ width: '10%' }}>
                            <FastImage resizeMode='stretch' style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                        </View>
                        <View style={{ width: '40%', paddingLeft: '10%', paddingTop: 2 }}>
                            <Text style={styles.admin}>Posted by Admin</Text>
                            <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10, }}>{datedis(onedate)}</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }}></View>


                    <View style={{ height: 10 }}></View>
                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={styles.disered}>கோவில் வரலாறு</Text>
                    </View>
                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={styles.dise}>{global.templename}</Text>
                    </View>
                    {/* <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 10, color: '#8D92A3' }}>Event Date 25th July 2023</Text>
                    </View> */}
                    <View style={{ height: 15 }}></View>

                    {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <View style={{ marginTop: 30, borderWidth: 0 }}>
                                    <View style={styles.swiperView}>
                                        <Swiper
                                            controlsProps={{
                                                prevPos: false,
                                                nextPos: false,
                                            }}
                                            loop={true}
                                        // autoplay={true}
                                        >
                                            {t.images && t.images.trim() !== '' ? (
    t.images.split(',').map((imageUrl, imgIndex) => (
        <Image
            key={imgIndex}
            source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + imageUrl.trim() }}
            style={styles.slidimg}
        />
    ))
) : null}
                                            {/* <View>
                                                <FastImage style={styles.slidimg} resizeMode='stretch' source={{ uri: t.images }} />
                                            </View> */}

                                        </Swiper>
                                    </View>
                                    <View style={{ height: 10 }}></View>
                                    <View>
                                        <Text style={styles.lasttxt}>
                                            {t.templehistory}

                                        </Text>
                                    </View>
                                    <View style={{ height: 20 }}></View>
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        <FastImage style={styles.usrpic} source={require('../../../assets/images/yout.png')} />
                                        {/* <Text style={{ alignSelf: 'center', width: '85%' }}>{t.youtube_link}</Text> */}
                                        <View style={{ borderWidth: 0, alignSelf: 'center', width: '85%' }}>
                                            <AutoLink text={t.youtube_link}>
                                                {(url, match) => (
                                                    <Text style={{ color: 'black' }} onPress={() => Linking.openURL(url)}>
                                                        {match}
                                                    </Text>
                                                )}
                                            </AutoLink>
                                        </View>
                                    </View>
                                </View>
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
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}