import { View, Text, Modal, StyleSheet, TouchableHighlight, Platform } from 'react-native'
import React, { useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const CustomDatePicker = (props) => {
    const { defaultDate, textStyle } = props;
    const [date, setDate] = useState(moment(defaultDate))
    const [show, setShow] = useState(false)

    const onChange = (e, selectedDate) => {
        setDate(moment(selectedDate));
    }

    const onCancelPress = () => {
        setDate(moment(defaultDate))
        setShow(false)
    }

    const onDonePress = () => {
        props.onDateChange(date);
        setShow(false)
    }

    return (
        <TouchableHighlight
            style={{ marginTop: 10 }}
            activeOpacity={0}
            onPress={() => setShow(true)}
        >
            <View>
                <Text style={textStyle}>{moment().format('DD.MM.YYYY')}</Text>

                <Modal
                    transparent={true}
                    animationType='slide'
                    visible={show}
                    supportedOrientations={['portrait']}
                    onRequestClose={() => setShow(false)}
                >
                    <View style={{ flex: 1 }}>
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                flexDirection: 'row'
                            }}
                            activeOpacity={1}
                            visible={show}
                            onPress={() => setShow(false)} >
                            <TouchableHighlight
                                underlayColor={'#FFFFFF'}
                                style={{
                                    flex: 1,
                                    borderTopColor: '#E9E9E9',
                                    borderTopWidth: 1,
                                }}
                                onPress={() => console.log('datepicker clicked')}>

                                <View style={{
                                    backgroundColor: '#FFFFFF',
                                    height: 256,
                                    overflow: 'hidden',
                                }}>
                                    <View style={{ marginTop: 20 }}>
                                        <DateTimePicker
                                            timeZoneOffsetInMinutes={0}
                                            value={new Date(date)}
                                            mode="date"
                                            minimumDate={new Date(moment()
                                                .subtract(120, 'years')
                                                .format('YYYY-MM-DD'))}
                                            maximumDate={new Date(moment().format('YYYY-MM-DD'))}
                                            onChange={onChange}
                                        />
                                    </View>

                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onCancelPress}
                                        style={[styles.btnText, styles.btnCancel]}
                                    >
                                        <Text>İptal</Text>
                                    </TouchableHighlight>

                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={onDonePress}
                                        style={[styles.btnText, styles.btnCancel]}
                                    >
                                        <Text>Bitti</Text>
                                    </TouchableHighlight>


                                </View>

                            </TouchableHighlight>

                        </TouchableHighlight>
                    </View>
                </Modal>
            </View>
        </TouchableHighlight>
    )
}

CustomDatePicker.defaultProps = {
    textStyle: {},
    defaultDate: moment(),
    onDateChange: () => {},
};

const styles = StyleSheet.create({
    btnText: {
        marginTop:25,
       
        top: 0,
        height: 25,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnCancel: {
        left: 0
    },
    btnDone: {
        right: 0
    }
})

export default CustomDatePicker;


    {/* <View style={{ flex: 1, marginTop: 20 }}>
                        <Text style={{ color: 'gray' }}>Doğum Tarihi</Text>
                        <CustomDatePicker
                            onDateChange={(value) => console.log('Date changed: ', + value)}
                            textStyle={{
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                borderColor: 'gray',
                                borderWidth: 1,
                            }}
                        />
                    </View> */}