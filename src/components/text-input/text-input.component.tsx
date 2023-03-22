import React, { useState } from "react";
import { Text } from "../text";
import {
  TextInput as NativeTextInput,
  StyleSheet,
  TextStyle,
  TextInputProps as NativeTextInputProps,
} from "react-native";
import { spacing } from "../../utils/theme/spacing";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { ThemeColors } from "../../utils/theme/colors";

interface TextInputProps extends NativeTextInputProps {
  textStyle?: TextStyle;
  label: string;
  onChangeText: (e: string) => void;
}

export const TextInput = ({
  textStyle,
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
        style={textInputStyles.container}
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
  });
