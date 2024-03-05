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
  LayoutAnimation,
} from "react-native";
import { Formik } from "formik";
import * as namedobValidation from "../../validations/namedob";
import Text from "../../components/Typography";
import Button from "../../components/Button";
import Loader from "../../components/Loading";

import Input from "../../components/Input";
import Input2 from "../../components/InputDOB";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as THEME from "../../libs/theme";

import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../actions";
import ImageSlider from "react-native-image-slider";
import {
  forgotPassword,
  LOGIN_MUTATION,
  registrationStepSecond,
} from "../../graphql";
import API from "../../libs/api";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../Loading";
import moment from "moment";
import * as signupBirthdateValidation from "../../validations/signupBirthdate";

class Gender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newData: "",
      date: "",
      isDatePickerVisible: false,
      gender:''
    };
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  onChange = (date, formikProps) => {
    this.setState({ newData: date });

    // console.error('selectedDate',selectedDate);
    formikProps.resetForm("birthdate");
    if (date) {
      signupBirthdateValidation.initialValues.birthdate = date;
    }

    this.setState({
      date: date ? new Date(date).toString() : new Date(this.state.date),
      isDatePickerVisible: false,
    });
  };

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
          mutation={registrationStepSecond}
          update={(store, { data }) => {}}
        >
          {(login, { loading, error, data }) => {
            console.log("error", error);
            if (error) {
            }

            const handleSubmit = (values, action) => {
              // login()
              // alert('click')
              // this.props.navigation.navigate('ReferalCode')
            };

            return (
              <Formik
                initialValues={namedobValidation.initialValues}
                onSubmit={handleSubmit}
                validationSchema={namedobValidation.schema}
              >
                {(formikProps) => (
                  <View style={{ height: "100%", backgroundColor: "#000000" }}>
                    {loading ? <Loader /> : null}
                    {/* <StatusBar hidden barStyle="light-content" /> */}
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 40,
                        paddingHorizontal: 20,
                        justifyContent: "space-between",
                        // backgroundColor:'red',
                        alignItems: "center",
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
                      <View>
                        <Text
                          weight="medium"
                          medium
                          style={{ alignSelf: "center" }}
                          meta
                          color="white"
                        >
                          About you
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            width: "30%",
                            marginVertical: 10,
                          }}
                        >
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderRadius: 5,
                              backgroundColor: "#5B76FA",
                            }}
                          />
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderRadius: 5,
                              backgroundColor: "#5B76FA",
                            }}
                          />
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderRadius: 5,
                              backgroundColor: "#344054",
                            }}
                          />
                        </View>
                      </View>
                      <Text 
                      onPress={()=>{
                        this.props.navigation.navigate('ReferalCode',{
                          name:this.props.route.params?.name,
                          dob:this.props?.route?.params?.DOB,
                          gender:''
                        })
                      }}
                      style={{ alignSelf: "center",color:'#98A2B3' }} meta >
                        Skip
                      </Text>
                    </View>
                    <View></View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#1D2939",
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          borderRadius={10}
                          resizeMode="cover"
                          style={{
                            width: Dimensions.get("screen").width * 0.35,
                            height: Dimensions.get("screen").height * 0.5,
                          }}
                          source={require("../../v3/male.png")}
                        />
                      </View>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#1D2939",
                          marginTop: 10,
                          padding: 10,
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          borderRadius={10}
                          resizeMode="cover"
                          style={{
                            width: Dimensions.get("screen").width * 0.35,
                            height: Dimensions.get("screen").height * 0.5,
                          }}
                          source={require("../../v3/female.png")}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "space-around",
                      }}
                    >
                      <TouchableOpacity
                       onPress={()=>{
                        this.setState({gender:'Male'})
                      }}
                      >
                      <Image
                        style={{
                          height: 60,
                          borderWidth:this.state.gender==='Male'? 1:0,
                          borderColor: "#6172F3",
                          width: 60,
                          borderRadius: 5,
                        }}
                        source={require("../../v3/men.png")}
                      />
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={()=>{
                        this.setState({gender:'Female'})
                      }}
                      >
                      <Image
                        style={{
                          height: 60,
                          borderWidth:this.state.gender==='Female'? 1:0,
                          borderColor: "#EE46BC",
                          width: 60,
                          borderRadius: 5,
                        }}
                        source={require("../../v3/women.png")}
                      />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 5,
                        justifyContent: "space-around",
                      }}
                    >
                      <Text style={{textAlign:'center',width: 60}} color={'white'}>Man</Text>
                      <Text style={{textAlign:'center',width: 60,}} color={'white'}>Woman</Text>
                      
                    </View>

                    <ScrollView
                      keyboardShouldPersistTaps="always"
                      style={styles.footerContainer}
                    >
                      <View style={{ marginTop: 30 }}>
                        <Button
                          withOutLinear={
                            !this.state.gender
                          }
                          bgColor="#fff"
                          textColor="#fff"
                          rounded
                          onPress={()=>{
                            console.log(this.props.route.params?.name,this.props?.rooute?.params?.DOB);
                            this.props.navigation.navigate('ReferalCode',{
                              name:this.props.route.params?.name,
                              dob:this.props?.route?.params?.DOB,
                              gender:this.state.gender
                            })

                          }}
                        >
                          Next
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
    paddingTop: 20,
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

export default connect(mapStateToProps, { login })(Gender);
