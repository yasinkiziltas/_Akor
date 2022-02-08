import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import { SIZES } from '../../constants/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker'

export default function EditUserProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userDateOfBirth, setUserDateOfBirth] = useState('')
    const [userAge, setUserAge] = useState(null)
    const [userAddress, setUserAddress] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userPhoto, setUserPhoto] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

    return (
        <>
            <CustomHeader
                title="Profili Düzenle"
                navigation={navigation}
            />

            <Animatable.View
                animation="fadeInLeft"
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

                    <TextInput
                        style={styles.inputs}
                        placeholder="Ad Soyad..."
                        value={userName}
                    />
                    {/* <TextInput
                        style={styles.inputs}
                        placeholder="Yaş..."
                        value={userAge}
                    /> */}
                    <DatePicker
                        modal
                        open={open}
                        date={date}
                        onConfirm={(date) => {
                            setUserAge(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />
                    <TextInput
                        keyboardType="numeric"
                        style={styles.inputs}
                        placeholder="Yaş..."
                        value={userAge}
                    />

                    <TextInput
                        style={styles.inputs}
                        placeholder="Cinsiyet..."
                        value={userGender}
                    />
                </Animatable.View>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1 / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderWidth: 2,
        borderRadius: 50,
        width: 100,
        height: 100,
    },
    inputContainer: {
        justifyContent: 'center',
        alignItems: 'center',
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
