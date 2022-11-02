import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types/navigation/RootStackParamList'
import routes from '../../modules/routes'

export type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  routes.MainScreen
>
