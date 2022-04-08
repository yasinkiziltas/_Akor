import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';

import { theme } from '../constants'
const { SIZES } = theme;

export default function FormButton({ hidepass, value, onChangeText, placeholder, iconType, ...rest }) {
    return (
        <View>
            <View style={styles.inputContainer}>

                <AntDesign
                    style={{ color: 'gray', marginLeft: 5 }}
                    name={iconType}
                    size={20}
                />

                <TextInput
                    onChangeText={onChangeText}
                    value={value}
                    style={styles.input}
                    numberOfLines={1}
                    placeholder={placeholder}
                    placeholderTextColor="#666"
                    {...rest}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    inputContainer: {
        width: SIZES.width / 1.1,
        height: SIZES.height / 14,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.7,
        borderBottomColor: 'gray'
    },
    input: {
        padding: 15,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: SIZES.width / 1.5,
        height: SIZES.height / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    },
});
