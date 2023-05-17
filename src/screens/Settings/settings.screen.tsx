import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, TextInput } from "../../components";
import { ProfileImage } from "../../components/ProfileImage";
import { auth } from "../../utils/firebase";

const Settings = () => {
  const [username, setUsername] = useState("");

  const saveUsername = async () => {
    await AsyncStorage.setItem("username", username);
  };

  useEffect(() => {
    AsyncStorage.getItem("username", (error, u) => {
      if (error) {
        console.error(error);
      }

      if (u) {
        setUsername(u);
      }
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
      <ProfileImage />
      <TextInput
        textStyle={{ width: 320 }}
        label="Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button
        title="Set username"
        onPress={saveUsername}
        sx={{ width: "50%", marginTop: 20 }}
      />
      <Button
        title="Sign Out"
        sx={{ width: "50%", marginTop: 20 }}
        onPress={() => {
          signOut(auth);
        }}
      />
    </SafeAreaView>
  );
};

export default Settings;
