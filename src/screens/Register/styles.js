import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  arrow: {
    width: 30,
    height: 30,
    margin: 20
  },
  textInput: {
    paddingBottom: 3,
    marginHorizontal: 10,
    width: '100%',
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  },

  validate: {
    color: '#cc1a1a',
    textAlign: 'left',
    alignContent: 'flex-start',

  },
  icon: {
    width: 23, height: 23,
    marginTop: Platform.OS === "ios" ? 5 : 15,
    marginBottom: Platform.OS === "ios" ? 10 : 10,
  },
  showinput: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#829ead',
    borderBottomWidth: 1,
    width: '100%',
    borderStyle: 'solid',
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? 10 : 0,
    fontFamily: 'Bebas Neue'
  },
  dropdown: {
    borderColor: '#829ead',
    borderRadius: 8,
    paddingHorizontal: 8,
    // borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'center',
    borderStyle: 'solid',
  },
  loader: {
    transform: [{ scale: 1.5 }], // Example: increase the size by scaling
    borderRadius: 10,
    // backgroundColor:'#6b6b6b', 
    padding: 10,
  },
  spinner: {
    position: 'absolute',
    top: -15,
    height: 70,
    width: 70,
    alignSelf: 'center',
    top: '50%'

  },
  regi: {
    color: 'white', fontFamily: 'BebasNeue-Regular', fontSize: 28,
  },
  regiimg: {
    marginTop: 10, width: 35, height: 35, alignContent: 'center', alignItems: 'center'
  },
  logintxt: {
    color: '#FFFFFF', fontSize: 14, textAlign: 'right', fontFamily: 'Montserrat-Regular'
  },
  tnc: {
    color: '#EBC130', padding: 6, textAlign: 'center', fontSize: 11, fontFamily: 'Montserrat-Bold'
  },
  submit: {
    width: '100%', backgroundColor: 'white', alignContent: 'center', alignSelf: 'center', justifyContent: 'center', borderRadius: 40, height: 45
  }, phonimg: {
    width: 35, height: 35, alignContent: 'center', alignItems: 'center'
  },
  padlockimg:{
    height:20,
    width:15,
    marginLeft:"5%",
    marginTop:10
  },
  padlockimg2:{
    tintColor:'#ffff',
    height:15,
    width:20,
    marginLeft:"5%",
    marginTop:10
  }
})