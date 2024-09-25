import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, Alert, View, StatusBar, SafeAreaView } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { resetNavigateTo } from '../../../NavigationHelper';
import { login } from '../Apicall';
import AsyncStorage from '@react-native-community/async-storage';


export default function Login({ navigation }) {
    const [submitted, setsubmitted] = useState(false)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordVisible, setpasswordVisible] = useState(true)
    const [loading, setLoading] = useState(false);
    const [isnew, setIsNew] = useState('');
    // useEffect(async () => {
    //     // navigation.addListener('focus', async () => {
    //     const result = await AsyncStorage.getItem('logindata')
    //     //console.log(result)
    //     const screenData = JSON.parse(result)
    //     //console.log('screenData', screenData)
    //     if (screenData) {
    //         navigation.navigate('Home')
    //     }
    //     // })
    // }, [])


    // const login = () => {
    //     setsubmitted(true)
    //     if (email !== '') {

    //         setLoading(true);
    //         fetch(global.url + 'login', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 mobile: email,
    //                 password: 123,
    //             }),
    //         })
    //             .then((res) => res.json())
    //             .then(async (json) => {
    //                 //console.log('json>> _',json)
    //                 if (json.success == true) {
    //                     await AsyncStorage.setItem('logindata', JSON.stringify(json.data[0]));
    //                     setLoading(false);
    //                     setIsNew(res.data[0].is_new)
    //                     console.log('logiin idd===> ', json.data[0].id)
    //                     navigation.navigate('Otp', json.data[0].id)
    //                     if (json.data[0].is_new === 0) {
    //                         navigation.navigate('Otp', { id: json.data[0].id });
    //                     } else {
    //                         navigation.navigate('Home');
    //                     }
    //                     // resetNavigateTo(navigation, 'Home');
    //                 } else {
    //                     //console.log(json.message)
    //                     Alert.alert('Alert', 'please enter valid mobile number')
    //                     setLoading(false);
    //                 }
    //             })
    //             .catch((err) => {
    //                 //console.log(err);
    //             });
    //     }
    // }
    // const login = () => {
    //     setsubmitted(true)
    //     if (!global.token) {
    //         console.error('Token is not available.');
    //         return;
    //     }
    //     if (email !== '' && password !== '') {
    //         setLoading(true);
    //         fetch(global.url + 'login', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 mobile: email,
    //                 password: password,
    //                 device_id:global.tokenId.token
    //             }),
    //         })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             if (json.success === true) {
    //                 await AsyncStorage.setItem('logindata', JSON.stringify(json.data[0]));
    //                 setLoading(false);
    
    //                 const userId = json.data[0].id;
    //                 // const isNew = json.data[0].is_new;
    
    //                 console.log('Login ID:', userId);
    //                 if (res && res.success === true) {
    //                     // if (res.is_agency === 1) {
    //                     //     console.log('res.success----', res.success)
    //                     //       // navigation.navigate('ClientsProfiles'); 
    //                     //   } else {
    //                           navigation.navigate('Home'); 
    //                     //   }
    //                   } else {
    //                       Alert.alert('Invalid Login', 'Please check your mobile number and password.');
    //                   }
    //                 // if (isNew === 0) {
    //                 //     // Navigate to OTP screen if the user is not new
    //                 //     navigation.navigate('Otp', { id: userId });
    //                 // } else {
    //                 //     // Navigate to Home screen if the user is new
    //                 //     navigation.navigate('Home');
    //                 // }
    //             } else {
    //                 Alert.alert('Alert', 'Please enter a valid mobile number');
    //                 setLoading(false);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setLoading(false);
    //         });
    //     }
    // };
    
    const login = async () => {
        setsubmitted(true);
    
        if (!global.token) {
            console.error('Token is not available.');
            return;
        }
    
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Error', 'Email and password cannot be empty.');
            return;
        }
    
        setLoading(true);
    
        try {
            const response = await fetch(global.url + 'login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: email,
                    password: password,
                    device_id: global.tokenId.token
                }),
            });
    
            const json = await response.json();
    
            if (json.success) {
                await AsyncStorage.setItem('logindata', JSON.stringify(json.data[0]));
                setLoading(false);
    
                const userId = json.data[0].id;
                console.log('Login ID:', userId);
    
                // Navigate to Home screen
                navigation.navigate('Home');
    
            } else {
                setLoading(false);
                Alert.alert('Invalid Login', 'Please check your mobile number and password.');
            }
    
        } catch (error) {
            console.error('Login Error:', error);
            setLoading(false);
            Alert.alert('Error', 'An error occurred while trying to log in. Please try again later.');
        }
    };
    


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
                    <View style={{ margin: 26 }}>
                        <View style={{ height: 90 }}></View>
                        <Text style={styles.login}>LOGIN</Text>
                        <View style={{ height: 20 }}>
                        </View>
                        {loading ?
                            <View style={styles.spinner}>
                                <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                            </View>
                            : null}
                            
                        <View style={styles.showinput}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/phone.png')} />
                            <TextInput onChangeText={(value) => setEmail(value)} 
                            value={email}
                             keyboardType="numeric"
                            maxLength={10}
                             style={styles.textInput} placeholder="Enter your Mobile" placeholderTextColor="#FFFFFF" />
                        </View>
                        {email === '' && submitted ? <Text style={styles.validate}>Please Enter Mobile </Text> : null}
                        <View style={{ height: 5 }}></View>
                        <View style={styles.passwoedview}>
                        <FastImage style={styles.icon2} source={require('../../../assets/images/padlock.png')} /> 
                        <TextInput onChangeText={(value) => setPassword(value)} value={password} style={[styles.textInput,styles.textInputwo]} placeholder="Enter your Password" placeholderTextColor="#FFFFFF" />
                        </View>
                        <View style={styles.heightwviewstyle}></View>
                        {password === '' && submitted ? <Text style={styles.validate}>Please Enter Password </Text> : null}
                        {/* <View style={styles.showinput}>

                            <FastImage style={styles.icon2} source={require('../../../assets/images/padlock.png')} />

                            <TextInput onChangeText={(value) => setPassword(value)} value={password} style={styles.textInput} placeholder="Password" placeholderTextColor="#FFFFFF" />
                        </View>
                        {password === '' && submitted ? <Text style={styles.validate}>Please Enter Mobile </Text> : null} */}
                        <View style={{ height: 90 }}></View>
                        <View>
                            <TouchableOpacity onPress={login} style={styles.subbtn}>
                                <Text style={styles.suntxt}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 10 }}></View>
                        <View style={styles.flexrowtextline}>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'right', fontFamily: 'Montserrat-Regular' }}>Forget password ?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                <Text style={{ color: '#FFFFFF', fontSize: 14, textAlign: 'right', fontFamily: 'Montserrat-Regular' }}>New Registration</Text>
                            </TouchableOpacity>
                            
                           
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}