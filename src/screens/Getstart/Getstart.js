import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import { onboardscreen } from '../Apicall';

export default function Getstart({ navigation }) {
  const [firsttab, setfirsttab] = useState('')
  useEffect(() => {
    // navigation.addListener('focus', async () => {
      onboardscreenss()
    // })
  }, [])

  const onboardscreenss = () => { 
    onboardscreen(global.url + 'onboardscreen').then(res => {
      //console.log('onboardscreen =>> ', res.data[0])
      setfirsttab(res.data[0])
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000c0' }}>
      <StatusBar animated={true} backgroundColor="#547694" />
      <View style={styles.container}>

      <ImageBackground source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + firsttab.image }} resizeMode="cover" blurRadius={1} style={styles.image}>
      {/* <ImageBackground source={require('../../../assets/images/Photo.png')} resizeMode="cover" blurRadius={1} style={styles.image}> */}
          <View style={styles.text}>
            <View style={{ height: 10 }}></View>
            <Text style={{
              color: '#BDC8CE',
              padding: 8,
              fontSize: 10,
              marginHorizontal: 20,
              fontFamily: 'Montserrat-SemiBold',
            }}>
              {/* Lets Connect */}
              {firsttab.text1}
            </Text>
            <Text style={{ color: '#EBC130', fontFamily: 'Montserrat-Regular', fontSize: 11, marginHorizontal: 140, }}>PRIVACY POLICY</Text>
            <Text style={styles.mainText}>{firsttab.text2}</Text>
            {/* <Text style={styles.mainText}>just search your kulam and temple</Text> */}
            <Text style={{
              color: '#ffffff',
              padding: 8,
              fontSize: 12,
              marginHorizontal: 20,
              fontFamily: 'Montserrat-SemiBold',
              marginTop: 20
            }}>
              {/* connect with your family and town. */}
              {firsttab.text3}
              </Text>
            <View style={{ height: 10 }}></View>
          </View>
          <View style={{ height: 30 }}></View>
          <View style={{ flexDirection: 'row', marginHorizontal: 20 }}>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: '#F3F3F4',
              }} />
            </View>

            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: '#F3F3F4',
              }} />
            </View>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: '#F3F3F4',
              }} />
            </View>
            <View style={{ padding: 7 }}>
              <View style={{
                width: 7,
                height: 7,
                borderRadius: 50,
                backgroundColor: '#BCAEA6',
              }} />
            </View>
          </View>
          <View style={{ height: 50 }}></View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Onnext')} style={{ width: '90%', backgroundColor: 'white', alignContent: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 40, height: 45 }}>
              <Text style={{ textAlign: 'center', color: '#22242A', fontSize: 14, fontFamily: 'Montserrat-Bold' }}>
                Get Started
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View >
    </SafeAreaView >
  );
}
