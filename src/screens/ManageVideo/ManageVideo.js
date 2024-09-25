import React, { useState, useRef, useEffect } from 'react';
import { FlatList, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, View, StatusBar, SafeAreaView, Button, Image } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import WebView from 'react-native-webview';
const embedUrlBase = 'https://www.youtube.com/embed/';
const ManageVideo = ({ navigation }) => {
    const [gallary, setgallary] = useState([])
    const [loading, setLoading] = useState(false);
    const [iscontentmanager, setiscontentmanager] = useState('0')
    const [videoUrls, setVideoUrls] = useState('')
    const webviewRef = useRef(null);
    const webViewRef = useRef(null);
    useEffect(() => {
        navigation.addListener('focus', async () => {
            console.log('managefallery one page =============')
            // getuserProfile()
            // getgal()
            getuservideo()

        })
    }, [])


    const staticData = [
        { type: 'banner', id: 'banner1', created_at: '' },
        { type: 'banner', id: 'banner2', created_at: '' },
    ];
    // const getuservideo = async () => {
    //     setLoading(true);
    //     try {
    //         const result = await AsyncStorage.getItem('logindata');
    //         if (result !== null) {
    //             const screenData = JSON.parse(result);
    //             const response = await fetch(global.url + 'gettemplevideos', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     temple_id: screenData.temple,
    //                 }),
    //             });

    //             if (!response.ok) {
    //                 throw new Error(`Error fetching videos: ${response.statusText}`);
    //             }

    //             const json = await response.json();
    //             console.log('Fetched video data:', json);

    //             if (json.data && json.data.length > 0) {
    //                 // Extract URLs and other info from the response
    //                 const allVideos = json.data.map(video => ({
    //                     url: video.url ? video.url.split(', ').map(link => link.trim()) : [], // Provide default empty array
    //                     title: video.title || 'No title',
    //                     created_date: video.created_date || 'No date',

    //                 }));
    //                 setVideoUrls(allVideos); // Save all video URLs and info to state
    //                 console.log('All Videos:', allVideos);
    //             } else {
    //                 console.log('No video data found in response');
    //                 setVideoUrls([]); // Clear video URLs if no data found
    //             }
    //         } else {
    //             console.log('No user data found in AsyncStorage.');
    //         }
    //     } catch (err) {
    //         console.log('Error fetching temple videos:', err);
    //     }
    //     setLoading(false);
    // };
    // const getuservideo = async () => {
    //     setLoading(true);
    //     try {
    //         const result = await AsyncStorage.getItem('logindata');
    //         if (result !== null) {
    //             const screenData = JSON.parse(result);
    //             const response = await fetch(global.url + 'gettemplevideos', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     temple_id: screenData.temple,
    //                 }),
    //             });

    //             if (!response.ok) {
    //                 throw new Error(`Error fetching videos: ${response.statusText}`);
    //             }

    //             const json = await response.json();
    //             console.log('Fetched video data:', json);

    //             if (json.data && json.data.length > 0) {
    //                 // Flatten URLs if needed (you might not need this if `url` is a single value)
    //                 const allUrls = json.data.map(video => video.url);

    //                 setVideoUrls(allUrls); // Save all video URLs to state
    //                 console.log('Video URLs--------sdfsdf----------:', allUrls);
    //             } else {
    //                 console.log('No video data found in response');
    //                 setVideoUrls([]); // Clear video URLs if no data found
    //             }
    //         } else {
    //             console.log('No user data found in AsyncStorage.');
    //         }
    //     } catch (err) {
    //         console.log('Error fetching temple videos:', err);
    //     }
    //     setLoading(false);
    // };
    const getuservideo = async () => {
        setLoading(true);
        try {
            const result = await AsyncStorage.getItem('logindata');
            if (result !== null) {
                const screenData = JSON.parse(result);
                const response = await fetch(global.url + 'gettemplevideos', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        temple_id: screenData.temple,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error fetching videos: ${response.statusText}`);
                }

                const json = await response.json();
                console.log('Fetched video data:', json);

                if (json.data && json.data.length > 0) {
                    // Flatten URLs if needed (you might not need this if `url` is a single value)
                    const allUrls = json.data.map(video => video.url);

                    setVideoUrls(allUrls); // Save all video URLs to state
                    console.log('Video URLs--------sdfsdf----------:', allUrls);
                } else {
                    console.log('No video data found in response');
                    setVideoUrls([]); // Clear video URLs if no data found
                }
            } else {
                console.log('No user data found in AsyncStorage.');
            }
        } catch (err) {
            console.log('Error fetching temple videos:', err);
        }
        setLoading(false);
    };

    const datetime = (value) => {

        if (value != null) {
            var month = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];
            var strSplitDate = String(value).split(' ');
            var dates = new Date(strSplitDate[0]);
            var dd = dates.getDate();
            var mm = month[dates.getMonth()];
            var yyyy = dates.getFullYear();
            var conformdate = dd + ' ' + mm + ' ' + yyyy
            // //console.log(conformdate)
            return conformdate
        } else {
            return value
        }
    }


    const addnavi = () => {
        navigation.navigate('AddVideo')
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
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.wel}>
                                WELCOME  {global.uername},
                            </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.id}>
                                ID: {global.uerid}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Kulam: {global.kulam}</Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11 }}>Temple: {global.templename}</Text>
                    </View>

                    {/* <TouchableOpacity onPress={() => navigation.navigate('AddVideoScreen')} style={{ height: 20, width: 150, backgroundColor: 'red' }}></TouchableOpacity> */}

                    <TouchableOpacity
                        style={{ flexDirection: "row" }}
                        onPress={() => navigation.navigate('AddVideoScreen')}
                    >
                        <Text style={{ fontSize: 17, color: '#000', fontWeight: '500', marginTop: 20 }}>VIDEO</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddVideoScreen')} >
                            <Image source={require('../../../assets/images/pluse.png')} style={{ height: 30, width: 30, marginTop: 16 }}></Image>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    {/* <View style={{ height: 10 }}></View>
                    <View style={{ flexDirection: 'row', width: '100%', }}>
                           
                        <TouchableOpacity onPress={() => navigation.navigate('AddVideo')} style={{ width: '22%', alignSelf: 'center' }}>
                                <Text style={styles.title}>VIDEO</Text>
                        </TouchableOpacity>
                        


                        <TouchableOpacity style={{ width: '80%' }}
                            onPress={() => navigation.navigate('AddVideo')}
                        >
                            <FastImage style={styles.titleimg} source={require('../../../assets/images/pluse.png')} />
                        </TouchableOpacity> */}


                    {/* {iscontentmanager == '1' ? */}
                    {/* <TouchableOpacity style={{ width: '80%' }}
                            onPress={() => navigation.navigate('AddVideo')}
                        >
                            <FastImage style={styles.titleimg} source={require('../../../assets/images/pluse.png')} />
                        </TouchableOpacity> */}
                    {/* : null
                        } */}

                    {/* </View> */}
                    <View style={{ height: 10 }}></View>
                    <View style={{ height: 300, width: '100%', }}>
                        {/* {videoUrls && Array.isArray(videoUrls) && videoUrls.length > 0 ? (
                            videoUrls.map((video, index) => (
                                <View key={index} style={{ marginVertical: 10 }}>
                                    <View style={{ height: 300, width: '100%', alignSelf: 'center' }}>
                                        {video.url.length > 0 ? (
                                            video.url.map((url, idx) => (
                                                <WebView
                                                    key={idx}
                                                    style={styles.video}
                                                    javaScriptEnabled={true}
                                                    mediaPlaybackRequiresUserAction={true}
                                                    allowsInlineMediaPlayback={true}
                                                    domStorageEnabled={true}
                                                    allowFileAccess={false}
                                                    startInLoadingState={true}
                                                    source={{ uri: `${embedUrlBase}${url}` }} // Correctly format the video URL
                                                    allowsFullscreenVideo={true}
                                                />
                                            ))
                                        ) : (
                                            <Text style={{ textAlign: 'center', color: '#ff0000' }}>No video URL available</Text>
                                        )}
                                        <View style={styles.overlay}>
                                            <Text style={[styles.title, { color: '#fff' }]}>{video.title}</Text>
                                            <Text style={[styles.timestamp, { color: '#fff' }]}>Updated {datetime(video.created_date)}</Text>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>No Video found</Text>
                        )} */}
                        {videoUrls && Array.isArray(videoUrls) && videoUrls.length > 0 ? (
                            videoUrls.map((url, index) => (
                                <View key={index} style={{ marginVertical: 10 }}>
                                    <View style={{ height: 300, width: '100%', alignSelf: 'center' }}>
                                         <WebView
                                                key={index}
                                                style={styles.video}
                                                javaScriptEnabled={true}
                                                mediaPlaybackRequiresUserAction={true}
                                                allowsInlineMediaPlayback={true}
                                                domStorageEnabled={true}
                                                allowFileAccess={false}
                                                startInLoadingState={true}
                                                source={{ uri: url }} // Directly use the URL here
                                                allowsFullscreenVideo={true}
                                            /> 
                                        {/* {url ? (
                                            <WebView
                                                key={index}
                                                style={styles.video}
                                                javaScriptEnabled={true}
                                                mediaPlaybackRequiresUserAction={true}
                                                allowsInlineMediaPlayback={true}
                                                domStorageEnabled={true}
                                                allowFileAccess={false}
                                                startInLoadingState={true}
                                                source={{ uri: url }}
                                                allowsFullscreenVideo={true}
                                            />
                                        ) : (
                                            <Text style={{ textAlign: 'center', color: '#ff0000' }}>No video URL available</Text>
                                        )} */}
                                        <View style={styles.overlay}>
                                            <View style={styles.overlay}>
                                                <Text style={[styles.title, { color: '#fff' }]}>{url.title}</Text>
                                                <Text style={[styles.timestamp, { color: '#fff' }]}>Updated {datetime(url.created_date)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: 'center', marginTop: 20 }}>No Video found</Text>
                        )}
                        {/* {loading ?

                            <ActivityIndicator size="large" color="#1976d2" animating={loading} />

                            : null} */}
                    </View>
                    {/* <FlatList
                        data={gallary}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        ItemSeparatorComponent={renderSeparator}

                    /> */}

                    {/* {gallary ?
                        <View >
                            {gallary.map((t, index) => (
                                <View>
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('Gallerydetails', t)} style={styles.alview}>
                                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20, borderWidth: 0, opacity: 0.5, backgroundColor: '#000000' }} source={{ uri: 'https://www.demo603.amrithaa.com/gouku/admin/public/images/' + t.image }} />
                                        <View style={{ height: 20 }}></View>
                                    </TouchableOpacity>
                                    <Text style={styles.fnt}>
                                        {t.name}
                                    </Text>
                                    <Text style={styles.fnt1}>
                                        {t.temple_name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        : null} */}


                    {/* <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails')} style={styles.alview}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Shivgiri , Endor
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails')} style={styles.alview}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Shivgiri , Endor
                        </Text>
                    </TouchableOpacity>
                    <View style={{ height: 20 }}></View>
                    <TouchableOpacity onPress={() => navigation.navigate('Gallerydetails')} style={styles.alview}>
                        <FastImage resizeMode='stretch' style={{ flex: 1, borderRadius: 20 }} source={require('../../../assets/images/maa.jpg')} />
                        <Text style={styles.fnt}>
                            Shri Ponkaliaman
                        </Text>
                        <Text style={styles.fnt1}>
                            Shivgiri , Endor
                        </Text>
                    </TouchableOpacity> */}

                </View>
            </ScrollView>
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                </View>
                : null}
            <View style={{ marginTop: '50%' }}></View>
        </SafeAreaView>
    )
}
export default ManageVideo;