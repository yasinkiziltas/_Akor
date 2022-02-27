import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableHighlight,
  ImageBackground,
  StyleSheet,
  TextInput,
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants'
import ReadMore from '@fawazahmed/react-native-read-more';

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
            color: 'green',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 20,
          }}>{data.eventDate}
          </Text>

          <Text style={{
            color: 'green',
            fontSize: 16,
            marginTop: 10,
            marginLeft: 5,
          }}>{data.eventHour}
          </Text>
        </View>

        <ReadMore
          seeMoreText='Daha fazla..'
          seeLessText='Daha az..'
          animate='#92C19C'
          numberOfLines={3} 
          style={{margin:15}}>
          {
            data.eventDetail
          }
        </ReadMore>
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
})