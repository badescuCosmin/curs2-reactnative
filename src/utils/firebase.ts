import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { initializeApp } from "firebase/app";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.apiKey,
  authDomain: Constants.manifest?.extra?.authDomain,
  projectId: Constants.manifest?.extra?.productId,
  storageBucket: Constants.manifest?.extra?.storageBucket,
  messagingSenderId: Constants.manifest?.extra?.messagingSenderId,
  appId: Constants.manifest?.extra?.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;
