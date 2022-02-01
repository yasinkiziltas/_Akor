import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../constants/index';
import { AuthContext } from '../../navigation/AuthProvider'
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

export default function HomeScreen() {
    const { userEmail } = useContext(AuthContext)
    return (
        <Animatable.View
            animation="fadeInUp"
            style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <Text
                    style={styles.welcomeText}>Tekrar Hoşgeldin, <Text style={{ color: 'green' }}>Yasin!</Text></Text>
                <TouchableOpacity
                    onPress={() => alert('Notifications')}
                    style={{ position: 'absolute', right: 10 }}
                >
                    <IonIcons
                        name='notifications-outline'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <Searchbar
                style={styles.bar}
                placeholder='Mekan Ara..'
            />
        </Animatable.View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.height / 15,
    },
    bar: {
        borderRadius: 20,
    },
    welcomeText: {
        flex: 1,
        marginLeft: 10,
        fontWeight: 'bold',
        paddingBottom: 25,
        fontSize: 24
    }
})