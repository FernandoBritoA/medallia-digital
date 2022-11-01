import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/button'
import generalStyles from '../../styles/general-styles'
import styles from './index.styles'

const MainScreen: React.FC = () => (
  <SafeAreaView style={generalStyles.flex}>
    <View style={[generalStyles.deviceSpacedContainer, styles.largeTopSpace]}>
      <Text style={[styles.text, styles.smallBottomSpace]}>
        Select one of the configurations below to continue.
      </Text>
      <Button
        text='CONFIGURATION 1'
        type='config-selection'
        onPress={() => {}}
        style={styles.smallBottomSpace}
      />
      <Button text='CONFIGURATION 2' type='config-selection' onPress={() => {}} />
      <Button text='ACTION' type='action' onPress={() => {}} style={styles.autoMarginTop} />
    </View>
  </SafeAreaView>
)

export default MainScreen
