import React from 'react'
import { Text, View } from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation/RootStackParamList'
import routes from '../../modules/routes'
import generalStyles from '../../styles/general-styles'
import styles from './index.styles'

type InformativeScreenStackProps = NativeStackScreenProps<
  RootStackParamList,
  routes.InformativeScreen
>

const InformativeScreen: React.FC<InformativeScreenStackProps> = ({ route }) => (
  <View style={generalStyles.deviceSpacedContainer}>
    <Text style={styles.text}>{route.params.body}</Text>
  </View>
)

export default InformativeScreen
