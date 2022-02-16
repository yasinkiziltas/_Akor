import React, { useEffect, useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../constants/index';
import { AuthContext } from '../../navigation/AuthProvider'
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { DATA } from '../../constants/mainEvents'
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                        <Text style={styles.typeText}>Tür</Text>
                        <Text style={styles.type}>{item.eventType}</Text>
                    </View>

                    <View style={styles.eventDate}>
                        <Text style={styles.eventDateText}>{item.eventDate}</Text>
                    </View>

                    <View style={styles.placeName}>
                        <Text style={styles.placeNameText}>{item.placeName}</Text>

                        <View style={styles.eventTabInfo}>
                            <Text style={styles.eventTabLocationText}>{item.eventLocation}</Text>
                            <Text style={styles.eventTabHourText}>{item.eventHour}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    </>
)

export default function UserHomeScreen({ navigation }) {

    const { userName, userEmail } = useContext(AuthContext)
    const [currentUserName, setCurrentUserName] = useState()
    const [currentUserEmail, setCurrentUserMail] = useState()

    useEffect(() => {
        AsyncStorage.getItem('cUsername').then(user => {
            setCurrentUserName(user)
            // console.log('Name: ', currentUserName)
        }).catch(e =>
            console.log(e)
        )

        AsyncStorage.getItem('cUseremail').then(useremail => {
            setCurrentUserMail(useremail)
            // console.log('Mail: ', currentUserEmail)
        }).catch(e =>
            console.log(e)
        )
    }, [])

    return (
        <>
            <Animatable.View
                animation="fadeInUp"
                style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.welcomeText}>Hoşgeldin! <Text style={styles.welcomeUserText}>{currentUserName}</Text></Text>
                    <TouchableOpacity
                        onPress={() => alert('Event için ekleme sayfası!!')}
                        style={styles.addEvent}
                    >
                        <Feather
                            name='plus'
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
    welcomeUserText: {
        color: 'green',
    },
    addEvent: {
        position: 'absolute',
        right: 10,
        top: 10
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
        top: 10,
        left: 5,
    },
    typeText: {
        fontSize: 20,
        color: 'gray',
        fontWeight: 'bold',
    },
    type: {
        left: 5,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    eventDate: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'gray',
        borderRadius: 10,
        width: 55,
        height: 50,
        position: 'absolute',
        top: 15,
        left: 140,
    },
    eventDateText: {
        color: 'white',
        textAlign: 'center'
    },
    placeName: {
        flexDirection: 'column',
        position: 'absolute',
        bottom: 30,
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeNameText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    eventTabInfo: {
        position: 'absolute',
        left: 0,
        top: 30,
        flexDirection: 'row',
    },
    eventTabLocationText: {
        color: 'white',
        fontSize: 16,
    },
    eventTabHourText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 20,
        fontWeight: 'bold'
    }
})