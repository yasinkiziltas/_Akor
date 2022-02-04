import React, { useContext } from 'react'
import CustomHeader from '../../components/CustomHeader';
import {
    View,
    Button,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground
} from 'react-native'
import { AuthContext, email } from '../../navigation/AuthProvider'
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../../constants/theme';

export default function ProfileScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#4c669f', '#3b5998', COLORS.gray]}
                style={styles.background}
            />
            <CustomHeader
                title="Profil"
                navigation={navigation}
            />

            <View style={styles.userInfo}>

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1 / 3,
        backgroundColor: 'gray',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
});
