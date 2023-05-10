import React from "react";
import { Text, View } from "react-native";
import { IPost } from "../utils/types";

export const Post = ({ post }: { post: IPost }) => {
  return (
    <View style={{ backgroundColor: "#F3F3F3", padding: 2 }}>
      <Text>{post.userId}</Text>
      <Text>{post.content}</Text>
      <Text>{post.createdAt.toLocaleDateString()}</Text>
    </View>
  );
};
