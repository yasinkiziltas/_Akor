import React from 'react'
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomHeader({ title, navigation, isBack }) {

    const { container, contentHeader } = styles;
    const { colors } = useTheme()

    return (
        <SafeAreaView style={container}>
            <View style={contentHeader}>
                {
                    isBack
                        ?
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialCommunityIcons
                                    name="arrow-left"
                                    size={35}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        marginLeft: 10,
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                        :

                        null
                }
            </View>

            <View style={contentHeader}>
                <Text style={styles.midTitle} >
                    {title}
                </Text>
            </View>

            <View style={contentHeader}>

            </View>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flexDirection: 'row',
        height: 50,
    },
    contentHeader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    midTitle: {
        textAlign: 'center',
        color: "black",
        fontWeight: 'bold',
        fontSize: 16,
    },
})
