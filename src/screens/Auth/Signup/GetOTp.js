import React, { Component } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import { Formik } from "formik";
import Text from "../../../components/Typography";
import Button from "../../../components/Button";
import { Mutation, Query } from "react-apollo";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as THEME from "../../../libs/theme";

// Import your GraphQL mutations
import {
  verifyOtp,
  RESEND_OTP_MUTATION,
  forgotPassword,
  USER_REGISTRATION,
  resendOtp,
} from "../../../graphql";
import { OTPTextView } from "../../../components/OtpTextView";
import Loading from "../../../components/Loading";
import API from "../../../libs/api";

class GetOtp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      error: false,
      time: 0,
      loading:false
    };
    this.input = null;
    this.login = null;
  }

  handleCellTextChange = async (text, i) => {
    if (i === 0) {
      // Handle clipboard text if needed
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        // behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        // keyboardVerticalOffset={-Dimensions.get('screen').height*0.2}
      >
        <Mutation
          onError={(e) => {
            console.log("eeeeee", e);
            this.setState({ error: true });
            Alert.alert(
              'OTP verify',
              e.message?.replace('GraphQL error:','')
            )
          }}
          mutation={verifyOtp} // Replace with your actual verifyOtp mutation
          update={(_, { data: { verifyOtp } }) => {
            this.setState({ error: false });
            this.props.navigation.navigate("CreateNewPassword", {
              email: "",
              forgotPassword: this.props.route.params?.forgotPassword || false,
            });
          }}
        >
          {(
            verifyOtpMutation,
            { loading: verifyLoading, error: verifyError }
          ) => (
            <Query query={resendOtp}>
              {({ loading, error, data, refetch }) => {

                // if(verifyError){
                //   console.log('verifyError',verifyError);
                //   Alert.alert(
                //     'OTP verify error',
                //     verifyError.message
                //   )
                // }

                this.login = () => {
                  if (this.state.otp.length === 4) {
                    verifyOtpMutation({
                      variables: { otp: this.state.otp },
                    });
                  }
                };

                const handleResend = async () => {
                  try {
                    this.setState({loading:true})
                    API.resendOtp()
                      .then((response) => {
                        this.setState({loading:false})
                        console.log("response", response.data);
                        Alert.alert('Resend OTP','Otp has been resend successfully.')
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear)
                        this.setState({time:60},()=>{

                          var interval=setInterval(()=>{
                            this.setState({time:this.state.time-1},()=>{
                              console.log('this.state.timethis.state.time',this.state.time);
                              if(this.state.time==0){
                                
                                clearInterval(interval)
                              }
                            })
                          },(1000))
                        })
                      })
                      .catch((err) => {
                        this.setState({loading:false})

                        console.log("err", err);
                        // alert(err.message);
                      });
                  } catch (resendError) {
                    this.setState({loading:false})

                    console.error("Resend OTP Error:", resendError);
                    Alert.alert(
                      "Error",
                      "Failed to resend OTP. Please try again.",
                      [
                        {
                          text: "OK",
                          onPress: () => {},
                        },
                      ]
                    );
                  }
                };

                const handleSubmit = () => {
                  if (this.state.otp.length === 4) {
                    verifyOtpMutation({
                      variables: { otp: this.state.otp },
                    });
                  }
                };

                return (
                  <Formik initialValues={{}} onSubmit={handleSubmit}>
                    {() => (
                      <View
                        style={{ height: "100%", backgroundColor: "#000000" }}
                      >
                        {loading||this.state.loading ? <Loading /> : null}
                        <StatusBar barStyle="light-content" />
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
                            <AntDesign name="left" size={15} color={"#fff"} />
                          </TouchableOpacity>
                          <Text
                            weight="medium"
                            medium
                            style={{ alignSelf: "center" }}
                            meta
                            color="white"
                          >
                            Validate Email
                          </Text>
                          <View></View>
                        </View>
                        <Text
                          weight="400"
                          style={{ textAlign: "center", marginTop: 10 }}
                          medium
                          color="gray"
                        >
                          {`Enter code from your email`}
                        </Text>
                        <Text
                          // weight="medium"
                          style={{ textAlign: "center", marginTop: 10 }}
                          medium
                          color="white"
                        >
                          {`${
                            this.props.route.params?.data?.registration?.user
                              ?.email ||
                            this.props.route.params?.data?.forgotPassword?.user
                              ?.email
                          }`}
                        </Text>
                        <ScrollView
                        keyboardShouldPersistTaps='always'
                        style={styles.footerContainer}>
                          <View style={styles.formContainer}>
                            <OTPTextView
                              error={this.state.error}
                              ref={(input) => (this.input = input)}
                              containerStyle={{ marginBottom: 20 }}
                              handleTextChange={(otp) => {
                                this.setState({ otp });
                              }}
                              handleCellTextChange={this.handleCellTextChange}
                              inputCount={4}
                              keyboardType="numeric"
                            />
                            {/* Your OTPTextView and other UI components */}

                            <TouchableOpacity
                              // onPress={}
                              activeOpacity={1}
                              style={{
                                alignItems: "center",
                                paddingBottom: 50,
                              }}
                            >
                              {this.state.time > 0 ? (
                                <Text
                                  style={{
                                    color: "#FF6961",
                                    fontSize: THEME.FontFamily.light,
                                  }}
                                  meta
                                >
                                  You can resend it in
                                  <Text
                                    color="#707070"
                                    // weight="light"
                                    style={{
                                      color: THEME.Colors.white,
                                      fontSize: THEME.FontFamily.light,
                                    }}
                                    meta
                                  >
                                    {` ${
                                      this.state.time == 60
                                        ? "01:00"
                                        : [`00:${this.state.time.toString().padStart(2,'0')}`]
                                    }`}
                                  </Text>
                                </Text>
                              ) : (
                                <Text
                                  style={{
                                    color: "#fff",
                                    fontSize: THEME.FontFamily.light,
                                  }}
                                  meta
                                >
                                  Haven't received the code?
                                  <Text
                                    onPress={handleResend}
                                    color="#707070"
                                    // weight="light"
                                    style={{
                                      color: THEME.Colors.inputBorder,
                                      fontSize: THEME.FontFamily.light,
                                    }}
                                    meta
                                  >
                                    {" Resend code"}
                                  </Text>
                                </Text>
                              )}
                            </TouchableOpacity>

                            <Button
                              withOutLinear={this.state.otp.length < 4}
                              buttonContainer={{ marginTop: "20%" }}
                              bgColor="#fff"
                              textColor="#fff"
                              rounded
                              onPress={this.login}
                            >
                              Verify
                            </Button>
                          </View>
                        </ScrollView>
                      </View>
                    )}
                  </Formik>
                );
              }}
            </Query>
          )}
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

export default connect(mapStateToProps)(GetOtp);
