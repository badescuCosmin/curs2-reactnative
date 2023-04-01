import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const useAuthentication = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribe;
  }, []);

  return {
    user,
  };
};
