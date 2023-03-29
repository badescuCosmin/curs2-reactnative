import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDaUAlivh1xV5eJWdFNpwvy1lU13jgaehE",
  authDomain: "dezv-soft-disp-mob.firebaseapp.com",
  projectId: "dezv-soft-disp-mob",
  storageBucket: "dezv-soft-disp-mob.appspot.com",
  messagingSenderId: "236158707532",
  appId: "1:236158707532:web:a858eee9b7fe0faf0b51e9",
  measurementId: "G-RQNHCXF9M6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
