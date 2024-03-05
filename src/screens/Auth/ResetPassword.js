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
import * as loginValidation from "../../validations/Verification";
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
import API from "../../libs/api";
import { Ionicons } from "@expo/vector-icons";
import Loading from "../Loading";

class ResetPassword extends Component {
  constructor(props){
    super(props)
    this.state={
      loading:false
    }
  }
  render() {
    const images = [
      require("../../images/v2/image_1.png"),
      require("../../images/v2/image_2.png"),
      require("../../images/v2/login_img.png"),
    ];
    if (this.state.loading) {
      return <Loading />;
    }
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
              this.setState({
                loading: true,
           
              });
              let formData = new URLSearchParams();

              formData.append('email',this.props.route.params.email)
              formData.append('otp',values.code)
              API.otpVerify(formData)
              .then(async (res) => {
                if(res){
                  console.log('res',res.data);
                  if(res.data[0]?.email){

                    this.props.navigation.navigate('CreateNewPassword',{email:res.data[0]?.email})
                  }
                  else{
                    Alert.alert(
                      'Otp error',
                      'Please enter valid otp.',
                      [
                        {text:'Ok',onPress:()=>{}}
                      ]
                      )
                  }
                }

              this.setState({
                loading: false,
           
              });
            
            })
              .catch((err) => {
                if (err.response) {
                  console.log(err.response.data.error);
                } else {
                  console.log(err.message);
                }
                this.setState({ loading: false });
              });


              
            };
           
            return (
              <Formik
                initialValues={loginValidation.initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginValidation.schema}
              >
                {(formikProps) => (
                  <View style={{ height: "100%" }}>
                      <TouchableOpacity style={{ height: 30, width: 30,position:'absolute',top:20,zIndex:99999,left:20 }} onPress={() => this.props.navigation.goBack()}>
                      <Ionicons
                        name="ios-arrow-back"
                        size={30}
                        color={THEME.Colors.primary}
                      />

                    </TouchableOpacity>
                    <StatusBar hidden barStyle="light-content" />
                    <ImageSlider
                    style={{backgroundColor:'transparent'}}
          // loopBothSides
          autoPlayWithInterval={3000}
          images={images}
          customSlide={({ index, item, style, width }) => (
                    <ImageBackground
                    resizeMode='cover'
                      style={styles.imageBackground}
                      source={item}
                    >
                       <Image
            resizeMode="contain"
            style={{height:'40%',bottom:0,alignSelf:'center',position:'absolute',width:'40%'}}
            source={require("../../images/v2/splash_logo.png")}
          />
                      </ImageBackground>
                        )}
                        
                        />
                    <ScrollView style={styles.footerContainer}>
                      <View style={styles.formContainer}>
                        <Text
                        style={{marginTop:10}}
                        >RESET PASSWORD</Text>
                        <Text style={{marginTop:10,color:'#707070'}}>
                        Enter verification code sent to registred email
                        </Text>
                        <Input
                        keyboardType='numeric'
                          label=" "
                          formikKey="code"
                          formikProps={formikProps}
                          placeholder="Verification code"
                          containerStyle={{ marginBottom: 30 }}
                        />
                        {/* <Input
                          label="PASSWORD"
                          formikKey="password"
                          formikProps={formikProps}
                          placeholder="Your password"
                          secureTextEntry={true}
                          containerStyle={{ marginBottom: 70 }}
                        /> */}
                      </View>
                      <View style={{marginTop:30,}}>
                      <Button
                      
                         bgColor="#fff"
                         textColor="#fff"
                         rounded
                        rounded
                        onPress={formikProps.handleSubmit}
                      >
                      Reset Password
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
                    </ScrollView>
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
    flex: 0.5,
    flexDirection: "column",
    padding: 36,
    // alignItems: "center",
    paddingTop: 40,
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

export default connect(mapStateToProps, { login })(ResetPassword);
