import React, { useState, useContext } from 'react'
import { ImageBackground, StyleSheet, View, Text, StatusBar } from 'react-native'
import { forgotPasswordBackground } from '../../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../../components/FormInput'
import FormButton from '../../../components/FormButton'
import { SIZES } from '../../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomHeader from '../../../components/CustomHeader';
import { AuthContext } from '../../../navigation/AuthProvider'

export default function UserForgotPassword({ navigation }) {
  const [mail, setMail] = useState('')
  const { forgotPass } = useContext(AuthContext)

  return (
    <>
      <StatusBar hidden={true} />

      <KeyboardAwareScrollView>
        <Animatable.View
          animation="slideInLeft"
          style={styles.container}
        >

          <ImageBackground
            source={forgotPasswordBackground}
            style={styles.backgroundImg}
          >

            <CustomHeader
              isBack={true}
              navigation={navigation}
            />

          </ImageBackground>

          <CustomHeader
            isBack={true}
            navigation={navigation}
          />


        </Animatable.View>

        <Animatable.View
          animation="slideInRight"
          style={styles.inputView}
        >
          <Text style={styles.loginText}>Şifremi unuttum</Text>
          <Text style={styles.forgotText}>Endişelenmeyin! Lütfen şifrenizi sıfırlamak için mailinizi giriniz...</Text>

          <View style={{ margin: 10 }}>
            <FormInput
              value={mail}
              keyboardType="email-address"
              placeholder="E-Mail"
              onChangeText={value => setMail(value)}
              iconType="mail"
            />

          </View>

          <FormButton
            text="Gönder"
            onPress={() => forgotPass(mail)}
            backgroundColor={"green"}
          />

        </Animatable.View>
      </KeyboardAwareScrollView >
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  backgroundImg: {
    width: SIZES.width / 1,
    height: SIZES.height / 2.5,
  },
  inputView: {
    marginLeft: 5,
    flex: 1,
    flexDirection: 'column'
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 37,
    margin: 10,
  },
  forgotText: {
    color: 'gray',
    fontSize: 14,
    marginLeft: 12,
  }
})