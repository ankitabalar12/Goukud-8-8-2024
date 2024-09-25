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
    name: {
        color: '#22242A',
        fontSize: 14,
        color: '#22242A',
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold',
    },
    others: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
    },
    part: {
        color: '#22242A',
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        // backgroundColor:'red'
    },
    titles: {
        color: '#6478D3',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold',
    },
    serchview:{
        height:40,
        width:'95%',
        backgroundColor:"#fff",
        alignSelf:"center",
        borderRadius:50,
        marginTop:"5%",
        justifyContent:"center",
        // borderBottomColor:"#16181d",
        // borderBottomWidth:1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // This is for Android

    },
    flexdreactionview:{
        flexDirection:"row",
        marginHorizontal:'5%'
        
    },
    sarechimg:{
        height:20,
        width:20,
        alignSelf:'center',
        tintColor:'#aaaa'
    },
    serachtext:{
        marginLeft:'5%'
    }
})