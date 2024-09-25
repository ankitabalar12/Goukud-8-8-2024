import React, { useState, useRef } from 'react';
import { Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';


export default function Addminnor({ navigation }) {
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
                        <View style={{ width: '60%' }}>
                            <Text style={styles.name}>Gounder Kudumbam</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Call')} style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={[styles.wel,{ textTransform: 'uppercase'}]}>
                                WELCOME {global.uername},
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Kulam:  {global.kulam} </Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3' }}>Temple:  {global.templename}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                </View>
                <View style={{ width: '100%', height: 400, alignSelf: 'center' }}>
                    <FastImage resizeMode='stretch' style={{ flex: 1, width: '100%' }} source={require('../../../assets/images/maa.jpg')} />
                </View>
                <View style={{ height: 20 }}></View>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '34%' }}>
                        <View style={styles.boxview}>
                            <Text style={styles.fntone}>temple</Text>
                            <Text style={styles.fnttwo}>templetemple</Text>
                        </View>
                    </View>
                    <View style={{ width: '34%' }}>
                        <View style={styles.boxview}>
                            <Text style={styles.fntone}>temple</Text>
                            <Text style={styles.fnttwo}>templetemple</Text>
                        </View>
                    </View>
                    <View style={{ width: '34%' }}>
                        <View style={styles.boxview}>
                            <Text style={styles.fntone}>temple</Text>
                            <Text style={styles.fnttwo}>templetemple</Text>
                        </View>
                    </View>
                </View>
                <View style={{ height: 20 }}></View>

                <View style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={{ width: '25%', borderWidth: 0 }}>
                        <View style={styles.viewimg}>
                            <FastImage resizeMode='stretch' style={styles.comimg} source={require('../../../assets/images/maa.jpg')} />
                        </View>
                    </View>
                    <View style={{ width: '25%', borderWidth: 0 }}>
                        <View style={styles.viewimg}>
                            <FastImage resizeMode='stretch' style={styles.comimg} source={require('../../../assets/images/maa.jpg')} />
                        </View>
                    </View>
                    <View style={{ width: '25%', borderWidth: 0 }}>
                        <View style={styles.viewimg}>
                            <FastImage resizeMode='stretch' style={styles.comimg} source={require('../../../assets/images/maa.jpg')} />
                        </View>
                    </View>
                    <View style={{ width: '25%', borderWidth: 0 }}>
                        <View style={styles.viewimg}>
                            <FastImage resizeMode='stretch' style={styles.comimg} source={require('../../../assets/images/maa.jpg')} />
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}