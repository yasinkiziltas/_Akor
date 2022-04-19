import React from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Image, StatusBar } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import * as Animatable from 'react-native-animatable';
import { onboard, onboard2, onboard3, onboard4 } from '../../constants/images';
import { COLORS, SIZES } from '../../constants/theme';

const Dots = ({ selected }) => {
    let backgroundColor;
    backgroundColor = selected ? COLORS.bottomColor : 'rgba(0,0,0,0.3)'

    return (
        <View
            style={{
                borderRadius: 5,
                width: 20,
                height: 10,
                marginHorizontal: 5,
                backgroundColor
            }}>
        </View>
    )
}

const Skip = ({ ...props }) => {
    return (
        <Animatable.View animation="fadeInLeft" delay={10}>
            <TouchableOpacity {...props} style={styles.btn}>
                <Text style={styles.btnContainer}>Geç</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const Next = ({ ...props }) => {
    return (
        <Animatable.View animation="fadeInRight" delay={10}>
            <TouchableOpacity {...props} style={styles.btn}>
                <Text style={styles.btnContainer}>İleri</Text>
            </TouchableOpacity>
        </Animatable.View>
    )
}

const Done = ({ ...props }) => {
    return (
        <Animatable.View animation="fadeInUp">
            <TouchableOpacity {...props} style={styles.btn}>
                <Text style={styles.btnDone}>Başla!</Text>
            </TouchableOpacity>
        </Animatable.View>

    )
}
export default function OnboardScreen({ navigation }) {
    return (
        <>
            <StatusBar hidden={true} />

            <Animatable.View style={{ flex: 1 }} animation="fadeInUp">
                <Onboarding
                    onSkip={() => navigation.replace('Login')}
                    onDone={() => navigation.navigate('Login')}
                    SkipButtonComponent={Skip}
                    NextButtonComponent={Next}
                    DoneButtonComponent={Done}
                    DotComponent={Dots}
                    bottomBarHeight={70}

                    pages={[
                        {
                            backgroundColor: '#7FCDCD',
                            image:
                                <Image
                                    source={onboard3}
                                    style={{
                                        width: 450,
                                        height: 400,
                                    }}
                                />,
                            titleStyles: { fontWeight: 'bold' },
                            title: "Akor' a hoşgeldin!",
                            subtitle: 'Sahne arkadaşını bul,',
                        },

                        {
                            backgroundColor: '#F0FFF0', //feeae6
                            image:
                                <Image
                                    source={onboard4}
                                    style={{
                                        borderRadius: 30,
                                        width: 450,
                                        height: 400,
                                    }}
                                />,
                            titleStyles: { fontWeight: 'bold' },
                            title: "Akor",
                            subtitle: 've sahnene davet et!'
                        },

                    ]}
                />
            </Animatable.View>

        </>
    )
}

const styles = StyleSheet.create({
    btn: {
        margin: 20
    },
    btnContainer: {
        fontSize: 18,
        color: 'black'
    },
    btnDone: {
        fontSize: 18,
        color: 'black'
    }
})