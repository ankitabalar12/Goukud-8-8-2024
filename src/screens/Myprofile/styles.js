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
    came:{
        borderRadius: 100, borderWidth:0, width: 130, height: 130, alignSelf: 'center',flex:1
    },
    ielipcon: {
        width: 50, height: 60
    },
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '30%', alignSelf: 'flex-end'
    },
    fnttwo: {
        color: 'white', alignSelf: 'center', fontSize: 11, fontFamily: 'Montserrat-Bold'
    },
    fntone: {
        color: '#eac030', fontSize: 13, alignSelf: 'center'
    },
    name: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
})