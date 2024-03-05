import React, { Component } from "react";
import {
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
import * as loginValidation from "../../../validations/signupEmail";
import Text from "../../../components/Typography";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../../actions";
import ImageSlider from "react-native-image-slider";
import {  USER_REGISTRATION } from "../../../graphql";
import { images } from "../../../theme/images";
import { Colors } from "../../../libs/theme";
import * as THEME from "../../../libs/theme";
import Loading from "../../../components/Loading";

class Signup extends Component {
  render() {
    // const images = [
    //   require("../../images/v2/image_1.png"),
    //   require("../../images/v2/image_2.png"),
    //   require("../../images/v2/login_img.png"),
    // ];
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS == "ios" ? "position" : "height"}
        // enabled
        // keyboardVerticalOffset={-64}
      >
        <Mutation
          mutation={USER_REGISTRATION}
          update={(store, { data }) => {
            console.log("DATA", data);
            this.props.login(
              data?.registration?.token,
              data?.registration?.user
            );
            this.props.navigation.navigate("GetOTp", { data: data });
          }}
          // update={(store, { store, { data}}) => {
          //   console.log("Mutation update");
          //   console.log(
          //     "signup.token=>",signup
          //   );
          //   // this.props.login(signup.token, signup.user);
          //   // this.props.navigation.navigate('GetOTp',{data:data})
          // }}
        >
          {(login, { loading, error, data }) => {
            if (error) {
              console.log("errr", error);
              Alert.alert("Authentication Error", "Email already exist!", [
                {
                  text: "OK",
                  onPress: () => {},
                },
              ]);
            }

            const handleSubmit = (values, action) => {
              login({
                variables: { email: values.email, password: values.password },
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
                    {loading ? <Loading /> : null}
                    <StatusBar barStyle="light-content" />
                    {/* <ImageSlider
                      style={{ backgroundColor: "transparent" }}
                      // loopBothSides
                      autoPlayWithInterval={3000}
                      images={images}
                      customSlide={({ index, item, style, width }) => (
                        <ImageBackground
                          resizeMode="cover"
                          style={styles.imageBackground}
                          source={item}
                        >
                          <Image
                            resizeMode="contain"
                            style={{
                              height: "40%",
                              bottom: 0,
                              alignSelf: "center",
                              position: "absolute",
                              width: "40%",
                            }}
                            source={require("../../images/v2/splash_logo.png")}
                          />
                        </ImageBackground>
                      )}
                    /> */}
                    <View>
                      <Image
                        style={{
                          width: "95%",
                          height: Dimensions.get("screen").height * 0.1,
                          marginTop: "15%",
                          alignSelf: "center",
                        }}
                        resizeMode="contain"
                        source={images.wave}
                      />
                      <Text
                        weight="medium"
                        lg
                        style={{ alignSelf: "center",marginTop: "5%", }}
                        color="white"
                      >
                        Registration
                      </Text>
                    </View>
                    <ScrollView keyboardShouldPersistTaps='always' style={styles.footerContainer}>
                      <View style={styles.formContainer}>
                        <Input
                          secure={false}
                          label="Email"
                          formikKey="email"
                          formikProps={formikProps}
                          placeholder="Enter your email"
                          keyboardType={"email-address"}
                          returnKeyType="done"

                          // containerStyle={{ marginBottom: 10 }}
                          // inputStyles={{borderWidth:1,borderColor:'white'}}
                        />
                      </View>
                      <Button
                        withOutLinear={
                          formikProps.errors["email"] ||
                          formikProps.values.email.trim().length == 0
                        }
                        buttonContainer={{ marginTop: "20%" }}
                        bgColor="#fff"
                        textColor="#fff"
                        rounded
                        onPress={formikProps.handleSubmit}
                      >
                        Register
                      </Button>
                    </ScrollView>

                    <TouchableOpacity
                      activeOpacity={1}
                      style={{ alignItems: "center", paddingBottom: "18%" }}
                    >
                      {/* <Text weight="light" meta>
                By creating an account you agree to our Terms.
              </Text> */}

                      <Text
                        // color="#707070"
                        // weight="light"
                        style={{
                          color: "#fff",
                          fontSize: THEME.FontFamily.light,
                        }}
                        meta
                      >
                        Already have an account?
                        <Text
                          onPress={() => this.props.navigation.goBack()}
                          color="#707070"
                          // weight="light"
                          style={{
                            textDecorationLine: "underline",
                            color: Colors.inputBorder,
                            fontSize: THEME.FontFamily.light,
                          }}
                          meta
                        >
                          {" Sign In"}
                        </Text>
                      </Text>
                    </TouchableOpacity>
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
    marginTop: 10,
    // marginBottom: 58,
    alignSelf: "flex-end",
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { login })(Signup);
