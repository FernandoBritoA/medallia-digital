export type ConfigT = {
  id: string
  type: 'screen' | 'alert' | 'alertSheet'
  enabled: boolean
  text: string
  body: string
  priority: number
  valid_days: number[]
  cool_down: number
}

export type MobileData = {
  configurationUUID: {
    url: string
    uuid: string
  }
  actions: ConfigT[]
}

export type UsedAction = {
  id: string
  lastUsed: Date
}

export type UsedActionsDictionary = Record<string, UsedAction>
