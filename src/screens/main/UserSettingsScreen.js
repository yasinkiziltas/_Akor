import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomHeader from '../../components/CustomHeader'
import { SIZES } from '../../constants/index'
import React from 'react';

export default function UserSettings() {
  return (
    <>
      <CustomHeader title="Ayarlar" />

      <View style={{
        backgroundColor: '#e6e6e6',
        flex: 1,
      }}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={{
            color: 'gray',
            fontSize: 14,
            margin: 15
          }}>HESAP</Text>

          <View style={{
            backgroundColor: '#fff',
            width: SIZES.width,
            height: SIZES.height / 8,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Şifre Değiştir</Text>
            </TouchableOpacity>

            <View
              style={{
                justifyContent:'center',
                marginLeft:15,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />

            <TouchableOpacity
              style={{margin:15}}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Şifre Değiştir</Text>
            </TouchableOpacity>
          </View>


          <Text style={{
            color: 'gray',
            fontSize: 14,
            margin: 15
          }}>TERCİHLER</Text>

          <View style={{
            backgroundColor: '#fff',
            width: SIZES.width,
            height: SIZES.height / 15,
          }}>
          </View>
        </View>
      </View>
    </>

  );
}
