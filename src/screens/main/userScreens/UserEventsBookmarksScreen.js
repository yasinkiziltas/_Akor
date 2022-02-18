import { View, Text } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { result } from '../../../constants/images'

export default function UserEventsBookmarks() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={result}
        style={{ width: 250, height: 250 }}
        autoPlay={true}
      />
      <Text style={{
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 16,
      }}>Mekan başvurunuz bulunmamaktadır..</Text>
    </View>
  );
}
