import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import WebView from 'react-native-webview';
import { ActivityIndicator } from 'react-native';

const SelectVideoScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [iscontentmanager, setiscontentmanager] = useState('0')
    const [statusadd, setStatusAdd] = useState();
    const [addvideo, setAddVideo] = useState('')
    const [videoData, setVideoData] = useState([]);
    const [statusMessage, setStatusMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [title_item, setTitle_item] = useState('');
    const [is_new, setIs_New] = useState();
    useEffect(async () => {
        let isMounted = true;
        getvideolist();
        getusernotification();
        return () => {
            isMounted = false;
        };
    }, [])

    const getvideolist = async () => {
        try {

            const result = await AsyncStorage.getItem('logindata')
            const screenData = JSON.parse(result)
            const response = await fetch(global.url + 'getvideos', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: screenData.id,
                }),
            });
            console.log(response)
            const json = await response.json();
            console.log('Response JSON ===== 1:', json);
            setAddVideo(json.data)
            setStatusAdd(json.data[0].status)
            setTitle_item(json.data[0].title)
            const videoId = json.data[0].id;
            global.videoId = json.data[0].id
            const isstatus = json.data[0].status;
            await changevideostatusdata(videoId, isstatus);
            // await deleteVideo(videoId);
            console.log(json.data)


            // navigation.navigate('VideoScreen', { youtubevide: templeid });

        } catch (err) {
            console.log('Error fetching temple videos:', err);
        }
    }
    const deleteVideo = async () => {
        setLoading(true); // Start loading state

        // Show confirmation alert
        Alert.alert(
            'Confirm Deletion',
            'Are you sure you want to delete this video?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => setLoading(false), // Reset loading state if canceled
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        try {
                            const result = await AsyncStorage.getItem('logindata');
                            if (result !== null) {
                                const screenData = JSON.parse(result);
                                console.log('User Data:', screenData);

                                const url = global.url + 'deletevideo';
                                console.log('Request URL:', url);

                                const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: global.videoId,
                                    }),
                                });

                                console.log('Response Status:', response.status);
                                const responseText = await response.text();
                                console.log('Response Text:', responseText);

                                if (!response.ok) {
                                    throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
                                }

                                const json = JSON.parse(responseText);
                                console.log('Response JSON:', json);

                                if (json.success) {
                                    // Clear the video data and related fields
                                    setVideoData(prevData => {
                                        if (Array.isArray(prevData)) {
                                            return prevData.filter(video => video.id !== global.videoId);
                                        } else {
                                            console.error('videoData is not an array:', prevData);
                                            return [];
                                        }
                                    });
                                    setVideoData('')
                                    Alert.alert('Success', 'Video deleted successfully.');
                                } else {
                                    Alert.alert('Error', `Failed to delete the video: ${json.message || 'Unknown error'}`);
                                }
                            } else {
                                Alert.alert('Error', 'No user data found.');
                            }
                        } catch (err) {
                            console.error('Error deleting video:', err);
                            Alert.alert('Error', 'An error occurred while deleting the video.');
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
        setLoading(false);
    };

    const changevideostatusdata = async (videoId, status) => {
        try {
            const result = await AsyncStorage.getItem('logindata')
            const screenData = JSON.parse(result)
            console.log(global.url + 'changevideostatus')
            const response = await fetch(global.url + 'changevideostatus', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: videoId,
                    status: status,
                }),
            });
            // console.log('Response Status:', response.videoId);
            // console.log('Response Status:', response.status);
            const json = await response.json();
            // console.log('Response JSON ====:', json);
            const statusCode = json.status;
            // console.log('Status Code:', statusCode);
            setStatusMessage(statusCode);

        } catch (err) {
            console.log('Error changing video status:', err);
            setStatusMessage(null);
        }
    };
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
                if (json && typeof json === 'object' && json.user_data) {
                    const count = Object.keys(json.user_data).length;
                    const counter = await AsyncStorage.getItem('notification');
    
                    if (count > counter) {
                        setIs_New(1);
                    }
                }
            } else {
                console.log('No login data found');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
            Alert.alert('Notification Error', 'An error occurred while fetching data.');
        } finally {
            setLoading(false); // Stop loading indicator
        }
    };
    const videoId = videoUrl.split('/').pop(); // Adjust this if your URL format is different
    global.videoId_id = videoId
    console.log(' global.videoId_id', global.videoId_id)
    // Format the YouTube embed URL
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    return (
        <View style={styles.container}>
            <View style={styles.flexrowview}>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/notificationicon.png')} style={styles.notification}></Image>
                    {is_new == 1 && (
                  <View style={[styles.notiliveview, {height:5, width:5, zIndex: 1, backgroundColor: '#46eb34',position:'absolute', right:0}]}></View>
                    )}
                </TouchableOpacity>
                <Text style={styles.goundertextstyle}>Gounder Kudumbam</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/iconsearch.png')} style={styles.notification}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.serchview}>
                <TouchableOpacity style={styles.flexdreactionview}>
                    <Image source={require('../../../assets/images/search.png')} style={styles.sarechimg}></Image>
                    <TextInput
                        placeholder="Search..."
                        alue={searchQuery}
                        // placeholderTextColor={'#'}
                        // onChangeText={handleSearch}
                        style={styles.serachtext}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.flexrowstlw}>
                <View style={styles.widhstyle}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AddVideo')
                    }}>
                        <Text style={styles.wel}>
                            WELCOME {global.uername},
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.widhstyle}>
                    <Text style={styles.done}>
                        ID: {global.uerid}
                    </Text>
                </View>

            </View>
            <ScrollView>
                <Text style={styles.usertextdata}>Video: {title_item}</Text>
                <Text style={styles.usertextdata}>Kulam: {global.kulam}</Text>
                <Text style={styles.usertextdata}>Temple: {global.templename}</Text>
                <View style={styles.flexrowviewstyle}>
                    <Text style={styles.videotextstyle}>VIDEO {global.templename}</Text>
                    {/* <TouchableOpacity onPress={() => {
                    navigation.navigate('AddVideo')
                }}>
                    <Image source={require('../../../assets/images/add.png')} style={styles.addimgstyle}></Image>
                </TouchableOpacity> */}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Video</Text>
                    {global.is_content_manager == '1' ? (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('AddVideo')}>
                                <Image style={styles.titleimg} source={require('../../../assets/images/pluse.png')} />
                            </TouchableOpacity>
                        </>
                    ) : null}
                </View>
                <View>
                    {statusadd === 1 || statusadd === 0 ? (
                        <TouchableOpacity onPress={() => {
                            // setModalVisible(true)
                        }} style={styles.activeview}>
                            <Text style={styles.arrowstyle}>
                                {statusadd === 1 ? "Active" : "Inactive"}
                            </Text>
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={styles.imagesvidestyles}>
                    {addvideo && Array.isArray(addvideo) && addvideo.length > 0 ? (
                        addvideo.map((item) => (
                            <View key={item.id}>
                                <View style={styles.videoviewstyle}>
                                    <WebView
                                        style={styles.videoviewstylgdfg}
                                        javaScriptEnabled={true}
                                        mediaPlaybackRequiresUserAction={true}
                                        allowsInlineMediaPlayback={true}
                                        domStorageEnabled={true}
                                        allowFileAccess={false}
                                        startInLoadingState={true}
                                        source={{ uri: embedUrl }}
                                        allowsFullscreenVideo={true}

                                    />
                                    <TouchableOpacity onPress={() => deleteVideo(item.id)}>
                                        <Image source={require('../../../assets/images/cross.png')} style={styles.youtubeiconstyle}></Image>
                                        <View style={{ height: 20 }}></View>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))

                        // </View>
                    ) : (
                        <Text style={styles.adstext}>No Video found</Text>
                    )}
                    {loading ?

                        <ActivityIndicator size="large" color="#1976d2" animating={loading} />

                        : null}
                </View>
                <View style={styles.martop}></View>
            </ScrollView>
        </View>
    )
}

export default SelectVideoScreen

