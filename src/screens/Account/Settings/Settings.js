import React, { Component } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import Text from "../../../components/Text";
import * as Linking from "expo-linking";
import * as THEME from "../../../libs/theme";

import SettingOption from "../../../components/SettingOption";

import { Query } from "react-apollo";
import gql from "graphql-tag";

import { connect } from "react-redux";
import { logout } from "../../../actions";

const SettingHeader = ({ children }) => (
  <Text body bold style={{ marginBottom: 18,fontSize:11,color:'#707070' }}>
    {children}
  </Text>
);

const USER_QUERY = gql`
  query {
    me {
      id
      name
      email
      avatar
      school
      age
      phone_number
      search_distance
      looking_for
      orientation
    }
  }
`;
 
class Settings extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SettingHeader>Account</SettingHeader>
        <SettingOption
          title="Email"
          placeholder={this.props.user.email}
          onPress={() => this.props.navigation.navigate("EditEmail")}
        />
        <SettingOption
          title="Phone Number"
          placeholder={this.props.user.phone_number}
          onPress={() => this.props.navigation.navigate("EditPhone")}
        />
        <SettingOption
          title="Password"
          placeholder="Change Password"
          onPress={() => this.props.navigation.navigate("ChangePassword")}
        />
        <SettingHeader>Match Preferences</SettingHeader>
        <SettingOption
          title="Distance"
          placeholder={`${this.props.user.search_distance} mi`}
          onPress={() => this.props.navigation.navigate("ChangeDistance")}
        />
        <SettingOption
          title="Looking For"
          placeholder={this.props.user.looking_for}
          onPress={() => this.props.navigation.navigate("ChangeLookingFor")}
        />
        <SettingOption
          title="Orientation"
          placeholder={this.props.user.orientation}
          onPress={() => this.props.navigation.navigate("ChangeOrientation")}
        />
        <SettingHeader>General & Support</SettingHeader>
        <SettingOption
          title="Push Notifications"
          onPress={() => this.props.navigation.navigate("PushNotifications")}
        />
        <SettingOption
          title="Report a problem"
          onPress={() =>
            Linking.openURL(
              "mailto: support@wavetodate.com?subject=WaveIssue&title=support@wavetodate.com"
            )
          }
        />
        <SettingOption
          title="Help Center"
          onPress={() => this.props.navigation.navigate("HelpCenter")}
        />
        <SettingOption
          title="Get Waved"
          primary
          onPress={() => this.props.navigation.navigate("ChangeOrientation")}
        />
        <SettingHeader>About</SettingHeader>
        <SettingOption
          title="Terms of Use"
          onPress={() => this.props.navigation.navigate("Terms")}
        />
        <SettingOption
          title="Privacy Policy"
          onPress={() => this.props.navigation.navigate("PrivacyPolicy")}
        />
        <SettingOption
          title="Logout"
          primary
          style={{ marginTop: 30 }}
          onPress={this.props.logout}
        />
      </ScrollView>
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

export default connect(mapStateToProps, { logout })(Settings);
// export default Settings;
