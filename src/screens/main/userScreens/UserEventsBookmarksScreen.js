import {
  View,
  Text,
  FlatList,
  StatusBar,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { result } from '../../../constants/images'
import firebase from 'firebase'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default function UserEventsBookmarks() {
  const [user, setUser] = useState(firebase.auth().currentUser)
  const [recdata, setRecdata] = useState([])
  const [loading, setLoading] = useState(false)

  const myBookmarks = async () => {

    if (!loading) {
      setLoading(true)
    }

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
          setLoading(false)
        });
    } catch (error) {
      alert(error)
      setLoading(false)
    }
  }

  const deleteEvent = (id) => {
    try {
      firebase
        .firestore()
        .collection('recourses')
        .doc(id)
        .delete()
        .then(() => {
          alert('Başvuru başarıyla silinmiştir!')
        })
    } catch (error) {
      alert(error)
    }
  }

  const deleteConfirm = (id) => {
    Alert.alert(
      'Başvuru iptal',
      'Başvuruyu iptal etmek istediğinizden emin misiniz?',
      [
        { text: 'Evet', onPress: () => deleteEvent(id) },
        { text: 'Hayır', onPress: () => { }, style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
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
              style={styles.content}
            >

              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={data.item.img}
                  style={styles.img}
                />
                <TouchableOpacity
                  onPress={() => deleteConfirm(data.item.id)}
                  style={styles.delete}>
                  <AntDesign
                    style={styles.deleteIcon}
                    color="red"
                    size={20}
                    name="delete"
                  />

                </TouchableOpacity>

                <View style={{ flexDirection: 'column' }}>
                  <Text style={styles.eventInfo}>{data.item.eventDate}  {data.item.eventHour}</Text>
                  <Text style={styles.eventPlaceName}>{data.item.placeName}</Text>
                  <Text style={styles.eventInfo}>{data.item.eventLocation}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        :
        <>
          <View style={styles.lottieView}>
            <LottieView
              source={result}
              style={styles.lottie}
              autoPlay={true}
            />
            <Text style={styles.topText}>Mekan başvurunuz bulunmamaktadır.. </Text>
          </View>
        </>
    );
  };

  return (
    <>
      <StatusBar hidden={true} />
      <CustomHeader title='Başvurularım' />

      {
        loading
          ?
          <ActivityIndicator
            size={30}
            color="gray"
          />
          :
          recdata.length > 0
            ?
            <FlatList
              data={recdata}
              renderItem={renderItem}
              keyExtractor={(item, index) => item.id}
            />
            :
            <>
              <View style={styles.lottieView}>
                <LottieView
                  source={result}
                  style={styles.lottie}
                  autoPlay={true}
                />
                <Text style={styles.topText}>Mekan başvurunuz bulunmamaktadır.. </Text>
              </View>
            </>
      }

    </>
  );
}

const styles = StyleSheet.create({
  content: {
    width: SIZES.width / 1.1,
    height: SIZES.height / 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 20
  },
  img: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: 'gray'
  },
  delete: {
    position: 'absolute',
    right: 20,
    top: 40
  },
  deleteIcon: {
    marginLeft: 5,
    marginTop: 5,
  },
  eventInfo: {
    color: 'gray',
    marginVertical: 10
  },
  eventPlaceName: {
    fontWeight: 'bold',
    fontSize: 15
  },
  topText: {
    color: 'gray',
    textAlign: 'center',
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