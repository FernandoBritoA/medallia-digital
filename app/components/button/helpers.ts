import { ButtonStyle, ButtonType } from './types'
import Colors from '../../styles/Colors'

export const buttonColorsByType: Record<ButtonType, ButtonStyle> = Object.freeze({
  'config-selection': {
    backgroundColor: Colors.WHITE,
    contentColor: Colors.PURPLE
  },
  action: { backgroundColor: Colors.PURPLE, contentColor: Colors.WHITE }
})
