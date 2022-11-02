import { useState } from 'react'
import { MobileData } from '../../../types/action-config'
import useUpdateUsedActions from './use-update-used-actions'
import { showErrorToast } from '../../../utilities/show-toast'

type ButtonCTA = {
  onPress: () => void
  isLoading?: boolean
  disabled?: boolean
}

type ReturnT = {
  selectedConfig: string
  button1Props: ButtonCTA
  button2Props: ButtonCTA
  actionButtonProps: ButtonCTA
}

const useActionSettings = (): ReturnT => {
  const updateUsedActions = useUpdateUsedActions()

  const [selectedConfig, setSelectedConfig] = useState('NONE')
  const [isActionButtonLoading, setIsActionButtonLoading] = useState(false)
  const [isButton1Loading, setIsButton1Loading] = useState(false)
  const [isButton2Loading, setIsButton2Loading] = useState(false)
  const [mobileData, setMobileData] = useState<MobileData | null>(null)

  const fetchDataJSON = async (fileName: string) => {
    try {
      const baseURL = 'https://raw.githubusercontent.com/medallia-digital/Exams-Data/master/'

      const response = await fetch(`${baseURL}${fileName}`)
      const data = await response.json()

      setMobileData(data)
    } catch (e) {
      showErrorToast('Something happened, please try again.')
    }
  }

  const onButton1Press = async () => {
    setIsButton1Loading(true)
    await fetchDataJSON('mobileData.json')
    setIsButton1Loading(false)

    setSelectedConfig('CONFIGURATION 1')
  }

  const onButton2Press = async () => {
    setIsButton2Loading(true)
    await fetchDataJSON('mobileData2.json')
    setIsButton2Loading(false)

    setSelectedConfig('CONFIGURATION 2')
  }

  const onActionButtonPress = async () => {
    if (mobileData) {
      setIsActionButtonLoading(true)
      await updateUsedActions(mobileData)
      setIsActionButtonLoading(false)
    }
  }

  const button1Props: ButtonCTA = { isLoading: isButton1Loading, onPress: onButton1Press }
  const button2Props: ButtonCTA = { isLoading: isButton2Loading, onPress: onButton2Press }
  const actionButtonProps: ButtonCTA = {
    disabled: !mobileData,
    onPress: onActionButtonPress,
    isLoading: isActionButtonLoading
  }

  return { selectedConfig, button1Props, button2Props, actionButtonProps }
}

export default useActionSettings
