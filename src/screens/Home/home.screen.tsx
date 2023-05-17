import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Button, TextInput } from "../../components";
import { Post } from "../../components/Post";
import { auth, firestore } from "../../utils/firebase";
import { IPost } from "../../utils/types";

const Home = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const collectionRef = collection(firestore, "posts");
    const collectionOfPosts = await getDocs(collectionRef);

    let postsArray: IPost[] = [];
    collectionOfPosts.forEach((post) => {
      const postData = post.data();

      postsArray.push({
        id: post.id,
        content: postData.content,
        createdAt: postData.createdAt.toDate(),
        userId: postData.userId,
      });
    });
    setPosts(postsArray);
  };

  const sendPost = async () => {
    try {
      await addDoc(collection(firestore, "posts"), {
        userId: auth.currentUser?.uid,
        content,
        createdAt: Timestamp.fromDate(new Date()),
      });
      fetchPosts();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 10, flex: 1 }}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ padding: 5 }} />}
          renderItem={({ item, index }) => <Post index={index} post={item} />}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
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
              sendPost();
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
