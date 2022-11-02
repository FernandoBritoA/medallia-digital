import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/button'
import useActionSettings from './hooks/use-action-settings'
import generalStyles from '../../styles/general-styles'
import styles from './index.styles'

const MainScreen: React.FC = () => {
  const { selectedConfig, button1Props, button2Props, actionButtonProps } = useActionSettings()

  return (
    <SafeAreaView style={generalStyles.flex}>
      <View style={[generalStyles.deviceSpacedContainer, styles.largeTopSpace]}>
        <Text style={[styles.text, styles.smallBottomSpace]}>
          Select one of the configurations below to continue.
        </Text>

        <Button
          {...button1Props}
          text='CONFIGURATION 1'
          type='config-selection'
          style={styles.smallBottomSpace}
        />
        <Button
          {...button2Props}
          text='CONFIGURATION 2'
          type='config-selection'
          style={styles.smallBottomSpace}
        />
        <Text style={styles.text}>
          Current selection: <Text style={styles.purpleText}>{selectedConfig}</Text>
        </Text>
        <Button {...actionButtonProps} text='ACTION' type='action' style={styles.autoMarginTop} />
      </View>
    </SafeAreaView>
  )
}

export default MainScreen
