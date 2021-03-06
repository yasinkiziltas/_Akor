import React, { useState, useEffect, useContext } from 'react'
import {
    Image,
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native'
import { loginBack } from '../../../constants/images'
import * as Animatable from 'react-native-animatable';
import FormInput from '../../../components/FormInput'
import FormButton from '../../../components/FormButton'
import { SIZES } from '../../../constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AuthContext } from '../../../navigation/AuthProvider'
import * as Yup from 'yup'
import { Formik } from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function UserLoginScreen({ navigation }) {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [userType, setUserType] = useState('User')
    const [hidePass, setHidePass] = useState(true);
    const { login, loading } = useContext(AuthContext)

    return (
        <>
            <StatusBar hidden={true} />

            <KeyboardAwareScrollView>

                <Animatable.View
                    animation={"slideInUp"}
                    style={{ alignItems: 'center', marginTop: 40, }}>
                    <Image
                        source={loginBack}
                        style={{ width: 350, height: 350, borderRadius: 50 }}
                    />
                </Animatable.View >

                <Animatable.View
                    animation="slideInDown"
                    style={styles.inputView}
                >
                    <Text style={styles.loginText}>Giriş</Text>

                    <Formik
                        initialValues={{ mail, password, userType }}
                        onSubmit={values => { login(values.mail, values.password, values.userType) }}
                        validationSchema={
                            Yup.object().shape({
                                mail: Yup.string()
                                    .email('Lütfen geçerli bir email adresi girin!')
                                    .required('Email gerekli!'),

                                password: Yup.string()
                                    .min(6, 'Şifre çok kısa, minimum 6 karakter olmalı!')
                                    .required('Şifre gerekli!')
                            })
                        }
                    >
                        {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
                            <>
                                <View style={{ margin: 10 }}>

                                    <FormInput
                                        onBlur={() => setFieldTouched('mail')}
                                        value={values.mail}
                                        keyboardType="email-address"
                                        placeholder="E-Mail"
                                        onChangeText={handleChange('mail')}
                                        // onChangeText={value => setMail(value)}
                                        iconType="mail"
                                    />

                                    {(errors.mail && touched.mail) &&
                                        <Text style={styles.errors}>{errors.mail} </Text>
                                    }

                                    <View style={{ flexDirection: 'row' }}>
                                        <FormInput
                                            onBlur={() => setFieldTouched('password')}
                                            value={values.password}
                                            placeholder="Şifre"
                                            onChangeText={handleChange('password')}
                                            iconType="lock"
                                            secureTextEntry={hidePass ? true : false}
                                        />

                                        <Icon
                                            name={hidePass ? 'eye' : 'eye-slash'}
                                            size={15}
                                            style={{ position: 'absolute', right: 15, top: 10 }}
                                            color="grey"
                                            onPress={() => setHidePass(!hidePass)}
                                        />
                                    </View>

                                    {(errors.password && touched.password) &&
                                        <Text style={styles.errors}>{errors.password} </Text>
                                    }

                                    <TouchableOpacity
                                        style={styles.forgotPass}
                                        onPress={() => navigation.navigate('ForgotPassword')}
                                    >
                                        <Text style={styles.forgotPassText}>Şifremi unuttum</Text>
                                    </TouchableOpacity>

                                    {loading ? (
                                        <ActivityIndicator
                                            style={{ marginTop: 5 }}
                                            color='red'
                                            size={25}
                                        />
                                        // <LottieView
                                        //     source={loadingAuth}
                                        //     style={{
                                        //         alignSelf: 'center',
                                        //         width: 50,
                                        //         height: 50
                                        //     }}
                                        //     autoPlay
                                        //     loop
                                        // />
                                    ) : (
                                        null
                                    )}

                                </View>

                                <View style={{ marginVertical: 35 }}>
                                    <FormButton
                                        onPress={() => handleSubmit()}
                                        text="Giriş"
                                        backgroundColor={"#ff8e88"}
                                    />
                                </View>
                            </>
                        )}

                    </Formik>
                </Animatable.View>
            </KeyboardAwareScrollView >

            <Text style={styles.registerBtn}>Hesabın yok mu?
                <TouchableOpacity
                    style={{ paddingLeft: 5 }}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.signUpBtn}>
                        {''}Kayıt Ol</Text>
                </TouchableOpacity>

            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundImg: {
        backgroundColor: '#e2f4ff',
        width: SIZES.width,
        height: SIZES.height / 3,
    },
    inputView: {
        marginLeft: 5,
        flex: 1,
        flexDirection: 'column'
    },
    loginText: {
        fontWeight: 'bold',
        fontSize: 37,
        margin: 10,
    },
    forgotPass: {
        position: 'absolute',
        top: SIZES.height / 6,
        right: 15,
        marginTop: 10,
    },
    forgotPassText: {
        color: 'gray',
        fontSize: 18
    },
    registerBtn: {
        fontWeight: 'bold',
        color: 'gray',
        textAlign: 'center',
        bottom: 30,
        left: SIZES.width / 3,
        position: 'absolute'
    },
    signUpBtn: {
        color: "#009688",
        fontWeight: 'bold',
        top: 2,
    },
    errors: {
        textAlign: 'center',
        fontSize: 14,
        color: 'red',
        fontWeight: 'bold',
        marginTop: 5
    }
})