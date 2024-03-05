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

class Login extends Component {
  render() {
    // const images = [
    //   require("../../images/v2/image_1.png"),
    //   require("../../images/v2/image_2.png"),
    //   require("../../images/v2/login_img.png"),
    // ];
    return (
      <View style={{ height: "100%", backgroundColor: "#000000" }}>
        <StatusBar barStyle="light-content" />
        <View style={{width:'95%',height:'58%',marginTop: "15%",
            alignSelf: "center",}}>
        <Image
          resizeMode="stretch"
          style={{
            width: "100%",
            height: "100%",
            // marginTop: "15%",
            // alignSelf: "center",
          }}
          source={require("../../v3/Rating.png")}
        />
        </View>
        <Text
        weight='medium'
          style={{  marginTop: "5%", alignSelf: "center" }}
          color="white"
          lg
        >
          Welcome to Wave!
        </Text>
        <Text
        paragraph
          style={{ textAlign:'center',width:'88%', marginTop: "5%", alignSelf: "center" }}
          color="white"
          
        >
          Please provide us with some additional information, so we can learn more about you
        </Text>

        <Button
                        
                        buttonContainer={{ marginTop: "5%",width:'90%',alignSelf:'center' }}
                        bgColor="#fff"
                        textColor="#fff"
                        rounded
                        onPress={()=>{
                          this.props.navigation.navigate('NameDOB')
                        }}
                      >
                        Next
                      </Button>
      </View>
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
