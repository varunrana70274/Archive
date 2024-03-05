import React, { Component, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  PanResponder,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import ExploreCardWrapper from "./ExploreCardWrapper";
import EmptyExplore from "./EmptyExplore";
import MediaSlideshow from "./MediaSlideshow";
import TouchBar from "./TouchBar";
import Unote from "./Unote";
import UnoteModal from "./UnoteModal";
import ProfileCard from "./ProfileCard";
import ProfileBioFooter from "./ProfileBioFooterV2";
import * as THEME from "../libs/theme";
import InViewPort from "./InViewPort";
import CardStack, { Card } from "./react-native-card-stack-swiper-master";
import { createThumbnail } from "react-native-create-thumbnail";
import Text from "./Text";
import { AntDesign } from "@expo/vector-icons";
import Input from "./Input";
import Slider from "@react-native-community/slider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import API from "../libs/api";

const DEVICE_WIDTH = Dimensions.get("window").width;

class ProfileSwiper extends Component {
  constructor(props) {
    super(props);
    const animateVlue = new Animated.ValueXY();
    this.state = {
      distance: 2,
      showUnoteModal: false,
      selectedIndex: 0,
      topIndex: 0,
      isVisible: false,
      update: false,
      modalVisible: false,
      selectedShow:'Women',
      selectedOrientation:'Straight'
    };
    this.animateVlue = animateVlue;
    this.scrollView = null;

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        this.animateVlue.setValue({
          x: this.animateVlue.x._value,
          y: this.animateVlue.y._value,
        });

        this.animateVlue.setValue({ x: 0, y: 0 });
      },
      //
      // The user is moving their finger
      //
      onPanResponderMove: (e, gesture) => {
        //
        // Set value of state.animate x/y to the
        // delta value of each
        //
        this.animateVlue.setValue({
          x: gesture.dx,
          y: gesture.dy,
        });
      },
      //
      // Fired at the end of the touch
      //
      onPanResponderRelease: () => {
        //
        // Merges the offset value into the
        // base value and resets the offset
        // to zero
        //
        this.animateVlue.flattenOffset();
      },
    });
  }
  getImage = (media) => {
    media &&
      media.length > 0 &&
      media.map((x, index) => {
        x.media.map((xi, index2) => {
          createThumbnail({
            url: xi.original_path,
            timeStamp: 10000,
          })
            .then((res) => {
              if (
                this.props.profileArray[index].media[index2].tImage == null &&
                this.props.profileArray[index].media[index2].tImage == undefined
              ) {
                this.setState({ update: true });
                this.props.profileArray[index].media[index2].tImage = res.path;
              }
            })
            .catch((e) => {});
        });
      });

    //  .then(response => {
    //    console.log(response,"response");
    //    return response.path
    //  })
    //  .catch(err => console.log({ err }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.scrollView.scrollTo({
        animated: true,
        y: 0,
        x: DEVICE_WIDTH * this.props.selectedIndex,
      });
    }

    if (prevProps !== this.props) {
      if (prevProps.profileArray !== this.props.profileArray) {
        this.getImage(this.props.profileArray);
      }
    }
  }

  nextMediaItem = () => {
    if (this.scrollView) {
      this.props.onIndexSelected(
        (prevState) => ({
          selectedIndex:
            prevState?.selectedIndex === this?.props?.profile?.media?.length - 1
              ? this?.props?.profile?.media?.length - 1
              : prevState.selectedIndex + 1,
        }),
        () => {
          this.scrollView.scrollTo({
            animated: true,
            y: 0,
            x: DEVICE_WIDTH * this.props.selectedIndex,
          });
        }
      );
    }
  };

  prevMediaItem = () => {
    if (this.scrollView) {
      this.props.onIndexSelected(
        (prevState) => ({
          selectedIndex:
            prevState.selectedIndex === 0
              ? prevState.selectedIndex
              : prevState.selectedIndex - 1,
        }),
        () => {
          this.scrollView.scrollTo({
            animated: true,
            y: 0,
            x: DEVICE_WIDTH * this.props.selectedIndex,
          });
        }
      );
    }
  };

  render() {
    {console.log('dfdsfds',this.state.modalVisible,profile)}

    const {
      profile,
      profile2,
      onConversationPress,
      onEditProfilePress,
      onSwipe,
      selectedIndex,
      notifications,
      profileArray,
    } = this.props;

    const { showUnoteModal } = this.state;

    if (!profile) {
      return (
        <>
          <ExploreCardWrapper
            notifications={notifications}
            onSwipeStart={(name, state) => {
              // this.animateVlue.setValue({x:state.dx,y:state.dy})
            }}
            // onSwipe={(name,state)=>{
            //   console.log(state);
            //   this.animateVlue.setValue({x:state.dx,y:state.dy})
            //   onSwipe(name,state)}}
            onConversationPress={onConversationPress}
            onEditProfilePress={onEditProfilePress}
          >
            <EmptyExplore
              onFilterPress={this.props.onFilterPress}
              props={this.props}
            />
          </ExploreCardWrapper>

          {/* <Modal visible={this.state.modalVisible}>
            <View style={{ flex: 1, backgroundColor: "black" }}></View>
          </Modal> */}
        </>
      );
    }

    return (
      <CardStack
        verticalSwipe={false}
        // horizontalSwipe={false}
        style={{ flex: 1 }}
        disableTopSwipe={true}
        // disableBottomSwipe={true}
        // onSwipedBottom={()=>}
        // onSwipedLeft={()=>onSwipe('SWIPE_LEFT',"SWIPE_LEFT")}
        // onSwipedRight={()=>onSwipe('SWIPE_RIGHT','SWIPE_RIGHT')}
        // onSwipedBottom={()=> onSwipe('SWIPE_DOWN','SWIPE_DOWN')}
        renderNoMoreCards={() => {
          return (
            <ExploreCardWrapper
              notifications={notifications}
              onSwipeStart={(name, state) => {
                // this.animateVlue.setValue({x:state.dx,y:state.dy})
              }}
              // onSwipe={(name,state)=>{
              //   console.log(state);
              //   this.animateVlue.setValue({x:state.dx,y:state.dy})
              //   onSwipe(name,state)}}
              onConversationPress={onConversationPress}
              onEditProfilePress={onEditProfilePress}
            >
              <EmptyExplore
                onFilterPress={this.props.onFilterPress}
                props={this.props}
              />
            </ExploreCardWrapper>
          );
        }}
      >
        {/* {console.error('profileArray',profileArray)} */}
        {profileArray.map((x, index2) => (
          <Card
            // key={this.state.topIndex}
            bottomDownSwipe={() => {
              // onSwipe("SWIPE_DOWN", x.id, "SWIPE_DOWN");
            }}
            // layer={
            //    <ProfileBioFooter
            //         avatar={x.avatar}
            //         name={x.name}
            //         age={x.age}
            //         school={x.school}
            //         bio={x.bio}
            //         id={x.id}
            //       />
            // }
            // key={Math.random()}
            // onSwipeStartBottom={()=>}

            // onSwiped={()=>{this.setState({topIndex:this.state.topIndex+1})}}
            onSwipedLeft={() => {
              this.setState({ topIndex: this.state.topIndex + 1 });
              onSwipe("SWIPE_LEFT", x.id, "SWIPE_LEFT");
            }}
            onSwipedRight={() => {
              this.setState({ topIndex: index2 + 1 });
              onSwipe("SWIPE_RIGHT", x.id, "SWIPE_RIGHT");
            }}
            style={{
              height: Dimensions.get("screen").height * 0.99,
              paddingBottom: Dimensions.get("screen").height * 0.05,
              width: "100%",
            }}
          >
            <ScrollView style={styles.container}>
              {/* <View style={{position:'absolute',zIndex:99999,width:'100%',top:-50}}>
       <ProfileBioFooter
              avatar={x.avatar}
              name={x.name}
              age={x.age}
              school={x.school}
              bio={x.bio}
              id={x.id}
            />
       </View> */}

              <ExploreCardWrapper
                notifications={notifications}
                // onSwipe={onSwipe}
                onSwipeStart={(name, state) => {
                  this.animateVlue.setValue({ x: state.dx, y: state.dy });
                }}
                onEditProfilePress={onEditProfilePress}
                onConversationPress={onConversationPress}
                extra={
                  x.unote ? (
                    <>
                      <Unote
                        avatar={x.unote.user.avatar}
                        onPress={() => this.setState({ showUnoteModal: true })}
                      />
                      <UnoteModal
                        onPress={() => this.setState({ showUnoteModal: false })}
                        visible={showUnoteModal}
                        media={x.unote.original_path}
                        type={x.unote.type}
                        content={x.unote.content}
                      />
                    </>
                  ) : null
                }
                // footer={
                //   <ProfileBioFooter
                //     avatar={x.avatar}
                //     name={x.name}
                //     age={x.age}
                //     school={x.school}
                //     bio={x.bio}
                //     id={x.id}
                //   />
                // }
              >
                <View style={styles.container}>
                  {/* {x.media.length > 1 && (
                    <TouchBar left onPress={this.prevMediaItem} />
                  )}
                  {x.media.length > 1 && (
                    <TouchBar right onPress={this.nextMediaItem} />
                  )} */}
                  <View style={styles.indicatorContainer}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      {/* {x.media.map((indicator, index) => {
                        return (
                          <View
                            key={`indicator-${index}`}
                            style={[
                              styles.indicator,
                              selectedIndex == index &&
                                styles.indicatorSelected,
                            ]}
                          ></View>
                        );
                      })} */}
                    </View>
                  </View>
                  {/* <View style={{height:Dimensions.get('screen').height*0.9,width:'100%'}}>
            <ScrollView nestedScrollEnabled> */}
                  <ScrollView
                    ref={(ref) => {
                      // console.log("Reference Set");
                      this.scrollView = ref;
                    }}
                    scrollEnabled={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                  >
                    {console.log("xxxx", x)}
                    {x.media.map((media, index) => [
                      //  console.log("this.props.profileArray[index].media[index2].tImage",x?.name,index2,this.state.topIndex,
                      //  selectedIndex === index ,
                      //  media.type == "video" ,
                      //  !showUnoteModal,this.props.shouldPlay
                      //  ),
                      <ProfileCard
                      isNearBy={this.props.isNearBy}
                      nearByPress={this.props.nearByPress}
                      forYouPress={this.props.forYouPress}
                        profile={x}
                        tImage={media?.tImage}
                        // panResponder={this._panResponder.panHandlers}
                        // animatedValue={index==0?this?.animateVlue.getLayout():null}
                        showPrompt={this.props.showPrompt ? true : false}
                        key={`video-${media.id}`}
                        media={media}
                        shouldPlay={
                          index2 == this.state.topIndex &&
                          selectedIndex == index &&
                          media.type == "video" &&
                          !showUnoteModal &&
                          this.props.shouldPlay
                        }
                      />,
                    ])}
                  </ScrollView>
                  {/* <View style={{height:300,width:400,backgroundColor:'red'}}/>
              <View style={{height:300,width:400,backgroundColor:'green'}}/>
              <View style={{height:300,width:400,backgroundColor:'blue'}}/>
              <View style={{height:300,width:400,backgroundColor:'red'}}/>
              <View style={{height:300,width:400,backgroundColor:'green'}}/>
            </ScrollView>
            </View> */}
                </View>
              </ExploreCardWrapper>
              <View
                style={{
                  backgroundColor: "black",
                  paddingBottom: 100,
                  paddingHorizontal: 20,
                }}
              >
                <View
                  style={{
                    borderRadius: 20,
                    borderColor: "#1B1E29",
                    padding: 20,
                    borderWidth: 1,
                    width: "100%",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ height: 20, width: 20 }}
                      source={require("../v3/profile/video.png")}
                    />
                    <Text
                      bold
                      med
                      // meta
                      style={{ marginLeft: 10 }}
                      color="#5B76FA"
                    >
                      More videos
                    </Text>
                  </View>
                  <FlatList
                    style={{ marginTop: 20 }}
                    nestedScrollEnabled
                    horizontal
                    data={x?.media}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          style={{
                            marginLeft: index == 0 ? 0 : 10,
                            borderRadius: 10,
                          }}
                        >
                          <Image
                            style={{
                              height: 100,
                              width: 100,
                              borderRadius: 10,
                              // borderWidth:1,
                              borderColor:'rgba(255,255,255,0.4)'
                            }}
                            source={{ uri: item?.tImage?item?.tImage:item?.original_path }}
                          />
                        </TouchableOpacity>
                      );
                    }}
                  />
                </View>
                {/* looking for */}
                {x?.looking_for ? (
                  <View
                    style={{
                      borderRadius: 20,
                      marginTop: "5%",
                      borderColor: "#1B1E29",
                      padding: 20,
                      borderWidth: 1,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require("../v3/profile/goal.png")}
                      />
                      <Text bold med style={{ marginLeft: 10 }} color="#5B76FA">
                        Looking for:
                        <Text med style={{ marginLeft: 10 }} color="#fff">
                          {" " + x?.looking_for}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ) : null}
                {/* Zodiac*/}
                {x?.zodiac ? (
                  <View
                    style={{
                      borderRadius: 20,
                      marginTop: "5%",
                      borderColor: "#1B1E29",
                      padding: 20,
                      borderWidth: 1,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require("../v3/profile/zodiac.png")}
                      />
                      <Text bold med style={{ marginLeft: 10 }} color="#5B76FA">
                        Zodiac:
                        <Text med style={{ marginLeft: 10 }} color="#fff">
                          {" " + x?.zodiac}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ) : null}
                {x?.bio ? (
                  <View
                    style={{
                      borderRadius: 20,
                      marginTop: "5%",
                      borderColor: "#1B1E29",
                      padding: 20,
                      borderWidth: 1,
                      width: "100%",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ height: 20, width: 20 }}
                        source={require("../v3/profile/user.png")}
                      />
                      <Text bold med style={{ marginLeft: 10 }} color="#5B76FA">
                        About
                      </Text>
                    </View>
                    <Text med style={{ marginTop: 10 }} color="#fff">
                      {x?.bio}
                    </Text>
                  </View>
                ) : null}

                <Text 
                onPress={()=>{
                  Alert.alert(
                    
                    'Are you sure you want to report this user?',
                    '',
                    [
                      {
                        text:'Cancel',
                        
                      },
                      {
                        text:'Report',
                        style:'destructive',
                        onPress:()=>{
                          API.reportUser(x?.id, 'report')
      .then((res) => {
        console.log('res',res);
      })
      .catch((error) => {
        console.log(error);
        
      });
                        }
                        
                      },
                    ]
                  )
                }}
                bold style={{color:'#FF6961',marginTop:20,alignSelf:'center'}}>Report
                  </Text>
              </View>
            </ScrollView>
          </Card>
        ))}
        {/* <Modal visible={this.state.modalVisible}>
          <View style={{ flex: 1, backgroundColor: "black" }}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 40,
                paddingHorizontal: 20,
                justifyContent: "space-between",
                // backgroundColor:'red',
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#23242780",
                }}
                onPress={() => this.props.navigation.goBack()}
              >
                <AntDesign name="left" size={15} color={THEME.Colors.white} />
              </TouchableOpacity>
              <View>
                <Text
                  weight="medium"
                  medium
                  style={{ alignSelf: "center" }}
                  bold
                  color="white"
                >
                  Filters
                </Text>
              </View>
              <Text style={{ alignSelf: "center" }} meta color="white"></Text>
            </View>

            <Text
              paragraph
              color="white"
              weight="medium"
              style={{ marginVertical: 10 }}
            >
              Location
            </Text>
            <View
              style={[
                inputContainerStyles,
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                },
              ]}
            >
              <TextInput
                onFocus={() => {}}
                placeholder="Search location"
                selectionColor="white"
                keyboardType={"default"}
                placeholderTextColor="#888993"
                autoCapitalize="none"
                style={[inputStyles]}
                onChangeText={() => {}}
                onBlur={() => {}}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Distance
              </Text>
              <Text paragraph color="#5B76FA" weight="medium">
                up to {this.state.distance}km
              </Text>
            </View>
            <Slider
              style={{
                width: "100%",
                height: 20,
                // position: "absolute",
                // bottom: "10%",
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.distance}
              onValueChange={(value) => {
                console.log("value", value);
                this.setState({ distance: value });
              }}
              thumbTintColor={"#5B76FA"}
              maximumTrackTintColor="#1A1B1C"
              minimumTrackTintColor={THEME.Colors.primary}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text paragraph color="white" weight="medium">
                Show me
              </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedShow:'Women'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth:this.state.selectedShow=='Women'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'30%'
              }}
            >
              <Text color="white">Women</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedShow:'Men'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedShow=='Men'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'30%'
              }}
            >
              <Text color="white">Men</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedShow:'Both'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedShow=='Both'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'30%'
              }}
            >
              <Text color="white">Both</Text>
            </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text paragraph color="white" weight="medium">
              Orientation
              </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedOrientation:'Straight'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedOrientation=='Straight'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'48%'
              }}
            >
              <Text color="white">Straight</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedOrientation:'Gay'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedOrientation=='Gay'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'48%'
              }}
            >
              <Text color="white">Gay</Text>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
            
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedOrientation:'Lesbian'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedOrientation=='Lesbian'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'48%'
              }}
            >
              <Text color="white">Lesbian</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
              this.setState({
                selectedOrientation:'Bisexual'
              })
            }}
              style={{
                alignItems: "center",
                borderWidth: this.state.selectedOrientation=='Bisexual'? 1:0,
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 10,
                borderColor: "#5B76FA",
                backgroundColor:'#1B1E29',
                width:'48%'
              }}
            >
              <Text color="white">Bisexual</Text>
            </TouchableOpacity>
            </View>


            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
              }}
            >
              <Text paragraph color="white" weight="medium">
              Age preference
              </Text>
              <Text paragraph color="#5B76FA" weight="medium">
              {this.state.distance} y.o
              </Text>
            </View>
            <Slider
              style={{
                width: "100%",
                height: 20,
                // position: "absolute",
                // bottom: "10%",
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.distance}
              onValueChange={(value) => {
                console.log("value", value);
                this.setState({ distance: value });
              }}
              thumbTintColor={"#5B76FA"}
              maximumTrackTintColor="#1A1B1C"
              minimumTrackTintColor={THEME.Colors.primary}
            />
          </View>
        </Modal> */}
      </CardStack>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    position: "absolute",
    top: 52,
    left: 0,
    right: 0,

    zIndex: 999,
    alignItems: "center",
  },
  indicator: {
    width: 10,
    height: 10,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: THEME.Colors.white,
    borderRadius: 5,
  },
  indicatorSelected: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: THEME.Colors.primary,
  },
});

export default ProfileSwiper;

//   {profile2?  <Card style={{flex:1}}>
//     <View style={styles.container}>
//       <ExploreCardWrapper
//         notifications={notifications}
//         // onSwipe={onSwipe}
//         onSwipeStart={(name,state)=>{
//           this.animateVlue.setValue({x:state.dx,y:state.dy})

//         }}

//         // onSwipe={(name,state)=>{
//         //   // console.log('is swiped',state,this.animateVlue.getLayout());
//         //   // this.animateVlue.setValue({x:state.dx,y:state.dy})
//         //   onSwipe(name,state)
//         //   setTimeout(() => {
//         //     this.animateVlue.setValue({x:0,y:0})
//         //   }, 100);
//         // }}
//         onEditProfilePress={onEditProfilePress}
//         onConversationPress={onConversationPress}
//         extra={
//           profile2.unote ? (
//             <>
//               <Unote
//                 avatar={profile2.unote.user.avatar}
//                 onPress={() => this.setState({ showUnoteModal: true })}
//               />
//               <UnoteModal
//                 onPress={() => this.setState({ showUnoteModal: false })}
//                 visible={showUnoteModal}
//                 media={profile2.unote.original_path}
//                 type={profile2.unote.type}
//                 content={profile2.unote.content}
//               />
//             </>
//           ) : null
//         }
//         footer={
//           <ProfileBioFooter
//             avatar={profile2.avatar}
//             name={profile2.name}
//             age={profile2.age}
//             school={profile2.school}
//             bio={profile2.bio}
//             id={profile2.id}
//           />
//         }
//       >
//         <View style={styles.container}>
//           {profile2.media.length > 1 && (
//             <TouchBar left onPress={this.prevMediaItem} />
//           )}
//           {profile2.media.length > 1 && (
//             <TouchBar right onPress={this.nextMediaItem} />
//           )}
//           <View style={styles.indicatorContainer}>
//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               {profile2.media.map((indicator, index) => {
//                 return (
//                   <View
//                     key={`indicator-${index}`}
//                     style={[
//                       styles.indicator,
//                       selectedIndex == index && styles.indicatorSelected,
//                     ]}
//                   ></View>
//                 );
//               })}
//             </View>
//           </View>
//           <ScrollView
//             ref={(ref) => {
//               console.log("Reference Set");
//               this.scrollView = ref;
//             }}
//             scrollEnabled={false}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//           >

//             {profile2.media.map((media, index) => (
//               <ProfileCard
//               // panResponder={this._panResponder.panHandlers}
//               // animatedValue={index==0?this?.animateVlue.getLayout():null}
//               showPrompt={this.props.showPrompt ? true : false}
//                 key={`video-${media.id}`}
//                 media={media}
//                 shouldPlay={
//                   selectedIndex === index &&
//                   media.type == "video" &&
//                   !showUnoteModal &&
//                   this.props.shouldPlay
//                 }
//               />
//             ))}
//           </ScrollView>
//         </View>
//       </ExploreCardWrapper>

//     </View>
//     </Card>:

//   <ExploreCardWrapper
//   notifications={notifications}
//   onSwipeStart={(name,state)=>{
//     // this.animateVlue.setValue({x:state.dx,y:state.dy})

//   }}
//   // onSwipe={(name,state)=>{
//   //   console.log(state);
//   //   this.animateVlue.setValue({x:state.dx,y:state.dy})
//   //   onSwipe(name,state)}}
//   onConversationPress={onConversationPress}
//   onEditProfilePress={onEditProfilePress}
// >
//   <EmptyExplore />
// </ExploreCardWrapper>

//   }

const inputStyles = {
  // borderWidth: 0,
  // borderColor: THEME.Colors.inputBorder,
  fontFamily: THEME.FontFamily.medium,
  fontSize: THEME.Sizes.paragraph,
  // paddingHorizontal: 8,
  // paddingVertical: 10,
  // borderRadius: 10,
  color: THEME.Colors.white,
  width: "90%",
  // height:'100%',
  // backgroundColor: 'red',
};
const inputContainerStyles = {
  borderWidth: 0,
  borderColor: THEME.Colors.inputBorder,
  fontFamily: THEME.FontFamily.medium,
  fontSize: THEME.Sizes.paragraph,
  paddingHorizontal: 8,
  paddingVertical: 12,
  borderRadius: 10,
  color: THEME.Colors.white,
  backgroundColor: THEME.Colors.inputBoxColor,
};
