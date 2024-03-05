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
import * as loginValidation from "../../validations/Forgot";
import Text from "../../components/Typography";
import Button from "../../components/Button";
import Loader from "../../components/Loading";

import Input from "../../components/Input";

import * as THEME from "../../libs/theme";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../actions";
import ImageSlider from "react-native-image-slider";
import { forgotPassword, LOGIN_MUTATION } from "../../graphql";
import API from "../../libs/api";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../Loading";
class ForgotPassword extends Component {
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

    if (this.state.loading) {
      return <Loading />;
    }
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        // keyboardVerticalOffset={-Dimensions.get('screen').height*0.3}
      >
        <Mutation
          mutation={forgotPassword}
          update={(store, { data }) => {
            console.log("kkkkk", data);
            if (data?.forgotPassword?.token) {
              this.props.login(data?.forgotPassword?.token, null);
              this.props.navigation.navigate("GetOTp", {
                data: data,
                forgotPassword: true,
              });
            }
            // else{
            //   this.props.navigation.navigate('CreateNewPassword',{email:'',forgotPassword:true})

            // }
          }}
        >
          {(login, { loading, error, data }) => {
            console.log("error", error);
            if (error) {
              Alert.alert("Forgot password", "Invalid email", [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
            }

            const handleSubmit = (values, action) => {
              // this.setState({ loading: true });
              // console.log(values)
              // // let formData = new URLSearchParams();

              // // formData.append('email', values.email)
              // // // API.forgotPassword(formData)
              // // //   .then(async (res) => {
              // // //     if (res) {
              // // //       console.log('res', res.data);
              // // //       if (res.data.success == true) {
              // // //         Alert.alert(
              // // //           "Success",
              // // //           "Verification code has been sent to your email.",
              // // //           [
              // // //             {
              // // //               text:'Ok',
              // // //               onPress:()=>{
              // // //                 this.props.navigation.navigate('ResetPassword', { email: values.email })
              // // //               }
              // // //             }
              // // //           ]
              // // //           )
              // // //       }
              // // //       else if (res.data.error) {
              // // //         Alert.alert(
              // // //           "Forgot password Error",
              // // //           res.data.error,
              // // //           [
              // // //             {
              // // //               text:'Ok',
              // // //               onPress:()=>{}
              // // //             }
              // // //           ]
              // // //           )
              // // //       }

              // // //     }

              // // //     this.setState({
              // // //       loading: false,

              // // //     });

              // // //   })
              // // //   .catch((err) => {
              // // //     if (err.response) {
              // // //       console.log(err.response.data.error);
              // // //     } else {
              // // //       console.log(err.message);
              // // //     }
              // // //     this.setState({ loading: false });
              // // //   });
              console.log(values.email);
              login({
                variables: { email: values.email },
              });
            };

            return (
              <Formik
                initialValues={loginValidation.initialValues}
                onSubmit={handleSubmit}
                validationSchema={loginValidation.schema}
              >
                {(formikProps) => (
                  <View style={{ height: "100%", backgroundColor: "#000000" }}>
                   
                  {loading? <Loader
                   
                   />:null}
                    {/* <StatusBar hidden barStyle="light-content" /> */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 40,
                        paddingHorizontal: 20,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{ height: 40, width: 40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#23242780' }}
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
                        Change Password
                      </Text>
                      <View></View>
                    </View>

                    <ScrollView 
                    keyboardShouldPersistTaps='always'
                    style={styles.footerContainer}>
                      <View style={styles.formContainer}>
                        <Input
                        secure={false}
                          label="Email"
                          formikKey="email"
                          formikProps={formikProps}
                          keyboardType={"email-address"}
                          placeholder="Enter your email"
                          containerStyle={{ marginBottom: 30 }}
                          returnKeyType="done"
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
                      <View style={{ marginTop: 30 }}>
                        <Button
                        withOutLinear={
                          formikProps.errors["email"] ||
                          formikProps.values.email.trim().length == 0
                        }
                          bgColor="#fff"
                          textColor="#fff"
                          rounded
                          rounded
                          onPress={formikProps.handleSubmit}
                        >
                          Confirm email
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

export default connect(mapStateToProps, { login })(ForgotPassword);
