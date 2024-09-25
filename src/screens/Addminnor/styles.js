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
        alignSelf: 'center',
        fontFamily: 'Bebas Neue'
    },
    ask: {
        backgroundColor: '#7b221e',
        borderRadius: 35,
        padding: 7,
        width: '30%',
        alignSelf: 'flex-end',
        fontFamily: 'Bebas Neue'
    },
    fntone: {
        color: '#EBC130',
        fontSize: 10,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    fnttwo: {
        color: 'white',
        fontSize: 10,
        alignSelf: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    name: {
        color: '#22242A',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    wel: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular'
    },
    id: {
        marginHorizontal: 45,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3'
    },
    viewimg: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        alignItems: 'center'
    },
    comimg: {
        flex: 1,
        width: 85,
        borderRadius: 20
        
    }
})