import { Alert } from 'react-native'
import { ActionSheetOptions } from '@expo/react-native-action-sheet'
import { ActionT, AvailableConfigs, ConfigNumber, ConfigT } from '../../../types/action-config'
import { showErrorToast } from '../../../utilities/show-toast'

export const getActionSheetOptions = (config: ActionT): ActionSheetOptions => {
  const options = ['Continue', 'Cancel']
  const cancelButtonIndex = 1
  const title = config.text
  const message = config.body

  return { title, message, options, cancelButtonIndex }
}

export const showAlert = (config: ActionT) => Alert.alert(config.text, config.body)

export const fileNameByConfigNumber: Record<ConfigNumber, string> = Object.freeze({
  1: 'mobileData.json',
  2: 'mobileData2.json'
})

export const validateShouldFetchContent = async (
  configNumber: ConfigNumber,
  availableConfigs: AvailableConfigs
): Promise<boolean> => {
  // @ts-ignore
  const foundConfig: ConfigT = availableConfigs[configNumber]

  // Fetch because no config was found
  if (!foundConfig) {
    return true
  }

  try {
    const { configurationUUID } = foundConfig
    const response = await fetch(configurationUUID.url)
    const data = await response.json()

    // Fetch if a new uuid is returned from configurationUUID URL
    return data.uuid !== configurationUUID.uuid
  } catch (e) {
    showErrorToast('Something happened, please try again.')
    return false
  }
}
