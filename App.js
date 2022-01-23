import React from 'react'
import { View, Text, LogBox } from 'react-native'
import Router from './src/Router'

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  return (
    <Router />
  )
}
