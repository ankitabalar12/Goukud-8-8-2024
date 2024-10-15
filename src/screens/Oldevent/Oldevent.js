import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, Button, Image } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import ReactNativeModal from 'react-native-modal';

export default function Oldevent({ navigation }) {
    const [loding, setLoading] = useState(false)
    const [tempdata, settempdata] = useState([])
    const [data, setdata] = useState('')
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredata, setFilteredData] = useState([]);
    const [modalVisible, setModalVisible] = useState()
    const [tempdatanew, settempdatanew] = useState()
    const [eventType, setEventType] = useState('new');
    const colorOpacityModal = 0.1;
    useEffect(() => {
        // navigation.addListener('focus', async () => {
        console.log('oldevents page =======')
        getoldevent()
        // })
    }, [])

    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
    ];
    const staticDatanew = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
    ];
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const getoldevent = async () => {
        const newarray = [];
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        fetch(global.url + 'getoldevent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temple_id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('json getoldevent ===>> ', json.data)
                if (json.success == true) {
                    setLoading(false)
                    if (json.data == '') {
                        alert(json.message)
                    }

                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        newarray.push({ type: 'item', attachment: json.data[0].attachment, name: json.data[i].name, created_at: json.data[i].created_at, date_time: json.data[i].date_time, id: json.data[i].id, image: json.data[i].image, images: json.data[i].images, name: json.data[i].name, temple: json.data[i].temple, updated_at: json.data[i].updated_at, description: json.data[i].description });
                        if (i % 2 === 0 && staticIndex < staticData.length) {
                            newarray.push(staticData[staticIndex]);
                            staticIndex++;
                        }
                    }
                    settempdata(newarray)
                    console.log('<><><><><><>>>>>>>>><><><><><',newarray)
                    setEventType('old');
                } else {

                }
                setLoading(false)
            })
    }

    const datedis = (date) => {

        var servertime = new Date(date.replace(" ", "T"))
        const last = new Date(servertime).getTime();
        const now = new Date().getTime();
        if (last < now) {
            const distance = now - last;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (days == 0) {
                const timer = hours + ':' + minutes + ':' + seconds + ' ' + ' to go'
                return timer
            } else {
                const displaytime = days + ' days ago'
                return displaytime
            }
        }
    }
    const getnewevent = async () => {
        const newarray = [];
        const result = await AsyncStorage.getItem('logindata')
        const screenData = JSON.parse(result)
        setLoading(true)
        fetch(global.url + 'getnewevent', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temple_id: screenData.temple,
            })
        })
            .then((res) => res.json())
            .then(async (json) => {
                //console.log('json== getnewevent =>> ', json)
                if (json.success == true) {

                    let staticIndex = 0;
                    for (let i = 0; i < json.data.length; i++) {
                        newarray.push({ type: 'item', name: json.data[i].name, created_at: json.data[i].created_at, date_time: json.data[i].date_time, id: json.data[i].id, image: json.data[i].image, images: json.data[i].images, name: json.data[i].name, temple: json.data[i].temple, updated_at: json.data[i].updated_at, description: json.data[i].description });
                        if (i % 2 === 0 && staticIndex < staticDatanew.length) {
                            newarray.push(staticDatanew[staticIndex]);
                            staticIndex++;
                        }
                    }
                    settempdatanew(newarray)
                    console.log('===================',newarray )
                    setEventType('new');
                } else {
                    alert(json.message)
                }
                setLoading(false)
                //console.log('newarraynewarray ==> ', newarray)

            })
    }
    const datetime = (value) => {
        var month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var strSplitDate = String(value).split(' ');
        var dates = new Date(strSplitDate[0]);
        var dd = dates.getDate();
        var mm = month[dates.getMonth()];
        var yyyy = dates.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy
        return conformdate
    }
    const datedisnew = (date) => {

        var servertime = new Date(date.replace(" ", "T"))
        const last = new Date(servertime).getTime();
        const now = new Date().getTime();
        if (last < now) {
            const distance = now - last;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (days == 0) {
                const timer = hours + ':' + minutes + ':' + seconds + ' ' + ' to go'
                return timer
            } else {
                const displaytime = days + ' days ago'
                return displaytime
            }
        }
    }


    const datetimenew = (value) => {
        var month = ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"];
        var strSplitDate = String(value).split(' ');
        var dates = new Date(strSplitDate[0]);
        var dd = dates.getDate();
        var mm = month[dates.getMonth()];
        var yyyy = dates.getFullYear();
        var conformdate = dd + ' ' + mm + ' ' + yyyy
        return conformdate
    }
   
    const filteredDataNew = (tempdatanew || []).filter(item =>
        // item.name.toLowerCase().includes(searchQuery.toLowerCase())
        item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
      const filteredDataOld = (tempdata || []).filter(item =>
        item.name && typeof item.name === 'string' && item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    


    const renderItem = ({ item }) => {
        if (item.type === 'banner') {
            return <View style={{ alignItems: 'center' }}>
                <BannerAd size={BannerAdSize.BANNER}
                    unitId={TestIds.BANNER}
                    requestOptions={
                        {
                            requestNonPersonalizedAdsOnly: true
                        }
                    } />
            </View>
        } else {
            return (
                <View style={{ backgroundColor: '#ffffff', padding: 9 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '20%' }}>
                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.addmintxt}>Posted By Admin</Text>
                            <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>
                                {datedis(item.created_at)}

                            </Text>
                        </View>
                        {/* <View style={{ width: '20%' }}>
                            <View>
                                <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                            </View> */}
                        {/* </View> */}
                    </View>

                    <View style={{ height: 20 }}></View>
                    {item.image ?
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })} style={styles.main}>
                            <FastImage resizeMode='stretch' style={styles.mainimg} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image.split(',')[0] }} />
                        </TouchableOpacity>
                        :
                        null
                    }

                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })}>
                        <View>
                            <Text style={styles.maintxt}>
                                {item.name}
                            </Text>
                            <Text style={styles.maintxttwo}>
                                Event Date :{datetime(item.date_time)}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            );
        }
    };

    const renderSeparator = () => {
        return (
            <View style={{ height: 10, backgroundColor: 'transparent' }} />
        );
    };



    const renderItemnew = ({ item }) => {
        if (item.type === 'banner') {
            return <View style={{ alignItems: 'center' }}>
                <BannerAd size={BannerAdSize.BANNER}
                    unitId={TestIds.BANNER}
                    requestOptions={
                        {
                            requestNonPersonalizedAdsOnly: true
                        }
                    } />
            </View>
        } else {
            return (
                <View style={{ backgroundColor: '#ffffff', padding: 9 }}>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '20%' }}>
                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                        </View>
                        <View style={{ width: '60%' }}>
                            <Text style={styles.addmintxt}>Posted By Admin</Text>
                            <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>
                                {datedisnew(item.created_at)}

                            </Text>
                        </View>
                        {/* <View style={{ width: '20%' }}>
                            <View>
                                <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                            </View> */}
                        {/* </View> */}
                    </View>

                    <View style={{ height: 20 }}></View>
                    {item.image ?
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })} style={styles.main}>
                            <FastImage resizeMode='stretch' style={styles.mainimg} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + item.image.split(',')[0] }} />
                        </TouchableOpacity>
                        :
                        null
                    }

                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': item, 'date': data })}>
                        <View>
                            <Text style={styles.maintxt}>
                                {item.name}
                            </Text>
                            <Text style={styles.maintxttwo}>
                                Event Date :{datetimenew(item.date_time)}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            );
        }
    };

    const renderSeparatornew = () => {
        return (
            <View style={{ height: 10, backgroundColor: 'transparent' }} />
        );
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
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.wel}>
                                WELCOME {global.uername},
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.done}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.serchview}>
                        <View style={styles.flexdreactionview}>
                            <TouchableOpacity style={{ alignSelf: 'center' }}>
                                <Image source={require('../../../assets/images/search.png')} style={styles.sarechimg}></Image>
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Search Temple, Kulam"
                                alue={searchQuery}
                                onChangeText={setSearchQuery}
                                // placeholderTextColor={'#'}
                              
                                style={styles.serachtext}
                            />
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                            }} style={styles.menuviewstyle}>
                                <Image source={require('../../../assets/images/menubutton.png')} style={[styles.sarechimg, { tintColor: '#91908c' }]}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <View>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Temple: {global.templename}</Text>
                    </View> */}
                    <View style={{ height: 20 }}></View>
                    <View>
                        <Text style={{ color: '#22242A', fontSize: 22, fontFamily: 'BebasNeue-Regular' }}>
                            {/* கோவில் நிர்வாகி */}
                             {/* கோவில் நிர்வாகி */}
                             பழைய  நிகழ்வுகள்
                        </Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    {/* {tempdata ?
                        <FlatList
                            data={tempdata}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                        />
                        :
                        <View>
                            {loding ?
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="blue" animating={loding} />
                                </View>
                                : null}
                        </View>
                    }

                    {tempdatanew ?
                        <FlatList
                            data={tempdatanew}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItemnew}
                            ItemSeparatorComponent={renderSeparatornew}
                        />
                        :
                        <View>
                            {loding ?
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <ActivityIndicator size="large" color="blue" animating={loding} />
                                </View>
                                : null} */}
                    {/* </View> */}
                    {/* } */}



                    {eventType === 'new' ? (
                        <FlatList
                            data={filteredDataNew}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItemnew}
                            ItemSeparatorComponent={renderSeparatornew}
                        />
                    ) : (
                        <FlatList
                            data={filteredDataOld}
                            keyExtractor={(item) => item.id}
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                        />
                    )}
                    {loding ?
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                            <ActivityIndicator size="large" color="blue" animating={loding} />
                        </View>
                        : null}
                    {/* {loding ? (
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="blue" animating={loding} />
                        </View>
                    ) : (
                        <FlatList
                            data={tempdata.length > 0 ? tempdata : tempdatanew} // Check which data to display
                            keyExtractor={(item) => item.id.toString()} // Use .toString() to avoid key conflicts
                            renderItem={renderItem}
                            ItemSeparatorComponent={renderSeparator}
                        />
                    )}
 */}

                    {/* 
                    <View>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Temple: {global.templename}</Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View>
                        <Text style={{ color: '#22242A', fontSize: 22, fontFamily: 'BebasNeue-Regular' }}>
                            புதிய நிகழ்வுகள்
                        </Text>
                    </View>
                    <View style={{ height: 20 }}></View>
                    <View style={{
                        flex: 1,
                        marginTop: 500,
                        position: 'absolute', zIndex: 1,
                        width: '100%', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                        <View style={{ position: 'relative', justifyContent: 'space-between' }}>
                            <BannerAd size={BannerAdSize.BANNER}
                                unitId={TestIds.BANNER}
                                requestOptions={
                                    {
                                        requestNonPersonalizedAdsOnly: true
                                    }
                                } />
                        </View>
                    </View>
                    {tempdata ?
                        <View>
                            {tempdata.map((t, index) => (
                                <View style={{ backgroundColor: '#ffffff', padding: 9 }}>
                                    <View style={{ flexDirection: 'row', width: '100%' }}>
                                        <View style={{ width: '20%' }}>
                                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                                        </View>
                                        <View style={{ width: '60%' }}>
                                            <Text style={styles.addmintxt}>Posted By Admin</Text>
                                            <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>
                                                {datedis(t.created_at)}</Text>
                                        </View>
                                        <View style={{ width: '20%' }}>
                                            <View>
                                                <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ height: 20 }}></View>
                                    {t.image ?
                                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { 'data': t, 'date': data })} style={styles.main}>
                                            <FastImage resizeMode='stretch' style={styles.mainimg} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity onPress={() => navigation.navigate('Detail')} style={styles.main}>
                                            <FastImage style={styles.mainimg} source={require('../../../assets/images/divdo.jpg')} />
                                        </TouchableOpacity>
                                    }

                                    <View style={{ height: 20 }}></View>
                                    <View>
                                        <Text style={styles.maintxt}>
                                            Event Title
                                        </Text>
                                        <Text style={styles.maintxttwo}>
                                            Event Date : {datetime(t.date_time)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                        :
                        <View style={{ backgroundColor: '#ffffff' }}>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={{ width: '20%' }}>
                                    <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                                </View>
                                <View style={{ width: '60%' }}>
                                    <Text style={styles.addmintxt}>Posted By Admin</Text>
                                    <Text style={{ color: '#8D92A3', fontSize: 10, fontFamily: 'Montserrat-Regular' }}>6  MIN AGO</Text>
                                </View>
                                <View style={{ width: '20%' }}>
                                    <View>
                                        <FastImage style={{ height: 25, width: 25 }} source={require('../../../assets/images//dots.png')} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 20 }}></View>
                            <TouchableOpacity onPress={() => navigation.navigate('Detail')} style={styles.main}>
                                <FastImage style={styles.mainimg} source={require('../../../assets/images/divdo.jpg')} />
                            </TouchableOpacity>
                            <View style={{ height: 20 }}></View>
                            <View>
                                <Text style={styles.maintxt}>
                                    Event Title
                                </Text>
                                <Text style={styles.maintxttwo}>
                                    Event Date :25th July 2023
                                </Text>
                            </View>
                        </View>
                    } */}



                    <View style={{ height: 35 }}></View>
                </View>
                <ReactNativeModal
                    isVisible={modalVisible}
                    backdropColor='#fff'
                    backdropOpacity={colorOpacityModal}
                    onBackdropPress={toggleModal}
                    supportedOrientations={['portrait', 'landscape']}
                    onSwipeComplete={() => setModalVisible(false)}
                    swipeDirection={['right']}
                    onRequestClose={() => setModalVisible(false)}
                    style={{ margin: 0, bottom: 0 }}
                >
                    <View style={styles.modalviewstyle}>
                        <TouchableOpacity onPress={() => {
                            getnewevent()
                            setModalVisible(false)
                        }}>
                            <Text style={styles.oldeventtext}>New Events</Text>
                        </TouchableOpacity>
                        <View style={styles.centerviwestyle}></View>
                        <TouchableOpacity onPress={() => {
                            getoldevent()
                            setModalVisible(false)
                        }}>
                            <Text style={styles.oldeventtext}>Old Events</Text>
                        </TouchableOpacity>
                    </View>
                </ReactNativeModal>
            </ScrollView>
        </SafeAreaView>
    );
}