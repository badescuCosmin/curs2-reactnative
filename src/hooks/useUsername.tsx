import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState("");

  const getUsernameFromAsyncStorage = () => {
    AsyncStorage.getItem("username").then((usernameFromAsyncStorage) => {
      if (usernameFromAsyncStorage) {
        setUsername(usernameFromAsyncStorage);
      }
    });
  };

  useEffect(() => {
    getUsernameFromAsyncStorage();
  }, []);

  return { username, getUsernameFromAsyncStorage };
};
