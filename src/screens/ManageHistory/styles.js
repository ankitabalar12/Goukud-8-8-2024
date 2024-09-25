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
        width: 40, height: 40,
        borderRadius: 50,
    },
    ielipcon: {
        width: 50, height: 60
    },
    swiperView: {
        width: "100%",
        height: 300,
        borderRadius: 5,
        alignSelf: 'center',
        borderWidth:0,
    },
    name: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
    admin: {
        color: '#7B221E', fontFamily: 'Montserrat-Bold', fontSize: 11,
    },
    event: {
        fontSize: 28, color: '#7B221E', textAlign: 'center', fontFamily: 'DancingScript-Bold',
    },
    dise: {
        fontSize: 28, color: '#22242A', textAlign: 'center', fontFamily: 'BebasNeue-Regular',
    },
    disered: {
        fontSize: 28, color: '#7B221E', textAlign: 'center', fontFamily: 'BebasNeue-Regular',
    },
    slidimg: {
        width: 320, height: 250, borderRadius: 30,alignSelf:'center',margin:9
    },
    lasttxt: {
        fontSize: 12, color: '#22242A', textAlign: 'center', fontFamily: 'Montserrat-Regular',lineHeight:22
    }
})