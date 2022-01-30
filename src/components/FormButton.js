import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AwesomeButton from "react-native-really-awesome-button";
import { COLORS } from '../constants';

export default function FormButton({ text, ...rest }) {
    return (
        <View style={styles.buttonContainer}>
            <AwesomeButton
                style={{ marginTop: 20 }}
                borderRadius={8}
                width={350}
                height={45}
                backgroundColor={COLORS.appColor}
                {...rest}
            >
                <Text style={styles.buttonText}>{text}</Text>
            </AwesomeButton>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold'
    }
})
