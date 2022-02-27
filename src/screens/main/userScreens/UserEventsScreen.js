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
    Image,
    ScrollView
} from 'react-native'
import { SwipeListView } from 'react-native-swipe-list-view';
import { DATA } from '../../../constants/mainEvents'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Searchbar } from 'react-native-paper';
import { SIZES } from '../../../constants';

export default function UserEventsScreen({ navigation }) {

    const [listData, setListData] = useState(
        DATA.map((EventItem, index) => ({
            key: `${index}`,
            placeName: EventItem.placeName,
            eventLocation: EventItem.eventLocation,
            eventType: EventItem.eventType,
            eventHour: EventItem.eventHour,
            img: EventItem.img
        })),
    );
    const [search, setSearch] = useState('')
    const [filterData, setFilterData] = useState(listData)
    const [masterData, setMasterData] = useState(listData)

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

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setListData(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const onLeftActionStatusChange = rowKey => {
        console.log('onLeftActionStatusChange', rowKey);
    };

    const onRightActionStatusChange = rowKey => {
        console.log('onRightActionStatusChange', rowKey);
    };

    const onRightAction = rowKey => {
        console.log('onRightAction', rowKey);
    };

    const onLeftAction = rowKey => {
        console.log('onLeftAction', rowKey);
    };

    const VisibleItem = props => {
        const {
            data,
            rowHeightAnimatedValue,
            removeRow,
            leftActionState,
            rightActionState,
        } = props;

        if (rightActionState) {
            Animated.timing(rowHeightAnimatedValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => {
                removeRow();
            });
        }

        return (
            <>
                <Animated.View
                    style={[styles.rowFront, { height: rowHeightAnimatedValue }]}>
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
            </>
        );
    };

    const renderItem = (data, rowMap) => {
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <VisibleItem
                data={data}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                removeRow={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    const HiddenItemWithActions = props => {
        const {
            swipeAnimatedValue,
            leftActionActivated,
            rightActionActivated,
            rowActionAnimatedValue,
            rowHeightAnimatedValue,
            onClose,
            onDelete,
        } = props;

        if (rightActionActivated) {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.spring(rowActionAnimatedValue, {
                toValue: 75,
                useNativeDriver: false
            }).start();
        }

        return (
            <Animated.View style={[styles.rowBack, { height: rowHeightAnimatedValue }]}>
                <Text>Left</Text>
                {!leftActionActivated && (
                    <TouchableOpacity
                        style={[styles.backRightBtn, styles.backRightBtnLeft]}
                        onPress={onClose}>
                        <MaterialCommunityIcons
                            name="close-circle-outline"
                            size={25}
                            style={styles.trash}
                            color="#fff"
                        />
                    </TouchableOpacity>
                )}
                {!leftActionActivated && (
                    <Animated.View
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                            {
                                flex: 1,
                                width: rowActionAnimatedValue,
                            },
                        ]}>
                        <TouchableOpacity
                            style={[styles.backRightBtn, styles.backRightBtnRight]}
                            // onPress={onDelete}
                            onPress={() => alert('Mekanı favlara ekle!')}
                        >
                            <Animated.View
                                style={[
                                    styles.trash,
                                    {
                                        transform: [
                                            {
                                                scale: swipeAnimatedValue.interpolate({
                                                    inputRange: [-90, -45],
                                                    outputRange: [1, 0],
                                                    extrapolate: 'clamp',
                                                }),
                                            },
                                        ],
                                    },
                                ]}>
                                <MaterialCommunityIcons
                                    name="heart"
                                    size={25}
                                    color="#fff"
                                />
                            </Animated.View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </Animated.View>
        );
    };

    const renderHiddenItem = (data, rowMap) => {
        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(60);

        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    return (
        <>
            <CustomHeader title="Mekanlar" />
            <View style={styles.container}>
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

                <ScrollView>
                    {listData.length > 0 ? (
                        <SwipeListView
                            data={filterData}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            leftOpenValue={75}
                            rightOpenValue={-150}
                            disableRightSwipe
                            onRowDidOpen={onRowDidOpen}
                            leftActivationValue={100}
                            rightActivationValue={-200}
                            leftActionValue={0}
                            rightActionValue={-500}
                            onLeftAction={onLeftAction}
                            onRightAction={onRightAction}
                            onLeftActionStatusChange={onLeftActionStatusChange}
                            onRightActionStatusChange={onRightActionStatusChange}
                        />
                    ) : (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Hiç etkinlik bulunamadı..</Text>
                        </View>
                    )}
                </ScrollView>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#f4f4f4',
        flex: 1,
    },
    backTextWhite: {
        color: '#FFF',
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
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: '#1f65ff',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
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
});