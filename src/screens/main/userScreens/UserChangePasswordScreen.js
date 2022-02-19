import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import CustomHeader from '../../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../../constants';
import FormButtonProfile from '../../../components/FormButtonProfile';
import { AuthContext } from '../../../navigation/AuthProvider'
import * as Yup from 'yup'
import { Formik } from 'formik';

export default function UserChangePassword({ navigation }) {
  const { changePassword, loadingPassword } = useContext(AuthContext)
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

        <Formik
          initialValues={{ currentPassword, newPassword }}
          onSubmit={values => { changePassword(values.currentPassword, values.newPassword) }}
          validationSchema={
            Yup.object().shape({
              currentPassword: Yup.string()
                .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                .required('Şifre gerekli!'),

              newPassword: Yup.string()
                .min(6, 'Yeni şifreniz çok kısa, minimum 6 karakter olmalı!')
                .required('Yeni Şifre gerekli!'),
            })
          }
        >
          {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
            <>
              <Jiro
                value={values.currentPassword}
                onChangeText={handleChange('currentPassword')}
                onBlur={() => setFieldTouched('currentPassword')}
                secureTextEntry={true}
                style={styles.input}
                label={'Şifre'}
                borderColor={'#154c79'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
              />


              {(errors.currentPassword && touched.currentPassword) &&
                <Text style={styles.errors}>{errors.currentPassword}</Text>
              }

              <Jiro
                value={values.newPassword}
                onChangeText={handleChange('newPassword')}
                onBlur={() => setFieldTouched('newPassword')}
                secureTextEntry={true}
                style={styles.input}
                label={'Yeni Şifre'}
                borderColor={'#9b537a'}
                inputPadding={16}
                inputStyle={{ color: 'white' }}
              />


              {(errors.newPassword && touched.newPassword) &&
                <Text style={styles.errors}>{errors.newPassword}</Text>
              }

              {
                loadingPassword ? (
                  <ActivityIndicator
                    size={24}
                    color='red'
                  />
                ) : (
                  null
                )
              }

              <View style={styles.updateBtn}>
                <FormButtonProfile
                  onPress={() => handleSubmit()}
                  text="Güncelle"
                />
              </View>
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