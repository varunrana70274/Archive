import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import MovToMp4 from "react-native-mov-to-mp4";
import Text from "./Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

import * as THEME from "../libs/theme";
import { Video } from "expo-av";

import API from "../libs/api";
import { updateUser } from "../actions";
import { connect } from "react-redux";

const AddMediaButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: THEME.Colors.primary,
        justifyContent: "center",
        alignItems: "center",
        width: 150,
        height: 250,
        borderRadius: 8,
      }}
    >
      <MaterialCommunityIcons
        name="camera-plus-outline"
        size={32}
        color={THEME.Colors.white}
      />
    </TouchableOpacity>
  );
};

const VideoBlock = ({ video, onPress,onLongPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onLongPress={onLongPress}
      onPress={onPress}
      style={{
        borderRadius: 10,
        width: 150,
        marginRight: 10,
        overflow: "hidden",
      }}
    >
      <Video
        source={{ uri: video.original_path }}
        style={{ width: "100%", height: 250 }}
        shouldPlay={true}
        isLooping
        isMuted={true}
      />
    </TouchableOpacity>
  );
};

const EmptyBlock = () => {
  return <View style={styles.additionalMedia} />;
};

class PhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fillers: [{}, {}, {}, {}, {}, {}, {}],
    };

    this.actionSheet = null;
  }

  _generateFiller = () => {
    if (this.props.user.media.length == 8) {
      this.setState({ fillers: [] });
    } else {
      let count = 7 - this.props.user.media.length;
      console.log("Count:", count);
      let fillers = [];

      for (i = 0; i < count; i++) {
        fillers.push({});
      }
      console.log("Fillers:", fillers.length);
      this.setState({ fillers });
    }
  };

  componentDidMount() {
    this._generateFiller();
  }

  removeMediaClick = (media) => {
    Alert.alert(
      "Remove Media",
      "Are you sure you want to remove this profile media?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete Media",
          onPress: () => {
            API.removeProfileMedia(media.id)
              .then((response) => {
                let user = response.data.user;
                this.props.updateUser(user);
              })
              .catch((error) => {
                console.log(error.response.data.error);
              });
          },
        },
      ]
    );
  };

  render() {
    const { user } = this.props;
    return (
      <View style={styles.additionalMediaContainer}>
        <Text caption medium>
          Additional Videos
        </Text>
        <ScrollView
          horizontal
          style={{
            marginTop: 10,
            flexDirection: "row",
            flex: 1,
          }}
        >
          {user.media.map((video, index) => {
            return (
              <VideoBlock
              onLongPress={()=>this.removeMediaClick(video)}
                video={video}
                onPress={()=>this.props.onPress(video)}
              />
            );
          })}
          {this.props.user.media.length < 8 && (
            <AddMediaButton onPress={this.props.onRecordVideo} />
          )}
        </ScrollView>
        <ActionSheet
          ref={(actionSheet) => (this.actionSheet = actionSheet)}
          title="Choose Upload Option"
          options={[
            "Choose Video From Library",
            // "Choose Photo From Library ",
            "Record Video",
            // "Take a photo",
            "Cancel",
          ]}
          cancelButtonIndex={4}
          onPress={this.handleAddMediaClick}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  additionalMediaContainer: {
    marginBottom: 55,
  },
  additionalMedia: {
    marginTop: 15,
    width: width / 4 - 30,
    height: width / 4 - 30,
  },
  additionalMediaImage: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { updateUser })(PhotoGallery);
