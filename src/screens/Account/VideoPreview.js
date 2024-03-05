import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image, View, Alert } from "react-native";
import { connect } from "react-redux";
import { Video } from "expo-av";
import Text from '../../components/Text'
import API from "../../libs/api";
import { Mutation } from "react-apollo";
import { UPDATE_INTRO_VIDEO_MUTATION } from "../../graphql";
import { updateUser } from "./../../actions";
import Loading from "../../components/Loading";

class VideoPreview extends Component {
  state = { shouldPlay: true,showIntro:false,loading2:false };
  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("focus");
      if (!this.state.shouldPlay) this.setState({ shouldPlay: true });
    });
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              if(this.props?.route?.params?.type=='intro'){
                  this.setState({showIntro:!this.state.showIntro})
              }
              else{
              this.setState({ shouldPlay: false });
              this.props?.route?.params?.type == "intro"
                ? this.props.navigation.push("VideoIntroView")
                : this.props.navigation.navigate("CameraView");
              }
            }}
          >
            <Image
              style={{
                tintColor: "black",
                height: 35,
                width: 35,
                marginRight: 5,
              }}
              source={
                this.props?.route?.params?.type=='intro'?
                require("../../images/option.png")
                :
                require("../../images/camera-pin.png")}
            />
          </TouchableOpacity>
        );
      },
    });
  }
  componentWillUnmount() {
    this.unsubscribe();
    this.setState({ shouldPlay: false });
  }

  deletePress=()=>{
    API.deleteIntro()
    .then((response) => {
      console.log('response',response.data);
      this.setState({ introLoading: false });
      this.updateIntroVideo()
      let user = response?.data?.user;
    if(user){
      this.props.updateUser(user);
      this.setState({ loading: false });
    }
    this.props.navigation.navigate("EditProfile");
    })
    .catch((err) => {
      
      alert(err.message);
    });
  }
  render() {
    const { shouldPlay } = this.state;
    if (shouldPlay)
      return (
        <Mutation
        mutation={UPDATE_INTRO_VIDEO_MUTATION}
        update={(_, { data: { updateIntroVideo } }) => {
          // this.props.updateUser(updateIntroVideo);
          // this.props.navigation.goBack();
        }}
      >
        {(updateIntroVideo, { loading, error }) => {
          this.updateIntroVideo = () => {
            updateIntroVideo({ variables: { intro_video: null } });
          };

          if (error) {
            // alert(error);
          }
          return(
        <>
       {this.state.showIntro? <View style={{borderRadius:10, backgroundColor:'white',position:'absolute',right:'1%',zIndex:99999}}>
           
            <TouchableOpacity 
            onPress={()=>{
              this.setState({shouldPlay:false})
              this.props?.navigation.navigate('EditVideoIntro',{intro_video:this.props.route.params?.intro_video})}}
            style={{alignItems:'center',padding:10,paddingHorizontal:20,justifyContent:'center',borderBottomWidth:0.5}}>
              <Text>Edit Video</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
             Alert.alert(
              'Delete intro Video',
              'Are you sure, do you want to delete intro video?',
              [
                {
                  text:'Yes',onPress:()=>{
                    this.deletePress()
                  }
                },
                {
                  text:'No'
                }
              ]
             )
            }}
            style={{alignItems:'center',padding:10,paddingHorizontal:20,justifyContent:'center',borderBottomWidth:0.5}}>
              <Text>Delete Video</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>{
              this.setState({shouldPlay:false})
              this.props.navigation.push("VideoIntroView")
            }}
            style={{alignItems:'center',padding:10,paddingHorizontal:20,justifyContent:'center'}}>
              <Text>New Video</Text>
            </TouchableOpacity>
        </View>:null}
        <Video
        onLoadStart={()=>{
          this.setState({loading2:true})
        }}
        onLoad={()=>{
          setTimeout(() => {
            
            this.setState({loading2:false})
          }, 100);
        }}
          resizeMode="cover"
          style={{ width: "100%", height: "100%", backgroundColor: "black", }}
          source={{ uri: this.props.route.params.intro_video }}
          shouldPlay={shouldPlay}
          isLooping
        >
       {
        
        this.state.loading2 ? (
          <Loading
          
          />):null}
          </Video>
        </>)
        }}
        </Mutation>
      );
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    marginTop: 100,
    // backgroundColor: THEME.Colors.white,
  },
});

export default connect(null, {updateUser})(VideoPreview);
