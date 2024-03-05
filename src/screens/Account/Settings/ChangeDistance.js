import React, { Component } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import RangeSlider from "react-native-range-slider";

import Input from "../../../components/InputRange";
import Text from "../../../components/Text";
 
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { UPDATE_SEARCH_DISTANCE_MUTATION } from "../../../graphql";
import { updateUser } from "../../../actions";

class ChangeDistance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: parseInt(this.props.user.search_distance),
    };

    this.updateSearchDistance = null;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            activeOpacity={0.9}
            onPress={this.updateSearchDistance}
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
        mutation={UPDATE_SEARCH_DISTANCE_MUTATION}
        update={(_, { data: { updateSearchDistance } }) => {
          this.props.updateUser(updateSearchDistance);
          this.props.navigation.goBack();
        }}
      >
        {(updateSearchDistance, { loading }) => {
          this.updateSearchDistance = () => {
            updateSearchDistance({
              variables: { distance: this.state.distance },
            });
          };
          return (
            <SafeAreaView style={styles.container}>
              <Input
                label="Search Distance"
                // containerStyle={{ marginBottom: 30 }}
                onValueChange={(value) => this.setState({ distance: value })}
                value={this.state.distance}
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

export default connect(mapStateToProps, { updateUser })(ChangeDistance);
