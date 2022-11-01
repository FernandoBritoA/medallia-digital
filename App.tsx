import React from 'react'
import { StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import RootStack from './app/screens/RootStack'

const App = () => (
  <>
    <StatusBar barStyle='dark-content' backgroundColor={Colors.lighter} />
    <RootStack />
  </>
)

export default App
