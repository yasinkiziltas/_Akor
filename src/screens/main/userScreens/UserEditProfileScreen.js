import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    Button,
    TouchableOpacity,
    Platform,
    Text,
    StatusBar,
    TextInput,
    Image,
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader';
import { SIZES } from '../../../constants/index'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import { Jiro } from 'react-native-textinput-effects';
import DateTimePicker from '@react-native-community/datetimepicker'
import RNPickerSelect from 'react-native-picker-select';
import FormButtonProfile from '../../../components/FormButtonProfile'
import firebase from 'firebase'
import { user } from '../../../constants/images'

export default function UserEditProfileScreen({ navigation }) {
    const [userName, setUserName] = useState('')
    const [userBio, setUserBio] = useState('')
    const [userDateOfBirth, setUserDateOfBirth] = useState('')
    const [userAge, setUserAge] = useState(null)
    const [userAddress, setUserAddress] = useState('')
    const [userJob, setUserJob] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userPhoto, setUserPhoto] = useState(null)
    const [userPhone, setUserPhone] = useState(null)
    const [imageShow, setImageShow] = useState(true)

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const handleUpdate = () => {
        const cUser = firebase.auth().currentUser;
        try {
            firebase
                .firestore()
                .collection('users')
                .doc(cUser.uid)
                .update({
                    userName: userName,
                    userBio: userBio,
                    userDateOfBirth: userDateOfBirth,
                    userAge: userAge,
                    userJob: userJob,
                    userAddress: userAddress,
                    userGender: userGender,
                    userPhoto: userPhoto,
                    userPhone: userPhone,
                })
                .then(alert('Güncelleme başarılı!'))
        } catch (error) {
            console.log(error)
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS == 'ios');
        setDate(currentDate)

        let tempDate = new Date(currentDate)
        let fDate = tempDate.getDate() + '/'
            + (tempDate.getMonth() + 1) + '/'
            + tempDate.getFullYear()
        setUserDateOfBirth(fDate)
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    return (
        <>
            <StatusBar hidden={true} />

            {
                Platform.OS == 'ios' ?
                    <View style={{ marginTop: 10 }}>
                        <CustomHeader
                            title="Profili Düzenle"
                            navigation={navigation}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', left: 15, right: 10, top: 35 }}
                            onPress={() => alert('İptal')}
                        >
                            <Text style={{ color: '#0a0a0a', fontSize: 18 }}>İptal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10, top: 35 }}
                            onPress={() => alert('Kaydet')}
                        >
                            <Text style={{ color: '#0793e3', fontWeight: 'bold', fontSize: 18 }}>Kaydet</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    <View>
                        <CustomHeader
                            title="Profili Düzenle"
                            navigation={navigation}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', left: 15, right: 10, top: 20 }}
                            onPress={() => alert('İptal')}
                        >
                            <Text style={{ color: '#0a0a0a', fontSize: 18 }}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10, top: 25 }}
                            onPress={() => alert('Kaydet')}
                        >
                            <Text style={{ color: '#0793e3', fontWeight: 'bold', fontSize: 18 }}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>


            }
             <View style={styles.dot} />
            {
                imageShow ? (
                    <Animatable.View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => alert('Resim değiş')}>
                            <Image
                                source={user}
                                style={styles.image}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.imgText}>Profil resmini değiştir</Text>
                        </TouchableOpacity>

                    </Animatable.View>
                ) : (
                    null
                )
            }

            <KeyboardAwareScrollView>
                <View style={{ flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight:'bold'}}>Ad Soyad</Text>
                        <TextInput
                            value={userName}
                            onChangeText={value => setUserName(value)}
                            style={{ paddingLeft: 25, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Ad Soyad'
                        />

                    </View>


                    <Text style={{ color: 'gray', opacity: 0.5 }}>                           ________________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight:'bold'}}>Telefon</Text>
                        <TextInput
                            value={userPhone}
                            keyboardType='number-pad'
                            onChangeText={value => setUserPhone(value)}
                            style={{ paddingLeft: 35, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Telefon'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            ________________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight:'bold'}}>Yaş</Text>
                        <TextInput
                            value={userAge}
                            keyboardType='number-pad'
                            onChangeText={value => setUserAge(value)}
                            style={{ paddingLeft: 60, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Yaş'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            _______________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight:'bold' }}>Meslek</Text>
                        <TextInput
                            value={userJob}
                            onChangeText={value => setUserJob(value)}
                            style={{ paddingLeft: 37, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Meslek'
                        />
                    </View>

                </View>
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
        marginTop: 15,
        borderRadius: 50,
        width: 90,
        height: 90,
    },
    imgText: {
        color: '#0793e3',
        marginVertical: 10,
        fontWeight: 'bold'
    },
    dot: {
        paddingTop: 20,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.3,
    },
})



