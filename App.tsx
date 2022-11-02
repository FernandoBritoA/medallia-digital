import React from 'react'
import { StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Toast from 'react-native-toast-message'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import RootStack from './app/screens/RootStack'

const App = () => (
  <ActionSheetProvider>
    <>
      <Toast />
      <StatusBar barStyle='dark-content' backgroundColor={Colors.lighter} />
      <RootStack />
    </>
  </ActionSheetProvider>
)

export default App
