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
  Image,
} from "react-native";
import { Formik } from "formik";
import Text from "../../components/Typography";
import Button from "../../components/Button";
import { Mutation, Query } from "react-apollo";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as THEME from "../../libs/theme";
import { fetchToken } from "../../libs/helpers";
import { login } from "../../actions";

// Import your GraphQL mutations
import {
  verifyOtp,
  RESEND_OTP_MUTATION,
  forgotPassword,
  USER_REGISTRATION,
  resendOtp,
  registrationStepSecond,
} from "../../graphql";
import { OTPTextView } from "../../components/OtpTextView";
import Loading from "../../components/Loading";
import API from "../../libs/api";
import { color } from "react-native-reanimated";
import moment from "moment";

class ReferalCode extends Component {
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
              'ERROR',
              e.message?.replace('GraphQL error:','')
            )
          }}
          mutation={registrationStepSecond} // Replace with your actual verifyOtp mutation
          update={async(_, { data:{ registrationStepSecond } }) => {
            let { token } = await fetchToken();
            console.log('dataaaa',registrationStepSecond,token);
            this.props.login(token, registrationStepSecond);
            this.setState({ error: false });
            
          }}
        >
          {(
            verifyOtpMutation,
            { loading: verifyLoading, error: verifyError }
          ) => (
            <Query query={resendOtp}>
              {({ loading, error, data, refetch }) => {

                
this.login = () => {
  if (this.state.otp.length === 4) {
    // alert('press')
    API.referalCodeVerify(this.state.otp).then((res)=>{
      console.log('resssss',res);
      verifyOtpMutation({
        variables: {name:this.props.route.params?.name,birthdate:this.props.route.params?.dob,gender:this.props.route.params?.gender,referralCode:this.state.otp },
      })
    }).catch((e)=>{
      console.log('errorrrr',e);
      this.setState({error:'Wrong referral code. Please try again'})
    })
  }
};
                const handleSubmit = () => {
                  if (this.state.otp.length === 4) {
                  //  alert('true')
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
                          Referral code
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
                              backgroundColor: "#5B76FA",
                            }}
                          />
                        </View>
                      </View>
                      <Text 
                      onPress={()=>{
                        verifyOtpMutation({
                          variables: {name:this.props.route.params?.name,birthdate:moment(this.props.route.params?.dob).format("MM/DD/YYYY"),gender:this.props.route.params?.gender,referralCode:'' },
                        })
                      }}
                      style={{ alignSelf: "center",color:'#98A2B3' }} meta >
                        Skip
                      </Text>
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
                          source={require("../../v3/about2.png")}
                        />
                      </View>
                        <Text style={{textAlign:'center',color:'#98A2B3',marginTop:20}} color={'white'}>Please enter your referral code if you have it (optional)</Text>
                    
                       
                        
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
                            {this.state.error?
                              <Text style={{color:'red'}}>{this.state.error}</Text>:null}
                            {/* Your OTPTextView and other UI components */}

                            <TouchableOpacity
                              // onPress={}
                              activeOpacity={1}
                              style={{
                                alignItems: "center",
                                paddingBottom: 50,
                              }}
                            >
                             
                            </TouchableOpacity>

                            <Button
                              withOutLinear={this.state.otp.length < 4}
                              buttonContainer={{ marginTop: "20%" }}
                              bgColor="#fff"
                              textColor="#fff"
                              rounded
                              onPress={this.login}
                            >
                              Next
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

export default connect(mapStateToProps,{login})(ReferalCode);
