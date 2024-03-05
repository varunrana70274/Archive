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
import * as loginValidation from "../../validations/login";
import Text from "../../components/Typography";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { login } from "../../actions";
import ImageSlider from "react-native-image-slider";
import { LOGIN_MUTATION } from "../../graphql";
import { images } from "../../theme/images";
import { Colors } from "../../libs/theme";
import * as THEME from "../../libs/theme";
import Loading from "../../components/Loading";
import * as Location from "expo-location";
import { registerForPushNotifications } from "../../libs/helpers";

class Login extends Component {
  constructor(props){
    super(props)
    this.state={
      hit:false
    }
  }

  async componentDidMount(){
    registerForPushNotifications()
    let { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        
      }
    }
  }

  render() {
    // const images = [
    //   require("../../images/v2/image_1.png"),
    //   require("../../images/v2/image_2.png"),
    //   require("../../images/v2/login_img.png"),
    // ];
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == "ios" ? "position" : "height"}
        enabled
        keyboardVerticalOffset={-Dimensions.get("screen").height * 0.2}
      >
        <Mutation
        onError={()=>{
          Alert.alert(
            "Authentication Error",
            "The email and password combination used is incorrect",
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ]
          );
        }}
          mutation={LOGIN_MUTATION}
          update={(store, { data: { login } }) => {
            this.props.login(login.token, login.user);
            if (!login.user.name) {
              
              // Alert.alert("Login", "User Login Successfully", [
              //   {
              //     text: "OK",
              //     onPress: () => {},
              //   },
              // ]);
            }
            else{
              // Alert.alert("Login", "User Login Successfully", [
              //   {
              //     text: "OK",
              //     onPress: () => {},
              //   },
              // ]);
            }
          }}
        >
          {(login, { loading, error, data }) => {
            console.log('this.props?.route?.name',this.props?.route);
            if (error) {
              if(this.state.hit==false){
                this.setState({hit:true})
              // Alert.alert(
              //   "Authentication Error",
              //   "The email and password combination used is incorrect",
              //   [
              //     {
              //       text: "OK",
              //       onPress: () => {},
              //     },
              //   ]
              // );
            }
          }

            const handleSubmit = (values, action) => {
              this.setState({hit:false})
              login({
                variables: { email: values.email, password: values.password },
              });
              if(!error){
              values.email=''
              values.password=''
              }
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
                        style={{ marginTop: "5%", alignSelf: "center" }}
                        lg
                        color="white"
                      >
                        Sign In
                      </Text>
                    </View>
                    <ScrollView 
                    keyboardShouldPersistTaps='always'
                    style={styles.footerContainer}>
                      <View style={styles.formContainer}>
                        {console.log(
                          "formikProps",
                          formikProps.errors
                        )}
                        <Input
                        value={formikProps.values.email}
                          returnKeyType="next"
                          keyboardType={"email-address"}
                          label="Email"
                          formikKey="email"
                          formikProps={formikProps}
                          placeholder="Enter your email"
                          containerStyle={{ marginBottom: 30 }}
                          onSubmitEditing={() => {
                            this.passwordRef?.focus?.();
                            console.log(this.passwordRef);
                          }}
                          // inputStyles={{borderWidth:1,borderColor:'white'}}
                        />
                        <Input
                        value={formikProps.values.password}
                          refs={(ref) => {
                            this.passwordRef = ref;
                          }}
                          returnKeyType="done"
                          label="Password"
                          formikKey="password"
                          formikProps={formikProps}
                          placeholder="Enter your password"
                          // secureTextEntry={true}
                          secure
                          // containerStyle={{ marginBottom: 70 }}
                        />

                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate("ForgoPassword")
                          }
                          // onPress={()=>CrashLAytic().crash()}
                          activeOpacity={0.8}
                          style={styles.newAccountBtn}
                        >
                          <Text
                            style={{ color: Colors.inputBorder }}
                            weight="medium"
                            meta
                          >
                            Forgot password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Button
                        withOutLinear={
                          formikProps.errors["email"] ||
                          formikProps.errors["password"] ||
                          formikProps.values.email.trim().length == 0 ||
                          formikProps.values.password.trim().length == 0
                        }
                        buttonContainer={{ marginTop: "20%" }}
                        bgColor="#fff"
                        textColor="#fff"
                        rounded
                        onPress={formikProps.handleSubmit}
                      >
                        Sign In
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
                        Don't have an account?
                        <Text
                          onPress={() =>
                            this.props.navigation.navigate("SignupName")
                          }
                          color="#707070"
                          style={{
                            textDecorationLine: "underline",
                            color: Colors.inputBorder,
                            fontSize: THEME.FontFamily.light,
                          }}
                          meta
                        >
                          {" Register Now"}
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
    paddingVertical: 36,
    paddingHorizontal: 15,
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

export default connect(mapStateToProps, { login })(Login);
