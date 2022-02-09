import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    Button,
    Text,
    Platform
} from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import { SIZES } from '../../constants/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { Jiro } from 'react-native-textinput-effects';
import CustomDatePicker from '../../components/DatePicker'
import RNPickerSelect from 'react-native-picker-select';

export default function EditUserProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userDateOfBirth, setUserDateOfBirth] = useState('')
    const [userAge, setUserAge] = useState(null)
    const [userAddress, setUserAddress] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userPhoto, setUserPhoto] = useState(null)
    const [userPhone, setUserPhone] = useState(null)

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

            <Animatable.View
                animation="slideInDown"
                style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.image}>
                </TouchableOpacity>
            </Animatable.View>

            <KeyboardAwareScrollView>
                <Animatable.View
                    animation="fadeInUp"
                    style={styles.inputContainer}>

                    <Jiro
                        label={'Ad Soyad'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        label={'E-Mail'}
                        borderColor={'#154c79'}
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
                        keyboardType='numeric'
                        label={'Telefon'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        label={'Meslek'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        label={'Adres'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                    <Jiro
                        label={'Biyografi'}
                        borderColor={'#154c79'}
                        inputPadding={10}
                        inputStyle={{ color: 'white' }}
                    />

                </Animatable.View>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        marginTop: 30,
        borderWidth: 2,
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    inputContainer: {
        // justifyContent: 'center',
        // alignItems: 'center',
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

{/* <TextInput
                        style={styles.inputs}
                        placeholder="Ad Soyad..."
                        value={userName}
                    /> */}
