import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";


export default function Myprofile({ route, navigation }) {
    const [uerinfo, setusrinfo] = useState('')
    const [mess, setmess] = useState('')
    const [status, setstatus] = useState('')
    const [kulamname, setKulamname] = useState('')
    const [profileimages, setProfileImages] = useState('')
    const [datePicker, setDatePicker] = useState(false);
    const [mobile, setmobile] = useState('')
    const [name, setName] = useState('')
    const [id, setid] = useState('')
    const [temple_name, setTemple_name] = useState('')
    const [dob, setDob] = useState('')
    const [son_of, setson_of] = useState('')
    const [highterqducation, setHighterQducation] = useState('')
    const [occupation, setOccupation] = useState('')
    const [occu_location, setoccu_location] = useState('')


    const [d_no, setD_No] = useState('')
    const [address, setAddress] = useState('')
    const [village, setVillage] = useState('')
    const [district, setDistrict] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')

    const user = route.params.user
    console.log(user)
    console.log(user.kulamname)
    console.log(user.photo)
    // useEffect(() => {
    //     // navigation.addListener('focus', async () => {


    //     //console.log('000000000=>  ', user.id)
    //     //console.log('111111111111=>  ', user.refid)
    //     // setmess(user.mess)
    //       getuserProfile(user.id);
    //     // setstatus(user.status)
    //     // setid(user.refid)
    //     // })
    // }, [])
    useEffect(() => {
        setKulamname(user.kulamname)
        setProfileImages(user.photo)
        setName(user.name)
        setTemple_name(user.temple_name)
        setmobile(user.mobile)
        setDob(user.dob)
        setson_of(user.son_of)
        setHighterQducation(user.higher_education)
        setOccupation(user.occupation)
        setoccu_location(user.occu_location)
        setD_No(user.d_no)
        setAddress(user.address)
        setCountry(user.country)
        setVillage(user.village)
        setDistrict(user.district)
        setState(user.state)
        console.log(user.kulamname)
        getuserProfile();
    }, []);

    const getuserProfile = async () => {
        try {
            const response = await fetch(global.url + 'getuserprofile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user,
                }),
            });

            const json = await response.json();


            console.log('Full JSON Response:', json);


            setusrinfo(json.data);
            console.log('User Data:', json.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const getaskedreference = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)

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

            })
        setLoading(false)
        getadvertisement()
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
                    navigation.navigate('Askrefrence')
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
                    <View style={{ height: 20 }}></View>
                    <Text style={{ color: '#22242A', fontFamily: 'BebasNeue-Regular', fontSize: 22 }}>PROFILE</Text>
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity style={{ alignSelf: 'center' }}>

                        {profileimages ?
                            <View style={{ width: 150, height: 150, borderRadius: 100 }}>
                                <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 100 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + profileimages }} />
                            </View>
                            :
                            <View style={{ backgroundColor: '#e5d3d2', width: 150, height: 150, borderRadius: 100 }}>
                                <FastImage style={styles.came} source={require('../../../assets/images/noimg.jpg')} />
                            </View>
                        }
                    </TouchableOpacity>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ width: '60%' }}>
                                <Text style={{ marginTop: 6, marginBottom: 7, color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Basic Info</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Name: {name}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Kulam: {kulamname}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Temple: {temple_name}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Mobile: {mobile}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>DOB: {dob}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>S/O: {son_of}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <Text style={{ marginTop: 6, marginBottom: 7, color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Business Info</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Highter Education: {highterqducation}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Occupation:{occupation}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Occupation Location:{occu_location}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <Text style={{ marginTop: 6, marginBottom: 7, color: 'black', color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Address Info</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>D/No:{d_no}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Address:{address}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Village/City: {village}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>District : {district}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>State: {state}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Country: {country}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <Text style={{ marginTop: 6, marginBottom: 7, color: 'black', color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Remember write up</Text>
                        {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Hi Uncle I am Balasubramanian son you know our family our house was in near to temple.
                        </Text> */}
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>{mess}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    {status == 1 ?
                        <View>
                            <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Approved
                            </Text>
                        </View> : null
                    }
                    {status == 2 ?
                        <View>
                            <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Rejected
                            </Text>
                        </View>
                        : null}
                    {status == 0 ?
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => referenceaction(id, '1')}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Approve |</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => referenceaction(id, '2')}>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}> Reject
                                </Text>
                            </TouchableOpacity>
                        </View> : null
                    }

                    <View style={{ height: 20 }}></View>

                    <View style={{ height: 20 }}></View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}