import React, { useState } from "react";
import {
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TextStyle,
} from "react-native";
import { ThemeColors } from "../../utils/theme/colors";
import { spacing } from "../../utils/theme/spacing";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text } from "../text";

interface TextInputProps extends NativeTextInputProps {
  textStyle?: TextStyle;
  hasError?: boolean;
  label: string;
  onChangeText: (e: string) => void;
}

export const TextInput = ({
  textStyle,
  hasError,
  label,
  onChangeText,
  ...props
}: TextInputProps) => {
  const [value, setValue] = useState("");
  const {
    theme: { colors },
  } = useThemeConsumer();

  const textInputStyles = styles(colors);
  return (
    <>
      <Text sx={textStyle}>{label}</Text>
      <NativeTextInput
        style={{
          ...textInputStyles.container,
          ...(hasError && textInputStyles.error),
        }}
        onChangeText={(e) => {
          onChangeText(e);
          setValue(e);
        }}
        value={value}
        {...props}
      />
    </>
  );
};

const styles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 10,
      color: colors.text,
      paddingHorizontal: 20,
      borderColor: colors.text,
      marginTop: spacing(2),
    },
    error: {
      borderColor: colors.error,
      color: colors.error,
    },
  });
