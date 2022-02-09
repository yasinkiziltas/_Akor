import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import AwesomeButton from "react-native-really-awesome-button";

export default function FormButtonProfile({ text, ...rest }) {
    return (
        <View style={styles.buttonContainer}>
            <AwesomeButton
                style={{ marginTop: 20 }}
                borderRadius={8}
                width={350}
                height={45}
                backgroundColor="#154c79"
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
