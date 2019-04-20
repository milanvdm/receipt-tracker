module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier/react',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:react/recommended'
    ],
    plugins: ['@typescript-eslint', 'react'],
    settings: {
      react: {
        version: 'detect'
      }
    },
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
        ecmaFeatures:  {
          jsx:  true
        },
    }
  };
