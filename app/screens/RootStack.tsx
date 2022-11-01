import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from '../types/navigation/RootStackParamList'
import MainScreen from './MainScreen'
import InformativeScreen from './InformativeScreen'
import routes from '../modules/routes'
import { NavigationContainer } from '@react-navigation/native'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator: React.FC = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen
        component={MainScreen}
        name={routes.MainScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name={routes.InformativeScreen} component={InformativeScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default RootStackNavigator
