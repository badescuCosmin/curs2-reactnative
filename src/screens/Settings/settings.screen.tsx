import { signOut } from "firebase/auth";
import React from "react";
import { SafeAreaView } from "react-native";
import { Button } from "../../components";
import { auth } from "../../utils/firebase";

const Settings = () => (
  <SafeAreaView style={{ flex: 1, marginTop: 20, alignItems: "center" }}>
    <Button
      title="Sign Out"
      sx={{ width: "50%" }}
      onPress={() => {
        signOut(auth);
      }}
    />
  </SafeAreaView>
);

export default Settings;
