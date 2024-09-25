import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '60%', alignSelf: 'flex-end'
    },
   tempadd: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '100%', alignSelf: 'flex-end'
    },
    fnttwo: {
        color: 'white', alignSelf: 'center', fontSize: 12, fontFamily: 'Montserrat-Bold'
    },
    fntone: {
        color: '#eac030', fontSize: 13, alignSelf: 'center'
    },
    name: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
    // spinner: {
    //     position: 'absolute',
    //     top: -15,
    //     height: 70,
    //     width: 70,
    //     alignSelf: 'center',
    //     top: '50%'

    // },
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
    models: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 13,
        marginLeft: 20,
        marginBottom: 100,
        marginRight: 20,
        borderRadius: 10
    },
    btn2: {
        borderWidth: 1,
        // alignSelf:'center',
        borderRadius: 10,
        padding: 5,
        alignSelf: 'center',
        backgroundColor: '#000000'
        // height:40
    },
    btntxt2: {
        fontSize: 25,
        alignSelf: 'center',
        color: '#ffffff'
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    name:{
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold'
    },
    pro:{
        color: '#22242A', fontFamily: 'BebasNeue-Regular', fontSize: 22
    },
    abus:{
        color: '#22242A', fontFamily: 'BebasNeue-Regular', fontSize: 22,textAlign:'right'
    }
    ,
    came:{
        borderRadius: 100, borderWidth:0, width: 100, height: 100, alignSelf: 'center', marginTop: 30 
    },
    notificationbutton:{
        flexDirection:'row',

    },
    notificationicon:{
        height:18.5,
        width:17,
    },
    notiside:{
        position:'absolute',
        right:15
    }
})