module.exports = {
    root: true,
    env: {
        node: true
    },
    globals: { gapi: true },
    extends: ['plugin:vue/essential', '@vue/prettier'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'linebreak-style': ['error', 'unix'],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'never'],
        'no-multi-spaces': ['error', { exceptions: { Property: false } }],
        'key-spacing': ['error'],
        'no-multiple-empty-lines': 'error',
        'space-in-parens': ['error', 'never'],
        quotes: ['error', 'single']
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
};
