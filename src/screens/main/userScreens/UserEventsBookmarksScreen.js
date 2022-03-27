import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { result } from '../../../constants/images'
import firebase from 'firebase'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants/theme'

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
  }, [])

  const renderItem = (data) => {
    return (
      data.item.userId == user.uid
        ?
        <ScrollView>
          <View style={{ margin: 18 }}>
            <TouchableOpacity
              onPress={() => alert('Detaya git')}
              style={{
                width: SIZES.width / 1.1,
                height: SIZES.height / 5,
                borderWidth: 0.5,
                borderColor: 'gray',
                borderRadius: 20
              }}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={data.item.img}
                  style={{
                    margin: 10,
                    width: 100,
                    height: 100,
                    borderRadius: 30,
                    borderWidth: 0.5,
                    borderColor: 'gray'
                  }}
                />
                <View style={{ flexDirection: 'column' }}>
                  <Text style={{
                    color: 'gray',
                    marginVertical: 10
                  }}>{data.item.eventDate} {data.item.eventHour}</Text>
                  <Text style={{
                    fontWeight: 'bold',
                    fontSize: 15
                  }}>{data.item.placeName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        :
        null
    );
  };

  return (
    <>
      <StatusBar hidden={true} />
      <CustomHeader title='Başvurularım' />

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
              <View style={styles.lottieView}>
                <LottieView
                  source={result}
                  style={styles.lottie}
                  autoPlay={true}
                />
              </View>
              <Text style={styles.topText}>Mekan başvurunuz bulunmamaktadır.. </Text>
            </>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topText: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lottieView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lottie: {
    width: 250,
    height: 250
  },
})