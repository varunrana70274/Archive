import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";

import { connect } from "react-redux";
import { Mutation } from "react-apollo";

import Input from "../../../components/InputWithoutFormik";
import Text from "../../../components/Text";

import { UPDATE_NAME_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class ReferalAdd extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };
 
    this.updateUserName = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateUserName}
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
        mutation={UPDATE_NAME_MUTATION}
        update={(_, { data: { updateUserName } }) => {
          // this.props.updateUser(updateUserName);
          this.props.navigation.goBack();
        }}
      >
        {(updateUserName, { loading }) => {
          this.updateUserName = () => {
            updateUserName({ variables: { name: this.state.name } });
          };

          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="Code"
                placeholder="Code"
                value={this.state.name}
                containerStyle={{ padding: 20,  }}
                onChangeText={(text) => {
                  this.setState({ name: text })}

                }
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

export default connect(mapStateToProps, {  })(ReferalAdd);
