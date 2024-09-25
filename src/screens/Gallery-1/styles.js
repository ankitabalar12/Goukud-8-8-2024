import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontSize: 22, color: '#22242A', fontFamily: 'BebasNeue-Regular',
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
    alview: {
        width: 350, height: 400, alignSelf: 'center',borderWidth:0
    },
    fnt: {
        fontFamily: 'BebasNeue-Regular', marginTop: 300, color: 'white', fontSize: 24, marginHorizontal: 20,position:'absolute',zIndex:1111
 
    
    },
    fnt1: {
        fontFamily: 'Montserrat-Bold', marginTop: 330, color: 'white', fontSize: 11, marginHorizontal: 20, position:'absolute',zIndex:1111
       
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
})