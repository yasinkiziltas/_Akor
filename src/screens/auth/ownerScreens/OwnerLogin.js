import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Kohana } from 'react-native-textinput-effects';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FormButton from '../../../components/FormButton'

export default function OwnerLogin({ navigation }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.inputsContainer}>
        <Kohana
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

        <Kohana
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

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{
            position: 'absolute',
            right: 5,
            bottom: 100
          }}>
          <Text style={{
            fontSize: 16,
            color: 'gray'
          }}>Şifremi Unuttum</Text>
        </TouchableOpacity>

        <View style={{ marginVertical: 35 }}>
          <FormButton
            onPress={() => handleSubmit()}
            text="Giriş Yap"
            backgroundColor="#ff4f5a"
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: 'column',
    marginTop: 15,
    flex: 1 / 3,
  }
})