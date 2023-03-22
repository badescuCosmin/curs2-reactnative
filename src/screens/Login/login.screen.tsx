import { Alert, SafeAreaView, View } from "react-native";
import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, Button } from "../../components";
import loginStyles from "./login.styles";
import { TextInput } from "../../components/text-input";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { RootStackParamList } from "../../navigation/navigator.types";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const {
    theme: { colors },
    toggleThemeSchema,
  } = useThemeConsumer();

  const styles = loginStyles(colors);
  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.signInLabel} variant="title">
        Sign in
      </Text>
      <TextInput label="Email" onChangeText={(e) => console.log(e)} />
      <TextInput
        textStyle={styles.passwordInput}
        label="Password"
        onChangeText={(e) => console.log(e)}
      />
      <Button
        sx={styles.signInButton}
        onPress={() => Alert.alert("sss")}
        title="Sign in"
      />
      <Button
        title="Forgot Password ?"
        variant="tertiary"
        sx={{
          width: 140,
          marginLeft: "auto",
          alignItems: "flex-end",
        }}
        onPress={() => toggleThemeSchema()}
      />
      <View style={styles.orContainer}>
        <View style={styles.orContainerLine} />
        <Text>OR</Text>
        <View style={styles.orContainerLine} />
      </View>
      <View style={styles.logoOuterContainer}>
        <View style={styles.logoContainer}>
          <Ionicons name="logo-facebook" size={30} color={colors.text} />
          <Ionicons name="logo-google" size={30} color={colors.text} />
          <Ionicons name="logo-apple" size={30} color={colors.text} />
        </View>
      </View>
      <View style={styles.newAccount}>
        <Text>Dont you have an account?</Text>
        <Text
          onPress={() => navigation.navigate("Register")}
          sx={styles.createNewAccount}
        >
          Create one
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
