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
  UPDATE_NAME_MUTATION,
} from "../../graphql";
import API from "../../libs/api";
import { AntDesign } from "@expo/vector-icons";
import Loading from "../Loading";
import moment from "moment";
import * as signupBirthdateValidation from "../../validations/signupBirthdate";

class NameDOB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      newData: "",
      date: "",
      isDatePickerVisible: false,
    };
  }

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  onChange = (date, formikProps) => {
    this.setState({ newData: date });

    // console.error('selectedDate',selectedDate);
    // formikProps.resetForm("birthdate");
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
          mutation={UPDATE_NAME_MUTATION}
          update={(store, { data }) => {}}
        >
          {(login, { loading, error, data }) => {
            console.log("error", error);
            if (error) {
            }

            const handleSubmit = (values, action) => {
              if(this.state.newData && Number(
                moment().diff(moment(this.state.newData), "year")
              ) >= 18){
                this.props.navigation.navigate('Gender',{name:values.name,DOB:this.state.newData})
              }

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
                        justifyContent: "center",
                      }}
                    >
                      {/* <TouchableOpacity
                        style={{ height: 40, width: 40,borderRadius:20,alignItems:'center',justifyContent:'center',backgroundColor:'#23242780' }}
                        onPress={() => this.props.navigation.goBack()}
                      >
                        <AntDesign
                          name="left"
                          size={15}
                          color={THEME.Colors.white}
                        />
                      </TouchableOpacity> */}
                      <Text
                        weight="medium"
                        medium
                        style={{ alignSelf: "center" }}
                        meta
                        color="white"
                      >
                        About you
                      </Text>
                      <View></View>
                    </View>
                    <View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignSelf: "center",
                          width: "12%",
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
                            backgroundColor: "#344054",
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
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: "#1D2939",
                          marginTop: 10,
                          paddingVertical: 10,
                          borderRadius: 10,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          style={{ height: 80, width: "90%" }}
                          resizeMode="contain"
                          source={require("../../v3/about1.png")}
                        />
                      </View>
                    </View>

                    <ScrollView
                      keyboardShouldPersistTaps="always"
                      style={styles.footerContainer}
                    >
                      <View style={styles.formContainer}>
                        <Input
                          secure={false}
                          label="Name"
                          formikKey="name"
                          formikProps={formikProps}
                          placeholder="Enter your full name"
                          containerStyle={{ marginBottom: 30 }}
                          returnKeyType="done"
                        />

                        <Input2
                          label={"Birth Date"}
                          placeholder="mm/dd/yy"
                          value={
                            this.state.date.length > 0
                              ? moment(this.state.date).format("MM/DD/YYYY")
                              : null
                          }
                          editable={false}
                          onPress={() => this.showDatePicker()}
                          formikKey="birthdate"
                          formikProps={formikProps}
                        />
                        <TouchableOpacity
                          activeOpacity={1}
                          style={{
                            alignItems: "flex-start",
                            paddingVertical: 10,
                          }}
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
                            {this.state.newData &&
                            Number(
                              moment().diff(moment(this.state.newData), "year")
                            ) >= 18
                              ? "Great! You are over 18 years old!"
                              : "You must be "}
                            {this.state.newData == "" ||
                            Number(
                              moment().diff(moment(this.state.newData), "year")
                            ) < 18 ? (
                              <Text
                                color={
                                  this.state.newData == "" ? "#707070" : "red"
                                }
                                style={{
                                  color:
                                    this.state.newData == ""
                                      ? THEME.Colors.inputBorder
                                      : "red",
                                  fontSize: THEME.FontFamily.light,
                                }}
                                meta
                              >
                                {" over 18 years old!"}
                              </Text>
                            ) : null}
                          </Text>
                        </TouchableOpacity>
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
                        {
                          console.log('chk',
                          formikProps.values.name.trim().length == 0 ,
                            this.state.newData?.trim?.()?.length == 0 ,
                            Number(
                              moment().diff(moment(this.state.newData), "year")
                            ) < 18
                          )
                        }
                        <Button
                          withOutLinear={
                            // formikProps.errors["name"] ||
                            formikProps.values.name.trim().length == 0 ||
                            this.state.newData?.trim?.()?.length == 0 ||
                            Number(
                              moment().diff(moment(this.state.newData), "year")
                            ) < 18
                          }
                          bgColor="#fff"
                          textColor="#fff"
                          rounded
                          onPress={formikProps.handleSubmit}
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
                    <DateTimePickerModal
                      // minimumDate={new Date(2004, 0, 1)}
                      maximumDate={new Date()}
                      // display="default"
                      date={
                        this.state.newData ? this.state.newData : new Date()
                      }
                      isVisible={this.state.isDatePickerVisible}
                      mode="date"
                      onConfirm={(date) => this.onChange(date, formikProps)}
                      onCancel={() =>
                        this.setState({ isDatePickerVisible: false })
                      }
                    />
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

export default connect(mapStateToProps, { login })(NameDOB);
