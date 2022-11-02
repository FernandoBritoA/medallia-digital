import { useState } from 'react'
import { AvailableConfigs, ConfigNumber } from '../../../types/action-config'
import useUpdateUsedActions from './use-update-used-actions'
import { showErrorToast } from '../../../utilities/show-toast'
import { fileNameByConfigNumber, validateShouldFetchContent } from './helpers'
import { isObjectEmpty } from '../../../utilities/objects'

type ButtonCTA = {
  onPress: () => void
  isLoading?: boolean
  disabled?: boolean
}

type ReturnT = {
  button1Props: ButtonCTA
  button2Props: ButtonCTA
  actionButtonProps: ButtonCTA
}

const useActionSettings = (): ReturnT => {
  const updateUsedActions = useUpdateUsedActions()

  const [isButton1Loading, setIsButton1Loading] = useState(false)
  const [isButton2Loading, setIsButton2Loading] = useState(false)
  const [isActionButtonLoading, setIsActionButtonLoading] = useState(false)

  const [availableConfigs, setAvailableConfigs] = useState<AvailableConfigs>({})

  const fetchConfig = async (configNumber: ConfigNumber) => {
    try {
      const shouldFetchContent = await validateShouldFetchContent(configNumber, availableConfigs)

      if (!shouldFetchContent) {
        return showErrorToast('The selected configuration has already been downloaded.')
      }

      const fileName = fileNameByConfigNumber[configNumber]
      const baseURL = 'https://raw.githubusercontent.com/medallia-digital/Exams-Data/master/'

      const response = await fetch(`${baseURL}${fileName}`)
      const data = await response.json()

      setAvailableConfigs(prevState => ({ ...prevState, [configNumber]: data }))
    } catch (e) {
      showErrorToast('Something happened, please try again.')
    }
  }

  const onButton1Press = async () => {
    setIsButton1Loading(true)
    await fetchConfig(1)
    setIsButton1Loading(false)
  }

  const onButton2Press = async () => {
    setIsButton2Loading(true)
    await fetchConfig(2)
    setIsButton2Loading(false)
  }

  const onActionButtonPress = async () => {
    setIsActionButtonLoading(true)
    await updateUsedActions(availableConfigs)
    setIsActionButtonLoading(false)
  }

  const button1Props: ButtonCTA = { isLoading: isButton1Loading, onPress: onButton1Press }
  const button2Props: ButtonCTA = { isLoading: isButton2Loading, onPress: onButton2Press }
  const actionButtonProps: ButtonCTA = {
    onPress: onActionButtonPress,
    isLoading: isActionButtonLoading,
    disabled: isObjectEmpty(availableConfigs)
  }

  return { button1Props, button2Props, actionButtonProps }
}

export default useActionSettings
