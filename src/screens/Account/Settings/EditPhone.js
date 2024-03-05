import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_PHONE_NUMBER_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class EditPhone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: this.props.user.phone_number,
    };

    this.updateUserPhoneNumber = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserPhoneNumber}
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
        mutation={UPDATE_PHONE_NUMBER_MUTATION}
        update={(_, { data: { updateUserPhoneNumber } }) => {
          this.props.updateUser(updateUserPhoneNumber);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserPhoneNumber, { loading }) => {
          this.updateUserPhoneNumber = () => {
            updateUserPhoneNumber({
              variables: { phoneNumber: this.state.phoneNumber },
            });
          };

          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="Phone Number"
                placeholder="Your phone number"
                value={this.state.phoneNumber}
                containerStyle={{ padding: 20, marginBottom: 30 }}
                onChangeText={(text) => this.setState({ phoneNumber: text })}
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

export default connect(mapStateToProps, { updateUser })(EditPhone);
