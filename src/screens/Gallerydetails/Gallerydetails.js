import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';


export default function Gallerydetails({ route, navigation }) {
    const [loading, setLoading] = useState(false);
    const [mainimg, setmainimg] = useState('');
    const [templatename, settemplatename] = useState('');
    const [kulamname, setkulamname] = useState('');
    const [img, setimg] = useState([])
    const [addimg, setaddimg] = useState([])

    useEffect(async () => {
        // navigation.addListener('focus', async () => {
        setLoading(true)
        const result = await AsyncStorage.getItem('logindata')
        console.log('gallerydetails page ==========')
        // //console.log(result)
        const screenData = JSON.parse(result)
        // //console.log('screenData', screenData) 

        // global.routimg = route.params.image
        // setmainimg(route.params.image.split(',')[0])
        // global.images = route.params.images
        // //console.log('global.images>>', route.params)

        addimg.push(route.params.image, route.params.images)
        const outputArray = addimg.flatMap((element) => element.split(","));
        //console.log('have ok>>>',outputArray);
        setimg(outputArray)
        setmainimg(route.params.image.split(',')[0])

        setkulamname(route.params.kulamname);
        settemplatename(route.params.name);

        global.temhistory = route.params.history
        setLoading(false)
        // })
    }, [])

    const selectimg = (t) => {
        setmainimg(t)

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
                            <Text style={styles.wel}>
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
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Kulam: {global.kulam}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Temple: {templatename}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                </View>
                {loading ?
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null}
                <View style={{ width: '100%', height: 470, alignSelf: 'center' }}>
                    {mainimg ?
                        <FastImage resizeMode='stretch' style={{ flex: 1, width: '100%' }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + mainimg }} />
                        :
                        <FastImage resizeMode='stretch' style={{ flex: 1, width: '100%' }} source={require('../../../assets/images/noimg.jpg')} />
                    }
                </View>
                <View style={{ height: 20 }}></View>
                <View style={{ borderWidth: 0, height: 100, flex: 0, flexDirection: 'row' }}>
                    {img ?
                        <ScrollView horizontal={true} style={{ borderWidth: 0, height: 100, margin: 15 }}>
                            {img.map((t, index) => (
                                <TouchableOpacity key={index} style={styles.imgimg} onPress={() => selectimg(t)}>
                                    <FastImage resizeMode='contain' style={{ flex: 1 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + t }} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        : null}

                </View>

                <View style={{ margin: 20 }}>
                    {global.temhistory ?
                        <View>
                            <Text style={styles.name}>history</Text>
                            <Text style={{ padding: 5, fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 14 }}>{global.temhistory}</Text>
                        </View>
                        : null}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}