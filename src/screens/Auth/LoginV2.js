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
} from "react-native";
import { Formik } from "formik";
import * as loginValidation from "../../validations/login";
import Text from "../../components/Typography";
import Button from "../../components/Button";
import KeyboardWrapper from "../../components/KeyboardWrapper";

import Input from "../../components/Input";

import * as THEME from "../../libs/theme";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../actions";

import { LOGIN_MUTATION } from "../../graphql";

class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        // keyboardVerticalOffset={-64}
      >
        <ImageBackground
          style={styles.imageBackground}
          source={require("../../images/couple.png")}
        /> 
        <Formik
          initialValues={loginValidation.initialValues}
          onSubmit={() => {}}
          validationSchema={loginValidation.schema}
        >
          {(formikProps) => (
            <View style={{ height: "100%" }}>
              <StatusBar barStyle="light-content" />
              <View style={styles.footerContainer}>
                <View style={styles.formContainer}>
                  <Input
                    label="EMAIL"
                    formikKey="email"
                    formikProps={formikProps}
                    placeholder="Your email address"
                    containerStyle={{ marginBottom: 30 }}
                  />
                  <Input
                    label="PASSWORD"
                    formikKey="password"
                    formikProps={formikProps}
                    placeholder="Your password"
                    secureTextEntry={true}
                    containerStyle={{ marginBottom: 70 }}
                  />
                </View>
                <Button
                  bgColor="primary"
                  textColor="white"
                  rounded
                  onPress={formikProps.handleSubmit}
                >
                  Sign In
                </Button>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.newAccountBtn}
                >
                  <Text weight="medium" meta color="gray">
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 1000,
  },
  imageBackground: { width: "100%", height: 317 },
  formContainer: {
    width: "100%",
  },
  footerContainer: {
    flex: 0,
    flexDirection: "column",
    padding: 36,
    alignItems: "center",
    paddingTop: 40,
  },
  newAccountBtn: {
    marginTop: 30,
    marginBottom: 58,
  },
});

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, { login })(Login);
