import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "../../components";
import { TextInput } from "../../components/text-input";
import { RootStackParamList } from "../../navigation/navigator.types";
import { auth } from "../../utils/firebase";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import loginStyles from "./login.styles";

type LoginProps = NativeStackScreenProps<RootStackParamList, "Login">;

const Login = ({ navigation }: LoginProps) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const {
    theme: { colors },
  } = useThemeConsumer();

  const styles = loginStyles(colors);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Login");
    } catch (e) {
      setValue({
        ...value,
        error: (e as { message: string }).message,
      });
    }
  };

  const onBlur = () => {
    if (value.error) {
      setValue({
        ...value,
        error: "",
      });
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.signInLabel} variant="title">
        Sign in
      </Text>
      <TextInput
        label="Email"
        onBlur={onBlur}
        hasError={!!value.error}
        keyboardType="email-address"
        onChangeText={(e) =>
          setValue({
            ...value,
            email: e,
          })
        }
      />
      <TextInput
        textStyle={styles.passwordInput}
        label="Password"
        secureTextEntry
        onBlur={onBlur}
        hasError={!!value.error}
        onChangeText={(e) =>
          setValue({
            ...value,
            password: e,
          })
        }
      />
      <Button sx={styles.signInButton} onPress={signIn} title="Sign in" />

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
