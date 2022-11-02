import { useEffect, useState } from 'react'
import { MobileData, UsedAction, UsedActionsDictionary } from '../../../../types/action-config'
import { getStorageItem, setStorageItem } from '../../../../utilities/async-storage'
import { showErrorToast } from '../../../../utilities/show-toast'
import useActionExecutor from '../use-action-executor'
import { getActionError, getRandomAction } from './helpers'

type ReturnT = (mobileData: MobileData) => Promise<void>

const useUpdateUsedActions = (): ReturnT => {
  const executeAction = useActionExecutor()

  const [usedActions, setUsedActions] = useState<UsedActionsDictionary>({})

  const restoreData = async () => {
    const storedActions = await getStorageItem<UsedActionsDictionary>('@used_actions')

    setUsedActions(prevState => ({ ...prevState, ...storedActions }))
  }

  useEffect(() => {
    void restoreData()
  }, [])

  return async (mobileData: MobileData) => {
    const newAction = getRandomAction(mobileData.actions)

    const errorMessage = getActionError(newAction, usedActions)

    if (errorMessage) {
      return showErrorToast(errorMessage)
    }

    const newUsedAction: UsedAction = { id: newAction.id, lastUsed: new Date() }
    const updatedUsedActions = { ...usedActions, [newAction.id]: newUsedAction }

    setUsedActions(updatedUsedActions)

    await setStorageItem('@used_actions', updatedUsedActions)

    // Execute action after all validations and storage data has been updated
    executeAction(newAction)
  }
}

export default useUpdateUsedActions
