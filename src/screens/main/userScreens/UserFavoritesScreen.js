import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Alert
} from 'react-native'
import firebase from 'firebase'
import { SIZES } from '../../../constants/index'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function UserFavoritesScreen({ navigation }) {
  const [userData, setUserData] = useState([])
  const cUser = firebase.auth().currentUser;

  const favoriteList = async () => {
    try {
      await firebase
        .firestore()
        .collection('favorites')
        .get()
        .then((querySnapshot) => {
          const objectsArray = [];
          querySnapshot.forEach((fav) => {
            {
              fav.data().userId == cUser.uid ?
                objectsArray.push(fav.data())
                :
                null
            }
          });
          setUserData(objectsArray)
        });
    } catch (error) {
      console.log(error)
    }
  }

  const deleteFavorite = (id) => {
    try {
      firebase
        .firestore()
        .collection('favorites')
        .doc(id)
        .delete()
        .then(() => {
          alert('Favori başarıyla silindi!')
        })
    } catch (error) {
      alert(error)
    }
  }

  const deleteConfirm = (id) => {
    Alert.alert(
      'Favori',
      'Favoriyi silmek istediğinizden emin misiniz?',
      [
        { text: 'Evet', onPress: () => deleteFavorite(id) },
        { text: 'Hayır', onPress: () => { }, style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }

  useEffect(() => {
    favoriteList()
  }, [])

  const renderItem = (data) => {
    return (
      <View>
        <ScrollView>
          {
            data.item.userId === cUser.uid ?
              <TouchableOpacity
                onPress={() => { }}
                style={{ margin: 20 }}>

                <Image
                  style={styles.img}
                  source={data.item.img}
                />

                <View style={styles.subContainer}>
                  <Text style={styles.subPlaceText}>{data.item.placeName}, ({data.item.eventLocation})</Text>
                  <Text style={styles.subText}>{data.item.eventDate}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.subText}>{data.item.eventHour}</Text>
                    <TouchableOpacity onPress={() => deleteConfirm(data.item.id)}>
                      <Feather
                        style={{ marginLeft: 5 }}
                        name="x-circle"
                        size={22}
                        color="red"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
              :
              null
          }

        </ScrollView>
      </View>
    )
  }

  return (
    <>
      <Text style={styles.fav}>Favoriler</Text>
      {
        userData.length > 0 ?
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={userData}
            renderItem={renderItem}
            keyExtractor={item => item.id}

          />
          :
          <View style={styles.container}>
            <MaterialIcons
              size={45}
              color="gray"
              name="favorite-border"
            />
            <Text style={{ color: 'gray', marginTop: 5 }}>Favori ilanınınz bulunmamaktadir..</Text>
          </View>

      }

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer: {
    flexDirection: 'column',
    marginLeft: 5
  },
  fav: {
    margin: 20,
    marginVertical: SIZES.height / 15,
    fontSize: 30,
    fontWeight: 'bold'
  },
  img: {
    borderRadius: 30,
    width: 100,
    height: 100
  },
  subText: {
    color: 'gray',
    margin: 5
  },
  subPlaceText: {
    fontWeight: 'bold',
    margin: 5
  },
})