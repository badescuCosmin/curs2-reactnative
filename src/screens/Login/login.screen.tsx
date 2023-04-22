import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "../../components";
import { TextInput } from "../../components/text-input";
import { RootStackParamList } from "../../navigation/navigator.types";
import { auth } from "../../utils/firebase";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import loginStyles from "./login.styles";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const {
    theme: { colors },
  } = useThemeConsumer();

  const clearError = () => setError("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const styles = loginStyles(colors);

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.signInLabel} variant="title">
        Sign in
      </Text>
      <TextInput
        onFocus={clearError}
        label="Email"
        value={loginForm.email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) =>
          setLoginForm({
            ...loginForm,
            email: text,
          })
        }
      />
      <TextInput
        onFocus={clearError}
        textStyle={styles.passwordInput}
        label="Password"
        value={loginForm.password}
        secureTextEntry
        onChangeText={(text) =>
          setLoginForm({
            ...loginForm,
            password: text,
          })
        }
      />
      <Button sx={styles.signInButton} onPress={handleLogin} title="Sign in" />
      {error && <Text sx={styles.errorText}>{error}</Text>}
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
