import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect} from 'react';
import CustomHeader from '../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../constants';
import FormButtonProfile from '../../components/FormButtonProfile';

export default function UserChangeEmailScreen({navigation}) {
  return (
    <>
     <View style={{ marginTop: 15 }}>
        <CustomHeader
          navigation={navigation}
          title=""
          isBack={true}
        />
      </View>

      <View style={styles.passTextView}>
        <Text style={styles.passText}>Email Değiştir</Text>
        <Text style={styles.passAboutText}>Yeni mailin eski mailinden farklı olmalıdır.</Text>
      </View>

      <View style={styles.inputContainer}>
        <Jiro
          style={styles.input}
          label={'Yeni Mail'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <Jiro
          style={styles.input}
          label={'Yeni Mail Tekrar'}
          borderColor={'#9b537a'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <View style={styles.updateBtn}>
          <FormButtonProfile
            onPress={() => alert('Güncelleme yapsın!')}
            text="Güncelle"
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