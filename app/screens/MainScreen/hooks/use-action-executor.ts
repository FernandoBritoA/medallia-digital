import { useNavigation } from '@react-navigation/native'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { ConfigT } from '../../../types/action-config'
import { getActionSheetOptions, showAlert } from './helpers'
import { MainScreenNavigationProp } from '../types'
import routes from '../../../modules/routes'

type ReturnT = (action: ConfigT) => void

const useActionExecutor = (): ReturnT => {
  const { showActionSheetWithOptions } = useActionSheet()
  const navigation = useNavigation<MainScreenNavigationProp>()

  const showActionSheet = (config: ConfigT) => {
    const options = getActionSheetOptions(config)

    showActionSheetWithOptions(options, () => {})
  }

  return (action: ConfigT) => {
    switch (action.type) {
      case 'screen':
        return navigation.navigate(routes.InformativeScreen, {
          title: action.text,
          body: action.body
        })

      case 'alert':
        return showAlert(action)

      case 'alertSheet':
        return showActionSheet(action)
    }
  }
}

export default useActionExecutor
