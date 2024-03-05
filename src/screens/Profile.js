import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import MediaSlideshow from "../components/MediaSlideshow";
import ProfileBioFooter from "../components/ProfileBioFooterV2";

import * as THEME from "../libs/theme";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: this.props.route.params.user,
    };
  }

  render() {
    const { profile } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          activeOpacity={0.9}
          style={{ position: "absolute", zIndex: 999, left: 20, top: 40 }}
        >
          <Feather name="chevron-left" size={24} color={THEME.Colors.primary} />
        </TouchableOpacity>
        <MediaSlideshow items={profile.media} />
        <ProfileBioFooter
          avatar={profile.avatar}
          name={profile.name}
          age={profile.age}
          school={profile.school}
          bio={profile.bio}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
