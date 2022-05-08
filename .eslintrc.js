const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
  env: {
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  //eslint 每次指定一个parser,所以对于vue文件需要额外指定parser
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser'
      },
      extends: ['plugin:vue/vue3-recommended']
    }
  ]
})