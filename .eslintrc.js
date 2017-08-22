module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "browser": true,
        "amd": true,
        "es6": true
    },
    "globals": {
        "describe": true,
        "it": true,
        "beforeEach": true,
        "afterEach": true
    },
    "rules": {
        'no-lonely-if': 0,
        "class-methods-use-this": 0,
        "no-mixed-operators": 0,
        "no-continue": 0,
        "no-else-return": 0,
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
