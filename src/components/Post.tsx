import React, { useEffect } from "react";
import { Animated, Text, useAnimatedValue } from "react-native";
import { IPost } from "../utils/types";

export const Post = ({ post, index }: { post: IPost; index: number }) => {
  const xPosition = useAnimatedValue(0);

  useEffect(() => {
    Animated.spring(xPosition, {
      toValue: 1,
      useNativeDriver: true,
      speed: 3,
      bounciness: 10,
      delay: index * 10,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={[
        {
          transform: [
            {
              translateX: xPosition.interpolate({
                inputRange: [0, 1],
                outputRange: [-300, 0],
              }),
            },
          ],
        },
        { backgroundColor: "#F3F3F3", padding: 2 },
      ]}
    >
      <Text>{post.userId}</Text>
      <Text>{post.content}</Text>
      <Text>{post.createdAt.toLocaleDateString()}</Text>
    </Animated.View>
  );
};
