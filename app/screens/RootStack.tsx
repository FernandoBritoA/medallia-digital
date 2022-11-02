import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation/RootStackParamList'
import MainScreen from './MainScreen'
import InformativeScreen from './InformativeScreen'
import headerOptions from '../styles/header-options'
import routes from '../modules/routes'

const RootStack = createNativeStackNavigator<RootStackParamList>()

const RootStackNavigator: React.FC = () => (
  <NavigationContainer>
    <RootStack.Navigator>
      <RootStack.Screen
        component={MainScreen}
        name={routes.MainScreen}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name={routes.InformativeScreen}
        component={InformativeScreen}
        options={({ route }) => ({
          title: route.params.title,
          ...headerOptions
        })}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default RootStackNavigator
