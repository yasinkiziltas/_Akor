import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native'
import React from 'react'
import firebase from 'firebase'
import CustomHeader from '../../../components/CustomHeader'

export default function UserFavoritesScreen({ navigation }) {
  return (
    <>
      <CustomHeader
        navigation={navigation}
        title="Favorilerim"
        isBack={true}
      />
      <View style={styles.container}>
        <Text>UserFavoritesScreen</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})