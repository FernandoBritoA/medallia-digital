import React from 'react'
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native'
import { ButtonType } from './types'
import { buttonColorsByType } from './helpers'
import styles from './index.styles'

type PropsT = {
  text: string
  type: ButtonType
  onPress: () => void
  disabled?: boolean
  isLoading?: boolean
  style?: StyleProp<ViewStyle>
}

const Button: React.FC<PropsT> = ({
  text,
  onPress,
  type,
  disabled = false,
  isLoading = false,
  style = {}
}) => {
  const { backgroundColor, contentColor } = buttonColorsByType[type]

  const dynamicContainerStyle = {
    backgroundColor,
    borderColor: contentColor,
    opacity: disabled ? 0.5 : 1
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      style={[style, styles.container, dynamicContainerStyle]}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={contentColor} />
      ) : (
        <Text style={[styles.text, { color: contentColor }]}>{text}</Text>
      )}
    </TouchableOpacity>
  )
}

export default Button
