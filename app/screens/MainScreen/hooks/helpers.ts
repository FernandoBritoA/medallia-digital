import { Alert } from 'react-native'
import { ActionSheetOptions } from '@expo/react-native-action-sheet'
import { ConfigT } from '../../../types/action-config'

export const getRandomAction = (actions: ConfigT[]): ConfigT => {
  const randomIndex = Math.floor(Math.random() * actions.length)

  return actions[randomIndex]
}

export const getActionError = (config: ConfigT): string => {
  if (!config.enabled) {
    return 'This action is disabled'
  }

  /*
  TODO
  - Valid days
  - Cool down period
  */

  return ''
}

export const getActionSheetOptions = (config: ConfigT): ActionSheetOptions => {
  const options = ['Continue', 'Cancel']
  const cancelButtonIndex = 1
  const title = config.text
  const message = config.body

  return { title, message, options, cancelButtonIndex }
}

export const showAlert = (config: ConfigT) => Alert.alert(config.text, config.body)
