import React, { useState, useEffect } from 'react';
import { Image, Alert, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, PermissionsAndroid, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function ManageEvent({ navigation }) {

    const [name, setname] = useState('')
    const [userid, setuserid] = useState()
    const [datetime, setdatetime] = useState('')
    const [description, setdescription] = useState('')
    const [temple, settemple] = useState('')
    const [date, setDate] = useState(new Date());
    const [datechk, setdatechk] = useState('')
    const [timechk, settimechk] = useState('')
    const [datePicker, setDatePicker] = useState(false);
    const [show, setShow] = useState(false);
    const [img1, setImg1] = useState('');
    const [img2, setImg2] = useState('');
    const [submitted, setsubmitted] = useState(false);

    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('')
    const [img5, setImg5] = useState('')
    const [img6, setImg6] = useState('')
    const [loading, setLoading] = useState('');
    const [time1, settime1] = useState('')

    const [selectedTime, setSelectedTime] = useState(new Date());
    useEffect(async () => {
        // navigation.addListener('focus', async () => {
            
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
       
       
        setuserid(screenData.id)

        // })
    }, [])

    // const added = async () => {
    //     console.log('============/=>>> ', date)
    //     const result = await AsyncStorage.getItem('logindata')
    //     const screenData = JSON.parse(result)
    //     setsubmitted(true)
    //     const upimg = []
    //     if (img1) {
    //         upimg.push(img1)
    //     }
    //     if (img2) {
    //         upimg.push(img2)
    //     }
    //     if (img3) {
    //         upimg.push(img3)
    //     }
    //     console.log('addevent upimg => ', upimg)

    //     const downimg = []
    //     if (img4) {
    //         downimg.push(img4)
    //     }
    //     if (img5) {
    //         downimg.push(img5)
    //     }
    //     if (img6) {
    //         downimg.push(img6)
    //     }
    //     console.log('addevent downimg => ', downimg)


    //     var strSplitDate = String(date).split(' ');
    //     var dates = new Date(strSplitDate[0]);
    //     var dd = date.getDate();
    //     var mm = date.getMonth() + 1;
    //     var yyyy = date.getFullYear();
    //     var conformdate = yyyy + '-' + mm + '-' + dd
    //     console.log('conformdate ==>> ', conformdate)
    //     //console.log(time1)
    //     fetch(global.url + 'addevent', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             name: name,
    //             date_time: conformdate + ' ' + time1,
    //             description: description,
    //             image: upimg.toString(),
    //             images: downimg.toString(),
    //             attachment: 'aaaa',
    //             temple: screenData.temple,
    //             user_id: screenData.id
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             //console.log('addevent data ===>>', json)
    //             if (json.success == true) {
    //                 Alert.alert(
    //                     json.message,
    //                     '',
    //                     [
    //                       {
    //                         text: 'OK',
    //                         onPress: () => navigation.navigate('ManageEvent1'), // Navigate on OK press
    //                       },
    //                     ]
    //                   );
    //             } else {
    //                 Alert.alert(json.message)
    //             }
    //             setLoading(false)
    //         })
    // }


    

    const added = async () => {
        console.log('============/=>>> ', date);
    
        // Get login data from AsyncStorage
        const result = await AsyncStorage.getItem('logindata');
        const screenData = JSON.parse(result);
        setsubmitted(true);
    
        // Collect images for 'upimg'
        const upimg = [];
        if (img1) {
            upimg.push(img1);
        }
        if (img2) {
            upimg.push(img2);
        }
        if (img3) {
            upimg.push(img3);
        }
        console.log('addevent upimg => ', upimg);
    
        // Collect images for 'downimg'
        const downimg = [];
        if (img4) {
            downimg.push(img4);
        }
        if (img5) {
            downimg.push(img5);
        }
        if (img6) {
            downimg.push(img6);
        }
        console.log('addevent downimg => ', downimg);
    
        // Check if all required fields are filled
        if (!name || !date || !time1 || !description || upimg.length === 0 || downimg.length === 0) {
            Alert.alert('Please fill all the required fields.');
            return; // Exit the function if validation fails
        }
    
        // Format the date
        var strSplitDate = String(date).split(' ');
        var dd = date.getDate();
        var mm = date.getMonth() + 1; // January is 0, so need to add 1
        var yyyy = date.getFullYear();
        var conformdate = yyyy + '-' + mm + '-' + dd;
        console.log('conformdate ==>> ', conformdate);
    
        // Make the API call to add the event
        setLoading(true); // Show a loading indicator if needed
        fetch(global.url + 'addevent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                date_time: conformdate + ' ' + time1,
                description: description,
                image: upimg.toString(),
                images: downimg.toString(),
                attachment: 'aaaa',
                temple: screenData.temple,
                user_id: screenData.id
            }),
        })
            .then((res) => res.json())
            .then(async (json) => {
                if (json.success === true) {
                    Alert.alert(
                        json.message,
                        '',
                        [
                          {
                            text: 'OK',
                            onPress: () => navigation.navigate('ManageEvent1'), // Navigate on OK press
                          },
                        ]
                    );
                } else {
                    Alert.alert(json.message);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('An error occurred while adding the event.');
                setLoading(false);
            });
    };
    
    const onDateSelected = (event, value) => {
        setDatePicker(false);
        setDate(value);
        setdatechk(value)
    };
    const valueformatedate = (value) => {
        var month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var strSplitDate = String(value).split(' ');
        var dates = new Date(strSplitDate[0]);
        var dd = date.getDate();
        var mm = month[date.getMonth()];
        var yyyy = date.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy
        //console.log(conformdate)

        return conformdate
    }
    const showDatePicker = () => {
        setDatePicker(true);
    };
    const showtime = () => {
        setShow(true)
    }
    const onChange = (event, selectedDate) => {
        setShow(false)
        setSelectedTime(new Date(selectedDate));
        const currentDate = selectedDate;

        let str = currentDate.toLocaleTimeString();
        str = str.substring(0, str.length - 3);
        settime1(str)
        settimechk(str)
    };
    const isAM = (date) => {
        return date.getHours() < 12;
    };
    const formatTime = (date) => {
        let hour = date.getHours();
        if (hour > 12) {
            hour = hour - 12;
        }
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes.toString();
        }
        const fulltime = hour + ' : ' + minutes
        //console.log('hours==> ', fulltime)
        return fulltime
    };

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

        let options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: 500,
            maxWidth: 500,
            cameraType: 'back'
        }
        launchCamera(options, (response) => {
            console.log('response===> ', 'data:image/jpeg;base64,', response)
            if (response.didCancel !== true) {
                setLoading(true)

                


                let includeBase64 = response.assets[0].base64;
                
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
                        console.log('=============================>>>>>> ', json)
                        if (json.success == true) {
                            setLoading(false)
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
                        
                    })
                setLoading(false)

            }
        })

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
                console.log("Camera permission given");
                openCamera(id)
                
            } else {
                console.log("Camera permission denied");
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
                        console.log(json)
                        if (json.success == true) {
                            setLoading(false)
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
                        console.log(err)
                    })
                setLoading(false)
            }
        })
    };
    // const requestGelleryPermission = async (id) => {
    //     try {
    //         const granted = await PermissionsAndroid.request(
    //             PermissionsAndroid.PERMISSIONS.CAMERA,
    //             {
    //                 title: "App Library Permission",
    //                 message: "App needs access to your camera ",
    //                 buttonNeutral: "Ask Me Later",
    //                 buttonNegative: "Cancel",
    //                 buttonPositive: "OK"
    //             }
    //         );
    //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //             //console.log("Camera permission given");
    //             openLibrary(id)
    //         } else {
    //             //console.log("Camera permission denied");
    //         }
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // };
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
    return (
        <View style={styles.mainContainer}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <FastImage style={styles.back} source={require('../../../assets/images/backPlain.png')} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Manage Event
                </Text>
                <View></View>
            </View>

            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <View style={styles.Container}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.viewremove}></View>
                    <TextInput onChangeText={(value) => setname(value)} value={name} placeholder="Add event title" placeholderTextColor={'black'} style={styles.inputHistory} />
                </View>
                {name === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter name </Text> : null}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.viewremove}></View>
                    <TextInput onChangeText={(value) => setdescription(value)} value={description} placeholder="Add event details" placeholderTextColor={'black'} style={styles.inputHistory} />
                </View>
                {description === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter description </Text> : null}

            </View>
            <View style={styles.line}></View>
            <View style={styles.add}>
                <TouchableOpacity style={styles.addImage}>
                    <Text style={{ marginRight: 15, fontSize: 16, color: 'black', fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>Add event main image </Text>
                    <FastImage style={styles.back} source={require('../../../assets/images/dslr.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.photos}>
                        <View style={{ height: 100, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
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

                    <TouchableOpacity style={{ width: '20%', alignItems: 'center' }}>
                        <FastImage style={styles.send} source={require('../../../assets/images/send.png')} />
                    </TouchableOpacity>
                </View>
                {img1 === '' && submitted ? <Text style={styles.chooseUserName}>Please select image </Text> : null}
            </View>
            <View style={styles.add}>
                <TouchableOpacity style={styles.addImage}>
                    <Text style={{ marginRight: 15, fontSize: 16, color: 'black', fontFamily: 'Montserrat-Regular', fontWeight: 'bold' }}>Add event main image </Text>
                    <FastImage style={styles.back} source={require('../../../assets/images/dslr.png')} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.photos}>
                        <View style={{ height: 100, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            {/* <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} />
                            <FastImage style={styles.image} source={require('../../../assets/images/temp.jpg')} /> */}
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
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.add}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 2, height: 20, backgroundColor: '#6478d3' }}></View>
                    <TouchableOpacity onPress={showDatePicker}>
                        {datePicker
                            ?
                            <DateTimePicker
                                value={date}
                                mode={'date'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={onDateSelected}
                            />
                            :
                            <View>
                                {datechk ?
                                    <Text style={styles.txtinp}>{valueformatedate(date.toDateString())}</Text>
                                    :
                                    <Text style={styles.txtinp}>Event Date</Text>
                                }
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                {datechk === '' && submitted ? <Text style={styles.chooseUserName}>Please select date </Text> : null}

                <View style={{ height: 20 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 2, height: 20, backgroundColor: '#6478d3' }}></View>
                    <TouchableOpacity onPress={showtime}>
                        {show
                            ?
                            <DateTimePicker
                                value={date}
                                mode={'time'}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is12Hour={true}
                                onChange={onChange}
                            />
                            :
                            <View>
                                {timechk ?
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.txtintime}>{formatTime(selectedTime)}</Text>
                                        <Text style={styles.txtintime}>{isAM(selectedTime) ? 'AM' : 'PM'}</Text>
                                    </View>
                                    :
                                    <Text style={styles.txtinp}>Event Time</Text>
                                }
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                {time1 === '' && submitted ? <Text style={styles.chooseUserName}>Please select time </Text> : null}

                <View style={{ height: 20 }}></View>

                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 2, height: 20, backgroundColor: '#6478d3' }}></View>
                    <TextInput onChangeText={(value) => settemple(value)} value={temple} placeholder="Temple" placeholderTextColor={'#CDCDD7'} style={styles.txtinp} />
                </View>
                {temple === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter temple </Text> : null} */}

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