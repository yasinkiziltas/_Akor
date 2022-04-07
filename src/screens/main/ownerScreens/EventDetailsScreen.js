import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants'
import ReadMore from '@fawazahmed/react-native-read-more';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import firebase from 'firebase'

export default function EventDetailsScreen({ navigation, route }) {
  const [user, setUser] = useState(firebase.auth().currentUser)
  const [data, setData] = useState([])
  const [userData, setUserData] = useState([])

  const getUser = async () => {
    await firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      })
  }

  useEffect(() => {
    getUser()
    let { item } = route.params;
    setData(item)
  }, [])

  const applyEvent = async () => {
    try {
      await firebase
        .firestore()
        .collection('recourses')
        .doc(data.id)
        .set({
          id: data.id,
          userId: user.uid,
          userName: userData.userName,
          userEmail: userData.userEmail,
          userPhone: userData.userPhone,
          userJob: userData.userJob,
          placeName: data.placeName,
          eventDate: data.eventDate,
          eventLocation: data.eventLocation,
          eventDetail: data.eventDetail,
          eventHour: data.eventHour,
          img: data.img,
          // userAge: userData.userAge,
        })
        .then(() => {
          Alert.alert(
            'Başvuru işlemi',
            'Başvurunuz mekan sahibine iletildi!'
          );
          navigation.goBack()
        })
    } catch (error) {
      alert(error)
      console.log(error)
    }
  }


  // const applyEvent = async () => {
  //   try {
  //     await firebase
  //       .firestore()
  //       .collection('recourses')
  //       .doc(data.id)
  //       .collection('subrecourses')
  //       .add({
  //         id: data.id,
  //         userId: user.uid,
  //         userName: userData.userName,
  //         userEmail: userData.userEmail,
  //         userPhone: userData.userPhone,
  //         userJob: userData.userJob,
  //         placeName: data.placeName,
  //         eventDate: data.eventDate,
  //         eventLocation: data.eventLocation,
  //         eventHour: data.eventHour,
  //         img: data.img,
  //       })
  //       .then(() => {
  //         Alert.alert(
  //           'Başvuru işlemi',
  //           'Başvurunuz mekan sahibine iletildi!'
  //         );
  //         navigation.goBack()
  //       })
  //   } catch (error) {
  //     alert(error)
  //     console.log(error)
  //   }
  // }

  const sendMessage = () => {
    alert('Mesaj gönder!')
  }

  return (
    <>
      <View>
        <ImageBackground
          resizeMode='stretch'
          style={styles.contentImg}
          source={data.img}
        >
          <CustomHeader
            navigation={navigation}
            isBack={true}
          // isFavorite={true}
          />
        </ImageBackground>
      </View>

      <View style={{ flexDirection: 'column' }}>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 24,
          marginTop: 20,
          marginLeft: 20,
        }}>{data.placeName}
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 20,
          }}>{data.eventLocation}
          </Text>

          {/* #425af5 */}
          <Text style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 20,
          }}>{data.eventDate}
          </Text>

          <Text style={{
            color: 'gray',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 5,
          }}>{data.eventHour}
          </Text>
        </View>

        <ScrollView>
          <ReadMore
            seeMoreText='Daha fazla..'
            seeLessText='Daha az..'
            animate='#92C19C'
            numberOfLines={10}
            style={{ margin: 15 }}>
            {
              data.eventDetail
            }
          </ReadMore>
        </ScrollView>
      </View>

      <View style={styles.btnView}>

        <TouchableOpacity
          onPress={() => applyEvent()}
          style={styles.btn}>
          <View style={styles.btnContainer}>
            <Entypo
              style={{ marginRight: 5, marginTop: 5 }}
              color={"white"}
              size={18}
              name="check"
            />
            <Text style={styles.btnText}>Başvur</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => sendMessage()}
          style={[styles.btn, { marginTop: 20 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons
              style={{ marginRight: 5, marginTop: 5 }}
              color={"white"}
              size={18}
              name="message"
            />
            <Text style={styles.btnText}>Mesaj Gönder</Text>
          </View>
        </TouchableOpacity>

      </View>

    </>

  )
}
const styles = StyleSheet.create({
  contentImg: {
    borderRadius: 10,
    width: SIZES.width,
    height: SIZES.height / 3
  },
  btnView: {
    // flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  btn: {
    backgroundColor: '#00b1b1',
    borderRadius: 5,
    width: 290,
    height: 35,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: Platform.OS == 'ios' ? 6 : 4
  },
})


//event ekleme kodu
// const applyEvent = () => {
//   try {
//     firebase
//       .firestore()
//       .collection('events')
//       .add({
//         id: data.id,
//         placeName: data.placeName,
//         eventType: data.eventType,
//         eventLocation: data.eventLocation,
//         eventDetail: data.eventDetail,
//         eventDate: data.eventDate,
//         eventHour: data.eventHour,
//         img: data.img,
//         isActive: true
//       })
//       .then(() => {
//         console.log('Eklendi');
//         Alert.alert(
//           'Eklendi',
//           'Eklendi.'
//         );
//       })
//   } catch (error) {
//     alert(error)
//     console.log(error)
//   }
// }