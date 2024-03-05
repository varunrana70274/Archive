import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as editBioValidation from "../../../validations/editbio";

import Input from "../../../components/InputPicker";
import Text from "../../../components/Text";
import SelectList from "../../../components/SelectList";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_ORIENTATION_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class ChangeOrientation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orientation: this.props.user.orientation,
    };

    this.updateUserOrientation = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserOrientation}
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
        mutation={UPDATE_ORIENTATION_MUTATION}
        update={(_, { data: { updateUserOrientation } }) => {
          this.props.updateUser(updateUserOrientation);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserOrientation, { loading }) => {
          this.updateUserOrientation = () => {
            updateUserOrientation({
              variables: { orientation: this.state.orientation },
            });
          };
          return (
            <SafeAreaView style={styles.container}>
              <SelectList
                label="Orientation"
                options={[
                  {
                    label: "Straight",
                    value: "Straight",
                  },
                  {
                    label: "Bi",
                    value: "Bi",
                  },
                  {
                    label: "Gay",
                    value: "Gay",
                  },
                ]}
                value={this.state.orientation}
                onSelectItem={(value) => this.setState({ orientation: value })}
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

export default connect(mapStateToProps, { updateUser })(ChangeOrientation);
