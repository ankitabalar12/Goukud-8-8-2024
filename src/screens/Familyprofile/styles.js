import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    icon: {
        width: 25, height: 25,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
    },
    dropdown: {
        marginHorizontal: 50,
        fontFamily: 'Montserrat-Regular',
        fontSize: 14
    },
    usrpic: {
        width: 35, height: 35,
        borderRadius: 50,
        marginHorizontal: 20
    },
    ask: {
        backgroundColor: '#7b221e',

        borderRadius: 35,

        padding: 7,

        width: '100%',

        alignSelf: 'flex-end'
    },
    fnttwo: {
        color: 'white',

        fontSize: 11,

        alignSelf: 'center',

        fontFamily: 'Montserrat-Bold',
    },
    name: {
        color: '#22242A',

        fontSize: 14,

        textAlign: 'center',

        fontFamily: 'Montserrat-Bold',
    },
    chooseUserName: {
        color: '#cc1a1a',
        textAlign: 'left',
        alignContent: 'flex-start'
    },
    title: {
        fontSize: 22,
        color: '#22242A',
        fontFamily: 'BebasNeue-Regular',
    },
    titleimg: {
        width: 30,
        height: 30,
        marginTop: 0
    },
    txtin: {
        marginHorizontal: 50,
        color: '#8D92A3',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14
    },
    txtdob: {
        margin: 7,
        marginHorizontal: 50,
        color: '#8D92A3',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14

    },
    owner: {
        color: '#22242A',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    occuption: {
        fontSize: 10,
        color: '#8D92A3',
        fontFamily: 'Montserrat-Regular',
    }, viewbox: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 0,
        padding: 9
    },
    edittext:{
        alignSelf:'center',
        fontSize:13, fontWeight:'900'
    }
})