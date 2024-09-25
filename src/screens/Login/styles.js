import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  arrow: {
    width: 30,
    height: 30,
    margin: 20
  },
  textInput: {
    // paddingBottom: 3,
    marginLeft: 10,
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
    fontSize: 14
  },
  login: {
    color: 'white', fontSize: 28, fontFamily: 'BebasNeue-Regular'
  },
  spinner: {
    position: 'absolute',
    top: -15,
    height: 70,
    width: 70,
    alignSelf: 'center',
    top: '50%'

  },
  icon: {
    width: 32, height: 32,
    tintColor:'#ffff',
    marginTop: Platform.OS === "ios" ? 5 : 15,
    marginBottom: Platform.OS === "ios" ? 10 : 10,
  },
  icon2:{
    width: 15, height: 20,
    marginTop: Platform.OS === "ios" ? 5 : 15,
    marginBottom: Platform.OS === "ios" ? 10 : 10,
  
  },
  showinput: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#aaaaaa',
    borderBottomWidth: 1,
    width: '102%',
    borderStyle: 'solid',
    fontFamily: 'Bebas Neue',
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  subbtn: {
    width: '100%',
     backgroundColor: 'white', 
     alignContent: 'center',
      alignSelf: 'center', 
     justifyContent: 'center', 
     borderRadius: 40,
      height: 45
  },
  suntxt: {
    textAlign: 'center',
     color: '#22242A',
     fontSize: 14,
     fontFamily: 'Montserrat-Bold'
  },
  validate:{
    color:'#cc1a1a',
    textAlign:'left',
    alignContent:'flex-start'
},
passwoedview:{
  flexDirection:"row",
  marginLeft:'2%'

},
textInputwo:{
  marginLeft:'5%'
},
heightwviewstyle:{
  height:2,
  width:'100%',
  backgroundColor:'#aaaa'

},
flexrowtextline:{
  flexDirection:"row",
  justifyContent:"space-between",
  marginHorizontal:'5%'
}
})