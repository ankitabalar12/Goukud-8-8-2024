import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { getconfig } from '../Apicall';
import HTMLView from 'react-native-htmlview';

export default function Policy({ navigation }) {
    const [policy, setpolicy] = useState('')

    useEffect(() => {
        // navigation.addListener('focus', async () => {
            getconfigdata()
        // })
    }, [])

    const getconfigdata = () => {
        getconfig(global.url + 'getconfig').then(res => {
            //console.log('getconfig =>> ', res.data[0])
            if (res.data) {
                for (var i = 0; i < res.data.length; i++) {
                    if (res.data[i].id == '1') {
                        setpolicy(res.data[i].value)
                    }
                }
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
                        <View>
                            <Text style={styles.headerText}>Privacy policy</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <HTMLView
                            value={policy}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}