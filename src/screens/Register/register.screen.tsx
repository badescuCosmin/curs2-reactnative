import Ionicons from "@expo/vector-icons/Ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { SafeAreaView, View } from "react-native";
import { Button, Text } from "../../components";
import { TextInput } from "../../components/text-input";
import { RootStackParamList } from "../../navigation/navigator.types";
import { auth } from "../../utils/firebase";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import registerStyles from "./register.styles";

type RegisterProps = NativeStackScreenProps<RootStackParamList, "Register">;

const Register = ({ navigation }: RegisterProps) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const {
    theme: { colors },
  } = useThemeConsumer();

  const onBlur = () => {
    if (value.error) {
      setValue({
        ...value,
        error: "",
      });
    }
  };

  const styles = registerStyles(colors);

  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate("Login");
    } catch (e) {
      setValue({
        ...value,
        error: (e as { message: string }).message,
      });
    }
  };

  return (
    <SafeAreaView style={styles.authContainer}>
      <Text sx={styles.registerLabel} variant="title">
        Sign Up
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
      {value.error && <Text sx={styles.errorInput}>{value.error}</Text>}
      <Button
        sx={styles.registerButton}
        onPress={() => {
          signUp();
        }}
        title="Sign up"
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
        <Text>Already have an account?</Text>
        <Text
          onPress={() => navigation.navigate("Login")}
          sx={styles.createNewAccount}
        >
          Sign in
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Register;
