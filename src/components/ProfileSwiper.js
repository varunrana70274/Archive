import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import ExploreCardWrapper from "./ExploreCardWrapper";
import EmptyExplore from "./EmptyExplore";
import MediaSlideshow from "./MediaSlideshow";
import Unote from "./Unote";
import UnoteModal from "./UnoteModal";
import ProfileBioFooter from "./ProfileBioFooterV2";

const ProfileSwiper = ({
  profile,
  onConversationPress,
  onEditProfilePress,
  onSwipe,
}) => {
  const [showUnoteModal, setShowUnoteModal] = useState(false);

  if (!profile) {
    return (
      <ExploreCardWrapper
        onSwipe={onSwipe}
        onConversationPress={onConversationPress}
        onEditProfilePress={onEditProfilePress}
      >
        <EmptyExplore />
      </ExploreCardWrapper>
    );
  }

  return (
    <View style={styles.container}>
      <ExploreCardWrapper
        onSwipe={onSwipe}
        onEditProfilePress={onEditProfilePress}
        onConversationPress={onConversationPress}
        extra={
          profile.unote ? (
            <>
              <Unote
                avatar={profile.unote.user.avatar}
                onPress={() => setShowUnoteModal(true)}
              />
              <UnoteModal
                onPress={() => setShowUnoteModal(false)}
                visible={showUnoteModal}
                media={profile.unote.original_path}
                content={profile.unote.content}
                type={profile.unote.type}
              />
            </>
          ) : null
        }
        footer={
          <ProfileBioFooter
            avatar={profile.avatar}
            name={profile.name}
            age={profile.age}
            school={profile.school}
            bio={profile.bio}
          />
        }
      >
        {profile.media && <MediaSlideshow items={profile.media} />}
      </ExploreCardWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ProfileSwiper;
