type ColorsKeys =
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "background"
  | "text"
  | "textButton"
  | "card"
  | "border"
  | "notification"
  | "invertTextButton";

export type ThemeColors = { [key in ColorsKeys]: string };

export const lightColors: ThemeColors = {
  primary: "#343dff",
  secondary: "#5c5d72",
  tertiary: "#78536b",
  error: "#ba1a1a",
  background: "#fffbff",
  text: "#1b1b1f",
  textButton: "#fff",
  invertTextButton: "#1b1b1f",
  card: "#fffbff",
  border: "#1b1b1f",
  notification: "#1b1b1f",
};

export const darkColors: ThemeColors = {
  primary: "#bec2e1",
  secondary: "#c5c4dd",
  tertiary: "#e8b9d5",
  error: "#ffb4ab",
  background: "#1b1b1f",
  text: "#fffbff",
  textButton: "#fff",
  invertTextButton: "#fff",
  card: "#1b1b1f",
  border: "#fff",
  notification: "#fff",
};
