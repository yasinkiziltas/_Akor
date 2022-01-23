import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { registerBackground } from '../../constants/images'
import * as Animatable from 'react-native-animatable';

export default function RegisterScreen() {
    return (
        <Animatable.View
            animation="slideInDown"
            style={styles.container}>

            <Image
                resizeMode='contain'
                style={styles.backgroundImg}
                source={registerBackground}
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundImg: {
        width: '100%',
        height: '55%',

    }
})