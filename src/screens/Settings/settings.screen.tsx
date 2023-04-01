import { signOut } from "firebase/auth";
import React from "react";
import { SafeAreaView } from "react-native";
import { Button, Text } from "../../components";
import { auth } from "../../utils/firebase";

const Settings = () => (
  <SafeAreaView
    style={{
      flex: 1,
      alignItems: "center",
    }}
  >
    <Text
      sx={{
        fontSize: 14,
        marginTop: 20,
      }}
    >
      You are logged in as:
    </Text>
    <Text>{auth.currentUser?.email}</Text>
    <Button
      title="Sign out"
      sx={{
        width: "50%",
        marginTop: 20,
      }}
      onPress={() => {
        signOut(auth);
      }}
    />
  </SafeAreaView>
);

export default Settings;
