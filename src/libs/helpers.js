import { Asset } from 'expo-asset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import * as Notifications from 'expo-notifications';
import iid from '@react-native-firebase/iid';
import API from './api';
import { Image } from 'react-native';

const AUTH_TOKEN = '@wave:token';
const AUTH_USER = '@wave:user';
const INTRO_TOKEN = '@wave:intro';

export const cacheImages = (images) => {
  return images.map((image) => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
};

export const setShowIntroToken = async () => {
  await AsyncStorage.setItem(INTRO_TOKEN, 'true');
};

export const getShowIntroToken = async () => {
  return AsyncStorage.getItem(INTRO_TOKEN);
};

export const deleteShowIntroToken = async () => {
  await AsyncStorage.removeItem(INTRO_TOKEN);
};

export const fetchToken = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    const user = JSON.parse(await AsyncStorage.getItem(AUTH_USER));
    return { token, user };
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export const signIn = async (token, user) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN, token);
    await AsyncStorage.setItem(AUTH_USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const updateUserSession = async (user) => {
  await AsyncStorage.setItem(AUTH_USER, JSON.stringify(user));
};

export const signOut = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN);
    await AsyncStorage.removeItem(AUTH_USER);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const registerForPushNotifications = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowAnnouncements: true,
      },
    });

    if (status) {
      const id = await iid().getToken();
      await API.updatePushNotificationToken(id);
    }
  } catch (error) {
    console.error('Error registering for push notifications:', error);
    throw error;
  }
};

export const bulkCacheVideos = async (videos) => {
  try {
    await Promise.all(
      videos.map(async (video) => {
        let filename = video.substring(video.lastIndexOf('/') + 1);
        let pathName = FileSystem.documentDirectory + filename;
        let fileInfo = await FileSystem.getInfoAsync(pathName);

        if (!fileInfo.exists) {
          await FileSystem.downloadAsync(video, pathName.replace(/%20/g, '_'));
        }
      })
    );
  } catch (error) {
    console.error('Error caching videos:', error);
    throw error;
  }
};

export const getCachedVideo = async (videoUrl) => {
  let filename = videoUrl.substring(videoUrl.lastIndexOf('/') + 1);

  try {
    const result = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    const cachedVideo = result.find((element) => {
      let elementFilename = element.substring(element.lastIndexOf('/') + 1);
      return elementFilename === filename.replace(/%20/g, '_');
    });

    return cachedVideo ? FileSystem.documentDirectory + cachedVideo : null;
  } catch (error) {
    console.error('Error getting cached video:', error);
    throw error;
  }
};
