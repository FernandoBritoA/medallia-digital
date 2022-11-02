export type ActionT = {
  id: string
  type: 'screen' | 'alert' | 'alertSheet'
  enabled: boolean
  text: string
  body: string
  priority: number
  valid_days: number[]
  cool_down: number
}

export type ConfigT = {
  configurationUUID: {
    url: string
    uuid: string
  }
  actions: ActionT[]
}

export type ConfigNumber = 1 | 2
export type AvailableConfigs = Record<ConfigNumber, ConfigT> | {}

export type UsedAction = {
  id: string
  lastUsed: Date
}

export type UsedActionsDictionary = Record<string, UsedAction>
