import React, { Component } from "react";
import { Video } from "expo-av";
import MovToMp4 from "react-native-mov-to-mp4";
import { SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import { setShowIntroToken } from "../libs/helpers";
import Text from "../components/Text";
import API from "../libs/api";
import { connect } from "react-redux";
import { updateUser } from "../actions";

class MediaUploadPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      media: this.props.route.params.media,
      prompt: this.props.route.params.prompt,
    };
  }

  uploadIntroVideo = async () => {
    let formData = new FormData();
    if (Platform.OS == "ios") {
      const filename = Date.now().toString();
      let path =
        "file://" +
        (await MovToMp4.convertMovToMp4(
          this.state.media.uri.replace("file://", ""),
          filename
        ));
console.log('pathpathpath2',path,this.state.media.uri);
      formData.append("media", {
        name: "video.mp4",
        uri: path,
        type: "video/mp4",
      });

      formData.append("prompt", this.state.prompt);
    } else {
      const uri = this.state.media.uri;

      formData.append("media", { uri: uri, type: "video/mp4" });
      formData.append("prompt", this.state.prompt);
    }

    API.uploadProfileMedia(formData)
      .then(async (response) => {
        let user = response.data.user;
        this.setState({ media: null });
        this.props.updateUser(user);
        this.props.navigation.navigate("EditProfile");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  render() {
    const { media } = this.state;
    return (
      <View style={styles.container}>
        {media && (
          <Video
            style={styles.video}
            isLooping={true}
            shouldPlay={true}
            source={{ uri: media.uri }}
          />
        )}
        <View
          style={{
            position: "absolute",
            width: "100%",
            padding: 20,
            bottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Text primary>Record another video</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.uploadIntroVideo}>
            <Text primary>Upload Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: "100%",
    height: "100%",
  },
});

export default connect(null, { updateUser })(MediaUploadPreview);