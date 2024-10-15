import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react';
import { StatusBar } from 'react-native'

import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native'
import OTPTextInput from 'react-native-otp-textinput';
import { styles } from './styles'
const VerifyPasswordOtp = ({ navigation,route }) => {

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('');
 // const [otp, setOtp] = useState('');
  // const [mobileNumber, setMobileNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const refs = useRef([]);
  const mobileNumber = route?.params?.mobileNumber
  console.log('mobileNumber ====> ', mobileNumber)
  const handleOTPChange = (code) => {
    setOtp(code);
    // if (code.length === 4) {
    //     setBackgroundColor('#02487C');
    // } else {
    //     setBackgroundColor('#CECECE');
    // }

};


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


const verifyPasswordUser = async () => {
  setSubmitted(true);
  
  console.log('mobileNumber:', mobileNumber);
  console.log('otp:', otp);

  if (mobileNumber !== '' && otp !== '') {
    try {
      console.log(global.url + 'verifyotpforgotpassword');
      
      const response = await fetch(global.url + 'verifyotpforgotpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: mobileNumber,
          otp: otp[0] + otp[1] + otp[2] + otp[3] + otp[4] + otp[5]
        }),
      });

      const json = await response.json();
      console.log(json);

      if (response.ok && json.success) {
        const userId = json.data[0].id;  // Assuming the response contains the id as part of the data array
console.log('userId-----------',userId)
        Alert.alert(
          'Success',
          'Password reset instructions have been sent to your Mobile Number.',
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate to 'ChangepasswordScreen' and pass the user id as a parameter
                navigation.navigate('ChangepasswordScreen', { userId });
              }
            }
          ]
        );
      } else {
        Alert.alert('Error', json.ResponseMsg || 'Failed to verify OTP.');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  } else {
    Alert.alert('Error', 'Please enter both your mobile number and OTP.');
  }
};


return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#043b5a' }}>
      <StatusBar animated={true} backgroundColor="#043b5a" />
      <View style={styles.head}>
        <View style={{ height: 20 }}></View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {/* <FastImage style={styles.arrow} source={require('../../../assets/images/back.png')} /> */}
        </TouchableOpacity>
      </View>
      <View style={{ height: 90 }}></View>
      <Text style={styles.login}>Verify Otp</Text>
      <View style={{ height: 20 }}>
      </View>
      {loading ?
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="#1976d2" animating={loading} />
        </View>
        : null}

      {/* <View style={styles.showinput}>
        <Text style={styles.mobitexttext}>{mobileNumber}</Text>
        {/* <Image style={[styles.icon]} source={require('../../../assets/images/phonecall.png')} /> */}
        {/* <TextInput
          onChangeText={(value) => setMobileNumber(value)}
          value={mobileNumber}

          style={styles.textInput}
          placeholder="Enter your Mobile Number"
          placeholderTextColor="#FFFFFF"
        /> */}
      {/* </View> */} 
      {/* {email === '' && submitted ? <Text style={styles.validate}>Please Enter Mobile </Text> : null} */}
      {/* {mobileNumber === '' && submitted && (
        <Text style={styles.validate}>Please Enter Your Mobile Number</Text>
      )} */} 

      {/* <OTPTextInput
        containerStyle={[styles.otpContainer]}

        textInputStyle={[styles.otpInput, { color: '#000' }]}
        handleTextChange={(code) => handleOTPChange(code)}
        length={3}
        inactiveInputStyle={styles.otpInput2}
        keyboardType="numeric"
      /> */}

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


      <View>
        <TouchableOpacity onPress={() => {
          verifyPasswordUser()
        }
        } style={styles.subbtn}>
          <Text style={styles.suntxt}>
            Save
          </Text>
        </TouchableOpacity>
      
      </View>

    </SafeAreaView>
  )
}

export default VerifyPasswordOtp

