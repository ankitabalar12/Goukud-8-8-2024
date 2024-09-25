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
    serchview:{
        height:40,
        width:'90%',
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
    },
    wel: {
        color: '#22242A',
        fontSize: 22,
        fontFamily: 'BebasNeue-Regular',
    },
    done: {
        marginHorizontal: 40,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3',
    },
    flexrowstlw:{
        flexDirection: 'row', justifyContent:'space-between', marginHorizontal:'5%', marginTop:'5%' 
    },
    flexrowviewstyle:{
        flexDirection:"row"
    },
    addimgstyle:{
        height:20,
        width:20,
        tintColor:'#ebc130',
        alignSelf:'center',
        marginLeft:'5%'
    },
    imagesvidestyles:{
        height:250,
        width:'90%',
        // backgroundColor:'#f2f2f2',
        alignSelf:'center',
        marginTop:'3%'
    },
    usertextdata:{
        color: '#8D92A3', fontSize: 11, fontFamily: 'Montserrat-Bold', marginLeft:'5%'   
    },
    videotextstyle:{
        color: '#000', fontSize: 15,     fontFamily: 'Poppins-SemiBold', marginLeft:"5%",marginTop:3     
    },
    widhstyle:{
        width: '50%'    
    },
    title: {
        fontSize: 22, color: '#22242A', fontFamily: 'BebasNeue-Regular',
        marginLeft:'5%'
    },
    titleimg: {
        width: 30, height: 30, 
    alignSelf:'flex-start'
       
    },
    videoviewstylgdfg:{
        alignSelf:'center',
        height:200,
        width:200
    },
    videoviewstyle:
    {
        height: 300,
        width: '95%',
        // backgroundColor: "#aaaa",
        justifyContent: 'center'
    },
    adstext:{
        alignSelf:'center',
        marginTop:'5%'
    },
    youtubeiconstyle: {
        height: 15,
        width: 15,
        zIndex: 1,
        position: "absolute",
        bottom: 280,
        right:0,
        alignSelf: 'center',
        tintColor:'red'

    },
    activeview:{
        alignSelf:'flex-end',
        marginRight:'5%',
        height:22,
        width:'25%',
        borderRadius:20,
        justifyContent:'center',
         backgroundColor:'#77eb34'
     },
     arrowstyle:{
        color:'#000',
        textAlign:'center'
     },
     modalviewstyle:{
         height:50, width:"50%",
         backgroundColor:'red'
     },
     martop:{
        marginTop:'90%'
     }
})