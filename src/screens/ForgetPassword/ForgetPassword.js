import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native'

const ForgetPassword = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    // const forgetPasswordUser = async () => {
    //     setSubmitted(true);

    //     if (!validateEmail(email)) {
    //         Alert.alert("Invalid Email", "Please enter a valid email address.");
    //         return;
    //     }

    //     setLoading(true);

    //     try {
    //         const result = await AsyncStorage.getItem('logindata');
    //         const screenData = JSON.parse(result);

    //         const response = await fetch(global.url + 'forgotpassword', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email: screenData.email }),
    //         });

    //         const json = await response.json();

    //         if (response.ok) {
    //             console.log('Response:', json);
    //             Alert.alert("Success", "Password reset instructions have been sent to your email.");
    //             navigation.navigate('Login');
    //         } else {
    //             Alert.alert("Error", json.message || "Something went wrong. Please try again.");
    //         }
    //     } catch (error) {
    //         console.error("Error:", error);
    //         Alert.alert("Error", "An error occurred. Please try again.");
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    // const forgetPasswordUser = async () => {
    //     const result = await AsyncStorage.getItem('logindata')
    //     const screenData = JSON.parse(result)
    //     //alert(screenData.id);
    //     fetch(global.url + 'forgotpassword', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             email: screenData.email,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             console.log('json=> ', json)
    //             navigation.navigate('Login')
              
    //             // //console.log('daata all =>', json.data[0].is_verified)
    //             // setRefmodel(json.data[0].is_verified)
    //         })
    //     // .catch((err) => //console.log(err))
    // }


    // const forgetPasswordUser = async () => {
    //     try {
    //         // Show loading indicator
    //         setLoading(true);
    
    //         // Retrieve user data from AsyncStorage
    //         const result = await AsyncStorage.getItem('logindata');
    //         if (!result) {
    //             Alert.alert("Error", "User data not found.");
    //             return;
    //         }
    
    //         const screenData = JSON.parse(result);
    //         const email = screenData.email;
    
      
    //         if (!email || !validateEmail(email)) {
    //             Alert.alert("Invalid Email", "Please enter a valid email address.");
    //             return;
    //         }
    
           
    //         const response = await fetch(global.url + 'forgotpassword', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ email }),
    //         });
    
           
    //         if (!response.ok) {
    //             const error = await response.json();
    //             throw new Error(error.message || 'An error occurred. Please try again.');
    //         }
    
          
    //         const json = await response.json();
    //         console.log('Response:', json);
    //         Alert.alert("Success", "Password reset instructions have been sent to your email.");
    //         navigation.navigate('Login');
    //     } catch (error) {
    //         console.error("Error:", error);
    //         Alert.alert("Error", error.message || "An error occurred. Please try again.");
    //     } finally {
    //         // Hide loading indicator
    //         setLoading(false);
    //     }
    // };
    

    const forgetPasswordUser = async () => {
        setSubmitted(true);
        console.log(mobileNumber);
    
        if (mobileNumber !== '') {
            try {
                console.log(global.url + 'forgotpassword')
                const response = await fetch(global.url + 'forgotpassword', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        mobile: mobileNumber,
                    }),
                });
    
                const json = await response.json();
                console.log(json);
    
                if (response.ok) {
                    Alert.alert(
                        'Success',
                        'Password reset instructions have been sent to your Mobile Number.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    // navigation.navigate('VerifyPasswordOtp',{});
                                    navigation.navigate('VerifyPasswordOtp', { mobileNumber });
                                    console.log('mobileNumber ---------',mobileNumber)
                                    setMobileNumber('');
                                }
                            }
                        ]
                    );
                } else {
                    const errorMsg = json.ResponseMsg || 'This mobile number is not registered.';
    
                    if (errorMsg === 'User not registered') {
                        // Show an alert if the user is not registered
                        Alert.alert('Invalid', 'This mobile number is not registered.');
                    } else {
                        // Handle other errors
                        Alert.alert('Invalid', errorMsg);
                    }
                }
            } catch (err) {
                console.log(err);
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } else {
            Alert.alert('Error', 'Please enter your email.');
        }
    };
    


    // const forgetPasswordUser = async () => {
    //     setSubmitted(true);
    //     console.log(email, mobileNumber);
    
    //     if (email !== '' || mobileNumber !== '') {
    //         try {
    //             let url = global.url + 'forgotpassword';
    //             let body;
    
    //             if (email !== '') {
    //                 // Prepare body for email
    //                 body = JSON.stringify({ email });
    //             } else if (mobileNumber !== '') {
    //                 // Prepare body for mobile number
    //                 body = JSON.stringify({ mobileNumber });
    //             }
    
    //             console.log(url);
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body,
    //             });
    
    //             const json = await response.json();
    //             console.log(json);
    
    //             if (response.ok) {
    //                 Alert.alert(
    //                     'Success',
    //                     'Password reset instructions have been sent.',
    //                     [
    //                         {
    //                             text: 'OK',
    //                             onPress: () => {
    //                                 navigation.navigate('Login');
    //                                 setEmail('');
    //                                 setMobileNumber('');
    //                             }
    //                         }
    //                     ]
    //                 );
    //             } else {
    //                 Alert.alert('Error', json.ResponseMsg);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //             Alert.alert('Error', 'Something went wrong. Please try again.');
    //         }
    //     } else {
    //         Alert.alert('Error', 'Please enter your email or mobile number.');
    //     }
    // };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#043b5a' }}>
            <StatusBar animated={true} backgroundColor="#043b5a" />
            <View style={styles.head}>
                <View style={{ height: 20 }}></View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FastImage style={styles.arrow} source={require('../../../assets/images/back.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 90 }}></View>
            <Text style={styles.login}>Forget Password</Text>
            <View style={{ height: 20 }}>
            </View>
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}

            <View style={styles.showinput}>
                <Image style={[styles.icon]} source={require('../../../assets/images/phonecall.png')} />
                <TextInput
                    onChangeText={(value) => setMobileNumber(value)}
                    value={mobileNumber}
                    keyboardType="phone-pad" 
                    style={styles.textInput}
                    placeholder="Enter your Mobile Number"
                    placeholderTextColor="#FFFFFF"
                />
            </View>
            {/* {email === '' && submitted ? <Text style={styles.validate}>Please Enter Mobile </Text> : null} */}
            {mobileNumber === '' && submitted && (
                <Text style={styles.validate}>Please Enter Your Mobile Number</Text>
            )}
            <View>
                <TouchableOpacity onPress={() => {
                    forgetPasswordUser()
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

export default ForgetPassword

