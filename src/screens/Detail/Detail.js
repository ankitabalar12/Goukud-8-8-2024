import React, { useState, useEffect } from 'react';
import { Image, ImageBackground, ScrollView, Text, Linking, TouchableOpacity, View, StatusBar, SafeAreaView, Button } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-community/async-storage';
import AutoLink from 'react-native-autolink';

export default function Detail({ route, navigation }) {
    const [event, setevent] = useState('')
    const [createddate, setcreateddate] = useState('')
    const [olddate, setolddate] = useState('')
    const [date_time, setdate_time] = useState('')
    const [img, setimg] = useState([])
    const [addimg, setaddimg] = useState([])

    useEffect(() => {
        // navigation.addListener('focus', async () => {
        console.log('details page=====')
        details()
        // })
    }, [])

    const details = () => {
        const getdata = route.params.data
        console.log('getdata ====> ', getdata)
       
        if (getdata.images !== null) {
            addimg.push(getdata.image, getdata.images)
            const outputArray = addimg.flatMap((element) => element.split(","));
            setimg(outputArray)
            console.log('outputarray data img =>> ', outputArray)
        } else {
            setimg(getdata.image)
            console.log('imag==> ', getdata.image)
        }

        // global.url = getdata.attachment
        setcreateddate(getdata.created_at)
        setdate_time(getdata.date_time)
        setevent(getdata)
        const getdate = route.params.date
        setolddate(getdate)
    }

    const datedis = (date) => {

        const servertime = new Date(date.replace(" ", "T"))
        const last = new Date(servertime).getTime();

        const datedta = new Date(olddate.replace(" ", "T"))
        const now = new Date(datedta).getTime();

        if (last < now) {
            const distance = now - last;
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (days == 0) {
                if (hours == 0) {
                    const timer = minutes + ' ' + 'minutes to go'
                    //console.log(timer)
                    return timer
                }
                if (minutes == 0) {
                    const timers = seconds + ' ' + 'seconds to go'
                    //console.log(timers)
                    return timers
                }
                if (hours > 0) {
                    const timerh = hours + ':' + minutes + ':' + seconds + ' ' + ' to go'
                    //console.log(timerh)
                    return timerh
                }
            } else {
                const displaytime = days + ' days ago'
                //console.log(displaytime)
                return displaytime
            }
        }

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

    const openpdf = () => {
        const getdata = route.params.data
        console.log('getdata ====> ', getdata)
        // const urlopen = 'https://www.demo603.amrithaa.com/gouku/admin/public/pdf/' + getdata.attachment
        const urlopen = 'https://www.app.gounderkudumbam.com/admin/public/pdf/' + getdata.attachment
        //console.log('urlopen =>> ', urlopen)
        Linking.openURL(urlopen)
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
                    <View style={{ flexDirection: 'row', width: '100%', marginTop: '5%' }}>

                        <Text style={styles.wel}>
                            WELCOME {global.uername.toUpperCase()}
                        </Text>

                        <View style={{ width: '50%' }}>
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.eventtxtstyle}>அனைத்து நிகழ்வுகள்</Text>
                    {/* <Text style={styles.usertextdata}>Video: {title_item}</Text> */}
                    <Text style={styles.usertextdata}>Kulam: {global.kulam}</Text>
                    <Text style={styles.usertextdata}>Temple: {global.templename}</Text>

                    <View style={{ height: 10 }}></View>
                    <View style={{flexDirection: 'row', alignSelf:'center' }}>
                        {/* <View style={{ width: '50%' }}></View> */}
                       
                            <FastImage style={styles.usrpic} source={require('../../../assets/images/userpic.png')} />
                       
                         <View style={{position:'absolute', right:-90}}>
                            <Text style={styles.admin}>Posted by Admin</Text>
                            <Text style={{ color: '#8D92A3', fontFamily: 'Montserrat-Regular', fontSize: 10, }}>{datedis(createddate)}</Text>
                        </View>
                    </View>
                    <View style={{ height: 20 }}></View>

                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={styles.event}>{event.name}</Text>
                    </View>
                    <View style={{ height: 10 }}></View>

                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={styles.dise}>GET READY FOR UPCOMMING TEMPLE EVENTS</Text>
                    </View>
                    <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-Regular', fontSize: 10, color: '#8D92A3' }}>
                            Event Date :{date_time}
                        </Text>
                    </View>
                    <View style={{ height: 15 }}></View>
                    {event ?
                        <View>
                            {event.images ?
                                <View style={styles.swiperView}>
                                    <Swiper
                                        controlsProps={{
                                            prevPos: false,
                                            nextPos: false,
                                            dotsWrapperStyle: { width: '0%' },
                                        }}
                                        dotStyle={{ width: 0 }}
                                        activeDotStyle={{ width: 0 }}
                                        loop={true}
                                    >

                                        {img.map((imageUrl, index) => (
                                            <View key={index}>
                                                <Image style={styles.slidimg} source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + imageUrl }} />
                                            </View>
                                        ))}

                                    </Swiper>
                                </View>
                                :
                                <View style={styles.swiperView}>
                                    <Swiper
                                        controlsProps={{
                                            prevPos: false,
                                            nextPos: false,
                                            dotsWrapperStyle: { width: '0%' },
                                        }}
                                        dotStyle={{ width: 0 }}
                                        activeDotStyle={{ width: 0 }}
                                        loop={true}
                                    >

                                        <View>
                                            <Image style={styles.slidimg} resizeMode='stretch' source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/images/' + img }} />
                                        </View>
                                    </Swiper>
                                </View>
                            }

                            <View>
                                <Text style={styles.lasttxt}>
                                    {event.description}
                                </Text>
                            </View>
                            <View style={{ height: 30 }}></View>

                            {event.attachment ?
                                <View style={styles.lasttxt}>
                                    {/* <AutoLink style={{fontSize:11,textAlign:'center'}} text={'https://www.demo603.amrithaa.com/gouku/admin/public/pdf/' + oldevent.attachment}>
                                    {(url, match) => (
                                        <Text style={styles.lasttxt} onPress={() => Linking.openURL(url)}>
                                            {match}
                                        </Text>
                                    )}
                                </AutoLink> */}
                                    <TouchableOpacity onPress={() => openpdf()}>
                                        <Text style={styles.lasttxt}> Open PDF</Text>
                                    </TouchableOpacity>
                                </View>

                                : null}
                        </View>

                        :
                        null
                        // <View>
                        //     <View style={styles.swiperView}>
                        //         <Swiper
                        //             controlsProps={{
                        //                 prevPos: false,
                        //                 nextPos: false,
                        //                 dotsWrapperStyle: { width: '0%' },
                        //             }}
                        //             dotStyle={{ width: 0 }}
                        //             activeDotStyle={{ width: 0 }}
                        //             loop={true}
                        //         >

                        //             <View>
                        //                 <Image style={styles.slidimg} resizeMode='stretch' source={require('../../../assets/images/shri.jpg')} />
                        //             </View>
                        //             <View>
                        //                 <Image style={styles.slidimg} resizeMode='stretch' source={require('../../../assets/images/maa.jpg')} />
                        //             </View>
                        //         </Swiper>
                        //     </View>
                        //     <View>
                        //         <Text style={styles.lasttxt}>
                        //             Unjanai has an average elevation of 271 metres and Unjanai village is located in Tiruchengode thaluk of Namakkal district in Tamil Nadu, India. It is situated 8km away from sub-district headquarter Tiruchengode and 30km away from district headquarter Namakkal and 366 KM from Tamil Nadu state capital Chennai.
                        //         </Text>
                        //     </View>
                        // </View>
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}