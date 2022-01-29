import React from 'react'
import { View, Text, StyleSheet, ImageBackground, } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { onboard2 } from '../../constants/images';
import { SIZES } from '../../constants/theme';
import FormButton from '../../components/FormButton'

export default function OnboardScreen({ navigation }) {
    return (
        <>
            <Animatable.View
                animation="slideInDown"
                style={styles.container}
            >
                <ImageBackground
                    source={onboard2}
                    style={styles.image}
                />
            </Animatable.View>

            <Animatable.View
                animation="slideInUp"
                style={{ flexDirection: 'column' }}
            >
                <Text style={styles.onboardText}>Akor' a hoşgeldin!</Text>
                <Text style={styles.onboardTabText}>Sahne arkadaşını bul ve sahnene davet et!</Text>

                <View style={styles.buttonContainer}>
                    <FormButton
                        text="Giriş"
                        onPress={() => navigation.navigate('Login')}
                    />

                    <FormButton
                        text="Kayıt Ol"
                        onPress={() => navigation.navigate('Register')}
                    />
                </View>
            </Animatable.View >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e3e4e8'
    },
    image: {
        width: SIZES.width,
        height: SIZES.height / 1.7,
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    onboardText: {
        marginVertical: SIZES.width / 20,
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    onboardTabText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
    },
    buttonContainer: {
        marginVertical: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    }
})