import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { Button, TextInput } from "../../components";
import { Post } from "../../modules";
import { auth, firestore } from "../../utils/firebase";
import { IPost } from "../../utils/types";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [content, setContent] = useState("");

  const getPosts = async () => {
    const collectionRef = collection(firestore, "posts");
    const collectionOfPosts = await getDocs(collectionRef);

    let postsArray: IPost[] = [];
    collectionOfPosts.forEach((post) => {
      const postData = post.data();
      console.log(postData);
      postsArray.push({
        id: postData.id,
        content: postData.content,
        createdAt: postData.createdAt.seconds,
        userId: postData.userId,
      });
    });

    setPosts(postsArray);
  };

  useEffect(() => {
    getPosts();
  }, []);

  const addPost = async () => {
    const collectionRef = collection(firestore, "posts");

    const seconds = Math.floor(new Date().getTime() / 1000);
    await addDoc(collectionRef, {
      userId: auth.currentUser?.uid,
      content: content,
      id: "4",
      createdAt: {
        seconds,
        nanoseconds: 0,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Text>Hello {auth.currentUser?.email}</Text>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
          renderItem={({ item }) => <Post post={item} />}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            containerStyle={{
              flex: 1,
            }}
            value={content}
            label="Add a post"
            onChangeText={setContent}
          />
          <Button
            title="Post!"
            disabled={!content}
            onPress={() => {
              addPost();
            }}
            sx={{
              width: 100,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
