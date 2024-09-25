import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    flexrowview: {
        flexDirection: "row",
        justifyContent: 'space-between',
        marginTop: '5%',
        marginHorizontal: '5%'

    },
    notification: {
        height: 18,
        width: 15
    },
    goundertextstyle: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
    },
    sreachview: {
        height: 40,
        width: '90%',
        backgroundColor: '#fff',
        borderColor: '#cccc',
        borderWidth: 2,
        alignSelf: 'center',
       
        justifyContent: 'center',
        marginTop: '5%',
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8, // For Android

    },
    searchInput:{
        marginLeft:'2%',
        alignSelf:'center'
    },
    flexviewrowsreach:{
        flexDirection:"row"
    },
    iconsearchicon:{
        alignSelf:"center",
        height:20,
        width:20,
       marginLeft:"5%"
    },
    templead:{
        color:'#000',
        marginLeft:'6%',
        fontSize: 15,
        fontFamily: 'Poppins-SemiBold',
        marginTop:'5%'
    },
    detailsview:{
        height:60,
        width:'90%',
        // backgroundColor:'#f2f2f2',/
        alignSelf:'center',
        borderRadius:15,
        marginTop:"2%",
        justifyContent:'center'
    },
    fleximagesview:{
      flexDirection:'row' ,
      marginHorizontal:'2%'
    },
    imgview:{
        height:60,
        width:60,
        backgroundColor:'red',
        borderRadius:10
    },
    textstyle:{
        color:'#000',
        fontSize:15,
        fontFamily: 'Poppins-SemiBold',
        alignSelf:'center',
        // marginLeft:"5%"

    },
    callside:{
        position:"absolute",
        right:15,
        alignSelf:'center'
    },
    materialsymboligm:{
        height:20,
        width:30,
       
    },
    cloumetext:{
        alignSelf:'center',
        marginLeft:'3%'

    },
    textstyle2:{
        fontSize:12,
        color:"#6478D3"
    },
    fullimg:{
        height:'100%',
        width:'100%',
        borderRadius:10
    }

})