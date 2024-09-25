import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    back: {
        height: 20,
        width: 20,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
    },
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '50%', alignSelf: 'center'
    },
    fnttwo: {
        color: 'white', fontSize: 11, alignSelf: 'center', fontFamily: 'Montserrat-Bold',
    },
    header: {
        margin: '3%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    headerText: {
        fontSize: 14,
        color: '#22242A',
        fontFamily: 'Montserrat-Bold',
    },
    Container: {
        margin: '3%',
        paddingLeft: '4%',
        paddingRight: '4%',
    },
    inputHistory: {
        fontSize: 14,
        color: '#CDCDD7',
        fontFamily: 'Montserrat-Regular',
        width: '100%'
    },
    line: {
        height: 1,
        backgroundColor: '#8d93a3'
    },
    add: {
        marginLeft: '3%',
        marginRight: '3%',
        paddingLeft: '4%',
        paddingRight: '4%',
        marginTop: 5
    },
    addImage: {
        flexDirection: 'row'
    },
    photos: {
        width: '80%',
        flexDirection: 'row'
    },
    image: {
        height: 70,
        width: 70,
        margin: 10,
        borderRadius: 5,

    },
    send: {
        height: 20,
        width: 20
    },
    fview: {
        width: 2, height: 20, backgroundColor: '#6478d3'
    },
    chooseUserName:{
        color:'#cc1a1a',
        textAlign:'left',
        alignContent:'flex-start'
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
    addimg: {
        marginRight: 15, fontSize: 14, color: '#CDCDD7', fontFamily: 'Montserrat-Regular',
    },
    txtin: {
        marginLeft: 5, padding: 0, fontSize: 14, color: '#CDCDD7', fontFamily: 'Montserrat-Regular', width: '100%'
    }
})