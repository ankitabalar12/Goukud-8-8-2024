import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { styles } from './styles'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import { ActivityIndicator } from 'react-native'

const ChangepasswordScreen = ({ navigation ,route}) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const userId = route?.params?.userId
    console.log('userId ====> ', userId)
    const handleSubmit = () => {
        // Add logic to handle password change submission
        if (password === confirmPassword) {
            Alert.alert('Success', 'Password changed successfully!');
            // Here you would typically call an API to update the password
        } else {
            Alert.alert('Error', 'Passwords do not match.');
        }
    };
    const Changepassword = async () => {
       
        setSubmitted(true);
        setLoading(true)
        if (password) {
            console.log('Password entered:', password);  
            try {
                const apiUrl = global.url + 'changepassword';
                console.log('Sending request to:', apiUrl); 
                
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: userId,
                        password: password,
                    }),
                });
    
           
                console.log('Response status:', response.status);
                const json = await response.json();
                console.log('Response JSON:', json);
    
                if (response.ok) {
                    Alert.alert(
                        'Success',
                        'Password has been reset successfully.',
                        [
                            {
                                text: 'OK',
                                onPress: () => {
                                    navigation.navigate('Login');
                                    setPassword('');  
                                    console.log('Navigating to Login screen.');  
                                }
                            }
                        ]
                    );
                } else {
                    console.log('Error response message:', json.ResponseMsg); 
                    Alert.alert('Error', json.ResponseMsg || 'Failed to reset password.');  
                }
            } catch (err) {
                console.error('Error occurred during fetch:', err);  
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } else {
            console.log('Password input is empty.');  
            Alert.alert('Error', 'Please enter your password.');  
        }
        setLoading(false)
    };
    
    
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
            <Text style={styles.login}>Change Password</Text>
            <View style={{ height: 20 }}></View>
            <View style={styles.showinput}>
                <Image style={[styles.icon]} source={require('../../../assets/images/padlock.png')} />
                <TextInput
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                    secureTextEntry={!showPassword}
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor="#FFFFFF"
                />
                <TouchableOpacity
                    style={styles.postionright}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Image
                        style={[styles.icon2]}
                        source={showPassword ? require('../../../assets/images/hide.png') : require('../../../assets/images/eye.png')}
                    />
                </TouchableOpacity>
            </View>

            {/* <View style={styles.showinput}>
                <Image style={[styles.icon]} source={require('../../../assets/images/padlock.png')} />
                <TextInput
                    onChangeText={(value) => setConfirmPassword(value)}
                    value={confirmPassword}
                    secureTextEntry={!showConfirmPassword}  // Show or hide password based on state
                    style={styles.textInput}
                    placeholder="Enter your Confirm"
                    placeholderTextColor="#FFFFFF"
                />
                <TouchableOpacity
                    style={styles.postionright}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}  // Toggle confirm password visibility
                >
                    <Image style={[styles.icon]} source={showConfirmPassword ? require('../../../assets/images/eye.png') : require('../../../assets/images/hide.png')} />
                </TouchableOpacity>
            </View> */}
            <TouchableOpacity onPress={() => {
                Changepassword()
            }
            } style={styles.subbtn}>
                <Text style={styles.suntxt}>
                    Save
                </Text>
            </TouchableOpacity>
            {loading && <ActivityIndicator size="large" color="#043b5a" />}
        </SafeAreaView>

    )
}

export default ChangepasswordScreen

