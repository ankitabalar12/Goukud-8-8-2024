import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, ActivityIndicator } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { Dropdown } from "react-native-element-dropdown";
import { registetion, getkulam, gettemples } from '../Apicall';
import AsyncStorage from '@react-native-community/async-storage';

export default function Register({ navigation }) {
    const [valuecom, setValuecom] = useState('');
    const [kulam, setkulam] = useState('');
    const [temples, settemples] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [valtemple, setvaltemple] = useState('')
    const [submitted, setsubmitted] = useState(false);
    const [loading, setLoading] = useState();
    const [valuekulam, setValuekulam] = useState('');
    const [tempid, settempid] = useState('')
    const [kulamid, setkulamid] = useState('')
    const [password, setPassword] = useState('')

    // const pattern = /^[7-9][0-9]{10}$/;
    const pattern = /^\d{10}$/;
    const handleNumericChange = (text) => {
        const numericOnly = text.replace(/[^0-9]/g, '');
        setMobile(numericOnly);
    };

    useEffect(() => {
        // navigation.addListener('focus', async () => {
        getkulamdis()
        // gettemplesdis()
        // })
    }, [])

    const data = [
        { label: 'gounder', value: 'gounder' },
        { label: 'others', value: 'others' },
    ];


    const getkulamdis = () => {
        setLoading(true);
        fetch(global.url + 'getkulam', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            }
        }).then((res) => res.json())
            .then((json) => {
                //console.log('========= getkulam ', json)
                var count = Object.keys(json.data).length;
                global.dropDownData = [];
                for (var i = 0; i < json.data.length; i++) {
                    global.dropDownData.push({ value: json.data[i].name, label: json.data[i].name, id: json.data[i].id, });
                }
                setkulam(global.dropDownData);
                //console.log('getkulam==>> ', global.dropDownData)
            })
            .catch((err) => {
                //console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    // const getkulamdis = () => {
    //     getkulam(global.url + 'getkulam').then(res => {
    //         var count = Object.keys(res.data).length;
    //         global.dropDownData = [];
    //         for (var i = 0; i < res.data.length; i++) {
    //             global.dropDownData.push({ value: res.data[i].id, label: res.data[i].name });
    //         }
    //         setkulam(global.dropDownData);
    //         //console.log('getkulam==>> ', global.dropDownData)
    //     })

    // }
    const gettemplesdis = (id) => {
        //console.log('kulam id=>> ', id)
        setLoading(true);
        fetch(global.url + 'gettemples', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kulam_id: id
            })
        }).then((res) => res.json())
            .then((json) => {
                //console.log('========= getkulam ', json)
                var count = Object.keys(json.data).length;
                global.dropDowntemp = [];
                for (var i = 0; i < json.data.length; i++) {
                    global.dropDowntemp.push({ value: json.data[i].id, label: json.data[i].name });
                }
                settemples(global.dropDowntemp);
                //console.log('gettemples==>> ', global.dropDowntemp)
            })
            .catch((err) => {
                //console.log(err)
            })
            .finally(() => {
                setLoading(false);
            });
    }
    // const gettemplesdis = () => {
    //     getkulam(global.url + 'gettemples').then(res => {

    //         global.dropDowntemp = [];
    //         for (var i = 0; i < res.data.length; i++) {
    //             global.dropDowntemp.push({ value: res.data[i].id, label: res.data[i].name });
    //         }
    //         settemples(global.dropDowntemp);

    //         //console.log('gettemples==>> ', global.dropDowntemp)
    //     })
    // }

    const validerr = () => {
        // if (name == '') {
        //     alert('please enter name')
        //     return false
        // }
        // if (email == '') {
        //     alert('Please enter email')
        //     return false
        // }
        // if (mobile == '') {
        //     alert('Please enter mobile number')
        //     return false
        // }
        // const pattern = /^[7-9][0-9]{9}$/;
        // if (!pattern.test(mobile)) {
        //     alert('Please enter valid mobile number')
        //     return false
        // }

        // if (valuecom == '') {
        //     return false
        // }
        // if (tempid == '') {
        //     return false
        // }
        return true
    }
    const Regidone = () => {
        // //console.log(
        //     'name:', name,
        //     'email:', email,
        //     'mobile:', mobile,
        //     ' kulam:', kulamid,
        //     ' temple:', tempid,
        //     ' community:', valuecom,
        //     ' password:', 123)
        setsubmitted(true)
        if (pattern.test(mobile)) {
            // if (validerr()) {
            setLoading(true)
            fetch(global.url + 'register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    mobile: mobile,
                    community: valuecom,
                    temple: tempid,
                    kulam: kulamid,
                    password: password
                })
            })

                .then((res) => res.json())
                .then(async (json) => {
                  
                    if(json.success == true){
                        await AsyncStorage.setItem('logindata', JSON.stringify(json.data[0]));
                        navigation.navigate('Otp', json.data[0]['id'])
                    }else{
                        
                        if(json.data.email){
                            alert(json.data.email)
                        }else if(json.data.mobile){
                            alert(json.data.mobile)
                        }
                        
                    }
                    setLoading(false)
                })
            // } else {
            //     //console.log('mobile number wrong')

        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#043b5a' }}>
            <StatusBar animated={true} backgroundColor="#043b5a" />
            <ScrollView>
                <View style={{ backgroundColor: '#043b5a' }}>

                    <View style={styles.head}>
                        <View style={{ height: 20 }}></View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FastImage style={styles.arrow} source={require('../../../assets/images/back.png')} />
                        </TouchableOpacity>
                    </View>
                    {loading ?
                        <View style={styles.spinner}>
                            <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                        </View>
                        : null}
                    <View style={{ margin: 26 }}>
                        <View style={{ height: 40 }}></View>
                        <Text style={styles.regi}>REGISTER</Text>
                        <View style={{ height: 20 }}>
                        </View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <FastImage style={styles.regiimg} source={require('../../../assets/images/usr.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                <TextInput onChangeText={(value) => setName(value)} value={name} style={styles.textInput} placeholder="Name" placeholderTextColor="#FFFFFF" />
                            </View>
                        </View>
                        {name === '' && submitted ? <Text style={styles.validate}>Please Enter Name </Text> : null}
                        <View style={{ height: 20 }}></View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <Image style={styles.padlockimg2} source={require('../../../assets/images/email.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                <TextInput onChangeText={(value) => setEmail(value)} value={email} style={styles.textInput} placeholder="Email" placeholderTextColor="#FFFFFF" />
                            </View>
                        </View>
                        {email === '' && submitted ? <Text style={styles.validate}>Please Enter email </Text> : null}
                        <View style={{ height: 20 }}></View>



                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <Image style={styles.padlockimg} source={require('../../../assets/images/padlock.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                <TextInput onChangeText={(value) => setPassword(value)} value={password} style={styles.textInput} placeholder="Password" placeholderTextColor="#FFFFFF" />
                            </View>
                        </View>
                        {password === '' && submitted ? <Text style={styles.validate}>Please Enter Password </Text> : null}




                        <View style={{ height: 20 }}></View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <FastImage style={{ width: 35, height: 35, alignContent: 'center', alignItems: 'center' }} source={require('../../../assets/images/com.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                <Dropdown
                                    style={[styles.dropdown]}
                                    placeholderStyle={{ color: "#FFFFFF" }}
                                    selectedTextStyle={{ color: '#FFFFFF' }}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='Community'
                                    value={valuecom}
                                    onChange={(item) => {
                                        setValuecom(item.value);
                                    }}
                                />
                            </View>
                        </View>
                        {valuecom === '' && submitted ? <Text style={styles.validate}>Please Enter Community </Text> : null}
                        <View style={{ height: 20 }}></View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <FastImage style={{ width: 35, height: 35, alignContent: 'center', alignItems: 'center' }} source={require('../../../assets/images/sys.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                {kulam ?
                                    <Dropdown
                                        style={[styles.dropdown]}
                                        placeholderStyle={{ color: "#FFFFFF", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        selectedTextStyle={{ color: '#FFFFFF', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        iconStyle={styles.iconStyle}
                                        data={kulam}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder='Kulam'
                                        value={valuekulam}
                                        onChange={(item) => {
                                            setValuekulam(item.value);
                                            gettemplesdis(item.id)
                                            setkulamid(item.id)
                                        }}
                                    />
                                    : null}

                            </View>

                        </View>
                        {valuekulam === '' && submitted ? <Text style={styles.validate}>Please Enter Kulam </Text> : null}
                        <View style={{ height: 20 }}></View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <FastImage style={{ width: 35, height: 35, alignContent: 'center', alignItems: 'center' }} source={require('../../../assets/images/tem.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                {temples ?
                                    <Dropdown
                                        style={[styles.dropdown]}
                                        placeholderStyle={{ color: "#FFFFFF", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        selectedTextStyle={{ color: '#FFFFFF', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        iconStyle={styles.iconStyle}
                                        data={temples}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder='Temple'
                                        // value={valtemple}
                                        onChange={(item) => {
                                            setvaltemple(item.label);
                                            settempid(item.value)
                                        }}
                                    />
                                    :
                                    <View>
                                        <Text style={{ color: 'white' }}>Temple</Text>
                                    </View>
                                }

                            </View>

                        </View>
                        {valtemple === '' && submitted ? <Text style={styles.validate}>Please Enter Temple </Text> : null}

                        <View style={{ height: 20 }}></View>
                        <View style={styles.showinput}>
                            <View style={{ width: '20%' }}>
                                <View>
                                    <FastImage style={styles.phonimg} source={require('../../../assets/images/phone.png')} />
                                </View>
                            </View>
                            <View style={{ width: '80%' }}>
                                <TextInput
                                    keyboardType="numeric"
                                    maxLength={10}
                                     onChangeText={(value) => handleNumericChange(value)} value={mobile} style={styles.textInput} placeholder="Mobile" placeholderTextColor="#FFFFFF" />
                            </View>
                        </View>
                        {!pattern.test(mobile) && submitted ? <Text style={styles.validate}>Please Enter valid mobile </Text> : null}
                        {/* {mobile === '' && submitted ? <Text style={styles.validate}>Please Enter mobile </Text> : null} */}
                        <View style={{ height: 20 }}></View>
                        <View>
                            <TouchableOpacity onPress={() => Regidone()} style={styles.submit}>
                                <Text style={{ textAlign: 'center', color: '#22242A', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.logintxt}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 50 }}></View>
                        <View>
                            <Text style={{ color: '#F2E3AF', textAlign: 'center', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>
                                By Submit, You Agree Our Terms & Conditions and Privacy Policy
                            </Text>
                        </View>
                        <View style={{ height: 25 }}></View>
                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity style={{ width: '50%' }} onPress={() => navigation.navigate('Terms')}>
                                <Text style={styles.tnc}>Terms and Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '50%' }} onPress={() => navigation.navigate('Policy')}>
                                <Text style={styles.tnc}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}