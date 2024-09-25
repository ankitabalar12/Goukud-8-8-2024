import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid, ActivityIndicator } from 'react-native'
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';

export default function ManageHistory({ navigation }) {
    var ImagePicker = require('react-native-image-picker');
    const [description, setdescription] = useState('')
    const [link, setlink] = useState('')
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [Count, setCount] = useState(1)
    const [loading, setLoading] = useState('');
    const [submitted, setsubmitted] = useState(false);

    function selectimage(id) {
        setLoading(true);
        Alert.alert("Alert", "Choose an option", [
            {
                text: 'Back',
                onPress: () => { },
            },
            {
                text: 'Camera',
                onPress: () => requestCameraPermission(id),
            },
            {
                text: 'Library',
                onPress: () => requestGelleryPermission(id),
            },
        ]);
        setLoading(false);
    }

    const openCamera = (id) => {
        //console.log('id => ', id)

        var options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: 500,
            maxWidth: 500,
            cameraType: 'back'
        }
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel !== true) {
                let includeBase64 = response.assets[0].base64;
                //console.log('response===> ', 'data:image/jpeg;base64,', includeBase64)
                fetch(global.url + 'uploadimage',
                    {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            base64: 'data:image/jpeg;base64,' + includeBase64
                        }),
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        //console.log('=============================>>>>>> ', json)
                        if (json.success == true) {
                            if (id == '1') {
                                let userpic = json.data;
                                setImg1(userpic);
                                //console.log('userpic=>> ', userpic)
                            }
                            if (id == '2') {
                                let userpic = json.data;
                                setImg2(userpic)
                            }
                            if (id == '3') {
                                let userpic = json.data;
                                setImg3(userpic)
                            }
                            setLoading(false)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        //console.log(err)
                    })
            }
        },
        )
    }

    const requestCameraPermission = async (id) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //console.log("Camera permission given");
                openCamera(id)
            } else {
                //console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
    const openLibrary = async (id) => {

        var options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: 500,
            maxWidth: 500,
        }
        ImagePicker.launchImageLibrary(options, response => {
            //console.log('response==>> ',response.didCancel)
            if (response.didCancel !== true) {
                let includeBase64 = response.assets[0].base64;
                setLoading(true)
                fetch(global.url + 'uploadimage',
                    {
                        method: 'post',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            base64: 'data:image/jpeg;base64,' + includeBase64
                        }),
                    })
                    .then((res) => res.json())
                    .then((json) => {
                        //console.log(json)
                        if (json.success == true) {
                            if (id == '1') {
                                let userpic = json.data;
                                setImg1(userpic);
                                console.log('userpic=>> ', userpic)
                            }
                            if (id == '2') {
                                let userpic = json.data;
                                setImg2(userpic)
                            }
                            if (id == '3') {
                                let userpic = json.data;
                                setImg3(userpic)
                            }
                            setLoading(false)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        //console.log(err)
                    })
            }
        })

    };
    const requestGelleryPermission = async (id) => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "App Library Permission",
                    message: "App needs access to your photos",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openLibrary(id);
            } else {
                console.log("Gallery permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const addImage = () => {
        if (Count > 3) {
            //console.log('111111111111111111111111111')
        } else {
            setCount(Count + 1)
            //console.log('countss=>> ', Count)
            selectimage(Count)
        }
    }
    const added = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setsubmitted(true)
        const upimg = []
        if (img1) {
            upimg.push(img1)
        }
        if (img2) {
            upimg.push(img2)
        }
        if (img3) {
            upimg.push(img3)
        }
        console.log(upimg)

        setLoading(true)
        fetch(global.url + 'addtemplehistory', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                template_id: screenData.temple,
                templehistory: description,
                images: upimg.toString(),
                youtube_link: link
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('addtemplehistory data ===>>', json)
                if (json.success == true) {
                    alert(json.message)
                } else {
                    alert(json.message)
                }
                setLoading(false)
            })

    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ height: 30 }}></View>
            <View style={{ flexDirection: 'row', width: '98%', margin: 10 }}>
                <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                    <FastImage style={{ width: 20, height: 20, }} source={require('../../../assets/images/backPlain.png')} />
                </TouchableOpacity>
                <View style={{ width: '60%' }}>
                    <Text style={styles.headerText}> Manage Temple History</Text>
                </View>
                <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                    <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                </TouchableOpacity>
            </View>

            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}

            <View style={styles.Container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.fview}></View>
                    <TextInput onChangeText={(value) => setdescription(value)} value={description} placeholder="Write temple History" placeholderTextColor={'#CDCDD7'} style={styles.inputHistory} />
                </View>
                {description === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter temple History </Text> : null}

            </View>
            <View style={styles.line}></View>
            <View style={styles.add}>
                <TouchableOpacity style={styles.addImage} onPress={addImage}>
                    <Text style={styles.addimg}>Add temple main image </Text>
                    <FastImage style={styles.back} source={require('../../../assets/images/dslr.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '20%', alignSelf: 'flex-end' }}>
                    <FastImage style={styles.send} source={require('../../../assets/images/send.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    {/* {img1 ? */}
                    <View style={styles.photos}>
                        <View style={{ height: 100, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => selectimage('1')}>
                                {img1 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,
                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img1 }} />
                                        <TouchableOpacity onPress={() => setImg1('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectimage('2')}>
                                {img2 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,

                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img2 }} />
                                        <TouchableOpacity onPress={() => setImg2('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectimage('3')}>
                                {img3 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,

                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img3 }} />
                                        <TouchableOpacity onPress={() => setImg3('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* : null} */}
                </View>


            </View>
            <View style={{ height: 20 }}></View>
            <View style={styles.add}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 2, height: 20, backgroundColor: '#6478d3' }}></View>
                    <TextInput onChangeText={(value) => setlink(value)} value={link} placeholder="youtube link" placeholderTextColor={'#CDCDD7'} style={styles.txtin} />
                </View>
                {link === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter youtube link </Text> : null}
            </View>

            <View style={{ height: 30 }}></View>
            <TouchableOpacity onPress={added}>
                <View style={styles.ask}>
                    <Text style={styles.fnttwo}>Add</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}