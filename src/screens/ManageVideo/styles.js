import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontSize: 20, color: '#22242A', fontFamily: 'BebasNeue-Regular',
    },
    titleimg: {
        width: 30, height: 30, marginTop: 0
    },
    icon: {
        width: 25, height: 25,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
    },
    usrpic: {
        width: 35, height: 35,
        borderRadius: 50,
        marginHorizontal: 20
    },
    ielipcon: {
        width: 50, height: 60
    },
    boxview: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '90%', alignSelf: 'center'
    },
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '30%', alignSelf: 'flex-end'
    },
    fntone: {
        color: '#eac030', fontSize: 13, alignSelf: 'center'
    },
    fnttwo: {
        color: 'white', fontSize: 12, alignSelf: 'center'
    },
    manegg: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
    wel: {
        color: '#22242A', fontSize: 22, fontFamily: 'BebasNeue-Regular',
    },
    id: {
        marginHorizontal: 45, marginTop: 5, fontFamily: 'Montserrat-Bold', color: '#8D92A3', fontSize: 11
    },

    // videoContainer: {
    //     height:"100%",
    //     width: '100%',
    //     // marginVertical: 10,
    //     backgroundColor:'yellow'

    // },
    videoWrapper: {
        height: 900,
        width: '100%',
        alignSelf: 'center',
        backgroundColor:'red',
        marginTop:10
    },

    video:{
        height:100,
        width: 100,
       
    },

    alview: {
        width: 350, height: 400, alignSelf: 'center',borderWidth:0
    },
    fnt: {
        fontFamily: 'BebasNeue-Regular', marginTop: 300, color: 'white', fontSize: 24, marginHorizontal: 20,position:'absolute',zIndex:1111
 
    
    },
    fnt1: {
        marginTop: 330,
        fontFamily: 'Montserrat-Bold',
        position: 'absolute',
        color: 'white',
        fontSize: 11,
        marginHorizontal: 20
    }
    ,fnt2:{
        color: 'white',
        fontSize: 11,
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(24, 24, 24, 0.075)',
        position: 'absolute',
        top: 0,
        zIndex: 9999,
        height: '100%',
        width: '100%'
    },
    adstext:{
        alignSelf:"center",
        fontWeight:'900',
        marginTop:'5%'
    },
    icon2: {
        height:30, width:30
        },
        overlay: {
            position: 'absolute',
             bottom:-90, 
             left:30,
            width: '100%',
            height: 150, // Must match the height of the WebView
          },
          videovidf: {
            alignSelf: 'center',
            width: '100%',
            height: '100%', backgroundColor:'#FFF'
        },
        fnt2:{
            color: 'white',
            fontSize: 11,
        },
        // videoContainer:{
        //     height:900, width:'95%', 
        //     backgroundColor:'pink',
        // }
})