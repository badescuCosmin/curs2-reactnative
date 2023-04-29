import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { auth, storage } from "../utils/firebase";

async function uploadImageAsync(uri: string) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
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

  console.log("blob", blob);
  const fileRef = ref(storage, `lab_ifr/${auth.currentUser?.uid}.jpg`);
  console.log(fileRef);
  await uploadBytes(fileRef, blob);
  console.log("uploaded image!");

  return await getDownloadURL(fileRef);
}

export const ProfileImage = () => {
  const [imageUrl, setImageUrl] = useState("");

  const getImage = () => {
    const imageRef = ref(storage, `lab_ifr/${auth.currentUser?.uid}.jpg`);
    getDownloadURL(imageRef).then((url) => {
      setImageUrl(url);
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUrl = await uploadImageAsync(result.assets[0].uri);
      setImageUrl(newImageUrl);
    }
  };

  useEffect(() => {
    getImage();
  }, []);

  if (!imageUrl) {
    return (
      <TouchableOpacity onPress={pickImage}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: "black",
          }}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={{ uri: imageUrl }}
        style={{
          height: 100,
          width: 100,
          borderRadius: 100,
        }}
      />
    </TouchableOpacity>
  );
};
