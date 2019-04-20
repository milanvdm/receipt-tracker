module.exports = {
    parser:  '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    extends: [
        'prettier/react', 
        'prettier/@typescript-eslint',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended'
    ],
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
