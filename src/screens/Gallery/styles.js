import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    icon: {
        width: 20, height: 20,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
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
        color: '#eac030',
        fontSize: 13,
        alignSelf: 'center'
    },
    fnttwo: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'center'
    },
    title: {
        color: '#22242A',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    wel: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
    },
    id: {
        marginHorizontal: 45,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3'
    },
    fnt: {
        marginTop: 300,
        fontFamily: 'BebasNeue-Regular',
        position: 'absolute',
        color: 'white',
        fontSize: 16,
        marginHorizontal: 20
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
    emptyText:{
    alignSelf:'center', fontSize:15, fontWeight:'900', color:'#000'
    }
})
