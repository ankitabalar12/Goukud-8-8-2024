import { Dimensions, Platform, StyleSheet } from "react-native";
const { width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    icon: {
        width: 25, height: 25,
    },
    iconper: {
        width: 100, height: 59,
        alignSelf: 'flex-end'
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
    name: {
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
    done: {
        marginHorizontal: 40,
        marginTop: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 11,
        color: '#8D92A3',
    },

    addmintxt: {
        color: '#7B221E',
        fontSize: 11,
        fontFamily: 'Montserrat-Bold'
    },
    main: {
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainimg: {
        width: 370,
        height: 250,
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    maintxt: {
        color: '#22242A',
        marginHorizontal: 30,
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
    },
    maintxttwo: {
        marginHorizontal: 30,
        fontSize: 12,
        color: '#8D92A3',
        fontFamily: 'Montserrat-Regular',
    },
    videoviewstyle:
    {
        height: 300,
        width: '95%',
        backgroundColor: "#aaaa",
        justifyContent: 'center'
    },
    flexrowvideo: {
        flexDirection: "row",
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '5%'
    },
    videoviewtwo: {
        // height:100,
        // width:200, 
        // backgroundColor:'red',
        // marginTop:"10%",
        // marginBottom:'10%',
        // margin:4,
        // justifyContent:'center',
        width: (width / 3.5) - 20, // Adjust width for small images, accounting for margin
        height: 100, // Small height
        margin: 5, // Margin between small images
    },
    scroviewmar: {
        marginTop: '25%'
    },
    videovidf: {
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    },
    videoviewthre: {
        alignSelf: "center",
        height: "100%",
        width: '100%'
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
    adstext:{
        textAlign:'center',
        marginTop:'5%',
        fontFamily: 'Montserrat-Bold',
    },
    youtubeiconstyle3:{
        height: 15,
        width: 15,
        zIndex: 1,
        position: "absolute",
        bottom: 140,
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
    foundtext:{
        textAlign:'center',
        marginTop:'5%',
        color:'#000'
    },
    overlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 150, // Must match the height of the WebView
      },
      icon2: {
      height:30, width:30
      },
      modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      fullScreenWebView: {
        width: '100%',
        height: '80%',
      },
      closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
      },
      closeIcon: {
        width: 30,
        height: 30,
      },

})