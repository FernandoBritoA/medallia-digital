import { getDay, differenceInMilliseconds, addMilliseconds, format } from 'date-fns'
import { ConfigT, UsedActionsDictionary } from '../../../../types/action-config'

export const getRandomAction = (actions: ConfigT[]): ConfigT => {
  const randomIndex = Math.floor(Math.random() * actions.length)

  return actions[randomIndex]
}

const getTodayIsValidDay = (validDays: number[]): boolean => {
  const now = new Date()

  // 0 | 1 | 2 | 3 | 4 | 5 | 6
  // 0 represents Sunday
  const today = getDay(now)

  return validDays.includes(today)
}

const getRemainingCoolDown = (newAction: ConfigT, usedActions: UsedActionsDictionary): number => {
  const storedAction = usedActions[newAction.id]

  // The action has not been used yet so it has no cool-down time
  if (!storedAction) {
    return 0
  }

  const now = new Date()
  const { cool_down } = newAction
  const lastUsed = new Date(storedAction.lastUsed)

  const timeSinceLastUse = differenceInMilliseconds(lastUsed, now)

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

  return format(futureDate, 'MMM d, yyyy HH:mm')
}

export const getActionError = (newAction: ConfigT, usedActions: UsedActionsDictionary): string => {
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
