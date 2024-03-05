import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_EMAIL_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class EditEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.user.email,
    };

    this.updateUserEmail = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserEmail}
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
        mutation={UPDATE_EMAIL_MUTATION}
        update={(_, { data: { updateUserEmail } }) => {
          this.props.updateUser(updateUserEmail);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserEmail, { loading }) => {
          this.updateUserEmail = () => {
            updateUserEmail({ variables: { email: this.state.email } });
          };
          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="Email"
                placeholder="Your email"
                value={this.state.email}
                containerStyle={{ padding: 20, marginBottom: 30 }}
                onChangeText={(text) => this.setState({ email: text })}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(EditEmail);
