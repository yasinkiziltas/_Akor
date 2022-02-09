import { View, Text, Modal, StyleSheet, TouchableHighlight, Platform } from 'react-native'
import React, {useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

const CustomDatePicker = (props) => {
    return (
        <TouchableHighlight
            style={{marginTop:35}}
            activeOpacity={0}
            // onPress={() => console.log('datepicker')}
        >
            <Text style={{color:'gray'}}>{moment().format('DD-MM-YYYY')}</Text>
        </TouchableHighlight>
    )
}
export default CustomDatePicker;
