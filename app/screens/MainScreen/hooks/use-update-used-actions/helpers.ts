import { getDay, differenceInMilliseconds, addMilliseconds, format } from 'date-fns'
import { ActionT, AvailableConfigs, UsedActionsDictionary } from '../../../../types/action-config'

const generateRandomIndex = (arrLength: number) => Math.floor(Math.random() * arrLength)

export const getActionByPriority = (availableConfigs: AvailableConfigs): ActionT => {
  const configsAsArray = Object.values(availableConfigs)
  const actionsLength = configsAsArray[0].actions.length

  const randomIndex = generateRandomIndex(actionsLength)

  // We set the first config action at the given index as initial value
  let selectedAction = configsAsArray[0].actions[randomIndex]

  configsAsArray.forEach((config, index) => {
    const currentIterationAction = config.actions[randomIndex]
    const isFirstIteration = index === 0

    // First iteration action is the default value
    if (isFirstIteration) {
      return
    }

    // Current iteration action has a higher priority
    if (currentIterationAction.priority > selectedAction.priority) {
      selectedAction = currentIterationAction
      return
    }

    // Both actions have the same priority, so we choose one at random.
    if (currentIterationAction.priority === selectedAction.priority) {
      // Returns 0 or 1 randomly
      const randomIndexOfTwoElements = generateRandomIndex(2)

      if (randomIndexOfTwoElements === 1) {
        selectedAction = currentIterationAction
      }
    }
  })

  return selectedAction
}

const getTodayIsValidDay = (validDays: number[]): boolean => {
  const now = new Date()

  // 0 | 1 | 2 | 3 | 4 | 5 | 6
  // 0 represents Sunday
  const today = getDay(now)

  return validDays.includes(today)
}

const getRemainingCoolDown = (newAction: ActionT, usedActions: UsedActionsDictionary): number => {
  const storedAction = usedActions[newAction.id]

  // The action has not been used yet so it has no cool-down time
  if (!storedAction) {
    return 0
  }

  const now = new Date()
  const { cool_down } = newAction
  const lastUsed = new Date(storedAction.lastUsed)

  const timeSinceLastUse = differenceInMilliseconds(now, lastUsed)

  // Already completed cool down time
  if (timeSinceLastUse >= cool_down) {
    return 0
  }

  // Remaining milliseconds to finish cool down
  return cool_down - timeSinceLastUse
}

const getNowWithExtraMilliseconds = (milliseconds: number): string => {
  const now = new Date()
  const futureDate = addMilliseconds(now, milliseconds)

  return format(futureDate, 'MMM d, yyyy HH:mm:ss')
}

export const getActionError = (newAction: ActionT, usedActions: UsedActionsDictionary): string => {
  const actionTitle = newAction.text

  if (!newAction.enabled) {
    return `The action '${actionTitle}' is disabled`
  }

  if (!getTodayIsValidDay(newAction.valid_days)) {
    return `The action '${actionTitle}' cannot be executed today`
  }

  const remainingCoolDown = getRemainingCoolDown(newAction, usedActions)

  if (remainingCoolDown > 0) {
    const usableDate = getNowWithExtraMilliseconds(remainingCoolDown)
    return `The action '${actionTitle}' cannot be executed until ${usableDate}`
  }

  return ''
}
