import React, { useState, useRef } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { resetNavigateTo } from '../../../NavigationHelper';

export default function Otp({ navigation, route }) {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const refs = useRef([]);
    const [otpcode, setOtpcode] = useState('');

    const otpvalue = (e) => {
        setOtpcode(e)
    }


    const handleOtpChange = (value, index) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value.length === 1 && index < otp.length - 1) {
            refs.current[index + 1].focus();
        }

    };

    const getOtpBoxStyle = (index) => {
        if (otp[index].length > 0) {
            return styles.filledOtpBox;
        }
        return styles.otpBox;
    };

    const loginn = () => {
        const user_id = route.params
        console.log(user_id)
        console.log('newotp===> ', otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5])
        // for (var i = 0; i < otp.length; i++) {
        //     global.otps = otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5]
        // }
        // console.log('otpss===>> ', global.otps)

        fetch(global.url + 'verifyotp', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user_id,
                otp: otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5]
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('res====>>', json)
                if (json.success == true) {
                    // navigation.navigate('Login')
                    resetNavigateTo(navigation, 'Home');
                } else {
                    alert(json.message)
                }
               
            })


    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#043b5a' }}>
            <StatusBar animated={true} backgroundColor="#043b5a" />
            <ScrollView>
                <View style={{ backgroundColor: '#043b5a' }}>

                    <View>
                        <View style={{ height: 20 }}></View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FastImage style={styles.arrow} source={require('../../../assets/images/back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ margin: 26 }}>
                        <View style={{ height: 90 }}></View>
                        <Text style={{ color: 'white', fontFamily: 'BebasNeue-Regular', fontSize: 28 }}>Otp</Text>
                        <View style={{ height: 20 }}>
                        </View>
                        <View>
                            <Text style={styles.textInput}>
                                Check Your SMS Verifywith OTP
                            </Text>
                        </View>
                        {/* <View style={{ flexDirection: 'row', marginTop: '5%', width: '100%', justifyContent: "center" }}>
                            <OTPTextInput defaultValue={otpcode}
                                borderWidth={2} inputCount={6}
                                // style={styles.otpInput}
                                style={[styles.otpInput, otpcode && styles.filledInput]}
                                handleTextChange={otpvalue}
                                tintColor={'#6cbfc4'}
                                secureTextEntry={true}
                                autoFocusOnLoad={true}
                            />
                        </View> */}
                        <View style={{ flexDirection: 'row', marginTop: '5%', width: '100%', justifyContent: "center" }}>
                            <View style={styles.otpContainer}>
                                {otp.map((digit, index) => (
                                    <TextInput
                                        key={index}
                                        style={[styles.otpInput, getOtpBoxStyle(index)]}
                                        value={digit}
                                        onChangeText={(value) => handleOtpChange(value, index)}
                                        keyboardType="numeric"
                                        maxLength={1}
                                        ref={(input) => (refs.current[index] = input)}
                                    />
                                ))}
                            </View>
                        </View>
                        <View style={{ height: 90 }}></View>
                        <View>
                            <TouchableOpacity onPress={() => loginn()} style={{ width: '100%', backgroundColor: 'white', alignContent: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 40, height: 45 }}>
                                <Text style={{ textAlign: 'center', color: '#22242A', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 10 }}></View>

                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}