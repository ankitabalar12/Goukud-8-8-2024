import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { Dropdown } from "react-native-element-dropdown";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-community/async-storage';
import { ListItem, SearchBar } from "react-native-elements";

export default function Refrence({ navigation }) {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [message, setmessage] = useState('')
    const [loding, setLoading] = useState(false)
    const [adver, setadver] = useState('')
    const [askref, setaskref] = useState('')
    const [tempdata, settempdata] = useState([])
    const [tempdatasearch, settempdatasearch] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [search, setSearch] = useState('');
    const [otheruid, setotheruid] = useState('')
    const [statedata, setstatedata] = useState([])
    const [cityvillagedata, setcityvillagedata] = useState([])
    const [districtdata, setdistrictdata] = useState([])
    const [dis, setdis] = useState('')
    const [valuecom, setValuecom] = useState('');
    const [city, setcity] = useState('')
    const [disname, setdisname] = useState('')
    const [valuecomname, setValuecomname] = useState('');
    const [cityname, setcityname] = useState('')
    const [newwisedata, setnewwisedata] = useState([])

    useEffect(async () => {
        // navigation.addListener('focus', async () => {
        const result = await AsyncStorage.getItem('logindata')
        //console.log(result)
        console.log('refrence page ======')
        const screenData = JSON.parse(result)
        //console.log('screenData.temple==> ', screenData.temple)
        getadvertisement()
        getlocation()
        gettemplemember()
        // })
    }, [])
    const gettemplemember = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('======= ', screenData.id, screenData.temple)
        setLoading(true)
        fetch(global.url + 'gettemplemember', {
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
                console.log('gettemplemember data ===>>', json)
                if (json.success == true) {
                    settempdata(json.data)
                    settempdatasearch(json.data);
                    // for (var i = 0; i < json.data.length; i++) {
                    //     if (json.data[i].is_verified == '0') {
                    //         tempdata.push(json.data[i])
                    //     }
                    //     settempdata(tempdata)
                    // }
                } else {
                    //console.log(json.message)
                }
                setLoading(false)
            })
    }
    const data = [
        { label: 'Feedback', value: '1' },
        { label: 'Bug', value: '2' },
        { label: 'Massage', value: '3' },
    ];
    const getadvertisement = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
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
                } else {

                }
                setLoading(false)
            })
    }
    const askedreference = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        console.log('otheruid=== > ', otheruid)
        console.log('askref userid ==>>>> ', screenData.id, screenData.temple)
        if (message != '') {
            setLoading(true)

            fetch(global.url + 'askedreference', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: screenData.id,
                    temple_id: screenData.temple,
                    other_user_id: otheruid,
                    message: message,

                })
            })
                .then((res) => res.json())
                .then(async (json) => {
                    console.log('askedreference data ===>>', json)
                    if (json.success == true) {
                        alert(json.message)
                        // navigation.navigate('Askrefrence')
                        navigation.navigate('Home')

                    } else {
                        alert(json.message)
                    }
                    setLoading(false)
                })
        } else {
            alert('Please enter message...')
        }

    }

    const askget = (data) => {
        //console.log('datata==> ', data.id)
        setotheruid(data.id)
        setIsModalVisible(true)
        setSelectedId(data);
    }



    const searchFunction = (text) => {
        if (text) {

           const newData = tempdatasearch.filter(function (item) {
                return (
                    item.mobile.toUpperCase().includes(text.toUpperCase()) ||
                    item.reference_member_id.toUpperCase().includes(text.toUpperCase()) ||
                    item.id.toString() === text.toString()
                );
            });

            


            settempdata(newData)
            console.log('filetr data==>>', newData)
            setSearch(text);
        } else {
            gettemplemember()
            setSearch(text);
        }

    };

    const getlocation = async () => {
        const cityvillagedata = []
        const statedata = []
        const districtdata = []
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('kulam=> ', screenData.kulam)
        fetch(global.url + 'getlocation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kullam: screenData.kulam
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getlocation  data ===>>', json)
                if (json.success == true) {
                    for (let i = 0; i < json.data.length; i++) {
                        // cityvillagedata.push({ label: json.data[i].city_village, value: json.data[i].id });
                        // statedata.push({ label: json.data[i].state, value: json.data[i].id })
                        // districtdata.push({ label: json.data[i].district, value: json.data[i].id })
                    }
                    // setstatedata(statedata)
                    // setcityvillagedata(cityvillagedata)
                    // setdistrictdata(districtdata)
                } else {
                    //console.log(json.message)
                }

            })
    }
    const getcity = async (state) => {
        const cityvillagedata = []
        setcity('')
        fetch(global.url + 'getcity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: state,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getcity getcity ===>> ', json.data)
                if (json.success == true) {
                    for (let i = 0; i < json.data.length; i++) {
                        cityvillagedata.push({ label: json.data[i].city_village, value: json.data[i].id })
                    }
                    setcityvillagedata(cityvillagedata)
                } else {

                }

            })
    }
    const searchother = () => {
        for (var k = 0; k < tempdata.length; k++) {
            if (valuecomname == tempdata[k].state && disname == tempdata[k].district && cityname == tempdata[k].village) {
                newwisedata.push(tempdata[k])
                setnewwisedata(newwisedata)
                settempdata(newwisedata)
            }
        }

        if (newwisedata == '') {
            console.log('no  newwisedata =>> ', newwisedata)
            alert('No Data Found')
            setValuecom('')
            setdis('')
            setcity('')
            gettemplemember()
        } else {
            console.log('newwisedata =>> ', newwisedata)
        }

    }

    const statdata = [
        { label: 'Andhra Pradesh', value: '1' },
        { label: 'Andaman and Nicobar Islands', value: '2' },
        { label: 'Andaman and Nicobar Islands', value: '2' },
        { label: 'Arunachal Pradesh', value: '3' },
        { label: 'Assam', value: '4' },
        { label: 'Bihar', value: '5' },
        { label: 'Chandigarh', value: '6' },
        { label: 'Chhattisgarh', value: '7' },
        { label: 'Dadar and Nagar Haveli', value: '8' },
        { label: 'Daman and Diu', value: '9' },
        { label: 'Delhi', value: '10' },
        { label: 'Lakshadweep', value: '11' },
        { label: 'Puducherry', value: '12' },
        { label: 'Goa', value: '13' },
        { label: 'Gujarat', value: '14' },
        { label: 'Haryana', value: '15' },
        { label: 'Himachal Pradesh', value: '16' },
        { label: 'Jammu and Kashmir', value: '17' },
        { label: 'Jharkhand', value: '18' },
        { label: 'Karnataka', value: '19' },
        { label: 'Kerala', value: '20' },
        { label: 'Madhya Pradesh', value: '21' },
        { label: 'Maharashtra', value: '22' },
        { label: 'Manipur', value: '23' },
        { label: 'Meghalaya', value: '24' },
        { label: 'Mizoram', value: '25' },
        { label: 'Nagaland', value: '26' },
        { label: 'Odisha', value: '27' },
        { label: 'Punjab', value: '28' },
        { label: 'Rajasthan', value: '29' },
        { label: 'Sikkim', value: '30' },
        { label: 'Tamil Nadu', value: '31' },
        { label: 'Telangana', value: '32' },
        { label: 'Tripura', value: '33' },
        { label: 'Uttar Pradesh', value: '34' },
        { label: 'Uttarakhand', value: '35' },
        { label: 'West Bengal', value: '36' },
    ];

    const getdistrict = async (city) => {
        setdis('')
        const districtdatas = []
        //console.log('city===>> ', city)
        fetch(global.url + 'getdistrict', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city_village: city,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getdistrict getdistrict ===>> ', json.data)
                if (json.success == true) {

                    for (let i = 0; i < json.data.length; i++) {
                        districtdatas.push({ label: json.data[i].district, value: json.data[i].id })
                    }
                    setdistrictdata(districtdatas)
                } else {

                }

            })
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
                    <View>
                        <Text style={{ color: '#22242A', fontSize: 22, fontFamily: 'BebasNeue-Regular' }}>FIND REFRENCES</Text>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Temple: {global.templename}</Text>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View>
                        <Text style={{ fontSize: 24, color: '#CDCDD7', fontFamily: 'BebasNeue-Regular' }}>{tempdata.length} MEMBERS FOUND</Text>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '90%' }}>
                            <SearchBar
                                searchIcon={false}
                                placeholder='Reference ID/Mobile No'
                                inputContainerStyle={{ backgroundColor: '#ffffff', borderBottomColor: '#cbcac6', borderBottomWidth: 1, width: '95%', alignSelf: 'center', color: '#cbcac6' }}
                                containerStyle={{ backgroundColor: 'transparent', color: '#cbcac6', borderBottomColor: 'transparent', borderTopColor: 'transparent', }}
                                onChangeText={(text) => searchFunction(text)}
                                value={search}></SearchBar>
                        </View>
                        <View style={{ width: '10%', alignSelf: 'center' }}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/ser.png')} />
                        </View>
                    </View>
                    <View style={{ height: 10 }}></View>
                    {/* <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '90%' }}>
                            <TextInput style={{ borderBottomWidth: 1, borderBottomColor: '#cbcac6', color: '#8D92A3', textAlign: 'center', fontSize: 14, fontFamily: 'Montserrat-Regular' }} placeholder='Pincode'></TextInput>
                        </View>
                        <View style={{ width: '10%', alignSelf: 'center' }}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/ser.png')} />
                        </View>
                    </View> */}
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '50%' }}>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={statdata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='State'
                                value={valuecom}
                                onChange={(item) => {
                                    setValuecom(item.value);
                                    setValuecomname(item.label)
                                    getcity(item.label)
                                }}
                            />
                        </View>

                        <View style={{ width: '50%' }}>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={cityvillagedata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='City/Village'
                                value={city}
                                onChange={(item) => {
                                    setcity(item.value);
                                    setcityname(item.label)
                                    getdistrict(item.label)
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>
                        <View style={{ width: '50%' }}>
                            <Dropdown
                                style={[styles.dropdown]}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={districtdata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='District'
                                value={dis}
                                onChange={(item) => {
                                    setdis(item.value);
                                    setdisname(item.label)

                                }}
                            />
                        </View>

                        <TouchableOpacity style={{ width: '50%', alignSelf: 'center' }} onPress={() => searchother()}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/ser.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 30 }}></View>
                    {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <View style={{ backgroundColor: '#ffffff', padding: 8 }}>
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        <View style={{ height: 10 }}></View>
                                        <View style={{ width: '20%' }}>
                                            {t.profile_image == null ?
                                                <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                                                :
                                                <FastImage style={styles.usrpic} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + t.profile_image }} />
                                            }
                                        </View>
                                        <View style={{ width: '50%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                            <Text style={{ color: '#22242A', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>{t.name}</Text>
                                            <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>{t.kulam_name} kulam</Text>
                                        </View>
                                        <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                            <TouchableOpacity style={styles.ask} onPress={() => askget(t)}>
                                                <Text style={styles.fnttwo}>Ask Refrence</Text>
                                            </TouchableOpacity>
                                            <View style={{ height: 15 }}></View>
                                        </View>

                                    </View>
                                </View>
                            ))}
                        </View>
                        : null}
                    {/* <View style={{ backgroundColor: '#ffffff' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ height: 10 }}></View>

                            <View style={{ width: '20%' }}>
                                <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                            </View>
                            <View style={{ width: '50%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <Text style={{ color: '#22242A', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Snehil</Text>
                                <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>Eroda</Text>
                            </View>
                            <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <TouchableOpacity style={styles.ask} onPress={() => setIsModalVisible(true)}>
                                    <Text style={styles.fnttwo}>Ask Refrence</Text>
                                </TouchableOpacity>
                                <View style={{ height: 15 }}></View>
                            </View>
                            <View style={{ height: 10 }}></View>

                        </View>
                        <View style={{ height: 20 }}></View>
                    </View>
                    <View style={{ backgroundColor: '#ffffff' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ height: 10 }}></View>

                            <View style={{ width: '20%' }}>
                                <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                            </View>
                            <View style={{ width: '50%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <Text style={{ color: '#22242A', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Snehil</Text>
                                <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>Eroda</Text>
                            </View>
                            <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <TouchableOpacity style={styles.ask} onPress={() => setIsModalVisible(true)}>
                                    <Text style={styles.fnttwo}>Ask Refrence</Text>
                                </TouchableOpacity>
                                <View style={{ height: 15 }}></View>
                            </View>
                            <View style={{ height: 10 }}></View>

                        </View>
                        <View style={{ height: 20 }}></View>
                    </View>
                    <View style={{ backgroundColor: '#ffffff' }}>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <View style={{ height: 10 }}></View>

                            <View style={{ width: '20%' }}>
                                <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                            </View>
                            <View style={{ width: '50%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <Text style={{ color: '#22242A', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>Snehil</Text>
                                <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10 }}>Eroda</Text>
                            </View>
                            <View style={{ width: '30%', borderBottomWidth: 1, borderBottomColor: '#cbcac6' }}>
                                <TouchableOpacity style={styles.ask} onPress={() => setIsModalVisible(true)}>
                                    <Text style={styles.fnttwo}>Ask Refrence</Text>
                                </TouchableOpacity>
                                <View style={{ height: 15 }}></View>
                            </View>
                            <View style={{ height: 10 }}></View>

                        </View>
                        <View style={{ height: 20 }}></View>
                    </View> */}
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
                <Modal isVisible={isModalVisible} onBackdropPress={() => setIsModalVisible(false)}>
                    <View style={{ backgroundColor: 'white', height: 300, borderRadius: 15, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                    {selectedId && (<>
                        <FastImage style={{ height: 60, width: 60, marginTop: 25 }} source={require('../../../assets/images/success.png')} />
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 14, color: '#22242A' }}>Success</Text>
                        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 12, color: '#8D92A3', textAlign: 'center', marginLeft: 20, marginRight: 20 }}>you asked reference from {selectedId.name} write something to him for remember</Text>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 25 }}>
                                <View style={styles.fview}></View>
                                <TextInput onChangeText={(value) => setmessage(value)} value={message} placeholder="Write temple History" placeholderTextColor={'#CDCDD7'} style={styles.inputHistory} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => askedreference()} style={{ width: '100%', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, backgroundColor: 'white', borderBlockColor: 'black', borderTopWidth: 0.5, height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#6478D3', fontFamily: 'Montserrat-Bold', fontSize: 11 }}>Submit</Text>
                        </TouchableOpacity>
                        </>)}
                    </View>
                
                  
                </Modal>
            </ScrollView>
        </SafeAreaView>
    )
}