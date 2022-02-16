import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomHeader from '../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../constants';
import FormButtonProfile from '../../components/FormButtonProfile';
import { AuthContext } from '../../navigation/AuthProvider'

export default function UserChangePassword({ navigation }) {
  const { changePassword } = useContext(AuthContext)

  const [currentPassword, setCurrentPassword] = useState()
  const [newPassword, setNewPassword] = useState()

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
        <Text style={styles.passText}>Şifreni Değiştir</Text>
        <Text style={styles.passAboutText}>Yeni şifren eski şifrenden farklı olmalıdır.</Text>
      </View>

      <View style={styles.inputContainer}>

        <Jiro
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={pass => setCurrentPassword(pass)}
          style={styles.input}
          label={'Şifre'}
          borderColor={'#154c79'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <Jiro
          secureTextEntry={true}
          value={newPassword}
          onChangeText={value => setNewPassword(value)}
          style={styles.input}
          label={'Yeni Şifre'}
          borderColor={'#9b537a'}
          inputPadding={16}
          inputStyle={{ color: 'white' }}
        />

        <View style={styles.updateBtn}>
          <FormButtonProfile
            onPress={() => changePassword(currentPassword, newPassword)}
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