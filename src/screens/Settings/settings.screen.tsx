import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, TextInput } from "../../components";
import { useUsername } from "../../hooks/useUsername";
import { auth } from "../../utils/firebase";

const Settings = () => {
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

  return (
    <SafeAreaView style={{ alignItems: "center" }}>
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
