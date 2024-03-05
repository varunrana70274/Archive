import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_PASSWORD_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
    };

    this.updateUserPassword = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserPassword}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            activeOpacity={0.9}
            onPress={this.props.navigation.goBack}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        );
      },
    });
  }

  render() {
    return (
      <Mutation
        mutation={UPDATE_PASSWORD_MUTATION}
        update={(_, { data: { updateUserPassword } }) => {
          this.props.updateUser(updateUserPassword);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserPassword, { loading }) => {
          this.updateUserPassword = () => {
            updateUserPassword({
              variables: { password: this.state.password },
            });
          };

          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="New Password"
                placeholder="Your new password"
                secureTextEntry
                value={this.state.password}
                containerStyle={{ padding: 20, marginBottom: 30 }}
                onChangeText={(text) => this.setState({ password: text })}
              />
            </SafeAreaView>
          );
        }}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default connect(null, { updateUser })(ChangePassword);
