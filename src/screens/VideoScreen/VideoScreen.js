import React, { useState, useEffect, useRef } from 'react';
import { FlatList, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, SafeAreaView, ActivityIndicator, Alert, Image } from 'react-native';
import { styles } from './styles';
import FastImage from 'react-native-fast-image';
import AsyncStorage from "@react-native-community/async-storage";
import { AppOpenAd, InterstitialAd, RewardedAd, BannerAdSize, BannerAd, TestIds } from 'react-native-google-mobile-ads';
import WebView from 'react-native-webview';
import ReactNativeModal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function VideoScreen({ navigation, route }) {
    const [title_item, setTitle_item] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [videoData, setVideoData] = useState([]);
    const [modalVisible, setModalVisible] = useState()
    const [statusadd, setStatusAdd] = useState();
    const [loading, setLoading] = useState(false);
    const youtubevide = route.params;
    const webviewRef = useRef(null);
    const webViewRef = useRef(null);
    console.log('================', youtubevide)
    // console.log(statusId)
    useEffect(() => {
        // navigation.addListener('focus', async () => {
        console.log('eventes page ======== ')
        getuservideo()
        // changevideostatusdata()

    }, [])
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }
    const onLoadEnd = () => {

        const jsCode = `
            document.querySelectorAll('video').forEach(video => {
                video.autoplay = false;
                video.pause(); // Ensure video is paused if it was set to autoplay
            });
        `;
        if (webviewRef.current) {
            webviewRef.current.injectJavaScript(jsCode);
        }
    };

    const getuservideo = async () => {
        try {

            const response = await fetch(global.url + 'gettemplevideos', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    temple_id: global.templid,
                }),
            });
            console.log(response)
            const json = await response.json();
            console.log('Response JSON ===== 1:', json);
            setVideoData(json.data);
            setStatusAdd(json.data[0].status)
            setTitle_item(json.data[0].title)
            // await changevideostatusdata(videoId, isstatus);
            const videoId = json.data[0].id;
            const isstatus = json.data[0].status;
        } catch (err) {
            console.log('Error fetching temple videos:', err);
        }
    }


    const playVideo = () => {
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
                const video = document.querySelector('video');
                if (video) {
                    video.play();
                }
            `);
        }
    };
    const playVideo2 = () => {
        if (webViewRef.current) {
            webViewRef.current.injectJavaScript(`
                const video = document.querySelector('video');
                if (video) {
                    video.play();
                }
            `);
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
                    <View>

                        {/* <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>VIDEOS: {title_item}</Text> */}
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Kulam: {global.kulam}</Text>
                        <Text style={{ color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold' }}>Temple: {global.templename}</Text>
                    </View>


                    {loading ? (
                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />
                    ) : videoData.length > 0 ? (
                        <>
                            {videoData.length > 0 && (
                                <View style={[styles.fullview, { height: 300, width: '100%', backgroundColor: '#fff' }]}>
                                    {videoData.length > 0 && (
                                        <View style={styles.videoviewstyle}>
                                            <WebView
                                                style={styles.videovidf}
                                                javaScriptEnabled={true}
                                                mediaPlaybackRequiresUserAction={true}
                                                allowsInlineMediaPlayback={true}
                                                domStorageEnabled={true}
                                                allowFileAccess={false}
                                                startInLoadingState={true}
                                                source={{ uri: videoData[0]?.url || 'about:blank' }} // Use the URL of the first video
                                                allowsFullscreenVideo={true}
                                                onLoadEnd={onLoadEnd}
                                            />
                                            <TouchableOpacity  onPress={playVideo} style={styles.overlay}>
                                                <Image
                                                   source={require('../../../assets/images/youtube.png')} // Icon name from FontAwesome
                                                    size={10} // Icon size
                                                    color="#ff0000" // Icon color
                                                    style={styles.icon2} // Additional styles
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}


                                </View>
                            )}
                            <View style={styles.flexrowvideo}>
                                {/* {Array.isArray(videoData) && videoData.length > 1 && videoData.slice(1).map((item, index) => (
                                     */}
                                {Array.isArray(videoData) && videoData.slice(1).map((item, index) => (
                                    <View key={index}>
                                        <View style={[styles.videoview, { height: 150, width: '100%' }]}>
                                            <WebView
                                                style={styles.videoviewtwo}
                                                javaScriptEnabled={true}
                                                domStorageEnabled={true}
                                                mediaPlaybackRequiresUserAction={true}
                                                allowsInlineMediaPlayback={true}
                                                allowFileAccess={false}
                                                startInLoadingState={true}
                                                source={{ uri: item.url || 'about:blank' }} // Ensure the URL is valid
                                                allowsFullscreenVideo={true}
                                                onLoadEnd={onLoadEnd}
                                            />
                                            <TouchableOpacity onPress={playVideo2} style={styles.overlay}>
                                                <Image
                                                   source={require('../../../assets/images/youtube.png')} // Icon name from FontAwesome
                                                    size={10} // Icon size
                                                    color="#ff0000" // Icon color
                                                    style={styles.icon2} // Additional styles
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </>
                    ) : (
                        <Text style={styles.foundtext}>No videos available</Text>
                    )}

                </View>
                <View style={styles.scroviewmar}></View>
                {/* <ReactNativeModal
                    isVisible={modalVisible}
                    backdropColor='#fff'
                    backdropOpacity={0.2}
                    onBackdropPress={toggleModal}
                    supportedOrientations={['portrait', 'landscape']}
                    onSwipeComplete={() => setModalVisible(false)}
                    swipeDirection={['right']}
                    onRequestClose={() => setModalVisible(false)}
                    style={{ margin: 0, bottom: 0 }}
                >
                    <View style={styles.modalviewstyle}>

                    </View>
                </ReactNativeModal> */}
            </ScrollView>
        </SafeAreaView>
    );
}



// {videoData.length > 0 ? (
//     videoData.map((item, index) => (

//   <View key={index}>
//      <View style={styles.videoviewstyle}>
//      <WebView
//         style={styles.videovidf}
//         source={{ uri: item.url }}
//         allowsFullscreenVideo={true}
//     />
//      </View>
//   </View>
// ))
// ) : (
// <Text style={styles.adstext}>No Video found</Text>

// )}