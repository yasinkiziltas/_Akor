import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import Providers from './src/navigation'

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  return (
    <>
      <Providers />
    </>
  )
}
