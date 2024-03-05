import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
  Platform,
  ActivityIndicator,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import MovToMp4 from "react-native-mov-to-mp4";
import VideoGallery from "../../components/VideoGallery";
import Text from "../../components/Text";
import SettingOption from "../../components/SettingOption";
import API from "../../libs/api";
import moment from "moment";
import { updateUser } from "../../actions";
import { Video } from "expo-av";
import { connect } from "react-redux";
import * as THEME from "../../libs/theme";
const { width } = Dimensions.get("window");
import FastImage from "react-native-fast-image";
import { Camera } from "expo-camera";

class EditProfile extends Component {
  state = {
    images: [{}, {}, {}, {}, {}, {}, {}, {}],
    avatarLoading: false,
    introLoading: false,
  };
  async componentDidMount() {
    let { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert(
        "In order to use this app we need permissions to access your camera."
      );
    }
  }

  handleRecordVideo = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
    });

    let formData = new FormData();

    if (!result.cancelled) {
      if (Platform.OS == "ios") {
        const filename = Date.now().toString();
        let path =
          "file://" +
          (await MovToMp4.convertMovToMp4(
            result.uri.replace("file://", ""),
            filename
          ));
        console.log("pathpathpath", path, result.uri);
        formData.append("video", {
          name: "video.mp4",
          uri: path,
          type: "video/mp4",
        });
      } else {
        const uri = result.uri;

        formData.append("video", { uri: uri, type: "video/mp4" });
      }

      this.setState({ introLoading: true });

      API.uploadUserIntro(formData)
        .then((response) => {
          let user = response.data.user;
          this.setState({ introLoading: false });
          this.props.updateUser(user);
        })
        .catch((err) => {
          this.setState({ introLoading: false });
          console.log(err.message);
        });
    }
  };
  handlePickVideo = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
    });

    let formData = new FormData();

    if (!result.cancelled) {
      if (Platform.OS == "ios") {
        const filename = Date.now().toString();
        let path =
          "file://" +
          (await MovToMp4.convertMovToMp4(
            result.uri.replace("file://", ""),
            filename
          ));
        console.log("pathpathpath", path, result.uri);
        formData.append("video", {
          name: "video.mp4",
          uri: path,
          type: "video/mp4",
        });
      } else {
        const uri = result.uri;

        formData.append("video", { uri: uri, type: "video/mp4" });
      }
      this.setState({ introLoading: true });
      API.uploadUserIntro(formData)
        .then((response) => {
          let user = response.data.user;
          this.setState({ introLoading: false });
          this.props.updateUser(user);
        })
        .catch((err) => {
          console.log(err.message);
          this.setState({ introLoading: false });
        });
    }
  };

  handleTakePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();

      formData.append("media", {
        uri,
        name: `photo.${fileType}`,
        type: fileType,
      });
      this.setState({ avatarLoading: true });
      API.uploadUserAvatar(formData)
        .then((response) => {
          let user = response.data.user;
          this.props.updateUser(user);
          this.setState({ avatarLoading: false });
        })
        .catch((err) => {
          console.log(err.message);
          this.setState({ avatarLoading: false });
        });
    }
  };

  handleCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      alert("No Permissions");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const formData = new FormData();

      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("media", {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });
      this.setState({ avatarLoading: true });
      API.uploadUserAvatar(formData)
        .then((response) => {
          let user = response.data.user;
          this.props.updateUser(user);
          this.setState({ avatarLoading: false });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ avatarLoading: false });
        });
    }
  };

  handleChoosePhoto = (index) => {
    switch (index) {
      case 0:
        this.handleCameraRoll();
        break;
      case 1:
        this.handleTakePhoto();
        break;
    }
  };

  handleChooseVideo = (index) => {
    switch (index) {
      case 0:
        this.handlePickVideo();
        break;
      case 1:
        this.handleRecordVideo();
        break;
    }
  };

  handleMediaCameraRoll = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status !== "granted") {
      alert("No Permissions");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const formData = new FormData();

      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      formData.append("media", {
        uri,
        name: `avatar.${fileType}`,
        type: `image/${fileType}`,
      });

      API.uploadProfileMedia(formData)
        .then((response) => {
          let user = response.data.user;
          this.props.updateUser(user);
        })
        .catch((err) => {
          alert(err.message);
          console.log(err);
        });
    }
  };

  handleMediaTakePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraRoll();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const uri = result.uri;
      const formData = new FormData();

      formData.append("media", { uri });

      API.uploadProfileMedia(formData)
        .then((response) => {
          let user = response.data.user;
          this.props.updateUser(user);
        })
        .catch((err) => {
          alert(err.message);
          console.log(err.message);
        });
    }
  };

  handleMediaChoosePhoto = (index) => {
    switch (index) {
      case 0:
        this.handleMediaCameraRoll();
        break;
      case 1:
        this.handleMediaTakePhoto();
        break;
    }
  };

  render() {
    const { user } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={{ padding: 36 }}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.avatarButton, { marginRight: 58 }]}
              onPress={() => this.actionSheet.show()}
            >
              <View style={styles.roundAvatar}>
                {this.state.avatarLoading && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                )}
                {user.avatar == "" && (
                  <FastImage
                    resizeMode="cover"
                    source={{
                      uri: "https://placehold.it/500x500",
                    }}
                    style={styles.roundAvatar}
                  />
                )}

                {user.avatar && (
                  <FastImage
                    resizeMode="cover"
                    source={{
                      uri: user.avatar,
                    }}
                    style={styles.roundAvatar}
                  />
                )}
              </View>
              <Text
                style={{ color: "#707070", fontFamily: THEME.FontFamily.thin }}
              >
                Change Avatar
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.avatarButton}
              onPress={() =>
                {
                  console.log('v',user.intro_video)
                  if(user.intro_video){
                    this.props.navigation.navigate("VideoPreview", {
                      intro_video: user.intro_video,
                      type: "intro",
                    })
                  }
                  else{
                    this.props.navigation.navigate("VideoIntroView")
                  }
                }
              }
            >
              {console.log('user',user)}
              <View style={styles.roundAvatar}>
                {this.state.introLoading && (
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ActivityIndicator size="large" color="#FFFFFF" />
                  </View>
                )}
                {user.intro_video == "" && (
                  <FastImage
                    resizeMode="cover"
                    source={{ uri: "https://placehold.it/500x500" }}
                    style={styles.roundAvatar}
                  />
                )}
                {console.log('user.intro_video',user.intro_video)}
                {user.intro_video && (
                  <Video
                    resizeMode="cover"
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: user.intro_video }}
                    shouldPlay
                    isLooping
                    isMuted
                  />
                )}
              </View>
              <Text
                onPress={() =>{
                   this.props.navigation.navigate("VideoIntroView")}}
                style={{ color: "#707070", fontFamily: THEME.FontFamily.thin }}
              >
                Change Intro Video
              </Text>
            </TouchableOpacity>
          </View>
          <VideoGallery
            onPress={(video) => {
              this.props.navigation.navigate("VideoPreview", {
                intro_video: video.original_path,
                type: "CameraView",
              });
            }}
            onRecordVideo={() => {
              // this.props.navigation.navigate("RecordIntro")
              // this.props.navigation.navigate("VideoIntroView",{"addtionalVideo":"true"})
              this.props.navigation.navigate("RecordIntro",{isAdditional:true});
              // this.props.navigation.navigate("CameraView");
            }}
          />
          <View>
            <Text caption medium style={{ marginBottom: 12, fontSize: 16 }}>
              Edit Profile Info
            </Text>
            <SettingOption
              title="Name"
              placeholder={user.name}
              onPress={() => this.props.navigation.push("EditName")}
            />
            <SettingOption
              title="Bio"
              placeholder={user.bio}
              onPress={() => this.props.navigation.push("EditBio")}
            />
            <SettingOption
              title="University"
              placeholder={user.school}
              onPress={() => this.props.navigation.push("EditSchool")}
            />
            <SettingOption
              title="Gender"
              placeholder={user.gender}
              onPress={() => this.props.navigation.push("EditGender")}
            />
            <SettingOption
              title="Birthday"
              placeholder={moment(user.birthdate).format("MM/DD/YYYY")}
            />
          </View>
        </View>
        <ActionSheet
          ref={(actionSheet) => (this.actionSheet = actionSheet)}
          title="Choose Upload Option"
          options={["Choose from Image Library", "Take a photo", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this.handleChoosePhoto}
        />
        <ActionSheet
          ref={(mediaActionSheet) => (this.mediaActionSheet = mediaActionSheet)}
          title="Choose Upload Option"
          options={["Choose from Image Library", "Take a photo", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this.handleMediaChoosePhoto}
        />
        <ActionSheet
          ref={(videoActionSheet) => (this.videoActionSheet = videoActionSheet)}
          title="Choose Upload Option"
          options={["Choose from Video Library", "Record a video", "Cancel"]}
          cancelButtonIndex={2}
          onPress={this.handleChooseVideo}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundAvatar: {
    width: 103,
    height: 103,
    borderRadius: 103 / 2,
    marginBottom: 20,
    backgroundColor: THEME.Colors.primary,
    overflow: "hidden",
  },
  avatarContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 58,
  },
  avatarButton: {
    alignItems: "center",
  },
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

export default connect(mapStateToProps, { updateUser })(EditProfile);
