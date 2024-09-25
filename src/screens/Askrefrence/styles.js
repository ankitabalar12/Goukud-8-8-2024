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
        width: 50, height: 50,
        borderRadius: 50,
        marginHorizontal: 20
    },
    ielipcon: {
        width: 50, height: 60
    },
    swiperView: {
        width: "100%",
        height: 300,
        marginLeft: 30,
        borderRadius: 5,
        alignSelf: 'center'
    },
    name: {
        color: '#22242A',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    temname: {
        fontSize: 28,
        color: '#7B221E',
        textAlign: 'center', fontFamily: 'DancingScript-Bold',
    },
    title: {
        fontSize: 28,
        color: '#22242A',
        textAlign: 'center',
        fontFamily: 'BebasNeue-Regular',
    },
    disc: {
        fontSize: 12,
        color: '#22242A',
        textAlign: 'left',
        fontFamily: 'Montserrat-Regular',
        lineHeight: 22
    },

})