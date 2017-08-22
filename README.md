# react-bem-factory [![Build Status][ci-img]][ci]

[repoUrl]: https://github.com/xsburg/react-bem-factory
[ci-img]: https://travis-ci.org/xsburg/react-bem-factory.svg
[ci]: https://travis-ci.org/xsburg/react-bem-factory

This handy library provides a few helpers to style your React components using BEM notation with **no pain**.

The key approach of this library is to keep things simple. It doesn't tamper with Component's contexts, neither it gets into the building process. Instead, the idea is to use a CSS preprocessor to simplify the CSS and then use a set of JavaScript helpers to deal with BEM in code. And surprisingly, the amount of boilerplate code is minimal while the flexibility is immense.

Consider the example:

```javascript
const bem = bemFactory.block('ui-checkbox');
function Checkbox ({ checked, triState, className, disabled }) {
    return (
        <div className={bem.add(className)(null, { checked, 'tri-state': triState, disabled })}>
            <div className={bem('mark', { checked })} />
        </div>);
};
```

```SCSS

.ui-checkbox {
    /* ... */

    &--disabled {
    }
    &--checked {
    }
    &--tri-state {
    }

    &__mark {
        /* ... */
    }
}
```
