import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as loginValidation from "../../validations/ConfirmPass";
import Text from "../../components/Typography";
import Button from "../../components/Button";

import Input from "../../components/Input";

import * as THEME from "../../libs/theme";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../actions";
import ImageSlider from 'react-native-image-slider'
import { LOGIN_MUTATION } from "../../graphql";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Success extends Component {
  render() {
    const images = [
      require("../../images/v2/image_1.png"),
      require("../../images/v2/image_2.png"),
      require("../../images/v2/login_img.png"),
    ];
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        // keyboardVerticalOffset={-64}
      >
        <Mutation
          mutation={LOGIN_MUTATION}
          update={(store, { data: { login } }) => {
            console.log(login);
            this.props.login(login.token, login.user);
          }}
        >
          {(login, { loading, error, data }) => {
            if (error) {
              Alert.alert(
                "Authentication Error",
                "The email and password combination used is incorrect",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              );
            }

            const handleSubmit = (values, action) => {
              // login({
              //   variables: { email: values.email, password: values.password },
              // });

              
            };

            return (
              <Formik
                initialValues={loginValidation.initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginValidation.schema}
              >
                {(formikProps) => (
                  <View style={{ height: "100%",backgroundColor:'#000000' }}>
                    <StatusBar  barStyle="light-content" />
                    
                    <View style={styles.footerContainer}>
                      <Image
                      style={{width:'100%',height:Dimensions.get('screen').height*0.2}}
                      source={require('../../v3/sucessM.png')}
                      />
                      <View style={styles.formContainer}>
                        <Text
                        medium
                        style={{marginVertical:'5%',width:'90%',alignSelf:'center',textAlign:'center',color:'#FCFCFD'}}
                        >The password has been changed 
                        successfully!</Text>
                       
                        {/* <Input
                        keyboardType='numeric'
                          label=" "
                          formikKey="code"
                          formikProps={formikProps}
                          placeholder="Verification code"
                          containerStyle={{ marginBottom: 30 }}
                        /> */}
                        
                      </View>
                      <View style={{marginTop:'10%',}}>
                      <Button
                      
                         bgColor="#fff"
                         textColor="#fff"
                         rounded
                        rounded
                        onPress={()=>{
                          const AUTH_TOKEN = "@wave:token";
              const AUTH_USER = "@wave:user";
              AsyncStorage.removeItem(AUTH_TOKEN);
              AsyncStorage.removeItem(AUTH_USER);
              this.props.navigation.navigate("Login");
                        }}
                      >
                      Continue
                      </Button>
                      </View>
                      {/* <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.newAccountBtn}
                      >
                        <Text weight="medium" meta color="gray">
                          Forgot Password?
                        </Text>
                      </TouchableOpacity> */}
                    </View>
                  </View>
                )}
              </Formik>
            );
          }}
        </Mutation>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: { 
    width: Dimensions.get('screen').width,
     height: '100%' },
  formContainer: {
    width: "100%",
  },
  footerContainer: {
    flex: 0.9,
    flexDirection: "column",
    padding: 18,
    // alignItems: "center",
    // paddingTop: 40,
    justifyContent:'center',
    // backgroundColor:"red"
  },
  newAccountBtn: { 
    marginTop: 30,
    marginBottom: 58,
    alignSelf:'center'
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { login })(Success);
