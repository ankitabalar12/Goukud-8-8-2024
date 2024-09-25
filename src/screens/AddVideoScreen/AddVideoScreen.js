import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import ReactNativeModal from 'react-native-modal';
import { ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import WebView from 'react-native-webview';

const AddVideoScreen = ({ navigation }) => {
    // const [videoTitle, setVideoTitle] = useState(isEditing ? existingVideo.title : '');
    const [youtubeLink, setYoutubeLink] = useState();
    const [thumbnail, setThumbnail] = useState();
    const [loading, setLoading] = useState(false);
    const [youtubeLinkedit, setYoutubeLinkedit] = useState();
    const [thumbnailedit, setThumbnailEdit] = useState();
    const [videoTitleedit, setVideoTitleEdit] = useState('');
    const [text, setText] = useState();
    const [modalVisible, setModalVisible] = useState()
    const [selectdoption, setSelectedOption] = useState(1)
    const [videoTitle, setVideoTitle] = useState('');
    const [VideoData, setVideoData] = useState('');
    const [videoUrls, setVideoUrls] = useState(null);
    const [youtubeLinks, setYoutubeLinks] = useState([]); // Example array of YouTube links
    const [videoLinks, setVideoLinks] = useState([]); // Array to store selected video links
    const [allLinks, setAllLinks] = useState([...youtubeLinks, ...videoLinks].join(', ')); // Combined links
    const [allLinks2, setAllLinks2] = useState([...youtubeLinks, ...videoLinks].join(', ')); //
    const [isSaved, setIsSaved] = useState(false); // New state variable
    const [showLinks, setShowLinks] = useState(false);
    const [allLinks3, setAllLinks3] = useState([...youtubeLinks, ...videoLinks].join(', '));
    const [allLinks4, setAllLinks4] = useState([...youtubeLinks, ...videoLinks].join(', '));
    const [is_new, setIs_New] = useState();
    const [not, setnot] = useState('');
    const [linkToDelete, setLinkToDelete] = useState('');
    const [showDeleteView, setShowDeleteView] = useState(false);
 useEffect(() => {

        // handleVideoActions();
        getusernotification();
        getuservideo()
        // const handleVideoActions = async () => {
        //     if (selectdoption !== null) {
        //         try {
        //             if (selectdoption) {
        //                 // await addvideos();
        //             } else {
        //                 // await UpdateVideo();
        //             }
        //             await getuservideo();
        //         } catch (error) {
        //             console.error('Error handling video actions:', error);
        //         }
        //     }
        // };

        // Call handleVideoActions and getusernotification when the screen focuses
        // const focusListener = navigation.addListener('focus', () => {
        //     handleVideoActions();
        //     getusernotification();
        // });

        // Cleanup function to remove the listener on unmount
        // return () => {
        //     focusListener();
        // };
    }, []); // Removed 'not' since it's not being used

// useEffect(() => {
//     const getusernotification = async () => {
//         // Fetch user notifications logic here
//     };

//     const getuservideo = async () => {
//         // Fetch user videos logic here
//     };

//     const handleVideoActions = async () => {
//         try {
//             if (selectdoption !== null) {
//                 if (selectdoption) {
//                     // Call addvideos logic if selectdoption is true
//                     // await addvideos();
//                 } else {
//                     // Call UpdateVideo logic if selectdoption is false
//                     // await UpdateVideo();
//                 }
//                 // Fetch user videos again after adding or updating
//                 await getuservideo();
//             }
//         } catch (error) {
//             console.error('Error handling video actions:', error);
//         }
//     };

//     // Listen to screen focus to trigger functions when the screen is focused
//     const focusListener = navigation.addListener('focus', () => {
//         handleVideoActions();
//         getusernotification();
//     });

//     // Cleanup listener on component unmount
//     return () => {
//         focusListener();  // Remove the listener to avoid memory leaks
//     };
// }, [navigation, selectdoption]);

 

    const handleAddLink = () => {
        setVideoLinks([...videoLinks, '']); // Add an empty string for a new input
    };

    ;
    const handleLinkChange = (text, index) => {
        const updatedLinks = [...videoLinks];
        updatedLinks[index] = text;
        setVideoLinks(updatedLinks);
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


    const addoption = (id) => {
        setSelectedOption(id);
    };

    const addvideos = async () => {
        setLoading(true);

        try {
            const result = await AsyncStorage.getItem('logindata');
            if (result !== null) {
                const screenData = JSON.parse(result);
                const videoData = {
                    user_id: screenData.id,
                    temple_id: screenData.temple,
                    title: videoTitle,
                    url: youtubeLink ? `${youtubeLink}, ${allLinks}` : allLinks,
                    thumbnail: allLinks,
                };

                console.log('Adding video with the following details:', videoData);

                const response = await fetch(global.url + 'addvideos', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(videoData),
                });

                const json = await response.json();
                console.log('API Response:', json);

                if (json.success) {
                    Alert.alert("Success", "Video added successfully!");
                    setVideoTitle('');
                    setYoutubeLink('');
                    setThumbnail('');
                    setAllLinks('');
                    setAllLinks2('');
                    setAllLinks3('');
                    navigation.navigate('ManageVideo');
                } else {
                    // Handle error here
                }
            } else {
                Alert.alert("Error", "No user data found");
            }
        } catch (error) {
            console.error("Error handling video: ", error);
            Alert.alert("Error", "An error occurred while processing the video");
        } finally {
            setLoading(false);
        }
    };

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
                    const videoId = json.data[0].id;
                    global.videoId_id = videoId
                    console.log('----------dfdfds--------------', videoId)
                    const allUrls = json.data.flatMap(video =>
                        video.url.split(', ').map(link => link.trim())
                    );

                    setVideoUrls(allUrls); // Save all video URLs to state
                    console.log('------------------------', allUrls)

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

    


    const UpdateVideo = async (videoId) => {
        setLoading(true);
        try {
            const result = await AsyncStorage.getItem('logindata');
            if (result !== null) {
                const screenData = JSON.parse(result);

                const videoData = {
                    user_id: screenData.id,
                    id: videoId,
                    temple_id: screenData.temple,
                    title: videoTitleedit || "",
                    url: global.videoId_id ? `${global.videoId_id}, ${allLinks2}` : allLinks2,
                    thumbnail: allLinks2,
                };


                console.log('Updating video with the following details:', videoData);

                const response = await fetch(global.url + 'updatevideos', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(videoData),
                });

                if (!response.ok) {
                    throw new Error(`Error updating video: ${response.statusText}`);
                }

                const json = await response.json();
                console.log('API Response:', json);

                if (json.success) {
                    // Success handling here
                    Alert.alert('Success', 'Video updated successfully.');
                } else {
                    // Error handling here
                    Alert.alert('Error', `Failed to update video: ${json.message || 'Unknown error'}`);
                }
            } else {
                console.log('No user data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error updating video:', error);
            Alert.alert('Error', `An error occurred while updating the video: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleTextChange = (text) => {
        setAllLinks(text);
    };

    const selectVideos = (callback) => {
        const options = {
            mediaType: 'video',
            selectionLimit: 30,
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                Alert.alert('Cancelled', 'You cancelled the video selection.');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else {
                const uris = response.assets.map(asset => asset.uri);
                setVideoLinks(prevVideos => {
                    const updatedVideos = [...prevVideos, ...uris];
                    if (updatedVideos.length > 50) {
                        Alert.alert('Limit Reached', 'You can only select up to 50 videos.');
                        return prevVideos;
                    } else {
                        const updatedAllLinks = [...youtubeLinks, ...updatedVideos].join(', ');
                        setAllLinks(updatedAllLinks);
                        setYoutubeLinkedit(updatedAllLinks);
                        return updatedVideos;
                    }
                });
            }
        });
    };

    const selectVideosupdate = () => {
        const options = {
            mediaType: 'video',
            selectionLimit: 30,
            includeBase64: false,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                Alert.alert('Cancelled', 'You cancelled the video selection.');
            } else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
            } else {
                const uris = response.assets.map(asset => asset.uri);
                setVideoLinks(prevVideos => {
                    const updatedVideos = [...prevVideos, ...uris];
                    if (updatedVideos.length > 50) {
                        Alert.alert('Limit Reached', 'You can only select up to 50 videos.');
                        return prevVideos;
                    } else {
                        const updatedAllLinks = [...youtubeLinks, ...updatedVideos].join(', ');
                        setAllLinks2(updatedAllLinks);
                        setAllLinks4(updatedAllLinks);
                        setShowLinks(true);
                        return updatedVideos;
                    }
                });
            }
        });
    };



    // const handleSaveVideos = async () => {
    //     const updatedAllLinks = [...youtubeLinks, ...videoLinks].join(', ');
    //     setAllLinks(updatedAllLinks);

    //     // Save the combined URLs to AsyncStorage or your desired storage
    //     await AsyncStorage.setItem('savedVideoLinks', updatedAllLinks);

    //     setIsSaved(true);

    //     // Fetch and show the video URLs after saving
    //     await getuservideo();
    //     Alert.alert('Success', 'All selected videos have been saved.');
    // };


    // //    Alert.alert('Success', 'All selected videos have been saved.');
    // // };
    // const handleSaveVideos2 = async () => {
    //     const updatedAllLinks = [...youtubeLinks, ...videoLinks].join(', ');
    //     setAllLinks(updatedAllLinks);

    //     // Save the combined URLs to AsyncStorage or your desired storage
    //     await AsyncStorage.setItem('savedVideoLinks', updatedAllLinks);

    //     setIsSaved(true);

    //     // Fetch and show the video URLs after saving
    //     await getuservideo();
    //     Alert.alert('Success', 'All selected videos have been saved.');
    // };


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

                                const videoIdToDelete = global.videoId_id; // Get the video ID from global state
                                console.log('Deleting video with ID:', videoIdToDelete);

                                // Send delete request to the API
                                const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: videoIdToDelete, // Pass the ID correctly
                                    }),
                                });

                                console.log('Request Body:', JSON.stringify({ id: videoIdToDelete }));

                                if (!response.ok) {
                                    throw new Error(`Network response was not ok: ${response.status}`);
                                }

                                const responseText = await response.text();
                                console.log('Response Text:', responseText);

                                const json = JSON.parse(responseText);
                                console.log('Response JSON:', json);

                                if (json.success) {
                                    // Update state to remove deleted video URL
                                    const currentLinks = allLinks || '';
                                    const linkToDelete = `https://www.youtube.com/embed/${videoIdToDelete}`;

                                    // Remove the first occurrence of the link to delete
                                    const linksArray = currentLinks.split(', ').filter((link) => link !== linkToDelete);

                                    // Convert array back to a comma-separated string
                                    const updatedLinks = linksArray.join(', ');

                                    // Update the state with the new list of links
                                    setAllLinks(updatedLinks);

                                    Alert.alert('Success', 'Video deleted successfully.');
                                } else {
                                    Alert.alert('Error', `Failed to delete the video: ${json.message || 'Unknown error'}`);
                                }
                            } else {
                                Alert.alert('Error', 'No user data found.');
                            }
                        } catch (error) {
                            console.error('Error deleting video:', error);
                            Alert.alert('Error', 'An error occurred while deleting the video.');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    const deleteVideo2 = async () => {
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

                                const videoIdToDelete = global.videoId_id; // Get the video ID from global state
                                console.log('Deleting video with ID:', videoIdToDelete);

                                // Send delete request to the API
                                const response = await fetch(url, {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        id: videoIdToDelete, // Pass the ID correctly
                                    }),
                                });

                                console.log('Request Body:', JSON.stringify({ id: videoIdToDelete }));

                                if (!response.ok) {
                                    throw new Error(`Network response was not ok: ${response.status}`);
                                }

                                const responseText = await response.text();
                                console.log('Response Text:', responseText);

                                const json = JSON.parse(responseText);
                                console.log('Response JSON:', json);

                                if (json.success) {
                                    // Update state to remove deleted video URL
                                    const currentLinks = allLinks || '';
                                    const linkToDelete = `https://www.youtube.com/embed/${videoIdToDelete}`;

                                    // Remove the first occurrence of the link to delete
                                    const linksArray = currentLinks.split(', ').filter((link) => link !== linkToDelete);

                                    // Convert array back to a comma-separated string
                                    const updatedLinks = linksArray.join(', ');

                                    // Update the state with the new list of links
                                    setAllLinks(updatedLinks);

                                    Alert.alert('Success', 'Video deleted successfully.');
                                } else {
                                    Alert.alert('Error', `Failed to delete the video: ${json.message || 'Unknown error'}`);
                                }
                            } else {
                                Alert.alert('Error', 'No user data found.');
                            }
                        } catch (error) {
                            console.error('Error deleting video:', error);
                            Alert.alert('Error', 'An error occurred while deleting the video.');
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };


    return (
        <View style={styles.container}>
            <View style={styles.flexrowview}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Notifictionscreen')
                }}>
                    <Image source={require('../../../assets/images/notificationicon.png')} style={styles.notification}></Image>

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
                <Text style={styles.goundertextstyle}>Gounder Kudumbam</Text>
                <TouchableOpacity>
                    <Image source={require('../../../assets/images/iconsearch.png')} style={styles.notification}></Image>
                </TouchableOpacity>
            </View>
            <View >
                {selectdoption === 1 && (<TextInput
                    style={styles.searchInput}
                    placeholder="Add Video Title"
                    value={videoTitle}
                    placeholderTextColor="#000"
                    onChangeText={text => setVideoTitle(text)}
                />)}
                {selectdoption === 2 && (
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Edit Video Title"
                        value={videoTitleedit}
                        placeholderTextColor="#000"
                        onChangeText={text => setVideoTitleEdit(text)}
                    />
                )}

            </View>
            {selectdoption == '1' ? (<View>
                <ScrollView>
                    <View style={styles.flexrowviewadd}>
                        <TouchableOpacity onPress={() => {
                            addoption(1)
                        }} style={styles.textside}>
                            <Text style={styles.addviedeotext}>Add Video </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            addoption(1)
                        }}>
                            <Image source={require('../../../assets/images/mingcuteideofill.png')} style={styles.videoicon}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            addoption(2)
                        }}>
                            {/* <Image source={require('../../../assets/images/add.png')} style={styles.add}></Image> */}
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => {
                        addoption(2)
                    }} style={styles.positionofarrow}>
                        <Image source={require('../../../assets/images/videoediting.png')} style={styles.arrowdownstyle}></Image>
                    </TouchableOpacity> */}
                    </View>
                    {/* <View style={styles.flexviewboxrow}>
                    <View style={styles.addboxview}>
                        <TouchableOpacity onPress={() => {
                            // navigation.navigate('SelectVideoScreen');
                        }} style={styles.addlinkrow}>
                            <Image
                                source={require('../../../assets/images/add.png')}
                                style={styles.addstyleimg} */}
                    {/* /> */}
                    {/* {isSaved ? (
                                <>
                                    {videoUrls ? (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.addtextlinks}>{videoUrls}</Text>
                                        </View>
                                      ) : (
                                     )}


                                     </>
                                            ) : (
                                      <>
                                       <View style={{ flexDirection: 'row' }}>
                                        {youtubeLink ? (
                                            <Text style={styles.addtextlinks}>{youtubeLink}</Text>) :
                                            (
                                                <Text style={styles.addtextlink}>YouTube video link</Text>
                                            )}

                                    </View>
                                </>

                            )} */}
                    {/* </TouchableOpacity>

                        <View style={styles.heightview} />
                    </View>
                    <View style={styles.deleteviewstyle}>
                        <View style={styles.flexrowdeletebutton}>
                            <TouchableOpacity onPress={() => selectVideos(setAllLinks3)} style={styles.deletestyleview}>
                                <View style={styles.delletextstyle}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={styles.addstyleimg2}
                                    />
                                    <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteVideo}>
                                <Image
                                    source={require('../../../assets/images/delete.png')}
                                    style={styles.deleteimg}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                    {videoUrls ? (
                        <View>
                            {videoUrls.map((imgurl, index) => (<View>
                                <View key={imgurl.id} style={{ flexDirection: 'row', marginTop: 20 }}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={styles.addstyleimg2}
                                    />
                                    {/* <Text>{videoUrls}</Text> */}
                                    <View>
                                        {/* <Text style={styles.addtextlinks}>
                                        {videoUrls.ur ? videoUrls.ur.split(',')[0] : null}

                                    </Text> */}
                                        {/* {videoUrls.url ? videoUrls.url.split(',')[0] : 'YouTube video link'} */}
                                        <Text style={[styles.addtextlinks, { color: '#888' }]}>
                                            {/* {videoUrls} */}
                                            {imgurl.length > 25 ? `${imgurl.substring(0, 25)}...` : imgurl}
                                        </Text>
                                        <View style={styles.heightview} />
                                    </View>
                                    <View style={styles.flexrowdeletebutton}>
                                        <TouchableOpacity
                                            onPress={() => selectVideos()}
                                            style={[styles.deletestyleview, { marginLeft: 10 }]}
                                        >
                                            <View style={styles.delletextstyle}>
                                                <Image
                                                    source={require('../../../assets/images/add.png')}
                                                    style={[styles.addstyleimg2, { marginTop: 1 }]}
                                                />
                                                <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={deleteVideo}>
                                            <Image
                                                source={require('../../../assets/images/delete.png')}
                                                style={[styles.simplelineimg, { tintColor: '#BABABA' }]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.hetviewstylestwo}></View>

                            </View>))}
                        </View>) : null}
                    {videoLinks.map((link, index) => (
                        <View key={item.id}>
                            <View  style={{ flexDirection: 'row', marginTop: 20 }}>
                                <Image
                                    source={require('../../../assets/images/add.png')}
                                    style={styles.addstyleimg2}
                                />
                                <View>
                                    <TextInput
                                        style={styles.inputtext}
                                        value={link}
                                        multiline={true}
                                        placeholder="YouTube video link"
                                        onChangeText={(text) => handleLinkChange(text, index)}
                                        placeholderTextColor="#888"
                                    />
                                    <View style={styles.heightview} />
                                </View>
                                <View style={styles.flexrowdeletebutton}>
                                    <TouchableOpacity
                                        onPress={handleAddLink}
                                        style={[styles.deletestyleview, { marginLeft: 20 }]}
                                    >
                                        <View style={styles.delletextstyle}>
                                            <Image
                                                source={require('../../../assets/images/add.png')}
                                                style={[styles.addstyleimg2, { marginTop: 1 }]}
                                            />
                                            <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={deleteVideo}>
                                        <Image
                                            source={require('../../../assets/images/delete.png')}
                                            style={[styles.simplelineimg, { tintColor: '#BABABA' }]}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.hetviewstylestwo}></View>
                        </View>
                    ))}

                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity onPress={handleAddLink}>
                            <Image
                                source={require('../../../assets/images/add.png')}
                                style={[styles.addstyleimg2, { marginTop: 5, marginLeft: 22 }]}
                            />
                        </TouchableOpacity>
                        <View>
                            <TextInput
                                style={styles.inputtext}
                                value={allLinks}
                                placeholder="YouTube video link"
                                // keyboardType='number'
                                onChangeText={handleTextChange}
                                placeholderTextColor="#888"

                            />
                            <View style={styles.heightview} />
                        </View>
                        <View style={styles.flexrowdeletebutton}>
                            <TouchableOpacity onPress={() => selectVideos()} style={[styles.deletestyleview, { marginLeft: 10 }]}>
                                <View style={styles.delletextstyle}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={[styles.addstyleimg2, { marginTop: 1 }]}
                                    />
                                    <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleAddLink}>
                                <Image
                                    source={require('../../../assets/images/simplelineiconsplus.png')}
                                    style={styles.simplelineimg}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>






                    {/* <View style={styles.flexviewboxrow}>
                    <View style={styles.addboxview}>
                        <View style={styles.addlinkrow}>
                            <Image
                                source={require('../../../assets/images/add.png')}
                                style={styles.addstyleimg}
                            />
                            <TextInput
                                style={styles.inputtext}
                                value={allLinks}
                                placeholder="YouTube video link"
                                keyboardType='number'
                                onChangeText={handleTextChange}
                                placeholderTextColor="#888"

                            />
                        </View>
                        <View style={styles.heightview} />
                    </View>
                    <View style={styles.deleteviewstyle}>
                        <View style={styles.flexrowdeletebutton}>
                            <TouchableOpacity onPress={() => selectVideos()} style={styles.deletestyleview}>
                                <View style={styles.delletextstyle}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={styles.addstyleimg2}
                                    />
                                    <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={addvideos}>
                                <Image
                                    source={require('../../../assets/images/simplelineiconsplus.png')}
                                    style={styles.simplelineimg}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                    <View style={styles.hetviewstylestwo}></View>
                    <TouchableOpacity
                        onPress={addvideos}
                        style={styles.redview}>
                        <Text style={styles.addtextstyle}>Add</Text>
                    </TouchableOpacity>









                    {/* 
                {/* {showDeleteView && (
                  
                )} */}

                    {/* <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <Image
                        source={require('../../../assets/images/add.png')}
                        style={styles.addstyleimg2}
                    />
                    <View style={styles.heightview} />
                    <View style={styles.flexrowdeletebutton}>
                        <TouchableOpacity onPress={() => selectVideos()} style={[styles.deletestyleview, { marginLeft: 20 }]}>
                            <View style={styles.delletextstyle}>
                                <Image
                                    source={require('../../../assets/images/add.png')}
                                    style={styles.addstyleimg2}
                                />
                                <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleShowDeleteView}>
                            <Image
                                source={require('../../../assets/images/simplelineiconsplus.png')}
                                style={styles.simplelineimg}
                            />
                        </TouchableOpacity>
                    </View>
                </View> */}





                    <View style={{ marginTop: '50%' }}></View>
                </ScrollView>
                {loading && <ActivityIndicator size="large" color="#871618" />}
            </View>) : null}
            {selectdoption == '2' ? (<View>

                <View style={styles.flexrowviewadd}>
                    <TouchableOpacity onPress={() => {
                        addoption(1)
                    }} style={styles.textside}>
                        <Text style={styles.addviedeotext}>Edit Video </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        addoption(1)
                    }}>
                        <Image source={require('../../../assets/images/mingcuteideofill.png')} style={styles.videoicon}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        addoption(1)
                    }}>
                        <Image source={require('../../../assets/images/add.png')} style={styles.add}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        addoption(2)
                    }} style={styles.positionofarrow}>
                        <Image source={require('../../../assets/images/videoediting.png')} style={styles.arrowdownstyle}></Image>
                    </TouchableOpacity>

                </View>

                <View style={styles.flexviewboxrow}>
                    <View style={styles.addboxview}>
                        <View style={styles.addlinkrow}>
                            <Image
                                source={require('../../../assets/images/add.png')}
                                style={styles.addstyleimg}
                            />

                            <Text style={styles.addtextlinks}>{videoUrls}</Text>
                            {!showLinks && (
                                <>
                                    {youtubeLinkedit ? (
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.addtextlinks}>{youtubeLinkedit}</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.addtextlink}>YouTube video link</Text>
                                    )}
                                </>

                            )}






                        </View>
                        <View style={styles.heightview} />
                    </View>
                    <View style={styles.deleteviewstyle}>
                        <View style={styles.flexrowdeletebutton}>
                            <TouchableOpacity onPress={() => selectVideos(setAllLinks4)} style={styles.deletestyleview}>
                                <View style={styles.delletextstyle}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={styles.addstyleimg2}
                                    />
                                    <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={deleteVideo2}
                            >
                                <Image
                                    source={require('../../../assets/images/delete.png')}
                                    style={styles.deleteimg}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.hetviewstylestwo}></View>
                <View style={styles.flexviewboxrow}>
                    <View style={styles.addboxview}>
                        <View style={styles.addlinkrow}>
                            <Image
                                source={require('../../../assets/images/add.png')}
                                style={styles.addstyleimg}
                            />
                            <TextInput
                                style={styles.inputtext}
                                value={thumbnailedit}
                                placeholder="YouTube video link"
                                keyboardType='number'
                                placeholderTextColor="#888"
                                onChangeText={text => setThumbnailEdit(text)}
                            />
                        </View>
                        <View style={styles.heightview} />
                    </View>
                    <View style={styles.deleteviewstyle}>
                        <View style={styles.flexrowdeletebutton}>
                            <TouchableOpacity onPress={selectVideosupdate} style={styles.deletestyleview}>
                                <View style={styles.delletextstyle}>
                                    <Image
                                        source={require('../../../assets/images/add.png')}
                                        style={styles.addstyleimg2}
                                    />
                                    <Text style={styles.textlinkstyle2}>Thumbnail Image</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                            // onPress={handleSaveVideos2}
                            >
                                <Image
                                    source={require('../../../assets/images/simplelineiconsplus.png')}
                                    style={styles.simplelineimg}
                                />

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.hetviewstylestwo}></View>
                <TouchableOpacity
                    onPress={UpdateVideo}
                    style={styles.redview}>
                    <Text style={styles.addtextstyle}>Save</Text>
                </TouchableOpacity>



                {loading && <ActivityIndicator size="large" color="#871618" />}


            </View>) : null}


        </View>
    )
}

export default AddVideoScreen;
