import React, { useContext, useEffect, useState } from 'react'
import CustomHeader from '../../components/CustomHeader';
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'
import { AuthContext } from '../../navigation/AuthProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SIZES } from '../../constants/theme';
import * as Animatable from 'react-native-animatable';
import firebase from 'firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
                <LinearGradient
                    colors={['#42275a', '#734b6d', COLORS.gray]}
                    style={styles.background}
                />

                {/* <CustomHeader
                    title="Profil"
                    navigation={navigation}
                /> */}

                <View style={styles.userImg}>

                </View>

                <View style={styles.userBio}>
                    <Text style={styles.userBioNameText}>{name}</Text>
                    <Text style={styles.userBioMailText}>{email}</Text>
                </View>


            </Animatable.View>

            <Animatable.View
                animation="fadeInUp"
                style={styles.userInfo}
            >
                <Button
                    onPress={logout}
                    title='Çıkış'
                />
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
});
