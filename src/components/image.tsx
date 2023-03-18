import React from "react";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});

export const ImageComponent = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: "https://reactnative.dev/img/tiny_logo.png",
        }}
      />
    </View>
  );
};
