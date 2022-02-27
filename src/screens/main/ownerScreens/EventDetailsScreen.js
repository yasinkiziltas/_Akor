import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'

export default function EventDetailsScreen({navigation, route}) { 
    useEffect(() => {
        let { item } = route.params;
        console.log(item);
    }, [])
  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Text>EventDetailsScreen</Text>
    </View>
  )
}