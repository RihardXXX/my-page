module.exports = {
  extends: [
    'semistandard',
    'plugin:vue/vue3-recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  rules: {
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'default', 'admin', 'login']
    }],
    'import/no-named-as-default': 0
    // '@typescript-eslint/ban-ts-ignore': 'off'
  }
}
