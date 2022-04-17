import React, { useState, useEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import {
    List,
    Avatar,
    Divider,
    FAB,
    Portal,
    Dialog,
    Button,
    TextInput,
    Provider,
} from "react-native-paper";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/core";
import CustomHeader from '../../components/CustomHeader'
import Entypo from 'react-native-vector-icons/Entypo'

export default function ChatListScreen() {
    const [chats, setChats] = useState([]);
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setEmail(user?.email ?? "");
        });
    }, []);

    const createChat = async () => {
        if (!email || !userEmail) return;
        setIsLoading(true);
        const response = await firebase
            .firestore()
            .collection("chats")
            .add({
                users: [email, userEmail],
            });
        setIsLoading(false);
        setIsDialogVisible(false);
        navigation.navigate("Chat", { chatId: response.id });
    };

    useEffect(() => {
        return firebase
            .firestore()
            .collection("chats")
            .where("users", "array-contains", email)
            .onSnapshot((querySnapshot) => {
                // console.warn(querySnapshot.docs.map((x) => x.data().users))
                setChats(querySnapshot.docs);
            });
    }, [email]);

    return (
        <>
            <CustomHeader
                title="Mesajlar"
            />

            {
                chats.length > 0 ? (
                    isLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator
                                size={40}
                                color='gray'
                            />
                        </View>
                    ) : (
                            <View style={{ flex: 1 }}>
                                {chats.map((chat) => (
                                    <React.Fragment>
                                        <List.Item
                                            title={chat.data().users.find((x) => x !== email)}
                                            description={(chat.data().messages ?? [])[0]?.text ?? undefined}
                                            left={() => (
                                                <Avatar.Text
                                                    label={chat
                                                        .data()
                                                        .users.find((x) => x !== email)
                                                        .split(" ")
                                                        .reduce((prev, current) => prev + current[0], "")}
                                                    size={56}
                                                />
                                            )}
                                            onPress={() => navigation.navigate("Chat", { chatId: chat.id })}
                                        />
                                        <Divider inset />
                                    </React.Fragment>
                                ))}

                                <Portal>
                                    <Dialog
                                        visible={isDialogVisible}
                                        onDismiss={() => setIsDialogVisible(false)}
                                    >
                                        <Dialog.Title>New Chat</Dialog.Title>
                                        <Dialog.Content>
                                            <TextInput
                                                label="Enter user email"
                                                value={userEmail}
                                                onChangeText={(text) => setUserEmail(text)}
                                            />
                                        </Dialog.Content>
                                        <Dialog.Actions>
                                            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
                                            <Button onPress={() => createChat()} loading={isLoading}>
                                                Save
          </Button>
                                        </Dialog.Actions>
                                    </Dialog>
                                </Portal>

                                <FAB
                                    icon="plus"
                                    style={{ position: "absolute", bottom: 16, right: 16 }}
                                    onPress={() => setIsDialogVisible(true)}
                                />
                            </View>
                        )
                ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Entypo
                                size={60}
                                color="gray"
                                name="chat"
                                style={{ marginBottom: 20 }}
                            />
                            <Text style={{
                                color: 'gray',
                                fontWeight: 'bold'
                            }}>Aktif sohbet bulunmamaktadır.</Text>
                        </View>
                    )
            }
        </>
    )
}
