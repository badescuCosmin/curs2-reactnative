import React from "react";
import { View } from "react-native";
import { Text } from "../../components";
import { IPost } from "../../utils/types";

export const PostComponent = ({ post }: { post: IPost }) => {
  const postDate = new Date(post.createdAt * 1000);

  return (
    <View
      style={{
        padding: 10,
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 1,
      }}
    >
      <Text>{post.content}</Text>
      <Text>{postDate.toLocaleString()}</Text>
    </View>
  );
};
