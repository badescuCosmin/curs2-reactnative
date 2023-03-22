import { Text, SafeAreaView, Button } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/navigator.types";
import React from "react";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: RegisterProps) => (
  <SafeAreaView>
    <Text>Register</Text>
    <Button
      onPress={() => navigation.navigate("Login")}
      title="Navigate back"
    />
  </SafeAreaView>
);

export default Register;
