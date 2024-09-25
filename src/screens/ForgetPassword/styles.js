import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    login: {
        color: 'white', fontSize: 28, fontFamily: 'BebasNeue-Regular',
        marginLeft:'5%'
      },
      showinput: {
        flexDirection: 'row',
        marginBottom: 10,
        borderColor: '#aaaaaa',
        borderBottomWidth: 1,
        width: '90%',
        borderStyle: 'solid',
        fontFamily: 'Bebas Neue',
        alignSelf: 'center',
        marginTop: Platform.OS === "ios" ? 10 : 0,
      },
      icon: {
        width: 20, height: 20,
        tintColor:'#fff',
        marginTop: Platform.OS === "ios" ? 5 : 15,
        marginBottom: Platform.OS === "ios" ? 10 : 10,
      },
      textInput: {
        // paddingBottom: 3,
        marginLeft: 10,
        width: '100%',
        color: '#FFFFFF',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14
      },
      validate:{
        color:'#cc1a1a',
        textAlign:'left',
        alignContent:'flex-start',
        marginLeft:'5%'
    },
    subbtn: {
        width: '90%',
         backgroundColor: 'white', 
         alignContent: 'center',
          alignSelf: 'center', 
         justifyContent: 'center', 
         borderRadius: 40,
          height: 45,
          marginTop:"15%"
      },
      suntxt: {
        textAlign: 'center',
         color: '#22242A',
         fontSize: 14,
         fontFamily: 'Montserrat-Bold'
      },
      arrow: {
        width: 20,
        height: 20,
        margin: 20
      },
})