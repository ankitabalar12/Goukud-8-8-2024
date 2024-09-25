import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({

  contentview: {
    width: '100%',
    padding: 25,
  },
  heading: {
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    fontSize: 25,
    marginTop: 5,
    marginBottom: 10
  },
  extratxt: {
    color: '#333333',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Poppins-Regular'
  },
  contenttxt: {
    color: '#333333',
    fontSize: 15,
    marginTop: 10,
    fontFamily: 'Poppins-Regular'
  },
  showinput: {
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: '#aaaaaa',
    borderBottomWidth: 1,
    width: '100%',
    borderStyle: 'solid',
    alignSelf: 'center',
    fontFamily: 'Poppins-Regular'
  },
  textInput: {
    color: '#f9a826',
    paddingBottom: 3,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    width: '100%'
  },
  Label: {
    fontSize: 14,
    color: '#172791',
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Regular'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginTop: 10
  },
  checkbox: {
    alignSelf: "center",
  },
  forgottxt: {
    color: 'gray',
    fontSize: 14,
    marginTop: 5,
    fontFamily: 'Poppins-Regular'
  },
  btnclass: {
    width: '80%',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: '#f9a826',
    color: '#ffffff',
    height: 40,
    marginBottom: 30,
    borderRadius: 8,
    fontFamily: 'Poppins-SemiBold'
  },
  chooseUserName: {
    color: '#cc1a1a',
    textAlign: 'left',
    alignContent: 'flex-start'
  },


  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    marginHorizontal: 40,
    color: 'grey'
  },
  button: {
    backgroundColor: '#49c2c6',
    padding: 10,
    width: '94%',
    borderRadius: 5,
    textAlign: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  viewfirst: {
    backgroundColor: '#005e69',
    padding: 1,
    width: '10%',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10
  },
  viewsecound: {
    backgroundColor: '#C0C0C0',
    padding: 1,
    width: '4%',
    borderRadius: 5,
    textAlign: 'center',
    marginTop: 10
  },
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000000c0',
  },
  text: {
    marginTop: '80%',
    // backgroundColor: '#000000c0',
  },
 
})