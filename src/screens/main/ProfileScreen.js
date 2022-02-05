import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase'

export default function ProfileScreen({ navigation }) {
    const { logout, userEmail } = useContext(AuthContext)
    const [name, setName] = useState()
    const [email, setEmail] = useState()

    AsyncStorage.getItem('cUsername').then(name => {
        setName(name)
    }).catch(e =>
        console.log(e)
    )

    AsyncStorage.getItem('cUseremail').then(email => {
        setEmail(email)
    }).catch(e =>
        console.log(e)
    )

    // const fetchUser = () => {
    //     firebase
    //         .firestore()
    //         .collection('users')
    //         .where('userEmail', '==', userEmail)
    //         .get()
    //         .then(querySnapshot => {

    //             console.log('Total users: ', querySnapshot.size);
    //             querySnapshot.forEach(documentSnapshot => {
    //                 console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //             });

    //         })
    // }

    useEffect(() => {
        // fetchUser()
    }, [])

    return (
        <>
            <Animatable.View
                animation="fadeInDown"
                style={styles.container}
            >
                {/* Arkaplan */}
                <LinearGradient
                    colors={['#42275a', '#734b6d', COLORS.gray]}
                    style={styles.background}
                />

                {/*Kullanıcı Resim*/}
                <View style={styles.userImg}>

                </View>

                {/* İsim & Email */}
                <View style={styles.userBio}>
                    <Text style={styles.userBioNameText}>{name}</Text>
                    <Text style={styles.userBioMailText}>{email}</Text>
                </View>

            </Animatable.View>

            {/* Bilgiler */}
            <Animatable.View
                animation="fadeInUp"
                style={styles.userInfo}
            >
                <Text style={styles.accountText}>Hesap</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('EditProfile')}
                    style={styles.profile}>
                    <TouchableOpacity style={styles.profileBtn}>
                        <SimpleLineIcons
                            color="#6abce9"
                            name="user"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>Profil Bilgilerim</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('UserEventsBookmark')}
                    style={styles.profile}>
                    <TouchableOpacity style={styles.bookmarkBtn}>
                        <Ionicons
                            color="#6ac26d"
                            name="md-bookmark-outline"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>Mekan Başvurularım</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('ChangePassword')}
                    style={styles.profile}>
                    <TouchableOpacity style={styles.passwordBtn}>
                        <MaterialCommunityIcons
                            color="#8069f3"
                            name="lock"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>Şifre Değiştir</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Settings')}
                    style={styles.profile}>
                    <TouchableOpacity style={styles.settingsBtn}>
                        <Ionicons
                            color="#ee905f"
                            name="settings"
                            size={24}
                        />
                    </TouchableOpacity>
                    <Text style={styles.btnText}>Ayarlar</Text>
                </TouchableOpacity>

            </Animatable.View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 2.2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImg: {
        marginTop: 20,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 150,
        height: 150,
    },
    userBio: {
        marginTop: 5,
    },
    userBioNameText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    userBioMailText: {
        fontSize: 15,
        color: 'white',
    },
    userInfo: {
        marginTop: 5,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    accountText: {
        margin: 35,
        // fontWeight: 'bold',
        fontSize: 25,
    },
    profile: {
        marginBottom: 30,
        flexDirection: 'row'
    },
    profileBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        backgroundColor: '#ddecf7',
        width: 50,
        height: 50,
        borderRadius: 30
    },
    bookmarkBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        backgroundColor: '#daf4de',
        width: 50,
        height: 50,
        borderRadius: 30
    },
    passwordBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        backgroundColor: '#e1e0f6',
        width: 50,
        height: 50,
        borderRadius: 30
    },
    settingsBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        backgroundColor: '#f2e5e0',
        width: 50,
        height: 50,
        borderRadius: 30
    },
    btnText: {
        margin: 15,
        fontSize: 15,
        fontWeight: 'bold'
    }
});
