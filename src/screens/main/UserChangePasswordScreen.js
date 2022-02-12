import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CustomHeader from '../../components/CustomHeader'

export default function UserChangePassword({ navigation }) {
  return (
    <>
      <CustomHeader title="" />
      <Text style={styles.passText}>Şifreni Değiştir</Text>
    </>
  );
}

const styles = StyleSheet.create({
  passText: {
    marginVertical: 25,
    margin: 20,
    fontWeight: 'bold',
    fontSize: 24
  }
})