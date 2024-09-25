/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {StatusBar } from 'react-native';
import Splash from './src/screens/Splash/Splash';
import Getstart from './src/screens/Getstart/Getstart';
import { setTopLevelNavigation } from './NavigationHelper';
import Onnext from './src/screens/Onnext/Onnext';
import Onlast from './src/screens/Onlast/Onlast';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import Otp from './src/screens/Otp/Otp';
import Home from './src/screens/Home/Home';
import Askrefrence from './src/screens/Askrefrence/Askrefrence';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FastImage from 'react-native-fast-image';
import Refrence from './src/screens/Refrence/Refrence'
import Events from './src/screens/Events/Events'
import Detail from './src/screens/Detail/Detail'
import Gallery from './src/screens/Gallery/Gallery'
import Gallerydetails from './src/screens/Gallerydetails/Gallerydetails'
import Call from './src/screens/Call/Call';
import Profile from './src/screens/Profile/Profile';
import Familyprofile from './src/screens/Familyprofile/Familyprofile';
import Addminnor from './src/screens/Addminnor/Addminnor';
import ManageHistory from './src/screens/ManageHistory/ManageHistory';
import ManageEvent from './src/screens/ManageEvent/ManageEvent';
import ManageGallary from './src/screens/ManageGallary/ManageGallary';
import AdminDashboard from './src/screens/AdminDashboard/AdminDashboard';
import GalleryOne from './src/screens/Gallery-1/Gallery-1';
import ManageGallery1 from './src/screens/ManageGallery1/ManageGallery1';
import Templee from './src/screens/Templee/Templee';
import ManageEvent1 from './src/screens/ManageEvent1/ManageEvent1';
import Callone from './src/screens/Callone/Callone';
import Myprofile from './src/screens/Myprofile/Myprofile';
import Oldevent from './src/screens/Oldevent/Oldevent';
import Policy from './src/screens/Policy/Policy';
import Terms from './src/screens/Terms/Terms';
import Aboutus from './src/screens/Aboutus/Aboutus';
import Logo from './src/screens/Logo/Logo';
// import 'react-native-gesture-handler';
import ForgetPassword from './src/screens/ForgetPassword/ForgetPassword';
import TempleAdmin from './src/screens/TempleAdmin/TempleAdmin';
import firebase from '@react-native-firebase/app';
import PushNotification from 'react-native-push-notification';
import { AppRegistry } from 'react-native';
import VideoScreen from './src/screens/VideoScreen/VideoScreen';
import SelectVideoScreen from './src/screens/SelectVideoScreen/SelectVideoScreen';
import Notifictionscreen from './src/screens/Notifictionscreen/Notifictionscreen';
import ManageVideo from './src/screens/ManageVideo/ManageVideo';
import AddVideoScreen from './src/screens/AddVideoScreen/AddVideoScreen';
global.url = 'https://www.app.gounderkudumbam.com/admin/public/api/'
const firebaseConfig = {
  apiKey: "AIzaSyB0R-kpL3zt8o4sdd7k65CXTnsf4zZ8u1Q",
  authDomain: "amiable-might-399506.firebaseapp.com",
  databaseURL: "https://amiable-might-399506-default-rtdb.firebaseio.com",
  projectId: "amiable-might-399506",
  storageBucket: "amiable-might-399506.appspot.com",
  messagingSenderId: "285993772515",
  appId: "1:285993772515:web:569b3d80236fea75f9ecd6",
  measurementId: "G-6568GE16FH"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
PushNotification.configure({
  smallIcon: "ic_stat_assessment",
})
PushNotification.configure({
  onRegister: function (token) {
    // console.log('TOKEN:=======================', token);
    global.tokenId = token;
    global.token = global.tokenId.token;
    // alert(global.token);
    // console.log('TOKEN:========================',);
  },
});
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => PushNotification);
const Tab = createBottomTabNavigator()
const stack = createStackNavigator()
// global.url = 'https://www.demo603.amrithaa.com/gouku/admin/public/api/'


export function MyStack() {

  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: "#6cbfc4",
      tabBarStyle: [
        {
          display: "flex",
          paddingBottom: 20,
          paddingTop: 10,
          height: 80,
        },
        null
      ], tabBarIcon: ({ color }) => screenOptions(route, color),
      tabBarLabelStyle: {
        fontSize: 11,
        fontFamily: 'Montserrat-Bold'
      },
      tabBarInactiveTintColor: '#8D92A3'
    })}>
      <Tab.Screen name='Home' style={{ fontFamily: 'Montserrat-Bold' }} component={Home} options={{
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FastImage style={{ width: 24, height: 24, alignSelf: 'center' }} source={focused ? require('./assets/images/home.png') : require('./assets/images/home.png')} />
        ),
      }} />
      <Tab.Screen name='Search' style={{ fontFamily: 'Poppins-Thin' }} component={Gallery} options={{
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FastImage style={{ width: 24, height: 24, alignSelf: 'center' }} source={focused ? require('./assets/images/serch.png') : require('./assets/images/serch.png')} />
        ),

      }} />

      <Tab.Screen name='Admin' style={{ fontFamily: 'Poppins-Thin' }} component={AdminDashboard} options={{
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FastImage style={{ width: 24, height: 24, alignSelf: 'center' }} source={focused ? require('./assets/images/menu.png') : require('./assets/images/menu.png')} />
        ),
      }} />
      <Tab.Screen name='Profile' style={{ fontFamily: 'Poppins-Thin' }} component={Profile} options={{
        headerShown: false,
        tabBarIcon: ({ focused, size }) => (
          <FastImage style={{ width: 24, height: 24, alignSelf: 'center' }} source={focused ? require('./assets/images/person.png') : require('./assets/images/person.png')} />
        ),
      }} />
    </Tab.Navigator>

  )
}

export default function App({ navigation }) {
  return (
    <NavigationContainer independent ref={(ref) => setTopLevelNavigation(ref)}>
      <StatusBar barStyle="dark-content" />
      <stack.Navigator initialRouteName='Splash'>
        <stack.Screen name="Splash" component={Splash} options={{ headerShown: false, tabBarStyle: { display: 'none' } }}></stack.Screen>
        <stack.Screen name="Getstart" component={Getstart} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Onnext" component={Onnext} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Onlast" component={Onlast} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Login" component={Login} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Register" component={Register} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Otp" component={Otp} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Home" component={MyStack} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Refrence" component={Refrence} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Askrefrence" component={Askrefrence} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Detail" component={Detail} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Events" component={Events} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Gallery" component={Gallery} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Gallerydetails" component={Gallerydetails} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Call" component={Call} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Familyprofile" component={Familyprofile} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Addminnor" component={Addminnor} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ForgetPassword" component={ForgetPassword} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="TempleAdmin" component={TempleAdmin} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="AddVideoScreen" component={AddVideoScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="SelectVideoScreen" component={SelectVideoScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Notifictionscreen" component={Notifictionscreen} options={{ headerShown: false }}></stack.Screen>
        {/* added ----------------------------------------------------------------------------------------------------------- */}
        <stack.Screen name="ManageHistory" component={ManageHistory} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ManageEvent" component={ManageEvent} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ManageGallary" component={ManageGallary} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ManageGallery1" component={ManageGallery1} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="GalleryOne" component={GalleryOne} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Templee" component={Templee} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ManageEvent1" component={ManageEvent1} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Callone" component={Callone} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Myprofile" component={Myprofile} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Oldevent" component={Oldevent} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Policy" component={Policy} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Terms" component={Terms} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Aboutus" component={Aboutus} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="Logo" component={Logo} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="VideoScreen" component={VideoScreen} options={{ headerShown: false }}></stack.Screen>
        <stack.Screen name="ManageVideo" component={ManageVideo} options={{ headerShown: false }}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
};

//ca-app-pub-8863788478635375~1095493891 