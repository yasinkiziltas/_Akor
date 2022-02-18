import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import CustomHeader from '../../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../../constants/index'
import FormButtonProfile from '../../../components/FormButtonProfile';
import { AuthContext } from '../../../navigation/AuthProvider'
import * as Yup from 'yup'
import { Formik } from 'formik';

export default function UserChangeEmailScreen({ navigation }) {
  const { changeEmail } = useContext(AuthContext)
  const [userPassword, setUserPassword] = useState()
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

        <Formik
          initialValues={{ userPassword, newEmail }}
          onSubmit={values => { changeEmail(values.userPassword, values.newEmail) }}
          validationSchema={
            Yup.object().shape({
              userPassword: Yup.string()
                .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                .required('Şifre gerekli!'),

              newEmail: Yup.string()
                .email('Lütfen geçerli bir email adresi girin!')
                .required('Mail gerekli!'),
            })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
            <>
              <Jiro
                value={values.userPassword}
                onChangeText={handleChange('userPassword')}
                onBlur={() => setFieldTouched('userPassword')}
                secureTextEntry={true}
                style={styles.input}
                label={'Şifreniz'}
                borderColor={'#154c79'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
              />

              {(errors.userPassword && touched.userPassword) &&
                <Text style={styles.errors}>{errors.userPassword}</Text>
              }

              <Jiro
                value={values.newEmail}
                onChangeText={handleChange('newEmail')}
                onBlur={() => setFieldTouched('newEmail')}
                keyboardType='email-address'
                style={styles.input}
                label={'Yeni Mail'}
                borderColor={'#9b537a'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
              />

              {(errors.newEmail && touched.newEmail) &&
                <Text style={styles.errors}>{errors.newEmail}</Text>
              }

              <FormButtonProfile
                onPress={() => handleSubmit()}
                text="Güncelle"
              />
            </>
          )}

        </Formik>
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
  errors: {
    textAlign: 'center',
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
    marginTop: 5
  },
})