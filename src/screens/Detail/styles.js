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
        marginHorizontal: 20
    },
    ielipcon: {
        width: 50, height: 60
    },
    swiperView: {
        width: "100%",
        height: 280,
        // marginLeft: 30,
        borderRadius: 5,
        alignSelf: 'center',
        alignItems:'center',
        borderWidth: 0
    },
    name: {
        color: '#22242A',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    admin: {
        color: '#7B221E',
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
    },
    event: {
        fontSize: 28,
        color: '#7B221E',
        textAlign: 'center',
        fontFamily: 'DancingScript-Bold',
    },
    dise: {
        fontSize: 28,
        color: '#22242A',
        textAlign: 'center',
        fontFamily: 'BebasNeue-Regular',
    },

    slidimg: {
        
        height: 250,
        borderRadius: 30,
        borderWidth:0
    },
    lasttxt: {
        fontSize: 12,
        color: '#22242A',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
        lineHeight: 22
    },
    wel: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
    },
    id: {
        marginLeft:'30%',
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3'
    },
    usertextdata:{
        color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold', 
        marginTop:'3%'  
    },
    eventtxtstyle:{
        fontSize:15,
        color:'#000',
        fontFamily: 'Poppins-SemiBold',
    }
})