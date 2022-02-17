import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from 'react-native';
import CustomHeader from '../../components/CustomHeader'
import { Jiro } from 'react-native-textinput-effects';
import { SIZES } from '../../constants';
import FormButtonProfile from '../../components/FormButtonProfile';
import { AuthContext } from '../../navigation/AuthProvider'
import { ActivityIndicator } from 'react-native-paper';

export default function UserChangeEmailScreen({ navigation }) {
  const { changeEmail } = useContext(AuthContext)
  
  const [currentPassword, setCurrentPassword] = useState('')
  const [newEmail, setNewEmail] = useState()
  const [modalVisible, setModalVisible] = useState(true);

  function PasswordModal() {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Devam edebilmek için lütfen şifrenizi giriniz..</Text>
              <TextInput
                value={currentPassword}
                onChangeText={value => setCurrentPassword(value)}
                placeholder='Şifre..'
                style={{
                  textAlign: 'center',
                  width: 100,
                  height: 55,
                  borderWidth: 0.7,
                  borderColor: 'gray',
                  borderRadius: 10,
                  marginBottom: 10,
                }} />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                   <Text style={styles.textStyle}>Kaydet</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  }

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
        
        {/* <View style={styles.updateBtn}>
          {
            modalVisible ? (
              <ActivityIndicator
                color='blue'
                size={20}
              />
            ) : (
              <FormButtonProfile
                onPress={() => changeEmail(newEmail, currentPassword)}
                text="Güncelle"
              />
            )
          }

        </View> */}
      </View>
      {/* <PasswordModal /> */}
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
  centeredView: {
    flex: 1 / 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: 'gray',
    marginBottom: 15,
    textAlign: "center"
  }
})