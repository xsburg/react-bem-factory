module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true
    },
    "globals": {
        "jest": true,
        "describe": true,
        "it": true,
        "expect": true,
        "beforeEach": true,
        "beforeAll": true,
        "afterEach": true,
        "afterAll": true
    },
    "rules": {
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForOfStatement',
                message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        "no-extra-semi": 0,
        "quote-props": 0,
        "no-prototype-builtins": 0,
        "arrow-parens": 0,
        "prefer-rest-params": 0,
        "no-param-reassign": 0,
        "no-underscore-dangle": ["error", { "allowAfterThis": true, "allowAfterSuper": true }],
        "linebreak-style": "off",
        "no-return-assign": 0,
        "indent": [2, 4, { "SwitchCase": 0, "VariableDeclarator": 1 }],
        "prefer-arrow-callback": 0,
        "comma-dangle": 0,
        "func-names": 0,
        "spaced-comment": 0,
        "prefer-const": 0,
        "space-before-function-paren": 0,
        "array-bracket-spacing": 0,
        "object-curly-spacing": 0,
        "strict": 0,
        "arrow-body-style": 0,
        "object-shorthand": 0,
        "no-useless-constructor": 0,
        "no-trailing-spaces": 0,
        "no-unused-vars": 0,
        "max-len": [2, 160, 4, {
            "ignoreUrls": true,
            "ignoreComments": false
        }]
    }
};
