import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Appearance } from "react-native";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import { Authentication } from "./authentication";

export const Navigator = () => {
  const { activeScheme, toggleThemeSchema, theme } = useThemeConsumer();
  Appearance.addChangeListener((scheme) => {
    if (scheme.colorScheme !== activeScheme) {
      toggleThemeSchema();
    }
  });
  return (
    <NavigationContainer theme={theme}>
      <Authentication />
    </NavigationContainer>
  );
};
