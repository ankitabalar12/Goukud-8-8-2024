import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    icon: {
        width: 25, height: 25,alignSelf:'center'
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
    },
    usrpic: {
        width: 40, height: 40,
        borderRadius: 50,
        marginHorizontal: 20
    },
    ielipcon: {
        width: 50, height: 60
    },
    dropdown: {
        borderColor: '#829ead',
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '100%',
        alignSelf: 'center',
        borderStyle: 'solid',
        fontSize:10,
        padding:0,
    },
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '100%', alignSelf: 'flex-end'
    },
    fntone: {
        color: '#eac030', fontSize: 13, alignSelf: 'center'
    },
    fnttwo: {
        color: 'white', fontSize: 11, alignSelf: 'center', fontFamily: 'Montserrat-Bold'
    },
    fview: {
        width: 2, height: 20, backgroundColor: '#6478d3'
    },
    inputHistory: {
        fontSize: 14,
        color: '#CDCDD7',
        fontFamily: 'Montserrat-Regular',
        width: '100%'
    },
    name: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
})