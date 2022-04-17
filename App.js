import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import Providers from './src/navigation'
import { Provider, DefaultTheme } from "react-native-paper";

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  return (
    <>
      <Provider>
        <Providers />
      </Provider>
      {/* <Providers /> */}
    </>
  )
}
