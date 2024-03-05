import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import * as THEME from "../../../libs/theme";

import { Formik } from "formik";
import * as signupEmailValidation from "../../../validations/signupEmail";
import { connect } from "react-redux";
import { updateEmail } from "../../../actions";
import LinearGradient from "react-native-linear-gradient";
import {Ionicons}from '@expo/vector-icons'
class ReferalCode extends Component {
  onSubmit = (values) => {
    this.props.navigation.push("SignupGender");
  };
  render() {
    return (
      
        <LinearGradient colors={['#2BBFC9', '#8CDFC8', '#EFD2B5']}
    style={{flex:1,justifyContent:'center'}} 
    start={{ y: 0.0, x: 0.0 }} end={{ y: 0.9, x: 0.0 }}>
       <View style={{padding:20,backgroundColor:'transparent'}}>
        <TouchableOpacity style={{height:30,width:30}} onPress={()=>this.props.navigation.goBack()}>

        <Ionicons
              name="ios-arrow-back"
              size={30}
              color={THEME.Colors.white}
            />
      
        </TouchableOpacity>
   </View>
      <View style={styles.container}>
        <Text xl color='#fff' style={{color:'#fff', marginBottom: 102 }}>
        Do you have a referral code?
        </Text>
        <Formik
          initialValues={signupEmailValidation.initialValues}
          
          onSubmit={this.onSubmit}
        >
          {(formikProps) => (
            <>
              <Input
                style={{ borderBottomWidth: 3 ,borderBottomColor:'#fff'}}
                formikKey="email"
                formikProps={formikProps}
              />
              <View
                style={{ flexGrow: 0, marginTop: 166, alignItems: "center" }}
              >
                <Button
                 withOutLinear={true}
                 bgColor="white"
                 textColor="#2BBFC9"
                  onPress={formikProps.handleSubmit}
                  // style={{ width: "100%" }}
                >
                  Continue
                </Button>
              </View>
            </>
          )}
        </Formik>
        <Text onPress={()=>this.props.navigation.push('SignupGender')}  style={{color:'#000',marginTop:20,alignSelf:'center',fontSize:14, marginBottom: 102 }}>
        No, I don't
        </Text>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center",
    padding: 32,
    marginTop:100
    // backgroundColor: THEME.Colors.white,
  },
});

export default connect(null, { updateEmail })(ReferalCode);
