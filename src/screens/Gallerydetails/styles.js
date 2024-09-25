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
    name: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
        color: '#22242A'
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
        color: '#8D92A3',
        fontSize: 11
    },
    viewimg: {
        width: 100,
        height: 100,
        // alignSelf: 'center',
        // alignItems: 'center',
        borderWidth:1,
        // flexDirection: 'row'
    },
    imgimg: {
        // flex: 1,
       height:80,
       width:80,
        borderRadius: 20,
        // borderWidth:1,
        marginRight:13
    },
    container2:{
        // borderWidth:1,
        height:190
    },
})