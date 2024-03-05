import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import * as THEME from "../../../libs/theme";
import ToggleInput from "../../../components/ToggleInput";
import { connect } from "react-redux";

import { Mutation } from "react-apollo";
import {
  UPDATE_NEW_MESSAGE_NOTIFICATION_MUTATION,
  UPDATE_NEW_MATCH_NOTIFICATION_MUTATION,
} from "../../../graphql";
import { updateUser } from "../../../actions";

class PushNotifications extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Mutation
          mutation={UPDATE_NEW_MATCH_NOTIFICATION_MUTATION}
          update={(_, { data: { updateNewMatchNotification } }) => {
            this.props.updateUser(updateNewMatchNotification);
          }}
        >
          {(updateNewMatchNotification, { loading }) => {
            const updateNewMatch = (value) => {
              updateNewMatchNotification({ variables: { value: value } });
            };

            return (
              <ToggleInput
                title="New Matches"
                subtitle="You ust got a new match"
                value={this.props.user.new_match_notification}
                onChange={updateNewMatch}
              />
            );
          }}
        </Mutation>
        <Mutation
          mutation={UPDATE_NEW_MESSAGE_NOTIFICATION_MUTATION}
          update={(_, { data: { updateNewMessageNotification } }) => {
            console.log(updateNewMessageNotification);
            this.props.updateUser(updateNewMessageNotification);
          }}
        >
          {(updateNewMessageNotification, { loading }) => {
            const updateNewMessage = (value) => {
              updateNewMessageNotification({ variables: { value: value } });
            };
 
            return (
              <ToggleInput
                title="Messages"
                subtitle="Someone send you a new message"
                value={this.props.user.new_message_notification}
                onChange={updateNewMessage}
              />
            );
          }}
        </Mutation>
      </ScrollView>
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

export default connect(mapStateToProps, { updateUser })(PushNotifications);
