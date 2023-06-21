module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    es6: true
  },
  globals: {
    withDefaults: 'readonly',
    defineEmits: 'readonly',
    defineProps: 'readonly',
  },
  extends: [
    'plugin:vue/vue3-essential',
    "plugin:@typescript-eslint/recommended",
    'plugin:import/recommended',
    'airbnb-base',
    'plugin:prettier/recommended' // 添加 prettier 插件
  ],
  // other configuration are omitted for brevity
  settings: {
    "import/resolver": {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  "parser": "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
  },

  plugins: [
    'vue',
    '@typescript-eslint',
    'prettier',
    'import'
  ],

  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        'no-undef': 'off',
        "parser": "vue-eslint-parser"
      },
    },
  ],

  rules: {
    // "import/no-extraneous-dependencies": ["error", {"devDependencies": true}], /** 不检查模块引入 */
    'consistent-return': 'off',
    "import/no-commonjs": "off",
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true
      }
    ],
    'import/prefer-default-export': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',

    'import/no-named-as-default': 0,

    'no-unused-expressions': 'off',

    // js/ts
    // 'no-console': ['warn', { allow: ['error'] }],
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    // camelcase: ['error', { properties: 'never' }],
    'no-param-reassign': 'off',
    'no-var': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-void': 'error',
    'prefer-const': ['warn', { destructuring: 'all', ignoreReadBeforeAssign: true }],
    'prefer-template': 'error',
    'object-shorthand': ['error', 'always', { ignoreConstructors: false, avoidQuotes: true }],
    'block-scoped-var': 'error',
    'no-constant-condition': ['error', { checkLoops: false }],

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    // '@typescript-eslint/consistent-type-imports': ['error', { disallowTypeAnnotations: false }],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'no-nested-ternary': 'off',
    'no-underscore-dangle': 'off',
    'no-shadow': 'off',
    'camelcase': 0,
    'guard-for-in': 'off',

    // vue
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/multi-word-component-names': 'off', // 0

    // prettier
    'prettier/prettier': 'error',

    // import
    'import/no-self-import': 'off',
    'import/first': 'error',
    'import/no-duplicates': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],

        pathGroups: [
          {
            pattern: 'vue',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@vue/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'ant-design-vue',
            group: 'internal',
          },
        ],
        pathGroupsExcludedImportTypes: ['type'],
      },
    ],
  },
};
