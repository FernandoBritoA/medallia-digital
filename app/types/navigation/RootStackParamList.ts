import routes from '../../modules/routes'

export type RootStackParamList = {
  [routes.MainScreen]: undefined
  [routes.InformativeScreen]: { title: string; body: string }
}
