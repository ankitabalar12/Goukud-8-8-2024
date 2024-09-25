import React, { useState } from "react";
import { StatusBar, StyleSheet, View, Image, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { resetNavigateTo } from "../../../NavigationHelper";
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from "react-native-fast-image";

export default function Splash({ navigation }) {

    React.useEffect(() => {
        setTimeout(async () => {
            SplashScreen.hide();
            const result = await AsyncStorage.getItem('logindata')
            console.log(result)
            const screenData = JSON.parse(result)
            console.log('screenData', screenData)
            if (screenData) {
                navigation.navigate('Home')
            } else {
                resetNavigateTo(navigation, 'Getstart');
            }
        }, 500);
    }, []);

    return (
        <View style={styles.container}>
            <FastImage style={styles.logo} source={require('../../../assets/images/Splash.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginTop: 0,
        width: '100%',
        height: '100%',
    },
});