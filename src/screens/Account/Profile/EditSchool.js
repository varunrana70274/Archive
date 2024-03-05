import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as editBioValidation from "../../../validations/editbio";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_SCHOOL_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class EditSchool extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: this.props.user.school,
    };

    this.updateUserSchool = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginRight: 20 }}
            onPress={this.updateUserSchool}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 20 }}
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
        mutation={UPDATE_SCHOOL_MUTATION}
        update={(_, { data: { updateUserSchool } }) => {
          this.props.updateUser(updateUserSchool);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserSchool, { loading }) => {
          this.updateUserSchool = () => {
            updateUserSchool({ variables: { school: this.state.school } });
          };
          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="University"
                value={this.state.school}
                placeholder="Your school"
                containerStyle={{ marginBottom: 30, padding: 20 }}
                onChangeText={(text) => this.setState({ school: text })}
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
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(EditSchool);
