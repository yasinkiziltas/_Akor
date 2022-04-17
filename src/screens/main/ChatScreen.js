import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { View, Text } from 'react-native'
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat'
import CustomHeader from '../../components/CustomHeader';

export default function ChatScreen({ navigation }) {
  const route = useRoute()
  const [cUser, setCuser] = useState(firebase.auth().currentUser.uid)
  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [name, setName] = useState('')
  const [uid, setUID] = useState()

  const getUser = async () => {
    await firebase
      .firestore()
      .collection('users')
      .doc(cUser)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      })
  }

  useEffect(() => {
    getUser()
    firebase.auth().onAuthStateChanged((user) => {
      setUID(user?.uid)
      setName(userData ? userData.userName : null)
    })
  })

  useEffect(() => {
    return firebase
      .firestore()
      .doc('chats/' + route.params.chatId).onSnapshot(snapshot => {
        setMessages(snapshot.data()?.messages ?? []);
      });
  }, [route.params.chatId])

  const onSend = (m = []) => {
    firebase
      .firestore()
      .doc('chats/' + route.params.chatId)
      .set({
        messages: GiftedChat.append(messages, m)
      }, { merge: true })
  }

  return (
    <>
      <CustomHeader
        title="Sohbet"
        isBack={true}
        navigation={navigation}
      />
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages.map(x => ({
            ...x,
            createdAt: x?.createdAt.toDate(),
          }))}
          onSend={messages => onSend(messages)}
          user={{
            _id: uid,
            name: name,
          }}
        />
      </View>
    </>
  )
}
