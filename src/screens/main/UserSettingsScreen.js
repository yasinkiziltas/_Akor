import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomHeader from '../../components/CustomHeader'
import { SIZES } from '../../constants/index'
import Fontisto from 'react-native-vector-icons/Fontisto'

export default function UserSettingsScreen({ navigation }) {
  return (
    <>
      {
        Platform.OS == 'ios' ?
          <View style={{ marginTop: 35 }}>
            <CustomHeader
              title="Ayarlar"
              navigation={navigation}
              isBack={true}
            />
          </View>
          :
          <View style={{ marginTop: 17 }}>
            <CustomHeader
              title="Ayarlar"
              navigation={navigation}
              isBack={true}
            />
          </View>
      }

      <View style={{
        backgroundColor: '#e6e6e6',
        flex: 1,
      }}>

        {/* Hesap */}
        <View style={{ flexDirection: 'column' }}>
          <Text style={{
            color: 'gray',
            fontSize: 14,
            margin: 15
          }}>HESAP</Text>

          <View style={{
            backgroundColor: '#fff',
            width: SIZES.width,
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 8,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => navigation.navigate('UserChangePassword')}>
              <Text style={{ fontSize: 16 }}>Şifre Değiştir</Text>

              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                marginLeft: 15,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => navigation.navigate('UserChangeEmail')}>
              <Text style={{ fontSize: 16 }}>Mail Değiştir</Text>

              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>
          </View>

          {/* Tercihler */}
          <View style={{ marginTop: 15 }}>
            <Text style={{
              color: 'gray',
              fontSize: 14,
              margin: 15
            }}>TERCİHLER</Text>
          </View>

          <View style={{
            backgroundColor: '#fff',
            width: SIZES.width,
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 8,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Bildirimler</Text>

              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                marginLeft: 15,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Uygulamayı Paylaş</Text>
              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

          </View>

          <View style={{ marginTop: 15 }}>
            <Text style={{
              color: 'gray',
              fontSize: 14,
              margin: 15
            }}>TOPLULUK</Text>
          </View>

          <View style={{
            backgroundColor: '#fff',
            width: SIZES.width,
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 8,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Geri Bildirim</Text>

              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

            <View
              style={{
                justifyContent: 'center',
                marginLeft: 15,
                borderBottomColor: 'gray',
                borderBottomWidth: 1,
              }}
            />

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => { }}>
              <Text style={{ fontSize: 16 }}>Uygulamayı Değerlendir</Text>

              <Fontisto 
                style={{position:'absolute', right:0}}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

          </View>
        </View>

        <TouchableOpacity
          style={{ flex: 1, marginTop: 15, alignItems: 'center' }}
        >
          <Text style={{ fontSize: 17, color: 'blue' }}>Oturumu Kapat</Text>
        </TouchableOpacity>
      </View>
    </>

  );
}
