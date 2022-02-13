import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Button,
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
import DateTimePicker from '@react-native-community/datetimepicker'

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

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [text, setText] = useState('')

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        setText(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

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
                    <Text style={{ color: 'gray', fontSize: 12, textAlign: 'left', fontWeight: 'bold', fontStyle: 'italic' }}>Bilgilerinizi dolu tutmak mekan sahiplerine daha çok bilgi vermenize olanaks sağlar..</Text>

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Ad Soyad'}
                        borderColor={'#154c79'}
                        inputPadding={15}
                        inputStyle={{ color: 'white' }}
                    />

                    {text ? (
                        <TouchableOpacity
                            onPress={() => showMode('date')}
                            style={{ marginTop: 15, marginLeft: 1, marginBottom: 10 }}>
                            {
                                Platform.OS == 'android' ? (
                                    <Text style={{ color: 'black', fontSize: 22, textAlign: 'center' }}>{text}</Text>
                                ) : (
                                    null
                                )
                            }
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => showMode('date')}
                            style={{ marginTop: 15, marginLeft: 1, marginBottom: 10 }}>+
                            <Text style={{ color: '#C0C0C0', fontSize: 22, textAlign: 'center' }}>Doğum Tarihi Seçiniz</Text>
                            {
                                Platform.OS == 'android' ? (
                                    <Text style={{ color: 'black', fontSize: 22, textAlign: 'center' }}>{text}</Text>
                                ) : (
                                    null
                                )
                            }
                        </TouchableOpacity>
                    )}

                    {show && (
                        <>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <DateTimePicker
                                    style={{ width: 100, height: 50 }}
                                    testID='dateTimePicker'
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display='default'
                                    onChange={onChange}
                                />
                            </View>
                        </>

                    )}

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
                        borderColor={'#9b537a'}
                        inputPadding={15}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Meslek'}
                        borderColor={'#154c79'}
                        inputPadding={15}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Adres'}
                        borderColor={'#9b537a'}
                        inputPadding={15}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        onFocus={() => setImageShow(false)}
                        onSubmitEditing={() => setImageShow(true)}
                        label={'Biyografi'}
                        borderColor={'#154c79'}
                        inputPadding={15}
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

