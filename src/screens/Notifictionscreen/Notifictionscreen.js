import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from './styles'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Notifictionscreen = ({ item }) => {
    const [notificationdat, setnotificationData] = useState('')

    useEffect(() => {
        console.log('eventes page ======== ')
        getusernotification()
    }, [])

    // const getusernotification = async () => {
    //     try {
    //         const result = await AsyncStorage.getItem('logindata');
    //         if (result !== null) {
    //             const screenData = JSON.parse(result);
    //              Alert.alert(screenData.id)
    //             const response = await fetch(global.url + 'getnotification', {
    //                 method: 'POST',
    //                 headers: {
    //                     Accept: 'application/json',
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                      user_id: screenData.id,
    //                     // user_id: 185,
    //                 }),
    //             });

    //             const json = await response.json();
    //             console.log('json=> ', json);


    //             setnotificationData(json.data);
    //         } else {
    //             console.log('No login data found');
    //         }
    //     } catch (error) {
    //         console.error('Error fetching notifications:', error);
    //     }
    // };
    const getusernotification = async () => {
        try {
            const result = await AsyncStorage.getItem('logindata');
            if (result !== null) {
                const screenData = JSON.parse(result);


                // Alert.alert(
                //     "User ID",
                //     `The user ID is: ${screenData.id}`,
                //     [
                //         {
                //             text: "OK",
                //             onPress: () => console.log("OK Pressed")
                //         }
                //     ],
                //     { cancelable: false }
                // );

                const response = await fetch(global.url + 'getnotification', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id: screenData.id,
                        // user_id: 185,
                    }),
                });
                console.log('Response:', response);
                const json = await response.json();
                console.log('json=> ', json);
                setnotificationData(json.data);
            } else {
                console.log('No login data found');
            }
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.textgounder}>Gounder Kudumbam</Text>
            <View style={styles.flexrowtext}>
                <Text style={styles.welc}>WELCOME {global.uername.toUpperCase()}</Text>
                <Text style={styles.idtext}>ID:{global.uerid}</Text>
            </View>

            {notificationdat && Array.isArray(notificationdat) && notificationdat.length > 0 ? (<>
                {notificationdat.map((item, index) => (
                    <View key={index}>

                        <View style={styles.userlistview}>
                            <View style={styles.flexrowtextxzx}>
                                {/* <View style={styles.flexrowviewstyle}>
                                    <Image source={{ uri: item.temple_image }} style={styles.userimages}></Image>
                                    <Image source={{ uri: item.user_image }} style={styles.userimages}></Image>
                                </View> */}
                                {/* <Text>{}</Text> */}
                                {/* <Text>{item.temple_image}</Text> */}
                                <View style={styles.flexrowviewstyle}>
                                    {item.type === 1 ? (
                                        // console.log('Temple Image URL:', 'https://www.app.gounderkudumbam.com/admin/public/' + item.temple_image),
                                        // console.log('User Image URL:', 'https://www.app.gounderkudumbam.com/admin/public/' + item.user_image),
                                        <>
                                            <Image source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + item.temple_image }} style={styles.userimages} />

                                        </>
                                    ) : item.type === 2 ? (

                                        <>
                                            <Image source={{ uri: 'https://www.app.gounderkudumbam.com/admin/public/' + item.user_image }} style={styles.userimages} />
                                        </>
                                    ) : null}
                                </View>

                                <View style={styles.marview}>
                                    {item.type === 1 && (
                                        <Text style={styles.textuser}>Temple: {item.temple_name}</Text>
                                    )}

                                    <Text style={styles.textuser} numberOfLines={3} >{item.message}</Text>
                                    <Text style={styles.datetext}>{item.created_date} </Text>
                                </View>
                            </View>
                        </View>
                    </View>))}

            </>) :
                <Text style={styles.noti}>No notification found</Text>}



        </View>
    )
}

export default Notifictionscreen

