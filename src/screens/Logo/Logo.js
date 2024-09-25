import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, Linking, View, StatusBar, SafeAreaView, Button } from 'react-native';

import FastImage from 'react-native-fast-image';


export default function Logo({ navigation }) {
    const [loding, setLoading] = useState(false)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar animated={true} backgroundColor="#ffffff" />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View>
                        <View style={{ height: 20 }}></View>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <FastImage style={{
                                width: 30,
                                height: 30,
                                margin: 20
                            }} source={require('../../../assets/images/backPlain.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 150 }}></View>
                    <View style={{ alignItems: 'center', alignContent: 'center', alignSelf: 'center', flex: 1 }}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20, height: 400, width: 300 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}