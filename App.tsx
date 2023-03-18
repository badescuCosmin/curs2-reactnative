import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, StatusBar } from "react-native";
import {
  ActivityIndicatorComponent,
  Button,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FlatList,
  Image,
  Modal,
  StatusBarComponent,
  SwitchComponent,
  TextInputComponent,
} from "./src/components";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBarComponent />
        <ActivityIndicatorComponent />
        <Button />
        <Image />
        <Modal />
        <SwitchComponent />
        <TextInputComponent />
      </ScrollView>
      {/* <FlatList /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    marginTop: StatusBar.currentHeight,
  },
});
