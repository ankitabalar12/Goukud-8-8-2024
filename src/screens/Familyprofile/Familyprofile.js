import React, { useState, useEffect } from 'react';
import { FlatList, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button, Alert } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import { Dropdown } from "react-native-element-dropdown";
import { registetion, getkulam, gettemples } from '../Apicall';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-community/async-storage';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import { ActivityIndicator } from 'react-native';

export default function Familyprofile({ navigation }) {
    const [valuecom, setValuecom] = useState('');
    const [valuecom2, setValuecom2] = useState('');
    const [adver, setadver] = useState('')
    const [add, setadd] = useState('0')
    const [add2, setadd2] = useState('0')
    const [valuekulam, setValuekulam] = useState('');
    const [kulam, setkulam] = useState('');
    const [kulams, setkulams] = useState('');
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('')
    const [name2, setname2] = useState('')
    const [datechk, setdatechk] = useState('')
    const [occuption, setOccupation] = useState('')
    const [occuption2, setoccuption2] = useState()
    const [userid, setuserid] = useState('')
    const [member, setmember] = useState()
    const [loging, setLoading] = useState()
    const [submitted, setsubmitted] = useState(false);
    const [kulamname, setkulamname] = useState('')
    const [relationname, setrelationname] = useState('')
    const [relationname2, setrelationname2] = useState('')
    const [visibleId, setVisibleId] = useState(null);
    const [relation, setRelation] = useState('');
    const [pass_id, setPass_Id] = useState('');

    // Function to toggle visibility


    useEffect(async () => {
        // navigation.addListener('focus', async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setuserid(screenData.id)
        getmember(screenData.id)
        getkulamdis()
        // //console.log('----------- ', screenData.id)
        getadvertisement()

        // })
    }, [])
    const toggleVisibility = (item) => {
        
        setRelation(item.relation);
        setName(item.name);
        setOccupation(item.occupation);
        setValuecom(item.relation)
        //setkulams(item.kulam);
      
        const kulamValue = typeof item.kulam === 'string' ? Number(item.kulam) : item.kulam;
        setkulams(kulamValue);
        
        console.log('item.kulam>>>',item.kulam);
       
        setVisibleId(visibleId === item.id ? null : item.id); // Toggle visibility for the selected import { second } from 'first'
        
       
        //setkulamname(item.kulam_name);
    };
    const getadvertisement = async () => {
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        fetch(global.url + 'getadvertisement', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: screenData.id,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('getadvertisement data ===>>', json)
                if (json.success == true) {
                    setadver(json.data)
                }
            })
    }

    const onDateSelected = (event, value) => {
        // //console.log(value)
        setDate(value);
        setdatechk(value)
        setDatePicker(false);
    };
    const valueformatedate = (value) => {
        // //console.log(value)
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




    const data = [
        { label: 'brother', value: 'brother' },
        { label: 'wife', value: 'wife' },
        { label: 'father', value: 'father' },
        { label: 'mother', value: 'mother' },
        { label: 'sister', value: 'sister' },
        { label: 'son', value: '6' },
    ];

    const showadd = () => {
        if (add == '0') {
            setadd('1')
        } else {
            setadd('0')
        }
    }

    const addprofil = async () => {
        setsubmitted(true)
        //console.log('========================')
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        //console.log('screenData=> ', screenData.id)

        // var strSplitDate = String(date).split(' ');
        // var dates = new Date(strSplitDate[0]);
        // var dd = date.getDate();
        // var mm = date.getMonth();
        // var yyyy = date.getFullYear();
        // var conformdate = yyyy + '-' + mm + '-' + dd
        // //console.log(conformdate)
        //console.log('userid=>>', screenData.id)
        //console.log('related => ', valuecom,)
        //console.log('name =>', name,)
        //console.log('occuption==> ', occuption,)
        // //console.log('dob=> ', conformdate)
        //console.log('kulam=>', kulamname,)
        //console.log('community=>', valuekulam)
        fetch(global.url + 'addmember', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                relation: valuecom,
                user_id: screenData.id,
                community: 'community',
                kulam: kulamname,
                dob: '2001-01-01',
                occupation: occuption
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                console.log('res====>>', json)
                if (json.success == true) {
                    setadd('0')
                    getmember(screenData.id)
                } else {
                    alert(json.message)
                }
                setLoading(false)
            })

    }


    const getkulamdis = () => {
        getkulam(global.url + 'getkulam').then(res => {
            global.dropDownData = [];
            for (var i = 0; i < res.data.length; i++) {
                global.dropDownData.push({ value: res.data[i].id, label: res.data[i].name });
            }
            setkulam(global.dropDownData);
            //console.log('getkulam==>> ', global.dropDownData)
        })

    }
    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        // Add more banners as needed
    ];
    // const getmember = (id) => {
    //     const newarray = []
    //     fetch(global.url + 'getmember', {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id: id,
    //         })
    //     })
    //         .then((res) => res.json())
    //         .then(async (json) => {
    //             //console.log('getmembers data ===>>', json)
    //             if (json.success == true) {

    //                 // setmember(json.data)
    //                 let staticIndex = 0;
    //                 for (let i = 0; i < json.data.length; i++) {
    //                     newarray.push({ type: 'item', community: json.data[i].community, created_at: json.data[i].created_at, dob: json.data[i].dob, id: json.data[i].id, kulam: json.data[i].kulam, name: json.data[i].name, occupation: json.data[i].occupation, profile_pic: json.data[i].profile_pic, relation: json.data[i].relation, updated_at: json.data[i].updated_at, user_id: json.data[i].user_id, kulam_name: json.data[i].kulam_name });
    //                     if (i % 2 === 0 && staticIndex < staticData.length) {
    //                         newarray.push(staticData[staticIndex]);
    //                         staticIndex++;
    //                     }
    //                     setmember(newarray)
    //                     setPass_Id(newarray.id)

    //                    }

    //             } else {
    //                 // alert(json.message)
    //             }
    //             //console.log('=======> ', newarray)
    //             setLoading(false)
    //         })

    // }

    const getmember = (id) => {
        const newarray = [];
        fetch(global.url + 'getmember', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: id,
            })
        })
            .then((res) => res.json())
            .then((json) => {
                if (json.success) {
                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        const member = json.data[i];
                        newarray.push({
                            type: 'item',
                            ...member
                        });
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                    setmember(newarray);
                    console.log('>>>',member);
                    


                    setPass_Id(json.data.length > 0 ? json.data.id : null); // Example of setting pass_id
                    console.log('========================', json.data.length > 0 ? json.data[0].id : null)
                } else {
                    Alert.alert('Error', json.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching members:', error);
                Alert.alert('Error', 'Failed to fetch members.');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        // Log to ensure kulams is updated properly
        console.log('Dropdown Data:', kulam);

        console.log('kulams value changed:', kulams);
    }, [kulams]);

    const editpro = async () => {
        setsubmitted(true);
        setLoading(true); // Start loading state

        try {
            // Retrieve login data from AsyncStorage
            const result = await AsyncStorage.getItem('logindata');
            const screenData = JSON.parse(result);
            console.log('Screen Data:', screenData);

            // Prepare the payload for the API request
            const payload = {
                id: visibleId,
                name: name,
                relation: relation,
                community: 'community',
                kulam: kulams,
                dob: '2001-01-01', // Make this dynamic if needed
                occupation: occuption,
            };

            console.log('Payload:', payload);

            // Make API request
            const response = await fetch(global.url + 'updatefamilymember', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const json = await response.json();

            // Check API response
            if (response.ok && json.success) {
                // Retrieve and update user info in AsyncStorage
                // const updatedUserInfo = {
                //     ...screenData,
                //     name: name,
                //     relation: relation,
                //     community: 'community',
                //     kulam: kulamname,
                //     dob: '2001-01-01',
                //     occupation: occuption,
                // };

                // await AsyncStorage.setItem('logindata', JSON.stringify(updatedUserInfo));
                const storedUserData = await AsyncStorage.getItem('logindata');
                const screenData = JSON.parse(storedUserData)
                getmember(screenData.id);

                console.log('updatedUserInfo===================', storedUserData)
                // Show success alert and delay actions by 3 seconds
                Alert.alert('Success', 'Profile updated successfully.');

                setTimeout(() => {
                    // Hide the view after 3 seconds
                    setVisibleId(false); // Close the view

                    console.log('Profile updated successfully.');
                }, 3000); // Delay of 3000 milliseconds (3 seconds)

            } else {

                Alert.alert('Success', 'Profile updated successfully.', [
                    {
                        text: 'OK',
                        onPress: () => {
                            setVisibleId(false);
                           // navigation.navigate('Profile')
                        },
                    },
                ]);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'An unexpected error occurred.');
        } finally {
            // Delay loading state reset by 3 seconds to align with the alert timing
            setTimeout(() => {
                setLoading(false); // Ensure loading state is reset after 3 seconds
            }, 3000); // Delay of 3000 milliseconds (3 seconds)
        }
    };


    const renderItem = ({ item }) => {
        if (item.type === 'banner') {
            return (
                <View style={{ alignItems: 'center' }}>
                    <BannerAd
                        size={BannerAdSize.BANNER}
                        unitId={TestIds.BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            );
        } else {
            const isItemVisible = visibleId === item.id;
            return (
                <View>
                    <View style={styles.viewbox}>
                        <View style={{ width: '20%' }}>
                            <FastImage style={{ width: 60, height: 60 }} source={require('../../../assets/images/profile.png')} />
                        </View>
                        <View style={{ width: '50%', alignSelf: 'center' }}>
                            <Text style={styles.owner}>{item.name}</Text>
                            <Text style={styles.occuption}>{item.occupation}</Text>
                            <Text style={styles.occuption}>Kulam: {item.kulam_name}</Text>
                        </View>
                        <View style={{ width: '30%', alignSelf: 'center' }}>
                            <TouchableOpacity onPress={() => toggleVisibility(item)}>
                                <Text style={styles.edittext}>Edit</Text>
                            </TouchableOpacity>
                            <View style={styles.ask}>
                                <Text style={styles.fnttwo}>{item.relation}
                                  

                                </Text>
                            </View>
                        </View>
                    </View>

                    {isItemVisible && (
                        <View>
                            <View style={{ margin: 7 }}>
                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead' }}>
                                    <Dropdown
                                        style={[styles.dropdown]}
                                        placeholderStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        selectedTextStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        iconStyle={styles.iconStyle}
                                        data={data}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder="Relation"
                                        value={relation}
                                        onChange={(item) => {
                                           
                                            setValuecom(item.label);
                                            setRelation(item.value);
                                        }}
                                    />
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead' }}>
                                    <TextInput
                                        value={name}
                                        placeholderTextColor={'#829ead'}
                                        style={styles.txtin}
                                        placeholder="Name"
                                        onChangeText={(value) => setName(value)} // Make sure this is active
                                    />
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead' }}>
                                    <TextInput
                                        value={occuption}
                                        placeholderTextColor={'#829ead'}
                                        style={styles.txtin}
                                        placeholder="Occupation"
                                          onChangeText={(value) => setOccupation(value)}
                                    />
                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead' }}>
                                    {kulam ? (
                                        <Dropdown
                                            style={[styles.dropdown]}
                                            placeholderStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                            selectedTextStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                            iconStyle={styles.iconStyle}
                                            data={kulam}
                                            maxHeight={300}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Kulam"
                                            value={kulams}
                                            onChange={(valofdrop) => {
                                                setkulams(valofdrop.value);
                                                setkulamname(valofdrop.label);
                                                
                                                
                                            }}
                                        />
                                    ) : null}
                                </View>

                                <View style={{ height: 30 }}></View>

                                <TouchableOpacity onPress={editpro} style={{ width: '50%', alignSelf: 'center' }}>
                                    <View style={styles.ask}>
                                        <Text style={styles.fnttwo}>Save</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ height: 30 }}></View>
                            </View>


                        </View>
                    )}
                </View>
            );
        }
    };

    const renderSeparator = () => {
        return <View style={{ height: 10, backgroundColor: 'transparent' }} />;
    };
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

                    <View style={{ flexDirection: 'row', width: '100%', }}>
                        <View style={{ width: '35%', alignSelf: 'center' }}>
                            <Text style={styles.title}>FAMILY PROFILE</Text>
                        </View>
                        <TouchableOpacity style={{ width: '65%' }} onPress={() => showadd()}>
                            <FastImage style={styles.titleimg} source={require('../../../assets/images/pluse.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 20 }}></View>
                    {add == '1' ?
                        <View style={{ margin: 7 }}>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead', }}>
                                <Dropdown
                                    style={[styles.dropdown]}
                                    placeholderStyle={{ color: "#8D92A3", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                    selectedTextStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                    iconStyle={styles.iconStyle}
                                    data={data}
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder='Relation'
                                    value={relation}
                                    onChange={(item) => {
                                        setValuecom(item.label);
                                        setRelation(item.label)
                                    }}
                                />
                            </View>
                            {valuecom === '' && submitted ? <Text style={styles.chooseUserName}>Please select your Relation </Text> : null}

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead', }}>
                                <TextInput onChangeText={(value) => setName(value)} value={name} placeholderTextColor={'#829ead'} style={styles.txtin} placeholder='Name'></TextInput>
                            </View>
                            {name === '' && submitted ? <Text style={styles.chooseUserName}>Please Enter name </Text> : null}

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead', }}>
                                <TextInput onChangeText={(value) => setOccupation(value)} value={occuption} placeholderTextColor={'#829ead'} style={styles.txtin} placeholder='Occuption'></TextInput>
                            </View>
                            {occuption === undefined && submitted ? <Text style={styles.chooseUserName}>Please Enter occuption </Text> : null}

                            {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead', }}>
                                <TextInput onChangeText={(value) => setkulams(value)} value={kulams} placeholderTextColor={'#829ead'} style={styles.txtin} placeholder='Kulam'></TextInput>
                            </View> */}

                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead', }}>
                                {kulam ?
                                    <Dropdown
                                        style={[styles.dropdown]}
                                        placeholderStyle={{ color: "#8D92A3", fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        selectedTextStyle={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 14 }}
                                        iconStyle={styles.iconStyle}
                                        data={kulam}
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder='kulam'
                                        value={kulamname}
                                        onChange={(item) => {
                                            setkulams(item.label);
                                            setkulamname(item.value)
                                        }}
                                    />
                                    : null}
                            </View>
                            {kulams === '' && submitted ? <Text style={styles.chooseUserName}>Please select kulams </Text> : null}

                            {/* <View style={{ borderBottomWidth: 1, borderBottomColor: '#829ead' }}>
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
                                                <Text style={styles.txtdob}>{valueformatedate(date.toDateString())}</Text>
                                                :
                                                <Text style={styles.txtdob}>DOB</Text>
                                            }
                                        </View>
                                    }
                                </TouchableOpacity>
                            </View> */}
                            <View style={{ height: 30 }}></View>
                            <TouchableOpacity onPress={addprofil} style={{ width: '50%', alignSelf: 'center' }}>
                                <View style={styles.ask}>
                                    <Text style={styles.fnttwo}>Add</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ height: 30 }}></View>
                        </View>
                        : null}


                    <View>
                        <FlatList
                            data={member}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}

                        />

                        {/* {member ?
                            <View>
                                {member.map((m, index) => (
                                    <View style={styles.viewbox}>
                                        <View style={{ width: '20%' }}>
                                            <FastImage style={{ width: 60, height: 60 }} source={require('../../../assets/images/profile.png')} />
                                        </View>
                                        <View style={{ width: '50%', alignSelf: 'center' }}>
                                            <Text style={styles.owner}>{m.name}</Text>
                                            <Text style={styles.occuption}>{m.occupation}</Text>
                                            <Text style={styles.occuption}>Kulam: {m.kulam}</Text>
                                        </View>
                                        <View style={{ width: '30%', alignSelf: 'center' }}>
                                            <View style={styles.ask}>
                                                <Text style={styles.fnttwo}>{m.relation}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            : null} */}
                        {/* {adver ?
                            <View>
                                {adver.map((t, index) => (
                                    <View style={{ width: '100%', height: 80, alignSelf: 'center' }}>
                                        <FastImage resizeMode='stretch' style={{ height: 50, width: '100%' }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                    </View>
                                ))}
                            </View>
                            : null} */}

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}