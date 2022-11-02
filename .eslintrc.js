module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    semi: 'off',
    'comma-dangle': ['error', 'never'],
    'jsx-quotes': ['warn', 'prefer-single'],
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-void': ['error', { allowAsStatement: true }]
  }
}
