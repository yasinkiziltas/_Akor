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

export default function OwnerRegister({ navigation }) {
  const { register } = useContext(AuthContext)
  const [mail, setMail] = useState()
  const [password, setPassword] = useState()
  const [userType, setUserType] = useState(false)

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputsContainer}>

        <Formik
          initialValues={{ mail, password, userType}}
          onSubmit={values => { register(values.mail, values.password, userType) }}
          validationSchema={
            Yup.object().shape({
              mail: Yup.string()
                .email('Lütfen geçerli bir email adresi girin!')
                .required('Email gerekli!'),

              password: Yup.string()
                .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                .required('Şifre gerekli!')
            })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
            <>
              <Kohana
                onBlur={() => setFieldTouched('mail')}
                value={values.mail}
                onChangeText={handleChange('mail')}
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

              {(errors.mail && touched.mail) &&
                <Text style={styles.errors}>{errors.mail} </Text>
              }

              <Kohana
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                onChangeText={handleChange('password')}
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

              {(errors.password && touched.password) &&
                <Text style={styles.errors}>{errors.password} </Text>
              }

              <View style={{ marginVertical: 35 }}>
                <FormButton
                  onPress={() => handleSubmit()}
                  text="Kayıt Ol"
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