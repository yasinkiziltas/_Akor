import React, { useContext, useEffect } from 'react'
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

export default function ProfileScreen({ navigation }) {
    const { logout, userEmail } = useContext(AuthContext)

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
                    colors={['#4c669f', '#3b5998', COLORS.gray]}
                    style={styles.background}
                />

                {/* <CustomHeader
                    title="Profil"
                    navigation={navigation}
                /> */}

                <View style={styles.userImg}>

                </View>

                <View style={styles.userBio}>
                    <Text style={styles.userBioText}>{userEmail}</Text>
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
        flex: 1 / 2,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImg: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'white',
        width: 150,
        height: 150,
    },
    userBio: {
        marginTop: 5,
    },
    userBioText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    userInfo: {
        borderWidth: 1,
        borderColor: 'gray',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        width: SIZES.width,
        height: SIZES.height / 3,
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
