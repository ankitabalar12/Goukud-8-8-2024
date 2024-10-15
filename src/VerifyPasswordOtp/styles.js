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
      otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:'6%',
        marginTop:'10%',
      
    },
    otpInput: {
        width: 50,
        height: 50,
        borderRadius: 5,
        textAlign: 'center',
        marginHorizontal: 5,
        backgroundColor: '#f2f2f2',
        borderBottomColor: '#fff',
        borderBottomWidth: 0,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    otpInput2: {
        width: 50,
        height: 50,
        borderRadius: 50,
        textAlign: 'center',
        marginHorizontal: 20,
        backgroundColor: 'pink',
        borderBottomColor: '#fff'
    },
    mobitexttext:{
      color:'#fff', fontSize:15,
      fontWeight:'900', marginLeft:'1%'
    },
    // filledOtpBox: {
    //   backgroundColor: 'yellow', // Background color when OTP digit is filled
    // },
    inputTextStyle: {
      fontSize: 24,
      color: '#ebc130',
      // Change this color to the desired text color for the OTP input
    },
    outputtexr:{
      fontSize:20,
       fontWeight:'900'
    }
})