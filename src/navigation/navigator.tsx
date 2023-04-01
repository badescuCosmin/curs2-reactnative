import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { Appearance } from "react-native";
import { useAuthentication } from "../hooks/useAuthentication";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import { Authentication } from "./authentication";
import { Dashboard } from "./dashboard";

export const Navigator = () => {
  const { activeScheme, toggleThemeSchema, theme } = useThemeConsumer();
  const { user } = useAuthentication();

  Appearance.addChangeListener((scheme) => {
    if (scheme.colorScheme !== activeScheme) {
      toggleThemeSchema();
    }
  });

  return (
    <NavigationContainer theme={theme}>
      {user ? <Dashboard /> : <Authentication />}
    </NavigationContainer>
  );
};
