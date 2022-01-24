import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

import { theme } from '../constants'
const { SIZES } = theme;

export default function FormButton({ placeholder, ...rest }) {
    return (
        <TouchableOpacity {...rest} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{placeholder}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: SIZES.height / 15,
        alignSelf: 'center',
        elevation: 8,
        width: SIZES.width / 1.1,
        backgroundColor: "#0165ff",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 12
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
    },
});
