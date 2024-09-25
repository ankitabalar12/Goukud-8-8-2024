import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    mainContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white'
    },
    back: {
        height: 25,
        width: 25,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf:'flex-end'
    },
    header: {
        margin: '3%',
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: '4%',
        paddingRight: '4%',
        marginBottom: 0
    },
    name: {
        color: '#22242A',
        fontSize: 14,
        color: '#22242A',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    headerText: {
        fontSize: 14,
        color: '#22242A',
        fontFamily: 'Montserrat-Bold',
        alignSelf:'center'
    },
    Container: {
        width: '100%'
    },
    nameBar: {
        margin: '4%',
        marginTop: '2%',
        marginBottom: 0,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    namebarText: {
        marginLeft: '4%',
        marginRight: '4%',
        marginTop: 0
    },
    Content: {
        marginTop: '10%',
        width: '100%',
        paddingLeft: '10%',
        paddingRight: '10%',
    },
    wel: {
        fontSize: 22,
        color: '#22242A',
        fontFamily: 'BebasNeue-Regular',
    },
    extxt: {
        color: '#8D92A3',
        fontFamily: 'Montserrat-Bold',
        fontSize: 11
    },
    lastview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
    },
    fnt: {
        fontSize: 16,
        color: '#22242A',
        fontFamily: 'Montserrat-Bold',
    }
})