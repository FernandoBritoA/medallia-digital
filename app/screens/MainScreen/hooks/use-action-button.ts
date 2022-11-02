import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { ConfigT, MobileData } from '../../../types/action-config'
import { getActionError, getActionSheetOptions, getRandomAction, showAlert } from './helpers'
import { MainScreenNavigationProp } from '../types'
import routes from '../../../modules/routes'

type ReturnT = (mobileData: MobileData) => void

const useActionButton = (): ReturnT => {
  const { showActionSheetWithOptions } = useActionSheet()
  const navigation = useNavigation<MainScreenNavigationProp>()

  const showActionSheet = (config: ConfigT) => {
    const options = getActionSheetOptions(config)

    showActionSheetWithOptions(options, () => {})
  }

  const performAction = (config: ConfigT) => {
    switch (config.type) {
      case 'screen':
        return navigation.navigate(routes.InformativeScreen, {
          title: config.text,
          body: config.body
        })

      case 'alert':
        return showAlert(config)

      case 'alertSheet':
        return showActionSheet(config)
    }
  }

  return (mobileData: MobileData) => {
    const config = getRandomAction(mobileData.actions)
    const errorMessage = getActionError(config)

    if (errorMessage) {
      // TODO: Error handling
      return
    }

    performAction(config)
  }
}

export default useActionButton
