import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as editBioValidation from "../../../validations/editbio";

import Input from "../../../components/InputPicker";
import Text from "../../../components/Text";
 
import SelectList from "../../../components/SelectList";

import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_LOOKING_FOR_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class ChangeLookingFor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lookingfor: this.props.user.looking_for,
    };

    this.updateUserLookingFor = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserLookingFor}
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
        mutation={UPDATE_LOOKING_FOR_MUTATION}
        update={(_, { data: { updateUserLookingFor } }) => {
          this.props.updateUser(updateUserLookingFor);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserLookingFor, { loading }) => {
          this.updateUserLookingFor = () => {
            updateUserLookingFor({
              variables: { lookingFor: this.state.lookingfor },
            });
          };

          return (
            <SafeAreaView style={styles.container}>
              <SelectList
                label="Looking For"
                options={[
                  {
                    label: "Men",
                    value: "Men",
                  },
                  {
                    label: "Women",
                    value: "Women",
                  },
                  {
                    label: "Both",
                    value: "Both",
                  },
                ]}
                value={this.state.lookingfor}
                onSelectItem={(value) => this.setState({ lookingfor: value })}
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

export default connect(mapStateToProps, { updateUser })(ChangeLookingFor);
