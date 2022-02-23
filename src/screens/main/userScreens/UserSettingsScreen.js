import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Linking,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader'
import { SIZES } from '../../../constants/index'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { AuthContext } from '../../../navigation/AuthProvider'
import { ActivityIndicator } from 'react-native-paper';

const onShare = () => {
  const result = Share.share({
    title: 'App link',
    message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
    url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
  });
  if (result.action === Share.sharedAction) {
    if (result.activityType) {
    } else {

    }
  } else if (result.action === Share.dismissedAction) {
  }
}

export default function UserSettingsScreen({ navigation }) {
  const {logout, loadingLogout} = useContext(AuthContext)
  return (
    <>
      {
        Platform.OS == 'ios' ?
          <View style={{ marginTop: 35 }}>
            <CustomHeader
              title="Ayarlar"
              navigation={navigation}
            // isBack={true}
            />
          </View>
          :
          <View style={{ marginTop: 17 }}>
            <CustomHeader
              title="Ayarlar"
              navigation={navigation}
            // isBack={true}
            />
          </View>
      }

      <View style={{
        backgroundColor: '#rgb(245,245,245)',
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
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 7,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => navigation.navigate('UserChangePassword')}>
              <Text style={{ fontSize: 16 }}>Şifre Değiştir</Text>

              <Fontisto
                style={{ position: 'absolute', right: 0 }}
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
                style={{ position: 'absolute', right: 0 }}
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
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 7,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => navigation.navigate('Notifications')}>
              <Text style={{ fontSize: 16 }}>Bildirimler</Text>

              <Fontisto
                style={{ position: 'absolute', right: 0 }}
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
              onPress={onShare}>
              <Text style={{ fontSize: 16 }}>Uygulamayı Paylaş</Text>
              <Fontisto
                style={{ position: 'absolute', right: 0 }}
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
            height: Platform.OS == 'ios' ? SIZES.height / 10 : SIZES.height / 7,
          }}>

            <TouchableOpacity
              style={{ margin: 15 }}
              onPress={() => Linking.openURL('mailto:kzltasyasin@gmail.com?subject=Akor Hk.&body=Merhaba, ')}>
              <Text style={{ fontSize: 16 }}>Geri Bildirim</Text>

              <Fontisto
                style={{ position: 'absolute', right: 0 }}
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
                style={{ position: 'absolute', right: 0 }}
                name='angle-right'
                size={14}
              />

            </TouchableOpacity>

          </View>
        </View>

        {loadingLogout ? (
          <ActivityIndicator
            size={24}
            color="red"
          />
        ) : (
          null
        )}

        <TouchableOpacity
          onPress={() => logout()}
          style={{ flex: 1, marginTop: 15, alignItems: 'center' }}
        >
          <Text style={{ fontSize: 17, color: 'blue' }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </>

  );
}
