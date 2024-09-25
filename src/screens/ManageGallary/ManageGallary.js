import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, PermissionsAndroid } from 'react-native'
import FastImage from 'react-native-fast-image';
import { styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ManageGallary({ navigation }) {


    const [name, setname] = useState('')
    const [userid, setuserid] = useState('')
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')
    const [img6, setImg6] = useState('')
    const [loading, setLoading] = useState('');
    const [temp, settemp] = useState('')
    useEffect(async () => {
        // navigation.addListener('focus', async () => {
        const result = await AsyncStorage.getItem('logindata')
        //console.log(result)
        console.log('manage gallery page =========')
        const screenData = JSON.parse(result)
        //console.log('screenData', screenData)
        setuserid(screenData.id)
        settemp(screenData.temple)

        // })
    }, [])

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
                onPress: () => requestGalleryPermission(id),
            },
        ]);
        setLoading(false);
    }

    
    const openCamera = async (id) => {
        try {
           
            let options = {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 500,
                maxWidth: 500,
            };
    
            // Launch the camera and handle the response
            launchCamera(options, async (response) => {
                if (!response.didCancel) {
                    try {
                        setLoading(true); // Start loading indicator
    
                        let includeBase64 = response.assets[0].base64;
    
                        // Make an API call to upload the image
                        const res = await fetch(global.url + 'uploadimage', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                base64: 'data:image/jpeg;base64,' + includeBase64,
                            }),
                        });
    
                        // Parse the response from the API
                        const json = await res.json();
    
                        // Check if the upload was successful
                        if (json.success) {
                            let userpic = json.data;
    
                            // Update the image based on the ID
                            switch (id) {
                                case '1':
                                    setImg1(userpic);
                                    break;
                                case '2':
                                    setImg2(userpic);
                                    break;
                                case '3':
                                    setImg3(userpic);
                                    break;
                                case '4':
                                    setImg4(userpic);
                                    break;
                                case '5':
                                    setImg5(userpic);
                                    break;
                                case '6':
                                    setImg6(userpic);
                                    break;
                                default:
                                    break;
                            }
                        }
                    } catch (error) {
                        // Handle errors that occur during the API call
                        console.error('Error uploading image:', error);
                    } finally {
                        // Always stop the loading indicator, even if there was an error
                        setLoading(false);
                    }
                }
            });
        } catch (error) {
             setLoading(false);
            console.error('Error launching camera:', error);
        }
    };
  
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

        let options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: 500,
            maxWidth: 500,
        }
        launchImageLibrary(options, response => {
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
                            if (id == '4') {
                                let userpic = json.data;
                                setImg4(userpic)
                            }
                            if (id == '5') {
                                let userpic = json.data;
                                setImg5(userpic)
                            }
                            if (id == '6') {
                                let userpic = json.data;
                                setImg6(userpic)
                            }
                            setLoading(false)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        //console.log(err)
                    })
                setLoading(false)
            }
        })
    };
   
    const requestGalleryPermission = async (id) => {
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

    const added = () => {
        //console.log('------------- ', userid)
        const upimg = []
        if (img1) {
            upimg.push(img1)
        }
        console.log('upimg => ', upimg)
        const downimg = []
        if (img2) {
            downimg.push(img2)
        }
        if (img3) {
            downimg.push(img3)
        }
        if (img4) {
            downimg.push(img4)
        }
        if (img5) {
            downimg.push(img5)
        }
        if (img6) {
            downimg.push(img6)
        }
        console.log('downimg => ', downimg)

        //console.log('useriduseriduserid==> ', userid)
        if (name != '' && img1 != '' && img4 != '') {
            fetch(global.url + 'addgallery', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    image: upimg.toString(),
                    images: downimg.toString(),
                    user_id: userid,
                    temple: temp
                })
            })
                .then((res) => res.json())
                .then(async (json) => {
                    console.log('addgallery data ===>>', json)
                    if (json.success == true) {
                        // Alert.alert(json.message)
                        Alert.alert(
                            json.message,
                            '',
                            [
                              {
                                text: 'OK',
                                onPress: () => navigation.navigate('ManageGallery1'), 
                              },
                            ]
                          );
                    } else {
                        Alert.alert(json.message)
                    }
                    setLoading(false)
                })
        } else {
            Alert.alert('Please fill up all details..')
        }
    }
    return (
        <View style={styles.mainContainer}>

            <View style={{ flexDirection: 'row', width: '100%' }}>
                <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                    <FastImage style={{ width: 20, height: 20, }} source={require('../../../assets/images/backPlain.png')} />
                </TouchableOpacity>
                <View style={{ width: '60%' }}>
                    <Text style={styles.headerText}> Manage Gallery</Text>
                </View>
                <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                    <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                </TouchableOpacity>
            </View>

            <View style={styles.Container}>
                <View style={styles.viewsize}>
                    <View style={{ width: 2, height: 20, backgroundColor: '#6478d3' }}></View>
                    <TextInput onChangeText={(value) => setname(value)} value={name} placeholder="Add gallery title" placeholderTextColor={'black'} style={styles.inputHistory} />
                </View>

            </View>
            <View style={styles.add}>
                <TouchableOpacity style={styles.addImage}>
                    <Text style={styles.viewadd}>Add gallery album image</Text>
                    <FastImage style={styles.back} source={require('../../../assets/images/dslr.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.photos}>
                        <View style={styles.viewimg}>
                            {/* <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} /> */}
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
                </View>
            </View>
            <View style={styles.line}></View>
            <View style={styles.add}>
                <TouchableOpacity style={styles.addImage}>
                    <Text style={styles.viewadd}>Add gallery main image </Text>
                    <FastImage style={styles.back} source={require('../../../assets/images/dslr.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.photos}>
                        <View style={styles.viewimg}>
                            <TouchableOpacity onPress={() => selectimage('4')}>
                                {img4 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,

                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img4 }} />
                                        <TouchableOpacity onPress={() => setImg4('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectimage('5')}>
                                {img5 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,

                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img5 }} />
                                        <TouchableOpacity onPress={() => setImg5('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => selectimage('6')}>
                                {img6 != '' ?
                                    <View>
                                        <FastImage style={{
                                            height: 70,
                                            width: 70,
                                            margin: 10,
                                            borderRadius: 5,

                                        }} resizeMode="stretch" source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + img6 }} />
                                        <TouchableOpacity onPress={() => setImg6('')} style={{ fontFamily: 'DancingScript-Bold', position: 'absolute', color: 'white', fontSize: 24, marginHorizontal: 65, height: 18, width: 18, }} >
                                            <FastImage style={{ height: 18, width: 18, }} source={require('../../../assets/images/remove.png')} />
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    // null
                                    <FastImage style={styles.image} source={require('../../../assets/images/dslr.png')} />
                                }
                            </TouchableOpacity>
                            {/* <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} /> */}
                        </View>
                    </View>
                    <TouchableOpacity style={{ width: '20%', alignItems: 'center' }}>
                        <FastImage style={styles.send} source={require('../../../assets/images/send.png')} />
                    </TouchableOpacity>
                </View>
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