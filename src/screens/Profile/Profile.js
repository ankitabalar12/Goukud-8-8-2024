import React, { useState, useEffect } from 'react';
import { Alert, ImageBackground, ScrollView, Text, TextInput, ActivityIndicator, TouchableOpacity, PermissionsAndroid, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";
import Modal from "react-native-modal";
var ImagePicker = require('react-native-image-picker');
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from "react-native-element-dropdown";

export default function Profile({ navigation }) {
    const [uerinfo, setusrinfo] = useState('')
    const [image, setImage] = useState('');
    const [insimg, setinsimg] = useState('')
    const [date, setDate] = useState(new Date());
    const [addr, setaddr] = useState('');
    const [dno, setdno] = useState('')
    const [profileimg, setProfile] = useState('');
    const [loading, setLoading] = useState(false);
    const [is_reject, setreject] = useState(false)
    const [busi, setbusi] = useState(false)
    const [occu, setoccu] = useState(false)
    const [datePicker, setDatePicker] = useState(false);
    const [mobile, setmobile] = useState('')
    const [occupation, setoccupation] = useState('')
    const [dob, setdob] = useState('')
    const [datechk, setdatechk] = useState('')
    const [isadd, setisadd] = useState(false)
    const [isdob, setisdob] = useState(false)
    const [ishedu, setishedu] = useState(false)
    const [edu, setedu] = useState('')
    const [isdno, setisdno] = useState(false)
    const [iscontentmanager, setiscontentmanager] = useState('')
    const [refby, setrefby] = useState('')
    const [refbyid, setrefbyid] = useState('')
    const [is_new, setIs_New] = useState();
    const [notificationdat, setnotificationData] = useState('')
    const [village, setvillage] = useState('')
    const [isvillage, setisvillage] = useState(false)
    const [district, setdistrict] = useState('')
    const [isdistrict, setisdistrict] = useState(false)
    const [state, setstate] = useState('')
    const [isstate, setisstate] = useState(false)
    const [country, setcountry] = useState('')
    const [iscountry, setiscountry] = useState(false)
    const [son_of, setson_of] = useState('')
    const [isson_of, setisson_of] = useState(false)
    const [refname, setrefname] = useState('')
    const [type, settype] = useState('')
    const [occu_location, setoccu_location] = useState('')
    const [isoccu_location, setisoccu_location] = useState(false)
    const [statedata, setstatedata] = useState([])
    const [cityvillagedata, setcityvillagedata] = useState([])
    const [districtdata, setdistrictdata] = useState([])
    const [dis, setdis] = useState('')
    const [valuecom, setValuecom] = useState('');
    const [city, setcity] = useState('')
    const [disname, setdisname] = useState('')
    const [valuecomname, setValuecomname] = useState('');
    const [cityname, setcityname] = useState('')
    const [contry, setcontry] = useState('')
    const [countrydata, setcountrydata] = useState([])
    const [name, setname] = useState('')
    const [askref, setaskref] = useState('')
    const [company, setCompany] = useState(null);  // Stores the selected value
    const [is_company, setIs_Company] = useState(null);  // Stores the selected value
    // const [companyLabel, setOccupationLabel] = useState('');
    const [Occupationoption, setOccupationOption] = useState('');
    const [occupationLabel, setOccupationLabel] = useState('');
    const [professionalDetail, setProfessionalDetail] = useState('');
    const [companyName, setCompanyName] = useState('');
    useEffect(() => {
        navigation.addListener('focus', async () => {
            getuserProfile();
            setLoading(true)
            getaskedreference();
            getusernotification();
        })
    }, [])
    const statdata = [
        { label: 'Andhra Pradesh', value: '1' },
        { label: 'Andaman and Nicobar Islands', value: '2' },
        { label: 'Andaman and Nicobar Islands', value: '2' },
        { label: 'Arunachal Pradesh', value: '3' },
        { label: 'Assam', value: '4' },
        { label: 'Bihar', value: '5' },
        { label: 'Chandigarh', value: '6' },
        { label: 'Chhattisgarh', value: '7' },
        { label: 'Dadar and Nagar Haveli', value: '8' },
        { label: 'Daman and Diu', value: '9' },
        { label: 'Delhi', value: '10' },
        { label: 'Lakshadweep', value: '11' },
        { label: 'Puducherry', value: '12' },
        { label: 'Goa', value: '13' },
        { label: 'Gujarat', value: '14' },
        { label: 'Haryana', value: '15' },
        { label: 'Himachal Pradesh', value: '16' },
        { label: 'Jammu and Kashmir', value: '17' },
        { label: 'Jharkhand', value: '18' },
        { label: 'Karnataka', value: '19' },
        { label: 'Kerala', value: '20' },
        { label: 'Madhya Pradesh', value: '21' },
        { label: 'Maharashtra', value: '22' },
        { label: 'Manipur', value: '23' },
        { label: 'Meghalaya', value: '24' },
        { label: 'Mizoram', value: '25' },
        { label: 'Nagaland', value: '26' },
        { label: 'Odisha', value: '27' },
        { label: 'Punjab', value: '28' },
        { label: 'Rajasthan', value: '29' },
        { label: 'Sikkim', value: '30' },
        { label: 'Tamil Nadu', value: '31' },
        { label: 'Telangana', value: '32' },
        { label: 'Tripura', value: '33' },
        { label: 'Uttar Pradesh', value: '34' },
        { label: 'Uttarakhand', value: '35' },
        { label: 'West Bengal', value: '36' },
    ];

    const Occupationlist = [
        { label: 'Agriculture', value: '1' },
        { label: 'Business', value: '2' },
        { label: 'Professional', value: '3' },
        { label: 'Employee', value: '4' },
    ];


    const getaskedreference = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        //console.log('user_id:', screenData.id,'temple_id:', screenData.temple,)
        fetch(global.url + 'getaskedreference', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
                temple_id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('getaskedreference data ===>>', json.data)
                if (json.success == true) {
                    setLoading(false)
                    setaskref(json.data.length)
                    // alert(json.message)
                    //setaskref(2)
                }

            })
        setLoading(false)
        getadvertisement()
    }


    const getuserProfile = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('screenData.id ==>> ', screenData.id)
        setLoading(true)
        fetch(global.url + 'getuserprofile', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
            }),
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('get user profile data===>>> ', json)
                setImage(json.data[0].profile_image)
                setname(json.data[0].name)
                setmobile(json.data[0].mobile)
                setProfile(json.data[0].profile_image)
                setOccupationOption(json.data[0].occupation)
                setdatechk(json.data[0].dob)
                setaddr(json.data[0].address)
                setedu(json.data[0].higher_education)
                setiscontentmanager(json.data[0].is_content_manager)
                // if (json.data[0].reference_member_id !== '0') {
                //     setrefby(json.data[0].reference_member_id)
                // }

                if (json.data[0].reference_name !== '0') {
                    setrefby(json.data[0].reference_name)
                    setrefbyid(json.data[0].id)
                    console.log('==================================', json.data[0].reference_member_id)


                }




                setdno(json.data[0].d_no)
                setcountry(json.data[0].country)
                setvillage(json.data[0].village)
                setdistrict(json.data[0].district)
                setstate(json.data[0].state)
                setson_of(json.data[0].son_of)
                setrefname(json.data[0].reference_name)
                setoccu_location(json.data[0].occu_location)
                setCompany(json.data[0].company_name)

                global.state = json.data[0].state
                global.district = json.data[0].district
                global.village = json.data[0].village
                global.country = json.data[0].country
                global.company = json.data[0].company

                if (json.data[0].type) {
                    settype(json.data[0].type)
                }

                if (json.data[0].temple_admin) {
                    settype(json.data[0].temple_admin)
                }
                // console.log('temple_admin',json.data[0].temple_admin)
                setusrinfo(json.data[0])
                setLoading(false)
            })
        // .catch((err) => //console.log(err))
        getlocation()
    }


    const getlocation = async () => {

        const cityvillagedata = []
        const statedata = []
        const districtdata = []
        const countrydata = []
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('kulam=> ', screenData.kulam)
        fetch(global.url + 'getlocation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                kullam: screenData.kulam
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getlocation  data ===>>', json)
                if (json.success == true) {

                    for (var k = 0; k < statdata.length; k++) {
                        if (global.state) {
                            if (statdata[k].label == global.state) {
                                setValuecom(statdata[k].value)
                                //console.log('state 111->> ', statdata[k])
                            }
                        }
                    }
                    for (let i = 0; i < json.data.length; i++) {
                        // if (global.state) {
                        //     if (json.data[i].state == global.state) {
                        //         setValuecom(json.data[i].id)
                        //         //console.log('state->> ', json.data[i].id)
                        //     }
                        // }

                        if (global.village) {
                            if (json.data[i].city_village == global.village) {
                                setcity(json.data[i].id)
                                //console.log('village ->> ', json.data[i].id)
                            }
                        }
                        if (global.district) {
                            if (json.data[i].district == global.district) {
                                setdis(json.data[i].id)
                                //console.log('dist ->> ', json.data[i].id)
                            }
                        }
                        if (global.country) {
                            if (json.data[i].country == global.country) {
                                setcontry(json.data[i].id)
                                //console.log('cont ->> ', json.data[i].id)
                            }
                        }

                        // const originalArray = json.data;
                        // const uniqueArray = [...new Set(originalArray)];
                        // //console.log('uniqueArray => ',uniqueArray);

                        // cityvillagedata.push({ label: json.data[i].city_village, value: json.data[i].id });
                        // statedata.push({ label: json.data[i].state, value: json.data[i].id })
                        // districtdata.push({ label: json.data[i].district, value: json.data[i].id })
                        countrydata.push({ label: json.data[i].country, value: json.data[i].id })
                    }

                    getUniqueLabels(countrydata)
                    // setstatedata(statedata)
                    // setcityvillagedata(cityvillagedata)
                    // setdistrictdata(districtdata)
                    // setcountrydata(countrydata)
                    // //console.log('country => ', countrydata)

                } else {
                    //console.log(json.message)
                }

            })

    }


    const getUniqueLabels = (dataArray) => {
        const uniqueLabels = [];
        const labelSet = new Set();

        dataArray.forEach((item) => {
            if (!labelSet.has(item.label)) {
                uniqueLabels.push({ label: item.label, value: item.value });
                labelSet.add(item.label);
            }
        });
        //console.log('uniqueLabels=> ', uniqueLabels)
        setcountrydata(uniqueLabels)
        return uniqueLabels;
    };
    const getcity = async (state) => {
        console.log('state==> ', state)
        fetch(global.url + 'getcity', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: state,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('getcity getcity ===>> ', json.data)
                if (json.success == true) {
                    for (let i = 0; i < json.data.length; i++) {
                        cityvillagedata.push({ label: json.data[i].city_village, value: json.data[i].id })
                    }
                    setcityvillagedata(cityvillagedata)
                } else {

                }

            })
    }
    const getdistrict = async (city) => {
        fetch(global.url + 'getdistrict', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                city_village: city,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('getdistrict getdistrict ===>> ', json.data)
                if (json.success == true) {
                    for (let i = 0; i < json.data.length; i++) {
                        districtdata.push({ label: json.data[i].district, value: json.data[i].id })
                    }
                    const uniqueLabels = [];
                    const labelSet = new Set();

                    districtdata.forEach((item) => {
                        if (!labelSet.has(item.label)) {
                            uniqueLabels.push({ label: item.label, value: item.value });
                            labelSet.add(item.label);
                        }
                    });

                    setdistrictdata(uniqueLabels)
                    return uniqueLabels;

                } else {

                }

            })
    }
    function logout() {
        Alert.alert("Alert", "Are you sure logout in this app", [
            {
                text: 'Yes',
                onPress: () => {
                    AsyncStorage.removeItem('logindata')
                    navigation.navigate('Login')
                },
            },
            {
                text: 'No',
                onPress: () => { },
            },

        ]);
    }


    function selectimage() {
        Alert.alert("Alert", "Choose an option", [
            {
                text: 'Back',
                onPress: () => { },
            },
            {
                text: 'Camera',
                onPress: () => requestCameraPermission(),
            },
            {
                text: 'Library',
                onPress: () => requestGalleryPermission()
            },
        ]);
    }


    const openCamera = () => {
        var options = {
            mediaType: 'photo',
            includeBase64: true,
            // quality: 1,
            maxHeight: 500,
            maxWidth: 500,
            // cameraType: 'back'
        }
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel !== true) {
                setLoading(true)
                //console.log('response', response)
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
                            let userpic = json.data;
                            // setImage(userpic);
                            setinsimg(userpic)
                            //console.log('userpic=>> ', userpic)
                            upadteall(userpic);
                            setLoading(false)
                        }
                    })
                    .catch((err) => {
                        setLoading(false)
                        //console.log(err)
                    })
                setLoading(false)
            }
        },
        )
    }

    const requestGalleryPermission = async (id) => {
        setLoading(true);
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
        setLoading(false);
    };

    const openLibrary = () => {

        var options = {
            mediaType: 'photo',
            includeBase64: true,
            quality: 1,
            maxHeight: 500,
            maxWidth: 500,
        }
        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel !== true) {
                setLoading(true);
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
                        //console.log(json)
                        if (json.success == true) {

                            let userpic = json.data;
                            // setImage(userpic);
                            setinsimg(userpic)
                            console.log('userpic=>> ', userpic)
                            upadteall(userpic);
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

    const requestCameraPermission = async (id) => {
        setLoading(true);
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
        setLoading(false);
    };
    const opnemodel = (pass) => {
        if (pass == 1) {
            setreject(true)
        }
        else if (pass == 2) {
            setbusi(true)
        }
        else if (pass == 3) {
            setoccu(true)
        }
        else if (pass == 4) {
            setisdob(true)
        }
        else if (pass == 5) {
            setisadd(true)
        }
        else if (pass == 6) {
            setishedu(true)
        }
        else if (pass == 7) {
            setisdno(true)
        }

        else if (pass == 8) {
            setisvillage(true)
        }
        else if (pass == 9) {
            setisdistrict(true)
            getdistrict(village)
        }
        else if (pass == 10) {
            setisstate(true)
        }
        else if (pass == 11) {
            setiscountry(true)
        }
        else if (pass == 12) {
            setisson_of(true)
        }
        else if (pass == 13) {
            setisoccu_location(true)
        }
        else if (pass == 14) {
            setIs_Company(true)
        }
    }


    // const upadteall = async (userpic) => {

    //     // var dd = date.getDate();
    //     // var mm = date.getMonth();
    //     // var yyyy = date.getFullYear();
    //     // var conformdate = yyyy + '-' + mm + '-' + dd
    //     // //console.log(conformdate)

    //     const result = await AsyncStorage.getItem('logindata')
    //     const screenData = JSON.parse(result)
    //     //console.log('----- >>', village, district, state, country, son_of)

    //     fetch(global.url + 'updateuserprofile', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id: screenData.id,
    //             mobile: mobile,
    //             business: '',
    //             occupation: Occupationoption,
    //             profile_image: userpic,
    //             dob: datechk,
    //             higher_education: edu,
    //             address: addr,
    //             d_no: dno,
    //             village: village,
    //             district: district,
    //             state: state,
    //             country: country,
    //             son_of: son_of,
    //             occu_location: occu_location,
    //             company_name: company

    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             if (json.success == true) {
    //                 //console.log('json==>>  ', json)
    //                 const result1 = await AsyncStorage.getItem('logindata')
    //                 const screenData = JSON.parse(result1)

    //                 const newUpdatedUserInfo = {
    //                     ...screenData,
    //                     "profile_image": userpic,
    //                     "mobile": mobile,
    //                     "address": addr,
    //                     "higher_education": edu,
    //                     "dob": datechk,
    //                     "d_no": dno,
    //                     "village": village,
    //                     "district": district,
    //                     "state": state,
    //                     "country": country,
    //                     "son_of": son_of,
    //                     "occu_location": occu_location,
    //                     "occupation": Occupationoption,
    //                     'company_name': company
    //                 };

    //                 AsyncStorage.setItem('logindata', JSON.stringify(newUpdatedUserInfo))
    //                 //console.log('newUpdatedUserInfo', newUpdatedUserInfo)
    //                 setreject(false)
    //                 setbusi(false)
    //                 setoccu(false)
    //                 setisdob(false)
    //                 setisadd(false)
    //                 setishedu(false)
    //                 setisdno(false)
    //                 setisvillage(false)
    //                 setisdistrict(false)
    //                 setisstate(false)
    //                 setiscountry(false)
    //                 setisson_of(false)
    //                 setisoccu_location(false)
    //                 setIs_Company(false)
    //             } else {
    //                 //console.log(json.message)
    //                 setLoading(false);
    //             }
    //         })
    //     // .catch((err) => //console.log(err))
    // }

    const upadteall = async (userpic) => {
        try {
            // Retrieve and parse login data from AsyncStorage
            const result = await AsyncStorage.getItem('logindata');
            const screenData = JSON.parse(result);

            // Prepare the payload for the API request
            const payload = {
                user_id: screenData.id,
                mobile: mobile,
                business: '', // Make sure to update this if needed
                occupation: Occupationoption,
                profile_image: userpic,
                dob: datechk,
                higher_education: edu,
                address: addr,
                d_no: dno,
                village: village,
                district: district,
                state: state,
                country: country,
                son_of: son_of,
                occu_location: occu_location,
                company_name: company
            };

            // Make the API request
            const response = await fetch(global.url + 'updateuserprofile', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            // Parse the response
            const json = await response.json();

            if (json.success) {
                // Retrieve and update user info in AsyncStorage
                const result1 = await AsyncStorage.getItem('logindata');
                const updatedUserInfo = JSON.parse(result1);

                const newUpdatedUserInfo = {
                    ...updatedUserInfo,
                    profile_image: userpic,
                    mobile: mobile,
                    address: addr,
                    higher_education: edu,
                    dob: datechk,
                    d_no: dno,
                    village: village,
                    district: district,
                    state: state,
                    country: country,
                    son_of: son_of,
                    occu_location: occu_location,
                    occupation: Occupationoption,
                    company_name: company
                };

                await AsyncStorage.setItem('logindata', JSON.stringify(newUpdatedUserInfo));

                // Update state to reflect successful submission
                setreject(false);
                setbusi(false);
                setoccu(false);
                setisdob(false);
                setisadd(false);
                setishedu(false);
                setisdno(false);
                setisvillage(false);
                setisdistrict(false);
                setisstate(false);
                setiscountry(false);
                setisson_of(false);
                setisoccu_location(false);
                setIs_Company(false);
            } else {
                // Handle API response errors
                setLoading(false);
                Alert.alert('Error', json.message);
            }
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error(error);
            setLoading(false);
            Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }

        // Check occupation-specific details
        if (Occupationoption === '3' && !professionalDetail) {
            Alert.alert('Error', 'Please specify your profession.');
        } else if (Occupationoption === '4' && !companyName) {
            Alert.alert('Error', 'Please specify your company name.');
        } else {
            const occupationText = Occupationoption === '3'
                ? professionalDetail
                : Occupationoption === '4'
                    ? companyName
                    : Occupationlist.find(o => o.value === Occupationoption).label;

            Alert.alert('Success', 'Occupation selected: ' + occupationText);
        }
    };

    const closemodel1 = () => {
        setreject(false)
    }
    const closemodel2 = () => {
        setbusi(false)
    }
    const closemodel3 = () => {
        setoccu(false)
    }
    const closemodel4 = () => {
        setisdob(false)
    }
    const closemodel5 = () => {
        setisadd(false)
    }
    const closemodel6 = () => {
        setishedu(false)
    }
    const closemodel7 = () => {
        setisdno(false)
    }

    const closemodel8 = () => {
        setisvillage(false)
    }
    const closemodel9 = () => {
        setisdistrict(false)
    }
    const closemodel10 = () => {
        setisstate(false)
    }
    const closemodel11 = () => {
        setiscountry(false)
    }
    const closemodel12 = () => {
        setisson_of(false)
    }
    const closemodel13 = () => {
        setisoccu_location(false)
    }
    const closemodel14 = () => {
        setIs_Company(false)
    }
    const showDatePicker = () => {
        setDatePicker(true);
    };
    const onDateSelected = (event, value) => {
        setDatePicker(false);
        //console.log('velaue datae=>> ', value)
        const x = value.getFullYear() + '-' + value.getMonth() + '-' + value.getDate()
        //console.log('x=> ', x)
        setdatechk(x)
        setDate(value);
    };
    const valueformatedate = (value) => {
        var month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var dd = date.getDate();
        var mm = month[date.getMonth()];
        var yyyy = date.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy
        //console.log(conformdate)

        return conformdate
    }

    const getusernotification = async () => {
        setLoading(true); // Start loading indicator

        try {
            const result = await AsyncStorage.getItem('logindata');
            if (result !== null) {
                const screenData = JSON.parse(result);

                const response = await fetch(global.url + 'getnotification', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: screenData.id,
                    }),
                });

                // Check if response is OK before parsing JSON
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const json = await response.json();
                console.log('json=> ', json);

                // Check if json is an object and contains user_data
                if (json && typeof json === 'object' && json.data) {
                    const count = Object.keys(json.data).length;
                    const counter = await AsyncStorage.getItem('notification');

                    if (count > counter) {
                        setIs_New(1);
                    }
                }
            } else {
                console.log('No login data found');
            }
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <StatusBar animated={true} backgroundColor="#ffffff" />
            <ScrollView>
                <View style={{ margin: 20 }}>
                    <View style={{ height: 30 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.goBack()}>
                            <FastImage style={styles.icon} source={require('../../../assets/images/backPlain.png')} />
                        </TouchableOpacity>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.name}>Gounder Kudumbam</Text>
                        </View>
                        <TouchableOpacity style={{ width: '20%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <FastImage style={styles.iconper} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + global.logo }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.pro}>PROFILE</Text>
                        </View>
                        <TouchableOpacity style={{ width: '50%' }} onPress={() => navigation.navigate('Aboutus')}>
                            <Text style={styles.abus}>About Us</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 30 }}></View>
                    <View style={styles.notificationbutton}>
                        {type !== '' ?
                            <View style={{ width: '35%' }}>
                                <TouchableOpacity style={styles.tempadd}>
                                    <Text style={styles.fnttwo}>Temple admin</Text>
                                </TouchableOpacity>
                            </View>
                            : null}

                        {/* {type === '1' ? (
                    <View style={{ width: '50%' }}>
                    <TouchableOpacity style={styles.tempadd}>
                        <Text style={styles.fnttwo}>Temple admin</Text>
                    </TouchableOpacity>
                </View>
            ) : null} */}
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('Notifictionscreen')
                        }} style={styles.notiside}>
                            <FastImage style={styles.notificationicon} source={require('../../../assets/images/notificationicon.png')} />
                            {/* {is_new == 1 && (
                                <>
                                    <View style={{ height: 5, width: 5, borderRadius: 2, position: 'absolute', right: 0, zIndex: 1, backgroundColor: '#46eb34' }}></View>
                                </>

                            )} */}
                            {is_new == 1 && (
                                <View
                                    style={{
                                        height: 5,
                                        width: 5,
                                        borderRadius: 2,
                                        position: 'absolute',
                                        right: 0,
                                        zIndex: 1,
                                        backgroundColor: '#46eb34',
                                    }}
                                />
                            )}

                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>

                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => selectimage()} value={image}>

                        {image ?
                            <View style={{ width: 140, height: 140, borderRadius: 100 }}>
                                <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 100 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + image }} />
                            </View>
                            :
                            <View>


                                {insimg ?
                                    <View style={{ width: 140, height: 140, borderRadius: 100 }}>
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 100 }} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + insimg }} />
                                        <FastImage style={{ height: 20, width: 20, position: 'absolute', marginTop: 110, marginLeft: 105, backgroundColor: '#FFFF' }} source={require('../../../assets/images/editing.png')} />
                                    </View>
                                    :
                                    <View style={{ backgroundColor: '#e5d3d2', width: 140, height: 140, borderRadius: 100, alignSelf: "center" }}>
                                        <FastImage style={styles.came} source={require('../../../assets/images/camero.png')} />
                                    </View>
                                }
                            </View>

                        }

                    </TouchableOpacity>
                    {uerinfo != '' ?
                        <View>
                            <View style={{ height: 20 }}></View>
                            <View>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <View style={{ width: '60%' }}>
                                        <Text style={{ marginTop: 6, marginBottom: 7, color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Basic Info</Text>
                                    </View>
                                    <View style={{ width: '40%', }}>
                                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>ID: {uerinfo.id}</Text>
                                    </View>
                                </View>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Name: {name}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Kulam: {global.kulam}</Text>
                                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3' }}>Temple: {global.templename}</Text>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Mobile: {mobile}</Text>
                                    {/* <TouchableOpacity onPress={() => opnemodel(2)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>   Edit</Text></TouchableOpacity> */}
                                </View>

                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>DOB: {datechk}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(4)}><Text style={{ fontSize: 12, color: '#8D92A3' }}>  Edit</Text></TouchableOpacity>
                                </View>

                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>S/O: {son_of}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(12)}><Text style={{ fontSize: 12, color: '#8D92A3' }}>  Edit</Text></TouchableOpacity>
                                </View>

                            </View>
                            <View style={{ height: 20 }}></View>
                            <View>
                                <Text style={{ marginTop: 6, marginBottom: 7, color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Business Info</Text>

                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Education: {edu}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(6)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3", }}>Occupation:{Occupationoption}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(3)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3", }}>Occupation Location:{occu_location}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(13)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Company: {company}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(14)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>    Edit</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ height: 20 }}></View>
                            <View>
                                <Text style={{ marginTop: 6, marginBottom: 7, color: 'black', color: '#22242A', fontFamily: 'Montserrat-Bold' }}>Address Info</Text>

                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>D/No: {dno}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(7)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>

                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Address: {addr}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(5)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Country: {country}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(11)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>    Edit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>State: {state}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(10)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Village/City: {village}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(8)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>     Edit</Text></TouchableOpacity>
                                </View>


                                <View style={styles.row}>
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>District: {district}</Text>
                                    <TouchableOpacity onPress={() => opnemodel(9)} style={{}}><Text style={{ fontSize: 12, color: '#8D92A3' }}>    Edit</Text></TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 20 }}></View>
                            <View>
                                <Text style={{ marginTop: 6, marginBottom: 7, color: 'black', color: '#22242A', fontFamily: 'Montserrat-Bold' }}>
                                    referred by
                                </Text>
                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>ID : {refbyid}</Text> */}
                                {/* {type === 1 ? (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Name {refname}</Text>
                                ) : (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>Name : Andavar</Text>
                                )} */}
                                {/* {(type === 1 && iscontentmanager === 1) ? (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                ) : (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {refname}
                                    </Text>
                                )} */}
                                {(type === 1 || iscontentmanager === 1) ? (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                ) : (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {refname}
                                    </Text>
                                )}


                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                    Name: {refname}
                                </Text> */}
                                {/* {type === 1 && iscontentmanager === 1 && (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                )}
                                {type === 0 && iscontentmanager === 1 && (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                )}
                                {type === 1 && iscontentmanager === 0 && (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                )}
                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {refname}
                                    </Text> */}
                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {refname}
                                    </Text> */}

                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {refname}
                                    </Text> */}


                                {/* {iscontentmanager === 1 ? (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: Andavar
                                    </Text>
                                ) : (
                                    <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}>
                                        Name: {name}
                                    </Text>

                                    
                                )} */}

                                {/* <Text style={{ fontFamily: 'Montserrat-Bold', color: "#8D92A3" }}> Name {type == 1 ? 'Andavar' : refname}</Text> */}
                            </View>
                            <View style={{ height: 20 }}></View>
                            <TouchableOpacity onPress={() => logout()}>
                                <Text style={{ marginTop: 6, marginBottom: 7, color: '#22242A', fontFamily: 'Montserrat-Bold', fontWeight: 'bold', fontSize: 18 }}>LOGOUT</Text>
                            </TouchableOpacity>

                            <View style={{ height: 30 }}></View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '50%' }}>
                                    {/* {iscontentmanager == '0' ? */}
                                    <TouchableOpacity style={styles.ask} onPress={() => navigation.navigate('Askrefrence')}>
                                        <Text style={styles.fnttwo}>Askrefrence </Text>
                                        {askref >= 1 ?
                                            <View style={{ marginTop: -26, backgroundColor: 'red', width: 20, alignSelf: 'flex-end', justifyContent: 'center', borderRadius: 50, marginRight: -15 }}>
                                                <Text style={{ color: '#FFFF', fontSize: 18, textAlign: "right", padding: 4 }}>{askref}</Text>
                                            </View> :
                                            null}
                                    </TouchableOpacity>
                                    {/* : null} */}
                                </View>
                                <View style={{ width: '50%' }}>
                                    <TouchableOpacity style={styles.ask} onPress={() => navigation.navigate('Familyprofile')}>
                                        <Text style={styles.fnttwo}>Family Profile</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ height: 20 }}></View>
                        </View>
                        :
                        <View style={{ padding: 30, height: 200 }}>
                            {loading ?
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="blue" animating={loading} />
                                </View>
                                : null}
                        </View>

                    }
                </View>
            </ScrollView>
            <View>
                <TouchableOpacity onPress={closemodel1}>
                    <Modal isVisible={is_reject}>
                        <View style={styles.models}>
                            <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel1}>
                                <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                            </TouchableOpacity>
                            <Text style={styles.mtitle}>Edit Your Mobile Number</Text>
                            <View style={{ width: '80%', borderWidth: 1 }}>
                                <TextInput onChangeText={(value) => setmobile(value)} value={mobile} style={styles.textInput} placeholder="mobile" placeholderTextColor="#FFFFFF" ></TextInput>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                                <View style={{ width: '100%' }}>
                                    <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                        <Text style={styles.btntxt2}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: '4%' }}></View>
                                <View style={{ height: 10 }}></View>

                            </View>
                        </View>
                    </Modal>
                </TouchableOpacity>
            </View>
            <View>
                <Modal isVisible={busi}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel2}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your Business information</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setmobile(value)} value={mobile} style={styles.textInput} placeholder="mobile" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={occu}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel3}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your occupation</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <Dropdown
                                style={styles.dropdownStyle}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                iconStyle={styles.iconStyle}
                                data={Occupationlist}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='Occupation'
                                value={Occupationoption}
                                onChange={(item) => {
                                    setOccupationOption(item.label);
                                    setOccupationLabel(item.value);
                                    if (item.value === '3') {
                                        setCompanyName(''); // Clear company name if switching to Professional
                                    } else if (item.value === '4') {
                                        setProfessionalDetail(''); // Clear professional detail if switching to Employee
                                    }
                                }}

                            />
                        </View>
                        {occupationLabel === '3' && (
                            <View style={{ marginVertical: 10 }}>
                                <Text>What professional do you do?</Text>
                                <TextInput
                                    value={professionalDetail}
                                    onChangeText={setProfessionalDetail}
                                    placeholder="Enter your profession"
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
                                />
                            </View>
                        )}

                        {occupationLabel === '4' && (
                            <View style={{ marginVertical: 10 }}>
                                <Text>What is your company name?</Text>
                                <TextInput
                                    value={companyName}
                                    onChangeText={setCompanyName}
                                    placeholder="Enter company name"
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
                                />
                            </View>
                        )}
                        {/* <TextInput onChangeText
                        {/* <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setoccupation(value)} value={occupation} style={styles.textInput} placeholder="occupation" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View> */}
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isdob}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel4}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your dob</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
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
                                        {/* {datechk ? */}
                                        <Text style={styles.txtinp}>{datechk}</Text>
                                        {/* // :
                                            // null
                                            // <Text style={styles.txtinp}>{date}</Text> */}
                                        {/* } */}
                                    </View>
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isadd}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel5}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your Address</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setaddr(value)} value={addr} style={styles.textInput} placeholder="Address" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={ishedu}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel6}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your Highter Education</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setedu(value)} value={edu} style={styles.textInput} placeholder="Education" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isdno}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel7}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Your D/No </Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setdno(value)} value={dno} style={styles.textInput} placeholder="d/no" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isvillage}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel8}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit Village </Text>
                        {/* <View style={{ height: 10 }}></View>
                        <Text style={{ color: 'black' }}>Your Current City/Village : {village}</Text>
                        <View style={{ height: 10 }}></View> */}

                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <Dropdown
                                style={{ margin: 5 }}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={cityvillagedata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='City/Village'
                                value={city}
                                onChange={(item) => {
                                    setcity(item.value);
                                    getdistrict(item.label)
                                    setcityname(item.label)
                                    setvillage(item.label)

                                }}
                            />
                            {/* <TextInput onChangeText={(value) => setvillage(value)} value={village} style={styles.textInput} placeholder="Village" placeholderTextColor="#FFFFFF" ></TextInput> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isdistrict}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel9}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit district </Text>
                        {/* <View style={{ height: 10 }}></View>
                        <Text style={{ color: 'black' }}>Your Current District : {district}</Text>
                        <View style={{ height: 10 }}></View> */}
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <Dropdown
                                style={{ padding: 5 }}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={districtdata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='District'
                                value={dis}
                                onChange={(item) => {
                                    setdis(item.value);
                                    setdisname(item.label)
                                    setdistrict(item.label)
                                }}
                            />
                            {/* <TextInput onChangeText={(value) => setdistrict(value)} value={district} style={styles.textInput} placeholder="district" placeholderTextColor="#FFFFFF" ></TextInput> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isstate}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel10}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit state </Text>
                        {/* <View style={{ height: 10 }}></View>
                        <Text style={{ color: 'black' }}>Your Current State : {state}</Text>
                        <View style={{ height: 10 }}></View> */}
                        <View style={{ width: '80%', borderWidth: 1 }}>

                            <Dropdown
                                style={{ padding: 5 }}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={statdata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='State'
                                value={valuecom}
                                onChange={(item) => {
                                    setValuecom(item.value);
                                    setValuecomname(item.label)
                                    setstate(item.label)
                                    setCompany(item.label)
                                    getcity(item.label)
                                }}
                            />

                            {/* <TextInput onChangeText={(value) => setstate(value)} value={state} style={styles.textInput} placeholder="state" placeholderTextColor="#FFFFFF" ></TextInput> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={iscountry}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel11}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit country </Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <Dropdown
                                style={{ padding: 5 }}
                                placeholderStyle={{ color: "#22242A", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                selectedTextStyle={{ color: '#22242A' }}
                                iconStyle={styles.iconStyle}
                                data={countrydata}
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder='Country'
                                value={contry}
                                onChange={(item) => {
                                    setcontry(item.value);
                                    setcountry(item.label)
                                }}
                            />

                            {/* <TextInput onChangeText={(value) => setcountry(value)} value={country} style={styles.textInput} placeholder="country" placeholderTextColor="#FFFFFF" ></TextInput> */}
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                <Modal isVisible={isson_of}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel12}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit S/O </Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setson_of(value)} value={son_of} style={styles.textInput} placeholder="S/O" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            <View>
                {/* <Modal isVisible={isoccu_location}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel13}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit occuption location</Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setoccu_location(value)} value={occu_location} style={styles.textInput} placeholder="occuption location" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal> */}

                <Modal isVisible={isoccu_location}>
                    <View style={styles.models}>
                        {/* Close button */}
                        <TouchableOpacity
                            style={{ height: 20, width: 20, left: '45%' }}
                            onPress={closemodel13}
                        >
                            <FastImage
                                resizeMode="stretch"
                                style={{ borderWidth: 0, flex: 1 }}
                                source={require('../../../assets/images/cancel.png')}
                            />
                        </TouchableOpacity>

                        {/* Modal title */}
                        <Text style={styles.mtitle}>Edit occupation location</Text>

                        {/* TextInput for occupation location */}
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput
                                onChangeText={(value) => setoccu_location(value)}
                                value={occu_location}
                                style={styles.textInput}
                                placeholder="Occupation location"
                                placeholderTextColor="#FFFFFF"
                            />
                        </View>

                        {/* Submit button section */}
                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Spacer between buttons, if needed */}
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>
                        </View>
                    </View>
                </Modal>

            </View>
            <View>
                <Modal isVisible={is_company}>
                    <View style={styles.models}>
                        <TouchableOpacity style={{ height: 20, width: 20, left: '45%' }} onPress={closemodel14}>
                            <FastImage resizeMode='stretch' style={{ borderWidth: 0, flex: 1 }} source={require('../../../assets/images/cancel.png')} />
                        </TouchableOpacity>
                        <Text style={styles.mtitle}>Edit company </Text>
                        <View style={{ width: '80%', borderWidth: 1 }}>
                            <TextInput onChangeText={(value) => setCompany(value)} value={company} style={styles.textInput} placeholder="occuption location" placeholderTextColor="#FFFFFF" ></TextInput>
                        </View>

                        <View style={{ flexDirection: 'row', marginTop: 20, width: '100%' }}>
                            <View style={{ width: '100%' }}>
                                <TouchableOpacity style={styles.btn2} onPress={() => upadteall()}>
                                    <Text style={styles.btntxt2}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '4%' }}></View>
                            <View style={{ height: 10 }}></View>

                        </View>
                    </View>
                </Modal>
            </View>
            {/* {
                loading ?
                    <View style={styles.spinner}>
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    </View>
                    : null
            } */}
        </SafeAreaView >
    )
}