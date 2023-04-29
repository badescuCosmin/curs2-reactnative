import { useFocusEffect } from "@react-navigation/native";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import _ from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "../../components";
import { useUsername } from "../../hooks/useUsername";
import { auth, db } from "../../utils/firebase";
import { IMessage } from "../../utils/types";
import homeStyles from "./home.styles";

const Home = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState("");
  const { username, getUsernameFromAsyncStorage } = useUsername();

  const getMessages = async () => {
    try {
      const messagesDocs = await getDocs(collection(db, "messages"));
      let messages: IMessage[] = [];
      messagesDocs.forEach((message) => {
        const data = message.data();
        messages.push({
          id: message.id,
          message: data.message,
          timestamp: data.timestamp.toDate(),
          userId: data.userId,
        });
      });
      setMessages(messages);
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const sendMessage = async () => {
    try {
      await addDoc(collection(db, "messages"), {
        message: message,
        userId: auth.currentUser?.uid,
        timestamp: Timestamp.fromDate(new Date()),
      });
      setMessage("");
    } catch (err: any) {
      console.log(err.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUsernameFromAsyncStorage();
    }, [getUsernameFromAsyncStorage])
  );

  useEffect(() => {
    getMessages();

    const unsubscribe = onSnapshot(
      collection(db, "messages"),
      (firebaseMessages) => {
        const newMessages = [...messages];
        firebaseMessages.forEach((message) => {
          newMessages.push({
            id: message.id,
            message: message.data().message,
            timestamp: message.data().timestamp.toDate(),
            userId: message.data().userId,
          });
        });
        setMessages(_.uniqBy(newMessages, "id"));
      }
    );

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const styles = homeStyles();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ width: "100%", padding: 10 }}>
        {messages
          .sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
          .map((m) => (
            <View key={m.id} style={styles.messageContainer}>
              <Text>
                {m.userId === auth.currentUser?.uid && !!username
                  ? username
                  : m.userId}
              </Text>
              <Text>{m.message}</Text>
              <Text>{m.timestamp.toLocaleString()}</Text>
            </View>
          ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 20,
          padding: 10,
        }}
      >
        <TextInput
          viewStyle={{ flex: 1 }}
          label="Message"
          onChangeText={setMessage}
          value={message}
        />
        <Button title="Send" sx={{ width: 100 }} onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
