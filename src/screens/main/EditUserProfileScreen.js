import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
} from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import { SIZES } from '../../constants/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { Jiro } from 'react-native-textinput-effects';
import CustomDatePicker from '../../components/DatePicker'
import RNPickerSelect from 'react-native-picker-select';
import FormButtonProfile from '../../components/FormButtonProfile'

export default function EditUserProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userDateOfBirth, setUserDateOfBirth] = useState('')
    const [userAge, setUserAge] = useState(null)
    const [userAddress, setUserAddress] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userPhoto, setUserPhoto] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [imageShow, setImageShow] = useState(true)

    return (
        <>
            {
                Platform.OS == 'ios' ?
                    <View style={{ marginTop: 10 }}>
                        <CustomHeader
                            title="Profili Düzenle"
                            navigation={navigation}
                        />
                    </View>
                    :
                    <CustomHeader
                        title="Profili Düzenle"
                        navigation={navigation}
                    />
            }

            {
                imageShow ? (
                    <Animatable.View

                        style={styles.imageContainer}>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={styles.image}>
                        </TouchableOpacity>
                    </Animatable.View>
                ) : (
                    null
                )
            }

            <KeyboardAwareScrollView>

                <Animatable.View
                    animation="fadeInUp"
                    style={styles.inputContainer}>
                    <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left', fontWeight: 'bold', fontStyle: 'italic' }}>Bilgilerinizi doldurmak mekan sahiplerine daha çok bilgi vermenize olanaks sağlar..</Text>

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Ad Soyad'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        keyboardType='email-address'
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'E-Mail'}
                        borderColor={'#9b537a'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <CustomDatePicker />

                    <RNPickerSelect
                        value={userGender}
                        style={{ inputAndroid: { color: 'black' } }}
                        onValueChange={(value) => setUserGender(value)}
                        placeholder={{ label: "Cinsiyetinizi Seçiniz", value: "", color: 'gray' }}
                        textInputProps={{
                            textAlign: 'center',
                            fontSize: 24,
                        }}

                        items={[
                            { label: 'Erkek', value: 'Erkek' },
                            { label: 'Kadın', value: 'Kadın' },
                        ]}
                    />

                    <Jiro
                        returnKeyType={'done'}
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        keyboardType='numeric'
                        label={'Telefon'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Meslek'}
                        borderColor={'#9b537a'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Adres'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Biyografi'}
                        borderColor={'#9b537a'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <FormButtonProfile
                        onPress={() => alert('Güncelleme yapsın!')}
                        text="Güncelle"
                    />

                </Animatable.View>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        // flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: Platform.OS == 'ios' ? 15 : null,
        borderWidth: 2,
        borderRadius: 50,
        width: 80,
        height: 80,
    },
    inputContainer: {
        flexDirection: 'column',
        margin: 20,
    },
    inputs: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 6,
        width: SIZES.width / 1.2,
        height: 30,
        marginBottom: 15
    }
})

{/* 9b537a */ }

