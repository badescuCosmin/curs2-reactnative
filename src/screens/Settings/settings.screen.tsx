import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import { signOut } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, View, useAnimatedValue } from "react-native";
import { Button, TextInput } from "../../components";
import { ProfileImage } from "../../components/ProfileImage";
import { useUsername } from "../../hooks/useUsername";
import { auth } from "../../utils/firebase";
import { sendPushNotification } from "../../utils/notification";

const Settings = () => {
  const yPosition = useRef(new Animated.Value(0)).current;
  const xPosition = useRef(new Animated.Value(0)).current;
  const fadeAnim = useAnimatedValue(0);
  const [username, setUsername] = useState("");
  const { getUsernameFromAsyncStorage } = useUsername();

  const saveUsername = async () => {
    await AsyncStorage.setItem("username", username);
    getUsernameFromAsyncStorage();
  };

  useEffect(() => {
    AsyncStorage.getItem("username").then((usernameFromAsyncStorage) => {
      if (usernameFromAsyncStorage) {
        setUsername(usernameFromAsyncStorage);
      }
    });
  }, []);

  const sendNotification = () => {
    sendPushNotification("Test", "Test Notification");
  };

  const animateImage = () => {
    Animated.timing(yPosition, {
      toValue: 100,
      useNativeDriver: true,
      duration: 1000,
    }).start(() => {
      Animated.timing(yPosition, {
        toValue: 0,
        useNativeDriver: true,
        duration: 500,
      }).start(() => {
        animateImage();
      });
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
      const canShare = await Sharing.isAvailableAsync();

      if (canShare) {
        await Sharing.shareAsync(result.assets[0].uri);
      }
    }
  };

  const shareFile = async () => {
    await pickImage();
  };

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <Animated.View
        style={[
          {
            opacity: fadeAnim.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
            }),
            transform: [
              {
                translateY: yPosition,
              },
              {
                translateX: xPosition,
              },
            ],
          },
        ]}
      >
        <ProfileImage />
      </Animated.View>
      <TextInput
        viewStyle={{ paddingHorizontal: 20, marginTop: 20, width: 300 }}
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title="Save username"
        onPress={saveUsername}
        sx={{ width: 150, marginTop: 10 }}
      />

      <Button
        title="Send notification"
        onPress={sendNotification}
        sx={{ width: 150, marginTop: 10 }}
      />

      <Button
        title="Animate image"
        onPress={animateImage}
        sx={{ width: 150, marginTop: 10 }}
      />

      <Button
        title="Share file"
        onPress={shareFile}
        sx={{ width: 150, marginTop: 10 }}
      />

      <View
        style={{
          alignItems: "center",
          flexDirection: "column",
          marginTop: 20,
        }}
      >
        <Button
          title="Sign Out"
          sx={{
            width: 150,
          }}
          onPress={() => {
            signOut(auth);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Settings;
