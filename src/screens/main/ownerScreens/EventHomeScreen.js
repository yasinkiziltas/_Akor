import { View, Text, Button } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../navigation/AuthProvider'

export default function EventHomeScreen() {
  const { logout } = useContext(AuthContext)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>EventHomeScreen</Text>
      <Button title="Çıkış Yap" onPress={() => logout()} />
    </View>
  );
}
