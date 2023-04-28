import { signOut } from "firebase/auth";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button } from "../../components";
import { auth } from "../../utils/firebase";

const Settings = () => {
  return (
    <SafeAreaView>
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
