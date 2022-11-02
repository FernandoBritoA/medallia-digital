import { Alert } from 'react-native'
import { ActionSheetOptions } from '@expo/react-native-action-sheet'
import { ConfigT } from '../../../types/action-config'

export const getActionSheetOptions = (config: ConfigT): ActionSheetOptions => {
  const options = ['Continue', 'Cancel']
  const cancelButtonIndex = 1
  const title = config.text
  const message = config.body

  return { title, message, options, cancelButtonIndex }
}

export const showAlert = (config: ConfigT) => Alert.alert(config.text, config.body)
