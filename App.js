import React from 'react'
import { LogBox, StatusBar} from 'react-native'
import Router from './src/Router'

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release']);

export default function App() {
  return (
   <>
       <StatusBar hidden={true} />
       <Router />
   </>
  )
}
