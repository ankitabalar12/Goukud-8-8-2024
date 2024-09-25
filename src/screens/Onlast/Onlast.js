import React, { useState,useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import { onboardscreen } from '../Apicall';

export default function Onlast({ navigation }) {
  const [firsttab, setfirsttab] = useState('')
  useEffect(() => {
    // navigation.addListener('focus', async () => {
      onboardscreenss()
    // })
  }, [])

  const onboardscreenss = () => {
    onboardscreen(global.url + 'onboardscreen').then(res => {
      //console.log('onboardscreen =>> ', res.data[2])
      setfirsttab(res.data[2])
    })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#141416' }}>
      <StatusBar animated={true} backgroundColor="#141416" />
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + firsttab.image }} resizeMode="cover" blurRadius={5} style={styles.image}>
          <View style={styles.text}>
            <View style={{ height: 10 }}></View>
            <Text style={{ color: '#BDC8CE', fontFamily: 'Montserrat-SemiBold', padding: 8, fontSize: 10, marginHorizontal: 20, }}>{firsttab.text1}</Text>
            <Text style={{ color: 'white', fontFamily: 'BebasNeue-Regular', fontSize: 28, marginHorizontal: 25, }}>{firsttab.text2}</Text>
            <Text style={{ color: 'white', fontFamily: 'Montserrat-SemiBold', padding: 8, fontSize: 12, marginTop: 20, marginHorizontal: 20, }}>{firsttab.text3}</Text>
            <View style={{ height: 10 }}></View>
          </View>
          <View style={{ height: 30 }}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: 'white',
              }} />
            </View>

            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: 'white',
              }} />
            </View>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: 'white',
              }} />
            </View>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 7,
                height: 7,
                borderRadius: 50,
                backgroundColor: '#959292',
              }} />
            </View>
          </View>
          <View style={{ height: 50 }}></View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ width: '90%', backgroundColor: 'white', alignContent: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 40, height: 45 }}>
              <Text style={{ textAlign: 'center', color: '#22242A', fontFamily: 'Montserrat-Bold', fontSize: 14 }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
