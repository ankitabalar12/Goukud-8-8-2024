import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  arrow: {
    width: 30,
    height: 30,
    margin: 20
  },
  textInput: {
    paddingBottom: 3,
    // marginLeft: 10,
    width: '100%',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#8D92A3'
  },
  otpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInput2: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginHorizontal: 4,
    textAlign: 'center',
    fontSize: 24,

  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderRadius: 50, // Half of the width and height to make it a circle
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
    marginHorizontal: 10,
    fontSize: 0,

    // Clip the input inside the rounded shape
  },
  otpBox: {
    width: 40,
    height: 40,
    borderRadius: 50, // Half of the width and height to make it a circle
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
    marginHorizontal: 10,
    fontSize: 0,
  },
  filledOtpBox: {
    backgroundColor: 'yellow', // Background color when OTP digit is filled
  },
  filledInput: {
    width: 40,
    height: 40,
    borderRadius: 50, // Half of the width and height to make it a circle
    borderWidth: 1,
    borderColor: 'gray',
    overflow: 'hidden',
    marginHorizontal: 10,
    fontSize: 0,
    textAlign: 'center',
    backgroundColor: '#ebc130',
    borderColor: '#ebc130'
  },
  inputTextStyle: {
    fontSize: 24,
    color: '#ebc130',
    // Change this color to the desired text color for the OTP input
  },
  icon: {
    width: 32, height: 32,
    marginTop: Platform.OS === "ios" ? 5 : 15,
    marginBottom: Platform.OS === "ios" ? 10 : 10,
  },
  filledOtpInput: {
    backgroundColor: 'green',
  },
  showinput: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#aaaaaa',
    borderBottomWidth: 1,
    width: '102%',
    borderStyle: 'solid',
    alignSelf: 'center',
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
})