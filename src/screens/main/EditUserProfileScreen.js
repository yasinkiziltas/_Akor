import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native'
import CustomHeader from '../../components/CustomHeader';
import FormInput from '../../components/FormInput';

export default function EditUserProfileScreen({ navigation }) {
    return (
        <>
            <CustomHeader
                title="Profili Düzenle"
                navigation={navigation}
            />

            <View style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.image}>
                </TouchableOpacity>
            </View>

            {/*  */}
        </>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1 / 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderWidth: 2,
        borderRadius: 50,
        width: 100,
        height: 100,
    },
})
