import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../constants/index';
import { AuthContext } from '../../navigation/AuthProvider'
import IonIcons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import { DATA } from '../../constants/mainEvents'

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

                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                         
                        backgroundColor:'gray',
                        borderRadius:10,
                        width:55,
                        height:50,
                        position:'absolute',
                        top:15, 
                        left:140,
                    }}>
                        <Text style={{color:'white', textAlign:'center'}}>{item.eventDate}</Text>
                    </View>

                    <View style={{
                        flexDirection: 'column',
                        position: 'absolute',
                        bottom: 30,
                        left: 10,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>{item.placeName}</Text>

                        <View style={{ position: 'absolute', left: 0, top: 30, flexDirection:'row',}}>
                            <Text style={{ color: 'white', fontSize: 16,  }}>{item.eventLocation}</Text>
                            <Text style={{ color: 'white', fontSize: 16, marginLeft:20, fontWeight:'bold' }}>{item.eventHour}</Text>
                        </View>
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
    }
})