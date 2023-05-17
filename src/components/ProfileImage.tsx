import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Animated, TouchableOpacity, useAnimatedValue } from "react-native";
import { auth, storage } from "../utils/firebase";

const uploadImageAsync = async (uri: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(storage, `lab_ifr/${auth.currentUser?.uid}.jpg`);

  await uploadBytes(fileRef, blob);

  return await getDownloadURL(fileRef);
};

export const ProfileImage = () => {
  const xPosition = useAnimatedValue(0);
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const getProfileImage = async () => {
    const imageRef = ref(
      storage,
      `profile_images/${auth.currentUser?.uid}.jpg`
    );
    const imageUrl = await getDownloadURL(imageRef);
    setProfileImageUrl(imageUrl);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const profileUrl = await uploadImageAsync(result.assets[0].uri);
      if (profileUrl) {
        setProfileImageUrl(profileUrl);
      }
    }
  };

  const animateImage = () => {
    Animated.spring(xPosition, {
      toValue: 1,
      useNativeDriver: true,
      bounciness: 20,
      speed: 10,
    }).start(() => {
      Animated.spring(xPosition, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 20,
        speed: 10,
      }).start(() => {
        animateImage();
      });
    });
  };

  useEffect(() => {
    getProfileImage();
    animateImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (profileImageUrl) {
    return (
      <TouchableOpacity onPress={pickImage}>
        <Animated.Image
          source={{ uri: profileImageUrl }}
          style={[
            {
              transform: [
                {
                  translateX: xPosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 100],
                  }),
                },
              ],
              //   opacity: xPosition,
            },
            {
              backgroundColor: "#525555",
              height: 200,
              width: 200,
              borderRadius: 99999,
            },
          ]}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Animated.View
        style={[
          {
            transform: [
              {
                translateX: xPosition,
              },
            ],
          },
          {
            backgroundColor: "#525555",
            height: 200,
            width: 200,
            borderRadius: 99999,
          },
        ]}
      />
    </TouchableOpacity>
  );
};
