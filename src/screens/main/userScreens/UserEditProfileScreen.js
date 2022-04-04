import React, { useState, useEffect } from 'react'
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Text,
    StatusBar,
    TextInput,
    Image,
    Alert,
} from 'react-native'
import CustomHeader from '../../../components/CustomHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as Animatable from 'react-native-animatable';
import DateTimePicker from '@react-native-community/datetimepicker'
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase'
import { user } from '../../../constants/images'
import * as ImagePicker from 'expo-image-picker';

export default function UserEditProfileScreen({ navigation }) {
    const [currentUser, setCurrentUser] = useState(firebase.auth().currentUser)
    const [userData, setUserData] = useState([])
    const [userDateOfBirth, setUserDateOfBirth] = useState('')
    const [userImg, setUserImg] = useState('')
    const [userImgPath, setUserImgPath] = useState('')
    const [imageShow, setImageShow] = useState(true)
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)

    const getUser = async () => {
        try {
            await firebase
                .firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setUserData(documentSnapshot.data());
                    }
                })
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])


    const handleUpdate = async () => {
        const cUser = firebase.auth().currentUser;
        try {
            await firebase
                .firestore()
                .collection('users')
                .doc(cUser.uid)
                .update({
                    userName: userData.userName,
                    userBio: userData.userBio,
                    userDateOfBirth: userData.userDateOfBirth ? userData.userDateOfBirth : userDateOfBirth,
                    userAge: userData.userAge,
                    userJob: userData.userJob,
                    userAddress: userData.userAddress,
                    userGender: userData.userGender,
                    userPhone: userData.userPhone,
                    userPhoto: userData.userPhoto ? userData.userPhoto : userImg //userImgPath
                })
                .then(() => {
                    Alert.alert(
                        'Profil Güncellendi!',
                        'Bilgilerin başarıyla güncellendi.'
                    );
                })
        } catch (error) {
            alert(error)
        }
    }

    const allowPhotoRequests = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission denied!')
            }
        }
    }

    const PickImage = async () => {
        allowPhotoRequests()
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        })

        if (!result.cancelled) {
            setUserImgPath(result.base64)
            setUserImg(result.uri)
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
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: '#0a0a0a', fontSize: 18 }}>İptal</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10, top: 35 }}
                            onPress={() => handleUpdate()}
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
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={{ color: '#0a0a0a', fontSize: 18 }}>İptal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ position: 'absolute', right: 10, top: 25 }}
                            onPress={() => handleUpdate()}
                        >
                            <Text style={{ color: '#0793e3', fontWeight: 'bold', fontSize: 18 }}>Kaydet</Text>
                        </TouchableOpacity>
                    </View>


            }
            <View style={styles.dot} />
            {
                imageShow ? (
                    <Animatable.View style={styles.imageContainer}>
                        <TouchableOpacity onPress={() => PickImage()}>
                            <Image
                                style={styles.image}
                                source={
                                    userImg ? { uri: userImg }
                                        : userData.userPhoto ? { uri: userData.userPhoto }
                                            : user
                                }
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => PickImage()}>
                            <Text style={styles.imgText}>Profil resmini değiştir</Text>
                        </TouchableOpacity>

                    </Animatable.View>
                ) : (
                    null
                )
            }

            <KeyboardAwareScrollView>
                <View style={{ flexDirection: 'column', }}>
                    <View style={{ flexDirection: 'row', margin: 15, marginTop: Platform.OS == 'android' ? 35 : 0 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Ad Soyad</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            // value={userData ? userData.userName : userName}
                            // onChangeText={value => setUserName(value)}
                            value={userData ? userData.userName : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userName: txt })}
                            style={{ paddingLeft: 25, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Ad Soyad'
                        />

                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                           ________________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Telefon</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            value={userData ? userData.userPhone : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userPhone: txt })}
                            keyboardType='number-pad'
                            style={{ paddingLeft: 35, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Telefon'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            ________________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Yaş</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            value={userData ? userData.userAge : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userAge: txt })}
                            keyboardType='number-pad'
                            style={{ paddingLeft: 60, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Yaş'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            _______________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Meslek</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            value={userData ? userData.userJob : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userJob: txt })}
                            style={{ paddingLeft: 37, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Meslek'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            _______________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Adres</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            value={userData ? userData.userAddress : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userAddress: txt })}
                            style={{ paddingLeft: 50, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Adres'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            _______________________________________________</Text>

                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <Text style={{ marginTop: 6, fontWeight: 'bold' }}>Biyografi</Text>
                        <TextInput
                            onFocus={() => setImageShow(false)}
                            onSubmitEditing={() => setImageShow(true)}
                            value={userData ? userData.userBio : ''}
                            onChangeText={(txt) => setUserData({ ...userData, userBio: txt })}
                            style={{ paddingLeft: 30, marginTop: Platform.OS == 'ios' ? 6 : 2 }}
                            placeholder='Biyografi'
                        />
                    </View>

                    <Text style={{ color: 'gray', opacity: 0.5 }}>                            _______________________________________________</Text>

                    {userDateOfBirth ? (
                        <TouchableOpacity
                            onPress={() => showMode('date')}
                            style={{ marginTop: 15, marginLeft: 1, marginBottom: 10 }}>
                            {
                                Platform.OS == 'android' ? (
                                    <Text style={{ color: 'black', fontSize: 22, textAlign: 'center' }}>{userDateOfBirth}</Text>
                                ) : (
                                    null
                                )
                            }
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => showMode('date')}
                            style={{ marginTop: 15, marginLeft: 1, marginBottom: 10 }}>
                            <Text style={{ color: '#C0C0C0', fontSize: 22, textAlign: 'center' }}>Doğum Tarihi Seçiniz</Text>
                            <Text style={{ color: '#C0C0C0', fontSize: 15, textAlign: 'center' }}>({userData.userDateOfBirth})</Text>
                            {
                                Platform.OS == 'android' ? (
                                    <Text style={{ color: 'black', fontSize: 22, textAlign: 'center' }}>{userDateOfBirth}</Text>
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
                                    style={{ width: Platform.OS == 'android' ? 120 : 300, height: 50 }}
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
                        value={userData ? userData.userGender : ''}
                        onValueChange={(txt) => setUserData({ ...userData, userGender: txt })}
                        placeholder={{ label: "Cinsiyetinizi Seçiniz", value: "", color: 'gray' }}
                        style={{ inputAndroid: { color: 'black', } }}
                        textInputProps={{
                            textAlign: 'center',
                            fontSize: 24,
                        }}

                        items={[
                            { label: 'Erkek', value: 'Erkek' },
                            { label: 'Kadın', value: 'Kadın' },
                        ]}
                    />


                </View>
            </KeyboardAwareScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
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



