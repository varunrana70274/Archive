import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as editBioValidation from "../../../validations/editbio";

import Input from "../../../components/InputPicker";
import Text from "../../../components/Text";
 
import SelectList from "../../../components/SelectList";

import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_GENDER_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class EditGender extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: this.props.user.gender,
    };

    this.updateUserGender = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserGender}
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
        mutation={UPDATE_GENDER_MUTATION}
        update={(_, { data: { updateUserGender } }) => {
          this.props.updateUser(updateUserGender);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserGender, { loading }) => {
          this.updateUserGender = () => {
            updateUserGender({ variables: { gender: this.state.gender } });
          };
          return (
            <SafeAreaView style={styles.container}>
              <SelectList
                label="Choose your gender"
                value={this.state.gender}
                onSelectItem={(value) => this.setState({ gender: value })}
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                ]}
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

export default connect(mapStateToProps, { updateUser })(EditGender);
