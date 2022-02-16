import React, { useContext, useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function UserProfileScreen({ navigation }) {
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
                    colors={[COLORS.gray,  COLORS.gray, '#4e4376',]}
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

                <ScrollView>
                    <View style={{margin:15}}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('EditUserProfile')}
                            style={styles.profile}>
                            <TouchableOpacity style={styles.profileBtn}>
                                <SimpleLineIcons
                                    onPress={() => navigation.navigate('EditUserProfile')}
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
                            onPress={() => navigation.navigate('UserSettings')}
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
                    </View>
                </ScrollView>

                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: 'gray', fontSize: 14 }}>v0.1</Text>
                </View>
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
        marginTop: 15,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 120,
        height: 120,
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
        textAlign: 'center',
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
        fontSize: 25,
    },
    profile: {
        margin: 20,
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
    outBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        backgroundColor: '#E3FAF5',
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
