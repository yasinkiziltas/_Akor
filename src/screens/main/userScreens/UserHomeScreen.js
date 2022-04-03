import React, { useEffect, useContext, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    StatusBar,
    ActivityIndicator,
} from 'react-native'
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../../constants/index';
import { AuthContext } from '../../../navigation/AuthProvider'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';


export default function UserHomeScreen({ navigation }) {
    const { userName, userEmail } = useContext(AuthContext)
    const [currentUserName, setCurrentUserName] = useState()
    const [currentUserEmail, setCurrentUserMail] = useState()
    const [eventData, setEventData] = useState([])
    const [loading, setLoading] = useState()

    const fetchEvents = async () => {

        if (!loading) {
            setLoading(true)
        }

        try {
            await firebase
                .firestore()
                .collection('events')
                .get()
                .then((querySnapshot) => {
                    const objectsArray = [];
                    querySnapshot.forEach((event) => {
                        objectsArray.push(event.data());
                    });
                    setEventData(objectsArray)
                    setLoading(false)
                });
        } catch (error) {
            alert(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEvents();

        AsyncStorage.getItem('cUsername').then(user => {
            setCurrentUserName(user)
        }).catch(e =>
            console.log(e)
        )

        AsyncStorage.getItem('cUseremail').then(useremail => {
            setCurrentUserMail(useremail)
        }).catch(e =>
            console.log(e)
        )
    }, [])

    const renderItem = (data) => {
        return (
            <View>
                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => navigation.navigate('EventDetails', data)}
                >
                    <ImageBackground
                        imageStyle={{ borderRadius: 20 }}
                        style={styles.randomEvents}
                        source={data.item.img}
                    >
                        <View style={styles.textView}>
                            <Text style={styles.typeText}>Tür</Text>
                            <Text style={styles.type}>{data.item.eventType}</Text>
                        </View>

                        <View style={styles.eventDate}>
                            <Text style={styles.eventDateText}>{data.item.eventDate}</Text>
                        </View>

                        <View style={styles.placeName}>
                            <Text style={styles.placeNameText}>{data.item.placeName}</Text>

                            <View style={styles.eventTabInfo}>
                                <Text style={styles.eventTabLocationText}>{data.item.eventLocation}</Text>
                                <Text style={styles.eventTabHourText}>{data.item.eventHour}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        )
    }

    // const renderItemEvents = (item) => (

    // )

    return (
        <>
            <StatusBar hidden={true} />
            <Animatable.View
                animation="fadeInUp"
                style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.welcomeText}>Hoşgeldin! <Text style={styles.welcomeUserText}>{currentUserName}</Text></Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={styles.addEvent}
                    >
                        <Ionicons
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
                {
                    loading ? //eventData.length < 0 && 
                        <ActivityIndicator
                            size={20}
                            color="gray"
                        />
                        :
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            data={eventData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                }

                {
                    eventData.length < 0 || !eventData || eventData == null ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontSize: 18, marginVertical: 20 }}>Etkinlik bulunamadı..</Text>
                        </View>
                        : null
                }

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