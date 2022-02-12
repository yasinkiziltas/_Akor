import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../constants';
import FormButtonProfile from '../../components/FormButtonProfile';

export default function UserChangePassword({ navigation }) {
  return (
    <>
      <CustomHeader title="" />

      <View style={styles.passTextView}>
        <Text style={styles.passText}>Şifreni Değiştir</Text>
        <Text style={{ color: 'gray', marginTop:5 }}>Yeni şifren eski şifrenden farklı olmalıdır.</Text>
      </View>

      <View style={{ alignItems: 'center', flex: 1, flexDirection: 'column' }}>
        <Jiro
          style={{ width: SIZES.width / 1.1 }}
          label={'Yeni Şifre'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <Jiro
          style={{ width: SIZES.width / 1.1 }}
          label={'Yeni Şifre Tekrar'}
          borderColor={'#9b537a'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

     <View style={{marginVertical:SIZES.height / 15}}>
     <FormButtonProfile
          onPress={() => alert('Güncelleme yapsın!')}
          text="Şifre Değiştir"
        />
     </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  passTextView:{
    marginVertical: 25,
    margin: 20,
  },
  passText: {
    fontWeight: 'bold',
    fontSize: 24
  }
})