import React from 'react'
import { StatusBar } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import RootStack from './app/screens/RootStack'
import CustomToast from './app/components/custom-toast'

const App = () => (
  <ActionSheetProvider>
    <>
      <StatusBar barStyle='dark-content' backgroundColor={Colors.lighter} />
      <RootStack />
      <CustomToast />
    </>
  </ActionSheetProvider>
)

export default App
