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
  Alert,
  Platform,
  Modal,
  Pressable
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LottieView from 'lottie-react-native';
import { result } from '../../../constants/images'
import firebase from 'firebase'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants/theme'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ReadMore from '@fawazahmed/react-native-read-more';

export default function UserEventsBookmarks({ navigation }) {
  const [user, setUser] = useState(firebase.auth().currentUser)
  const [recdata, setRecdata] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);

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
          querySnapshot.forEach((fav) => {
            {
              fav.data().userId == user.uid ?
                objectsArray.push(fav.data())
                :
                null
            }
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
    setModalVisible(!modalVisible)
    try {
      firebase
        .firestore()
        .collection('recourses')
        .doc(id)
        .delete()
        .then(() => {
          alert('Başvuru başarıyla iptal edildi!')
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
          <View style={{ margin: 15 }}>
            <View style={styles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Pressable>
                      <Text style={styles.textStyle}>{data.item.placeName}</Text>
                      <ScrollView>
                        <ReadMore
                          seeMoreText='Daha fazla..'
                          seeLessText='Daha az..'
                          animate='#92C19C'
                          numberOfLines={10}>
                          {
                            data.item.eventDetail
                          }
                        </ReadMore>

                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            onPress={() => deleteConfirm(data.item.id)}
                            style={styles.btn}>
                            <Text style={styles.btnText}>İptal Et</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={styles.btn}>
                            <Text style={styles.btnText}>Kapat</Text>
                          </TouchableOpacity>

                        </View>
                      </ScrollView>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.content}
            >

              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={data.item.img}
                  style={styles.img}
                />
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

      {
        Platform.OS == 'ios' ?
          <View style={{ marginVertical: 25 }}>
            <CustomHeader title='Başvurularım' />
          </View> :
          <CustomHeader title='Başvurularım' />
      }

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
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 20
  },
  img: {
    margin: 10,
    width: 100,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black'
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    margin: 20,
    backgroundColor: '#00b1b1',
    borderRadius: 5,
    width: 60,
    height: 30,
  }, btnText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS == 'ios' ? 6 : 4
  },
})