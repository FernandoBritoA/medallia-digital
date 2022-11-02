import AsyncStorage from '@react-native-async-storage/async-storage'
import { showErrorToast } from './show-toast'

type StorageKey = '@used_actions'

export const getStorageItem = async <T>(storageKey: StorageKey): Promise<T> => {
  try {
    const value = await AsyncStorage.getItem(storageKey)

    return value ? JSON.parse(value) : {}
  } catch (e) {
    showErrorToast("Couldn't retrieve stored data")

    return {} as T
  }
}

export const setStorageItem = async <T>(key: StorageKey, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    showErrorToast("Couldn't save data")
  }
}
