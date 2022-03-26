import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { result } from '../../../constants/images'
import firebase from 'firebase'

export default function UserEventsBookmarks() {
  const [user, setUser] = useState(firebase.auth().currentUser)
  const [recdata, setRecdata] = useState([])

  const myBookmarks = async () => {
    try {
      firebase
        .firestore()
        .collection('recourses')
        .get()
        .then((querySnapshot) => {
          const objectsArray = [];
          querySnapshot.forEach((d) => {
            objectsArray.push(d.data());
          });
          setRecdata(objectsArray)
        });
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    myBookmarks()
    console.log('user: ', user.uid);
  }, [])

  const renderItem = (data) => {
    return (
      data.item.userId == user.uid
        ?
        <View style={{ flex: 1, marginTop: 50, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{data.item.placeName}</Text>
        </View>
        :
        null
    );
  };

  return (
    <View>
      {
        recdata.length > 0
          ?
          <FlatList
            data={recdata}
            renderItem={renderItem}
          />
          :
          <>
            <LottieView
              source={result}
              style={{ width: 250, height: 250 }}
              autoPlay={true}
            />
            <Text style={{
              color: 'gray',
              fontWeight: 'bold',
              fontSize: 16,
            }}>Mekan başvurunuz bulunmamaktadır..
        </Text>
          </>
      }
    </View>
  );
}
