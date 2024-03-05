import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Formik } from "formik";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_BIO_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class EditBio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: this.props.user.bio,
    };

    this.updateUserBio = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserBio}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        );
      },
      headerLeft: () => {
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ marginLeft: 10 }}
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
        mutation={UPDATE_BIO_MUTATION}
        update={(_, { data: { updateUserBio } }) => {
          this.props.updateUser(updateUserBio);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserBio, { loading, error }) => {
          this.updateUserBio = () => {
            updateUserBio({ variables: { bio: this.state.bio } });
          };

          if (error) {
            alert(error);
          }

          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="Bio"
                value={this.state.bio}
                placeholder="Your bio"
                containerStyle={{ marginBottom: 30, padding: 20 }}
                onChangeText={(text) => this.setState({ bio: text })}
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

export default connect(mapStateToProps, { updateUser })(EditBio);
