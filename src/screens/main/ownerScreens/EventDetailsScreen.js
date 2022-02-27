import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
  Image,
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants'

export default function EventDetailsScreen({ navigation, route }) {
  const [data, setData] = useState([])
  useEffect(() => {
    let { item } = route.params;
    setData(item)
  }, [])

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
          />
        </ImageBackground>
      </View>

      <Text style={{
        fontWeight:'bold',
        fontSize:24,
        margin:20,
      }}>{data.placeName}</Text>

    </>

  )
}

const styles = StyleSheet.create({
  contentImg: {
    borderRadius: 10,
    width: SIZES.width,
    height: SIZES.height / 3
  },
})