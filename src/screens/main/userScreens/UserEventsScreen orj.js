import React, { useState, useEffect } from 'react'
import CustomHeader from '../../../components/CustomHeader'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    StatusBar,
    TouchableHighlight,
    ActivityIndicator,
    Image,
    ScrollView,
    FlatList,
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { DATA } from '../../../constants/mainEvents'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../../constants';
import firebase from 'firebase'
import Shimmer from '../../../components/Shimmer'

export default function UserEventsScreen({ navigation }) {
    const [listEvents, setListEvents] = useState([])
    const [loading, setLoading] = useState(false)

    const eventList = async () => {
        if (!loading) {
            setLoading(true)
        }
        try {
            await firebase
                .firestore()
                .collection('events')
                .where('isActive', '==', true)
                .get()
                .then((querySnapshot) => {
                    const objectsArray = [];
                    querySnapshot.forEach((user) => {
                        objectsArray.push(user.data());
                    });
                    setListEvents(objectsArray)
                    // console.log(listEvents)
                    setLoading(false)
                });
        } catch (error) {
            alert(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        eventList()
    }, [])

    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState(listEvents)
    const [masterData, setMasterData] = useState(listEvents)

    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.placeName ?
                    item.placeName.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > - 1;
            })
            setFilterData(newData)
            setSearch(text)
        }
        else {
            setFilterData(masterData)
            setSearch(text)
        }
    }

    const renderItem = (data) => {
        return (
            <Animated.View
                style={styles.rowFront}>
                <TouchableHighlight
                    style={styles.rowFrontVisible}
                    onPress={() => navigation.navigate('EventDetail', data)}
                    underlayColor={'#aaa'}>
                    <>
                        <View style={{ position: 'absolute', right: 10, top: 5 }}>
                            <Image
                                style={styles.itemImg}
                                source={data.item.img}
                            />
                        </View>

                        <Text style={styles.eventTypeTxt}>{data.item.eventType} </Text>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.placeName} numberOfLines={1}>
                                {data.item.placeName}
                            </Text>
                            <Text style={styles.subInfo} numberOfLines={1}>
                                {data.item.eventHour}
                            </Text>
                        </View>

                        <Text style={styles.eventLocation}>
                            {data.item.eventLocation}
                        </Text>
                    </>
                </TouchableHighlight>
            </Animated.View>
        );
    };

    return (
        <>
            <CustomHeader
                title="Mekanlar"
                navigation={navigation}
                isBack={true}
            />

            <View style={styles.containerHeader}>
                <StatusBar barStyle="dark-content" />

                <View style={{ flexDirection: 'row' }}>
                    <Searchbar
                        style={styles.searchBar}
                        placeholder="Mekan Ara.."
                        onChangeText={(text) => searchFilter(text)}
                        value={search}
                    />
                    <TouchableOpacity
                        onPress={() => navigation.navigate('UserEventsBookmarks')}
                        style={styles.bookmarkBtn}>

                        <AntDesign
                            style={{ fontWeight: 'bold' }}
                            name="hearto"
                            size={18}
                            color="gray"
                        />
                    </TouchableOpacity>

                </View>

            </View>

            <View style={styles.container}>

                {listEvents.length > 0 ? (
                    loading ?
                        <>
                            <ActivityIndicator color='gray' size={25} />
                            <View style={styles.container}>
                                <View style={styles.header}>
                                    <View>
                                        <View style={styles.upperText}>
                                            <Shimmer width={200} height={14} />
                                        </View>
                                        <View style={styles.lowerText}>
                                            <Shimmer width={120} height={14} />
                                        </View>
                                        <View style={styles.lowerText}>
                                            <Shimmer width={120} height={14} />
                                        </View>
                                    </View>
                                    <View style={styles.avatar}>
                                        <Shimmer width={60} height={60} />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.container}>
                                <View style={styles.header}>
                                    <View>
                                        <View style={styles.upperText}>
                                            <Shimmer width={200} height={14} />
                                        </View>
                                        <View style={styles.lowerText}>
                                            <Shimmer width={120} height={14} />
                                        </View>
                                        <View style={styles.lowerText}>
                                            <Shimmer width={120} height={14} />
                                        </View>
                                    </View>
                                    <View style={styles.avatar}>
                                        <Shimmer width={60} height={60} />
                                    </View>
                                </View>
                            </View>
                        </>
                        : <FlatList
                            data={listEvents}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => item.id}
                        />
                ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Hiç etkinlik bulunamadı..</Text>
                        </View>
                    )}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    containerHeader: {
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#f4f4f4',
    },
    rowFront: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        margin: 5,
        marginBottom: 15,
        shadowColor: '#999',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    rowFrontVisible: {
        backgroundColor: '#FFF',
        borderRadius: 5,
        height: 60,
        padding: 10,
        marginBottom: 15,
    },
    searchBar: {
        marginLeft: 5,
        marginBottom: 10,
        width: SIZES.width / 1.2
    },
    placeName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        // color: 'green',
    },
    subInfo: {
        textDecorationLine: 'underline',
        fontSize: 12,
        // fontWeight: 'bold',
        marginBottom: 5,
        marginLeft: 5,
        color: 'green',
    },
    itemImg: {
        borderRadius: 100,
        width: 50,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1
    },
    bookmarkBtn: {
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 30,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    eventTypeTxt: {
        position: 'absolute',
        top: 30,
        color: 'gray',
        right: 70,
    },
    eventLocation: {
        fontSize: 12,
        color: '#999',
    },
    container: {
        flex: 1,
        marginVertical: 40,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        margin: 8,
    },
    avatar: { borderRadius: 30, width: 60, marginLeft: 20, overflow: 'hidden' },
    upperText: { marginLeft: 8, marginTop: 14 },
    lowerText: { marginLeft: 8, marginTop: 4 },
});
