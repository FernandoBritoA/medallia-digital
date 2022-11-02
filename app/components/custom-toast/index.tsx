import React from 'react'
import Toast, { ErrorToast, BaseToastProps } from 'react-native-toast-message'
import styles from './index.styles'

const CustomToast = () => {
  const config = {
    error: (props: BaseToastProps) => (
      <ErrorToast
        {...props}
        text1NumberOfLines={5}
        text1Style={styles.textStyle}
        style={styles.containerStyle}
      />
    )
  }

  return <Toast config={config} />
}

export default CustomToast
