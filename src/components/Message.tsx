import { getDownloadURL, ref } from "firebase/storage";
import React, { useCallback, useEffect, useState } from "react";
import { Animated, Image, Text, useAnimatedValue } from "react-native";
import { useUsername } from "../hooks/useUsername";
import homeStyles from "../screens/Home/home.styles";
import { auth, storage } from "../utils/firebase";
import { IMessage } from "../utils/types";

export const Message = ({ message }: { message: IMessage }) => {
  const xPosition = useAnimatedValue(0);
  const [image, setImage] = useState("");
  const { username } = useUsername();
  const styles = homeStyles();

  const getImage = useCallback(() => {
    const imageRef = ref(storage, `lab_ifr/${message.userId}.jpg`);
    getDownloadURL(imageRef).then((url) => {
      setImage(url);
    });
  }, [message.userId]);

  useEffect(() => {
    getImage();

    Animated.timing(xPosition, {
      toValue: 1,
      useNativeDriver: true,
      duration: 1000,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getImage]);

  return (
    <Animated.View
      key={message.id}
      style={[
        styles.messageContainer,
        {
          transform: [
            {
              translateX: xPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-500, 0],
              }),
            },
          ],
        },
      ]}
    >
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      )}

      <Text>
        {message.userId === auth.currentUser?.uid && !!username
          ? username
          : message.userId}
      </Text>
      <Text>{message.message}</Text>
      <Text>{message.timestamp.toLocaleString()}</Text>
    </Animated.View>
  );
};
