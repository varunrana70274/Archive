import React, { Component } from "react";
import { View, StyleSheet, Alert, TouchableOpacity, Image } from "react-native";
import Button from "../../../components/Button";
import Text from "../../../components/Typography";
import SelectButton from "../../../components/SelectButton";
import * as THEME from "../../../libs/theme";

import { SIGNUP_MUTATION } from "../../../graphql";
import { Mutation } from "react-apollo";
import { connect } from "react-redux";
import { login } from "../../../actions";
import NetInfo from "@react-native-community/netinfo";
import { Ionicons } from "@expo/vector-icons";

class GetGender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "Male",
      connected: true,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener((isConnected) => {
      this.setState({ connected: isConnected.isConnected });
    });
  }

  render() {
    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        update={(store, { data: { signup } }) => {
          console.log("Mutation update");
          console.log(
            "signup.token=>",
            signup.token + " signup.user" + signup.user
          );
          this.props.login(signup.token, signup.user);
        }}
      >
        {(signup, { loading, error, data }) => {
          if (error) {
            // console.error('errr',error);
            if (error.toString().includes("already exists")) {
              Alert.alert(
                "Alert",
                "An account already exists with this email.",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      this.props.navigation.pop(3);
                    },
                  },
                ]
              );
            }
          }

          const handleSubmit = () => {
            if (this.state.connected) {
              let variables = {
                variables: {
                  name: this.props.name,
                  email: this.props.email,
                  password: this.props.password,
                  birthdate: this.props.birthdate,
                  gender: this.state.gender,
                },
              };

              console.log(variables);
              signup(variables);
            } else {
              alert("Please check your internet connection.");
            }
          };

          if (error) {
            console.log(error);
          }

          return (
            <>
              <View style={{ padding: 20, backgroundColor: "white" }}>
                <TouchableOpacity
                  style={{ height: 30, width: 30 }}
                  onPress={() => this.props.navigation.goBack()}
                >
                  <Ionicons
                    name="ios-arrow-back"
                    size={30}
                    color={THEME.Colors.primary}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View
                  style={{
                    alignItems: "center",
                    paddingVertical: 20,
                    justifyContent: "center",
                  }}
                >
                  <Text xl style={{ color: "#2BBFC9", marginBottom: "15%" }}>
                    Are you a
                  </Text>
                  <SelectButton
                    style={{ marginBottom: "10%" }}
                    selected={this.state.gender == "Male"}
                    onPress={() => this.setState({ gender: "Male" })}
                  >
                    Man
                  </SelectButton>
                  <SelectButton
                    selected={this.state.gender == "Female"}
                    onPress={() => this.setState({ gender: "Female" })}
                  >
                    Woman
                  </SelectButton>
                </View>
                <View
                  style={{
                    paddingVertical: 20,
                    marginTop: 40,
                    alignItems: "center",
                  }}
                >
                  <Button
                    // bgColor="secondary"
                    textColor="white"
                    rounded
                    onPress={handleSubmit}
                    // style={{ width: "100%" }}
                  >
                    Continue
                  </Button>
                </View>
              </View>
            </>
          );
        }}
      </Mutation>
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

const mapStateToProps = (state) => {
  return {
    name: state.name,
    email: state.email,
    password: state.password,
    birthdate: state.birthdate,
  };
};

export default connect(mapStateToProps, { login })(GetGender);
