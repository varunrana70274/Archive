import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import ActionSheet from "react-native-actionsheet";
import LinearGradient from "react-native-linear-gradient";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import MovToMp4 from "react-native-mov-to-mp4";
import MediaPreviewModal from "./components/MediaPreviewModal";
import Text from "../../components/Text";
import MessageItem from "../../components/MessageItem";
import Loading from "../../components/Loading";
import * as ImagePicker from "expo-image-picker";
import * as THEME from "../../libs/theme";
import API from "../../libs/api";
import { connect } from "react-redux";

import { CONVERSATION_QUERY } from "../../graphql";
import { Mutation, Query } from "react-apollo";
import { Video } from "expo-av";
import { fetchToken } from "../../libs/helpers";

const { height } = Dimensions.get("window");

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: 1,
      match: null,
      message: "",
      media: false,
      screenHeight: 0,
      textInputHeight: 0,
      messageInputHeight: 80,
      sending: false,
      showingMedia: false,
      previewMediaPath: null,
      previewMediaType: null,
    };

    this.scrollView = null;
    this.textInput = null;
    this.actionSheet = null;
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  async componentDidMount() {
    fetchToken().then((res) => {
      console.log('res token', res.user.id);
      this.setState({ userId: res.user.id })
    })
    this.props.navigation.setOptions({
      title: this.props.route.params.match.match.name,
      headerRight: () => {
        return (
          <Menu>
            <MenuTrigger style={{ padding: 10 }}>
              <FontAwesome5 name="ellipsis-v" size={24} />
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() =>
                  this.props.navigation.navigate("Profile", {
                    user: this.props.route.params.match.match,
                  })
                }
                text="View Profile"
              />
              <MenuOption
                onSelect={() => {
                  Alert.alert(
                    "Delete Matcn",
                    "Are your sure you want to unmatch?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel",
                      },
                      {
                        text: "Unmatch",
                        onPress: () => {
                          API.removeMatch(this.props.route.params.match.id)
                            .then((response) => {
                              this.props.navigation.navigate("Explore");
                            })
                            .catch((error) => {
                              console.log(error.message);
                            });
                        },
                      },
                    ]
                  );
                }}
                text="Unmatch"
              />
              <MenuOption
                onSelect={() => {
                  Alert.alert(
                    "Block User",
                    "Are your sure you want to block this user?",
                    [
                      {
                        text: "Cancel",
                        onPress: () => { },
                        style: "cancel",
                      },
                      {
                        text: "Block",
                        onPress: () => {
                          API.blockUser(this.props.route.params.match.id)
                            .then((response) => {
                              this.props.navigation.navigate("Explore");
                            })
                            .catch((error) => {
                              console.log(error.message);
                            });
                        },
                      },
                    ]
                  );
                }}
                text="Block User"
              />
            </MenuOptions>
          </Menu>
        );
      },
    });

    this.setState({
      match: this.props.route.params.match,
    });

    await API.markRead(this.props.route.params.match.id);
  }

  renderMessage = (props) => {
    const {
      currentMessage: { text: currText },
    } = props;
    return <MessageItem />;
  };

  onShowMedia = (path, type) => {
    this.setState({
      previewMediaPath: path,
      previewMediaType: type,
      showingMedia: true,
    });
  };

  onHideMedia = (path, type) => {
    this.setState(
      {
        showingMedia: false,
      },
      this.setState({
        previewMediaPath: "",
        previewMediaType: "",
      })
    );
  };

  render() {
    if (!this.state.match) {
      return null;
    }

    const scrollEnabled = this.state.screenHeight > height;

    let textInputStyle = {
      height: this.state.textInputHeight,
    };

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "position" : "height"}
        keyboardVerticalOffset={90}
      >
        <Query
          query={CONVERSATION_QUERY}
          variables={{ matchId: this.state.match.id }}
          pollInterval={500}
        >
          {({ loading, error, data }) => {
            if (loading) {
              return <Loading />;
            }

            if (error) {
              return null;
            }

            return (
              <View style={{ height: "100%" }}>
                <ScrollView
                  ref={(ref) => (this.scrollView = ref)}
                  style={styles.scrollView}
                  onContentSizeChange={() => {
                    this.scrollView.scrollToEnd(
                      { animated: true, index: -1 },
                      200
                    );
                  }}
                >
                  {data.conversation.map((message) => {
                    return (
                      <MessageItem
                        userId={this.state.userId}
                        message={message}
                        onShowMedia={this.onShowMedia}
                      />
                    );
                  })}
                </ScrollView>
                <View style={styles.chatFooter}>
                  {this.state.media && this.state.media.type == "image" && (
                    <View
                      style={{
                        marginBottom: 20,
                        overflow: "hidden",
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        source={
                          this.state.media
                            ? { uri: this.state.media.uri }
                            : null
                        }
                        resizeMode="cover"
                        style={{ width: "100%", height: 200 }}
                      />
                    </View>
                  )}
                  {this.state.media && this.state.media.type == "video" && (
                    <View
                      style={{
                        marginBottom: 20,
                        overflow: "hidden",
                        borderRadius: 10,
                      }}
                    >
                      <Video
                        source={{ uri: this.state.media.uri }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode="cover"
                        shouldPlay={true}
                        isLooping
                        style={{ width: "100%", height: 200 }}
                      />
                    </View>
                  )}
                  <View style={styles.chatContainer}>
                    <View style={styles.messageInput}>
                      <TextInput
                        ref={(ref) => (this.textInput = ref)}
                        style={[textInputStyle, styles.textInput]}
                        placeholder="Your Message "
                        placeholderTextColor="#FFFFFF"
                        value={this.state.message}
                        multiline={true}
                        onChangeText={(message) => this.setState({ message })}
                        onContentSizeChange={(e) => {
                          console.log(
                            "Content Size:",
                            e.nativeEvent.contentSize.height
                          );
                          this.setState({
                            textInputHeight: e.nativeEvent.contentSize.height,
                          });
                        }}
                      />
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <LinearGradient colors={['#2BBFC9', '#8CDFC8', '#EFD2B5']}
                        style={styles.sendButton}
                        locations={[0, 0.5, 0.8]}
                        useAngle={true} angle={150}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                      // start={{ y: 0.0, x: 0.0 }} end={{ y: 0.9, x: 0.0 }}
                      >


                        <TouchableOpacity
                          onPress={() => this.actionSheet.show()}
                          // style={styles.sendButton}
                          style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}

                        >
                          <Ionicons name="ios-camera" color="#FFFFFF" size={25} />
                        </TouchableOpacity>
                      </LinearGradient>
                      <LinearGradient colors={['#2BBFC9', '#8CDFC8', '#EFD2B5']}
                        style={styles.sendButton}

                        locations={[0, 0.5, 0.8]}
                        useAngle={true} angle={150}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                      // start={{ y: 0.0, x: 0.0 }} end={{ y: 0.9, x: 0.0 }}
                      >


                        <TouchableOpacity
                          onPress={this.sendMessage}
                          style={{ height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}
                          disabled={this.state.sending}
                        >
                          {this.state.sending ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                          ) : (
                            <Ionicons
                              name="md-send"
                              color="#FFFFFF"
                              size={25}
                              style={{ marginLeft: 5 }}
                            />
                          )}
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        </Query>
        <MediaPreviewModal
          visible={this.state.showingMedia}
          path={this.state.previewMediaPath}
          type={this.state.previewMediaType}
          onHideMedia={this.onHideMedia}
        />
        <ActionSheet
          ref={(actionSheet) => (this.actionSheet = actionSheet)}
          title="Choose Upload Option"
          options={[
            "Choose Video From Library",
            "Choose Photo From Library ",
            "Record Video",
            "Take a photo",
            "Cancel",
          ]}
          cancelButtonIndex={4}
          onPress={this.handleAddMediaClick}
        />
      </KeyboardAvoidingView>
    );
  }
  handleAddMediaClick = (index) => {
    switch (index) {
      case 0:
        this.handleChooseVideoFromLibrary();
        break;
      case 1:
        this.handleChooseImageFromLibrary();
        break;
      case 2:
        this.handleRecordVideoFromCamera();
        break;
      case 3:
        this.handleTakePhotoFromCamera();
        break;
    }
  };

  handleChooseVideoFromLibrary = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ media: result });
    }
  };

  handleRecordVideoFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      console.log("Media: ", result);
      this.setState({ media: result });
    }
  };

  handleChooseImageFromLibrary = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ media: result });
    }
  };

  handleTakePhotoFromCamera = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      return;
    }
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ media: result });
    }
  };

  buildFormData = async (result) => {
    let formData = new FormData();

    if (result) {
      const uri = result.uri;
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];
      console.log("Type:", result.type);
      console.log("Platform: ", Platform.OS);
      if (result.type == "video" || result.type == "video/mp4") {
        if (Platform.OS == "ios") {
          console.log("Image/Mov");
          const filename = Date.now().toString();
          let path =
            "file://" +
            (await MovToMp4.convertMovToMp4(
              result.uri.replace("file://", ""),
              filename
            ));
          console.log('pathpathpath', path, result.uri);
          formData.append("media", {
            uri: path,
            name: `video.mp4`,
            type: `video/mp4`,
          });
        } else {
          formData.append("media", {
            uri: uri,
            type: "video/mp4",
            name: "video.mp4",
          });
        }
      } else {
        formData.append("media", {
          uri,
          name: `avatar.${fileType}`,
          type: `image/${fileType}`,
        });

        console.log({
          uri,
          name: `avatar.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    }

    return formData;
  };

  sendMessage = async () => {
    if (this.state.message || (!this.state.message && this.state.media)) {
      let formData = await this.buildFormData(this.state.media);

      formData.append("message", this.state.message);

      this.setState({ sending: true });

      API.sendMessage(this.state.match.id, formData)
        .then((res) => {
          this.setState({ message: "", sending: false, media: null });
          this.textInput.blur();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
    // marginBottom: 60,
  },
  chatFooter: {
    // position: "absolute",
    // flex: 1,
    paddingHorizontal: 20,
  },
  chatContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    width: "100%",
  },
  textInput: {
    color: THEME.Colors.white,
    padding: 0,
    margin: 0,
    width: "70%",
    // padding: 10,
  },
  messageInput: {
    backgroundColor: "#2BBFC9",
    // minHeight: 40,
    borderRadius: 20,
    width: "75%",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 15,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#2BBFC9",
    marginLeft: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Conversation);
