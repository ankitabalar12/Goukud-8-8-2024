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
    boxview: {
        backgroundColor: '#7b221e',
        borderRadius: 35,
        padding: 7,
        width: '90%',
        alignSelf: 'center'
    },
    ask: {
        backgroundColor: '#7b221e',
        borderRadius: 35,
        padding: 7,
        width: '30%',
        alignSelf: 'flex-end'
    },
    fntone: {
        color: '#EBC130',
        fontSize: 9,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    fnttwo: {
        color: 'white',
        fontSize: 9,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    name: {
        color: '#22242A',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    title: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
    },
    id: {
        marginHorizontal: 45,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3',
    },
    alltxt: {
        marginTop: 330,
        fontFamily: 'BebasNeue-Regular',
        position: 'absolute',
        color: 'white',
        fontSize: 24,
        marginHorizontal: 20
    },
    alltxt1: {
        marginTop: 300,
        fontFamily: 'DancingScript-Bold',
        position: 'absolute',
        color: 'white',
        fontSize: 20,
        marginHorizontal: 20
    }

})