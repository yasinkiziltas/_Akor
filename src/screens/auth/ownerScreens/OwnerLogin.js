import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormButton from '../../../components/FormButton'
import * as Yup from 'yup'
import { Formik } from 'formik';
import { AuthContext } from '../../../navigation/AuthProvider'

export default function OwnerLogin({ navigation }) {
  const { loginOwner } = useContext(AuthContext)
  const [mailOwner, setMailOwner] = useState()
  const [passwordOwner, setPasswordOwner] = useState()
  const [userType, setUserType] = useState('Owner')

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputsContainer}>

        <Formik
          initialValues={{ mailOwner, passwordOwner, userType }}
          onSubmit={values => { loginOwner(values.mailOwner, values.passwordOwner, values.userType) }}
          validationSchema={
            Yup.object().shape({
              mailOwner: Yup.string()
                .email('Lütfen geçerli bir email adresi girin!')
                .required('Email gerekli!'),

                passwordOwner: Yup.string()
                .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                .required('Şifre gerekli!')
            })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
            <>
              <Kohana
                onBlur={() => setFieldTouched('mailOwner')}
                value={values.mailOwner}
                onChangeText={handleChange('mailOwner')}
                keyboardType="email-address"
                style={{ backgroundColor: '#ffffff' }}
                label={'Mail'}
                iconClass={FontAwesome}
                iconName={'user-o'}
                iconColor={'#ff4f5a'}
                inputPadding={16}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ color: 'black' }}
                labelContainerStyle={{ padding: 2 }}
                iconContainerStyle={{ padding: 15 }}
                useNativeDriver
              />

              {(errors.mailOwner && touched.mailOwner) &&
                <Text style={styles.errors}>{errors.mailOwner} </Text>
              }

              <Kohana
                onBlur={() => setFieldTouched('passwordOwner')}
                value={values.passwordOwner}
                onChangeText={handleChange('passwordOwner')}
                secureTextEntry={true}
                style={{ backgroundColor: '#ffffff', marginTop: 15 }}
                label={'Şifre'}
                iconClass={Ionicons}
                iconName={'lock-open-outline'}
                iconColor={'#ff4f5a'}
                inputPadding={16}
                labelStyle={{ color: 'gray' }}
                inputStyle={{ color: 'black' }}
                labelContainerStyle={{ padding: 2 }}
                iconContainerStyle={{ padding: 15 }}
                useNativeDriver
              />

              {(errors.passwordOwner && touched.passwordOwner) &&
                <Text style={styles.errors}>{errors.passwordOwner} </Text>
              }

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotBtn}>
                <Text style={styles.forgotBtnText}>Şifremi Unuttum</Text>
              </TouchableOpacity>

              <View style={{ marginVertical: 35 }}>
                <FormButton
                  onPress={() => handleSubmit()}
                  text="Giriş Yap"
                  backgroundColor="#ff4f5a"
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'column',
    marginTop: 15,
    flex: 1 / 3,
  },
  forgotBtn: {
    position: 'absolute',
    right: 5,
    bottom: 100
  },
  forgotBtnText: {
    fontSize: 16,
    color: 'gray'
  },
  errors: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5
  }
})