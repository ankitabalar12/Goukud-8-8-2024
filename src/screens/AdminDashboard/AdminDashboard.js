import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native'
import { styles } from './styles'
import FastImage from "react-native-fast-image";
import AsyncStorage from '@react-native-community/async-storage';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
export default function AdminDashboard({ navigation }) {
    const [adver, setadver] = useState('')
    const [iscontentmanager, setiscontentmanager] = useState('0')

    useEffect(() => {
        // navigation.addListener('focus', async () => {
        // getadvertisement()
        getuserProfile()
        // })
    }, [])

    const getuserProfile = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
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
                //console.log('daata all =>', json.data[0].is_content_manager)
                setiscontentmanager(json.data[0].is_content_manager)
            })
            .catch((err) =>
                console.log(err)
            )
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
                //console.log('getadvertisement data ===>>', json)
                if (json.success == true) {
                    setadver(json.data)
                }
            })
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                {/* <TouchableOpacity>
                    <FastImage style={styles.back} source={require('../../../assets/images/bell.png')} />
                </TouchableOpacity> */}
                {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                    <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                        <FastImage style={{ width: 20, height: 20, }} source={require('../../../assets/images/backPlain.png')} />
                    </TouchableOpacity>
                    <View style={{ width: '40%' }}>
                        <Text style={styles.name}>Gounder Kudumbam</Text>
                    </View>
                    <TouchableOpacity style={{ width: '40%' }} onPress={() => navigation.navigate('Aboutus')}>
                        <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                    </TouchableOpacity>
                </View> */}


                <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '20%' }}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/bell.png')} />
                        </TouchableOpacity>
                        <View style={{ width: '40%' }}>
                            <Text style={styles.name}>Gounder Kudumbam</Text>
                        </View>
                        <TouchableOpacity style={{ width: '40%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>


            </View>


            <View style={styles.Container}>
                <View style={styles.nameBar}>
                    <Text style={styles.wel}>WELCOME {global.uername.toUpperCase()},</Text>
                    <Text style={styles.extxt}>ID:{global.uerid}</Text>
                </View>
                <View style={styles.namebarText}>
                    <Text style={styles.extxt}>Kulam : {global.kulam}</Text>
                    <Text style={styles.extxt}>Temple:  {global.templename}</Text>
                </View>
                <View style={{
                    flex: 1,
                    marginTop: 280,
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
                </View>
                {iscontentmanager == '1' ? 
                    <View style={styles.Content}>

                        {/* <View style={styles.lastview}>
                            <View style={{ width: 20, height: 4, borderRadius: 50, backgroundColor: '#043b5a' }}></View>
                            <TouchableOpacity onPress={() => navigation.navigate('Templee')} style={{ justifyContent: 'flex-start', width: '60%' }}>
                                <Text style={styles.fnt}>Manage Temple History</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Templee')}>
                                <FastImage style={{ height: 15, width: 15 }} source={require('../../../assets/images/forward.png')} />
                            </TouchableOpacity>
                        </View> */}
                        <View style={styles.lastview}>
                            <View style={{ width: 20, height: 4, borderRadius: 50, backgroundColor: '#ebc130' }}></View>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageGallery1')} style={{ justifyContent: 'flex-start', width: '60%' }}>
                                <Text style={styles.fnt}>Manage Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageGallery1')}>
                                <FastImage style={{ height: 15, width: 15 }} source={require('../../../assets/images/forward.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lastview}>
                            <View style={{ width: 20, height: 4, borderRadius: 50, backgroundColor: '#7b221e' }}></View>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageEvent1')} style={{ justifyContent: 'flex-start', width: '60%' }}>
                                <Text style={styles.fnt}>Manage Events</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageEvent1')}>
                                <FastImage style={{ height: 15, width: 15 }} source={require('../../../assets/images/forward.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lastview}>
                            <View style={{ width: 20, height: 4, borderRadius: 50, backgroundColor: '#ebc130' }}></View>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageVideo')} style={{ justifyContent: 'flex-start', width: '60%' }}>
                                <Text style={styles.fnt}>Manage Video</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('ManageVideo')}>
                                <FastImage style={{ height: 15, width: 15 }} source={require('../../../assets/images/forward.png')} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 20 }}></View>

                    </View>
                     :
                     <View>
                         <Text style={{ textAlign: 'center', padding: 40 }}>
                            You are not admin</Text></View>} 
                <View style={{ height: 20 }}></View>

                {adver ?
                    <View style={styles.Content}>
                        {adver.map((t, index) => (
                            <View style={{ width: '100%', height: 80, alignSelf: 'center' }}>
                                <FastImage resizeMode='stretch' style={{ height: 50, width: '100%' }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                            </View>
                        ))}
                    </View>
                    : null}
            </View>
        </View>
    )
}