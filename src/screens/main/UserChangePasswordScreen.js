import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../constants';
import FormButtonProfile from '../../components/FormButtonProfile';

export default function UserChangePassword() {
  return (
    <>
      <CustomHeader title="" />

      <View style={styles.passTextView}>
        <Text style={styles.passText}>Şifreni Değiştir</Text>
        <Text style={styles.passAboutText}>Yeni şifren eski şifrenden farklı olmalıdır.</Text>
      </View>

      <View style={styles.inputContainer}>
        <Jiro
          style={styles.input}
          label={'Yeni Şifre'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <Jiro
          style={styles.input}
          label={'Yeni Şifre Tekrar'}
          borderColor={'#9b537a'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <View style={styles.updateBtn}>
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
  inputContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  passTextView: {
    marginVertical: 25,
    margin: 20,
  },
  passText: {
    fontWeight: 'bold',
    fontSize: 24
  },
  passAboutText: {
    color: 'gray',
    marginTop: 5
  },
  input: {
    width: SIZES.width / 1.1
  },
  updateBtn: {
    marginVertical: SIZES.height / 15
  }
})