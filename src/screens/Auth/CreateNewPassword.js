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
import ImageSlider from "react-native-image-slider";
import {
  createPassword,
  resetPassword,
  RESET_PASSWORD,
} from "../../graphql";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../../components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
class CreateNewPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  render() {
    const images = [
      require("../../images/v2/image_1.png"),
      require("../../images/v2/image_2.png"),
      require("../../images/v2/login_img.png"),
    ];
    // if (this.state.loading) {
    //   return <Loading />;
    // }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        // keyboardVerticalOffset={-64}
      >
        <Mutation
          mutation={
            this.props.route.params?.forgotPassword
              ? resetPassword
              : createPassword
          }
          update={(store, { data }) => {
            console.log(data);
            if (this.props.route.params?.forgotPassword) {
              // const AUTH_TOKEN = "@wave:token";
              // const AUTH_USER = "@wave:user";
              // AsyncStorage.removeItem(AUTH_TOKEN);
              // AsyncStorage.removeItem(AUTH_USER);
              // this.props.navigation.navigate("Login");
              this.props.navigation.navigate('Success')
            }
            else{
              // Alert.alert(
              //   "Set password",
              //   "password set successfully.",
              //   [
              //     {
              //       text: "OK",
              //       onPress: () => {},
              //     },
              //   ]
              // );
              this.props.navigation.navigate('Onboarding')
            }
            // this.props.navigation.navigate('Success')
            // this.props.login(login.token, login.user);
          }}
        >
          {(resetpassword, { loading, error, data }) => {
            console.log('loading',loading);
            console.log("errror", error);
            if (error) {
              Alert.alert(
                "Set password error",
                "password combination used is incorrect",
                [
                  {
                    text: "OK",
                    onPress: () => {},
                  },
                ]
              );
            }

            const handleSubmit = (values, action) => {
              // this.setState({ loading: true });
              // console.log('values',this.props.route.params.email,values);
              let variables = {
                variables: {
                  newPassword: values.password,
                  repeatPassword: values.conPassword,
                },
              };
              resetpassword(variables);
              // this.props.navigation.navigate('Success')
            };

            return (
              <Formik
                initialValues={loginValidation.initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginValidation.schema}
              >
                {(formikProps) => (
                  <View style={{ height: "100%", backgroundColor: "#000000" }}>
                    <StatusBar barStyle="light-content" />
                    {loading? <Loading />:null}
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 40,
                        paddingHorizontal: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 20,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#23242780",
                        }}
                        onPress={() => this.props.navigation.goBack()}
                      >
                        <AntDesign
                          name="left"
                          size={15}
                          color={THEME.Colors.white}
                        />
                      </TouchableOpacity>
                      <Text
                        weight="medium"
                        medium
                        style={{ alignSelf: "center" }}
                        meta
                        color="white"
                      >
                         {
                          this.props.route.params?.forgotPassword?
                          'Change Password'
                          :
                          'Create Password'}
                      </Text>
                      <View></View>
                    </View>
                    <ScrollView
                    keyboardShouldPersistTaps='always'
                    style={styles.footerContainer}>
                      <View style={styles.formContainer}>
                        {/* <Text
                        style={{marginTop:10}}
                        >CREATE NEW PASSWORD</Text> */}

                        {/* <Input
                        keyboardType='numeric'
                          label=" "
                          formikKey="code"
                          formikProps={formikProps}
                          placeholder="Verification code"
                          containerStyle={{ marginBottom: 30 }}
                        /> */}
                        <Input
                        secure
                          label="New password"
                          formikKey="password"
                          formikProps={formikProps}
                          placeholder="Enter new password"
                          // secureTextEntry={true}
                          containerStyle={{ marginBottom: 20, marginTop: 10 }}
                          onSubmitEditing={()=>{
                            this.conPasswordRef?.focus?.()
                          }}
                          returnKeyType="next"

                        />
                        <Input
                        secure
                          refs={(ref) => {
                            this.conPasswordRef = ref;
                          }}
                          label="Repeat password"
                          formikKey="conPassword"
                          formikProps={formikProps}
                          placeholder="Repeat new password"
                          // secureTextEntry={true}
                          containerStyle={{ marginBottom: 70 }}
                          returnKeyType="done"

                        />
                      </View>
                      <View style={{ marginTop: 30 }}>
                        <Button
                        withOutLinear={
                          formikProps.errors["password"] ||
                          formikProps.errors['conPassword']||formikProps.values.password?.trim()?.length==0||
                          formikProps.values.conPassword?.trim()?.length==0
                        }
                          bgColor="#fff"
                          textColor="#fff"
                          rounded
                          rounded
                          onPress={formikProps.handleSubmit}
                        >
                          {
                          this.props.route.params?.forgotPassword?
                          'Change password'
                          :
                          'Create password'}
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
    width: Dimensions.get("screen").width,
    height: "100%",
  },
  formContainer: {
    width: "100%",
  },
  footerContainer: {
    flex: 0.5,
    flexDirection: "column",
    padding: 18,
    // alignItems: "center",
    paddingTop: 40,
  },
  newAccountBtn: {
    marginTop: 30,
    marginBottom: 58,
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { login })(CreateNewPassword);
