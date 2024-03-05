import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

import MediaSlideshow from "./MediaSlideshow";
import SendUnoteModal from "./SendUnoteModal";
import Unote from "./Unote";
import ProfileBioFooter from "./ProfileBioFooter";

import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

export default class ProfileStack extends Component {
  constructor(props) {
    super(props);
  }

  onSwipe = (gestureName, gestureState) => {
    const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    this.setState({ gestureName: gestureName });
    switch (gestureName) {
      case SWIPE_UP:
        this.props.navigation.push("SettingsModal");
        break;

      case SWIPE_DOWN:
        this.setState({ openModal: true });
        break;
      case SWIPE_LEFT:
        alert("disliked");
        break;
      case SWIPE_RIGHT:
        alert("liked");
        break;
    }
  };

  render() {
    const { profiles } = this.props;

    return (
      <View style={styles.container}>
        {profiles.map((profile, index) => {
          return (
            <View key={`card-${index}`}>
              <GestureRecognizer
                onSwipe={(direction, state) => this.onSwipe(direction, state)}
                config={{
                  velocityThreshold: 0.3,
                  directionalOffsetThreshold: 80,
                }}
                style={{
                  flex: 1,
                }}
              >
                <MediaSlideshow items={profile.media} />
              </GestureRecognizer>
              {profile.unote && <Unote avatar={profile.unote.avatar} />}
              <ProfileBioFooter
                uuid={profile.uuid}
                avatar={profile.avatar}
                name={profile.name}
                age={profile.age}
                school={profile.school}
                bio={profile.bio}
                id={profile.id}
              />
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
