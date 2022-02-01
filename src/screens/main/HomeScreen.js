import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../constants/index';
import { AuthContext } from '../../navigation/AuthProvider'
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { DATA } from '../../constants/mainEvents'
import { logo } from '../../constants/images';

const renderItemEvents = ({ item }) => (
    <>
        <View>
            <TouchableOpacity
                style={{ padding: 5, }}
                onPress={() => alert('Detaya Git')}
            >
                <ImageBackground
                    imageStyle={{ borderRadius: 20 }}
                    style={styles.randomEvents}
                    source={item.img}
                >
                    <View style={styles.textView}>
                        <Text style={styles.imageText}>{item.eventType}</Text>
                    </View>

                </ImageBackground>
            </TouchableOpacity>
        </View>

    </>
)
export default function HomeScreen({ navigation }) {
    const { userEmail } = useContext(AuthContext)
    return (
        <>

            <Animatable.View
                animation="fadeInUp"
                style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.welcomeText}>Tekrar Hoşgeldin, <Text style={{ color: 'green' }}>Yasin!</Text></Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={{ position: 'absolute', right: 10, top: 10 }}
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

            <Animatable.View animation="fadeInDown">
                <Text style={styles.welcomeText}>Yaklaşan Etkinlikler</Text>

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={DATA}
                    renderItem={renderItemEvents}
                    keyExtractor={item => item.id}
                />
            </Animatable.View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: SIZES.height / 20,
    },
    bar: {
        borderRadius: 20,
    },
    welcomeText: {
        paddingTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        paddingBottom: 35,
        fontSize: 24
    },
    randomEvents: {
        width: 200,
        height: 300
    },
    randomEventName: {
        fontSize: 16,
        color: 'white',
        position: 'absolute',
        bottom: 10,
        fontWeight: 'bold',
        marginLeft: 13
    },
    textView: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    imageText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
})