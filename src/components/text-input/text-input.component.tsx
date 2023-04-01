import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { ThemeColors } from "../../utils/theme/colors";
import { spacing } from "../../utils/theme/spacing";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { Text } from "../text";

interface TextInputProps extends NativeTextInputProps {
  label: string;
  onChangeText: (e: string) => void;
  textStyle?: TextStyle;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextInput = ({
  textStyle,
  label,
  onChangeText,
  containerStyle,
  ...props
}: TextInputProps) => {
  const [value, setValue] = useState("");
  const {
    theme: { colors },
  } = useThemeConsumer();

  const textInputStyles = styles(colors);
  return (
    <View style={containerStyle}>
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
    </View>
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
