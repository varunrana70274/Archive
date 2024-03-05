import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import * as THEME from "../../../libs/theme";

import { Formik } from "formik";
import * as signupPasswordValidation from "../../../validations/signupPassword";

import { connect } from "react-redux";
import { updatePassword } from "../../../actions";
import {Ionicons}from '@expo/vector-icons'
class GetPassword extends Component {
  onSubmit = (values) => {
    this.props.updatePassword(values.password);
    this.props.navigation.navigate("SignupBirthday");
  }; 
  render() {
    return (
      <>
      <View style={{padding:20,backgroundColor:'#fff'}}>
        <TouchableOpacity style={{height:30,width:30}} onPress={()=>this.props.navigation.goBack()}>

        <Ionicons
              name="ios-arrow-back"
              size={30}
              color={THEME.Colors.primary}
            />
        </TouchableOpacity>
   </View>
      <View style={styles.container}>
        <Text xl style={{color:'#2BBFC9', marginBottom: 102 }}>
          Create a password
        </Text>
        <Formik
          initialValues={signupPasswordValidation.initialValues}
          validationSchema={signupPasswordValidation.schema}
          onSubmit={this.onSubmit}
        >
          {(formikProps) => (
            <>
              <Input
                style={{ borderBottomWidth: 3,borderBottomColor:'#2BBFC9' }}
                formikKey="password"
                formikProps={formikProps}
                secureTextEntry={true}
              />
              <View
                style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}
              >
                <Button
                 textColor="white"
                 rounded
                  onPress={formikProps.handleSubmit}
                  // style={{ width: "100%" }}
                >
                  Continue
                </Button>
              </View>
            </>
          )}
        </Formik>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 36,
    backgroundColor: THEME.Colors.white,
  },
});

export default connect(null, { updatePassword })(GetPassword);
