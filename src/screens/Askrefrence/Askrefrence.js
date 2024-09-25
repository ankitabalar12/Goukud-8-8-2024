import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';

export default function Askrefrence({ navigation }) {
    const [adver, setadver] = useState('')
    const [askref, setaskref] = useState('')
    const [loding, setLoading] = useState(false)

    useEffect(() => {
        navigation.addListener('focus', async () => {
            getaskedreference()
        })
    }, [])

    const getaskedreference = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        //console.log('user_id:', screenData.id,'temple_id:', screenData.temple,)
        fetch(global.url + 'getaskedreference', {
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
                console.log('getaskedreference data ===>>', json.data)
                if (json.success == true) {
                    setLoading(false)
                    setaskref(json.data)
                    // alert(json.message)
                } else {
                    // alert(json.message)
                }
            })
        setLoading(false)
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
                // //console.log('getadvertisement data ===>>', json)
                if (json.success == true) {
                    setadver(json.data)
                }
            })
    }

    const referenceaction = async (id, type) => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('user_id:', screenData.id)
        //console.log(id, type)
        fetch(global.url + 'referenceaction', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                status: type,
                user_id: screenData.id
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('referenceaction data ===>>', json)
                if (json.success == true) {
                    alert(json.message)
                } else {
                    alert(json.message)

                }
            })
        getaskedreference()
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

                    <View>
                        <Text style={{ color: '#22242A', fontSize: 15, fontFamily: 'Montserrat-Bold', }}>ASKED REFRENCES</Text>
                    </View>
                    <View style={{ height: 20 }}></View>

                   
                    {askref ?
                        <View>
                            {askref.map((a, index) => (
                                <TouchableOpacity style={{ flexDirection: 'row', width: '100%', padding: 6 }}>
                                    <TouchableOpacity style={{ width: '30%', alignSelf: 'center' }} onPress={() => navigation.navigate('Myprofile', { 'id': a.user_id, 'mess': a.message, 'status': a.status, 'refid': a.id })}>
                                        {a.profile_image != null ?
                                            <FastImage resizeMode="stretch" style={styles.usrpic} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + a.profile_image?.split(',')[0] }} />
                                            :
                                            <FastImage resizeMode="stretch" style={styles.usrpic} source={require('../../../assets/images/noimg.jpg')} />
                                        }
                                    </TouchableOpacity>
                                    <View style={{ width: '70%', alignSelf: 'center' }}>
                                        <Text style={{ color: 'black' }}>{a.username}</Text>
                                        <Text style={{ color: 'black' }}>{a.district}</Text>
                                        <View style={{ flexDirection: 'row' }}>
                                            {a.status == 1 ?
                                                <TouchableOpacity ><Text> Approved | </Text></TouchableOpacity>
                                                : null
                                            }
                                            {a.status == 2 ?
                                                <TouchableOpacity ><Text> Rejected | </Text></TouchableOpacity>

                                                : null
                                            }
                                            {a.status == 0 ?
                                                <View style={{ flex: 0, flexDirection: 'row', borderWidth: 0, width: '46%' }}>
                                                    <TouchableOpacity onPress={() => referenceaction(a.id, '1')}><Text> Approve | </Text></TouchableOpacity>
                                                    <TouchableOpacity onPress={() => referenceaction(a.id, '2')}><Text> Reject | </Text></TouchableOpacity>
                                                </View>
                                                :
                                                null
                                            }

                                            <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => navigation.navigate('Myprofile', { 'id': a.user_id, 'mess': a.message, 'status': a.status, 'refid': a.id })}><Text> View profile </Text></TouchableOpacity>
                                        </View>
                                    </View>
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

                        </View>}

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