import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomHeader from '../../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../../constants/index'
import FormButtonProfile from '../../../components/FormButtonProfile';
import { AuthContext } from '../../../navigation/AuthProvider'

export default function UserChangeEmailScreen({ navigation }) {
  const { changeEmail } = useContext(AuthContext)
  const [currentPassword, setCurrentPassword] = useState()
  const [newEmail, setNewEmail] = useState()
 
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
        <Text style={styles.passText}>Mail Değiştir</Text>
        <Text style={styles.passAboutText}>Yeni mailin eski mailinden farklı olmalıdır.</Text>
      </View>

      <View style={styles.inputContainer}>

      <Jiro
          value={currentPassword}
          onChangeText={pass => setCurrentPassword(pass)}
          secureTextEntry={true}
          style={styles.input}
          label={'Şifreniz'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <Jiro
          value={newEmail}
          onChangeText={mail => setNewEmail(mail)}
          keyboardType='email-address'
          style={styles.input}
          label={'Yeni Mail'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <FormButtonProfile
          onPress={() => changeEmail(newEmail, currentPassword)}
          text="Güncelle"
        />

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
  },
})