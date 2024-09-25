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
    boxview: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '90%', alignSelf: 'center'
    },
    ask: {
        backgroundColor: '#7b221e', borderRadius: 35, padding: 7, width: '30%', alignSelf: 'flex-end'
    },
    fntone: {
        color: '#eac030', fontSize: 13, alignSelf: 'center'
    },
    fnttwo: {
        color: 'white', fontSize: 12, alignSelf: 'center'
    },
    name: {
        color: '#22242A', fontSize: 14, textAlign: 'center', fontFamily: 'Montserrat-Bold',
    },
    wel: {
        color: '#22242A', fontSize: 22, fontFamily: 'BebasNeue-Regular',
    },
    done: {
        marginHorizontal: 40, marginTop: 5, fontFamily: 'Montserrat-Bold', fontSize: 11, color: '#8D92A3',
    },
    addmintxt: {
        color: '#7B221E', fontSize: 11, fontFamily: 'Montserrat-Bold'
    },
    main: {
        alignContent: 'center', alignSelf: 'center', alignItems: 'center'
    },
    mainimg: {
        width: 370, height: 250, alignContent: 'center', alignSelf: 'center', alignItems: 'center'
    },
    maintxt: {
        color: '#22242A', marginHorizontal: 30, fontSize: 14, fontFamily: 'Montserrat-Bold',
    },
    maintxttwo: {
        marginHorizontal: 30, fontSize: 12, color: '#8D92A3', fontFamily: 'Montserrat-Regular',
    },
    serchview:{
        height:40,
        width:'95%',
        backgroundColor:"#fff",
        alignSelf:"center",
        borderRadius:50,
        marginTop:"5%",
        justifyContent:"center",
        marginBottom:'5%',
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
    menuviewstyle:{
        alignSelf:'center',
        position:"absolute",
        right:10
    },
    modalviewstyle:{
        height:55,
        width:'25%',
        alignSelf:"flex-end",
        position:'absolute',
        borderColor:'#f2f2f2',
        borderWidth:1,
        // borderTopLeftRadius:20,
        justifyContent:'center',
        // borderBottomLeftRadius:20,
        borderRadius:10,
        right:10,
        top:230,
        backgroundColor:'#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // This is s

    },
    oldeventtext:{
textAlign:'center',
fontSize:12,
color:'#000',
fontFamily: 'Poppins-SemiBold',
    },
    centerviwestyle:{
        height:1,
        width:'100%',
        backgroundColor:"#ccc",
        marginBottom:2,
        marginTop:3
    }

})