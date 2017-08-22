# react-bem-factory [![Build Status][ci-img]][ci]

This handy library provides a few helpers to style your React components using [BEM](https://en.bem.info/methodology/quick-start/) notation with **no pain**.

The key approach of this library is to keep things simple. It doesn't tamper with Component's contexts, neither it gets into the building process. Instead, the idea is to use a CSS preprocessor to simplify the CSS and then use a set of JavaScript helpers to deal with BEM in code. And surprisingly, the amount of boilerplate code is minimal while the flexibility is immense.

[repoUrl]: https://github.com/xsburg/react-bem-factory
[ci-img]: https://travis-ci.org/xsburg/react-bem-factory.svg
[ci]: https://travis-ci.org/xsburg/react-bem-factory

Consider the example:

**Checkbox.jsx**
```javascript
const bem = bemFactory.block('ui-checkbox');
function Checkbox ({ checked, triState, className, disabled }) {
    return (
        <div className={bem.add(className)(null, { checked, disabled, 'tri-state': triState })}>
            <div className={bem('mark', { checked })} />
        </div>);
};
```
**Checkbox.scss**
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

You can see a complicated mixture of conditional modifiers, external mixin classes and BEM hierarchy. It could have been a nightmare without proper helpers. Just as a reminder, look at this snippet:

```javascript
<div className={`ui-checkbox ${checked ? 'ui-checkbox--checked' : ''} ${triState ? 'ui-checkbox--tri-state' : ''} ${disabled ? 'ui-checkbox--disabled' : ''} ${className ? className : ''}`}>
    <div className={`ui-checkbox__mark ${checked ? 'ui-checkbox__mark--checked' : ''}`} />
</div>);
```

Of course, having written the code like this you might come up with an idea to write a helper. And that's basically what this library is for. Below you will find futher explanation on how to use it in even more complex scenarios. For comparison with other alternatives and elaboration on design principles please refer to the [Why](#why) section.

## Why?

## Getting Started

The library can be downloaded from npm.

```
npm install react-bem-factory
```

After that, import the factory, create the builder function by calling `bemFactory.block(<block name>)` and use it in the render method and anywhere in the component:

```javascript
import bemFactory from 'react-bem-factory';

const bem = bemFactory.block('form-user-list');

class UserList extends React.Component {
    // ...

    render () {
        const { users } = this.props;
    
        return (
            <div className={bem()}>
                <div className={bem('header')}>
                    <div className={bem('counter', { empty: user.length === 0 })}>{users.length}<div/>
                </div>
                <div className={bem('body')}>
                {children}
                </div>
            </div>);
    }
}
```

Using this factory you are not restricted to creating only one builder per component, but it is recommended to follow the rule `1 block = 1 component` to enforce the component abstraction.

Following this approach you may find it difficult to maintain unique block names. To remedy the problem, consider adding namespace prefixes. For example, common ui components like `Button`, `Icon` or `LoadingBar` are likely to be located within the same `ui` directory and could share the block prefix `ui-`; developing a user management module of your application you can isolate all related component into `user-mgt-` prefix etc. Keep in mind that prefixes are not necessarily to be short: you only have to type them twice (once in `bemFactory.block` and once in your SCSS/Less/Stylus) and gzip will take care of the bundle size (repetitive blocks are compressed really well!).

Moving on to the CSS, add a new SCSS (or Less etc) file next to the component and describe the component using the benefits of your favorite preprocessor:

```SCSS
.form-user-list {
    display: flex;
    flex-flow: column;

    &__header {
    }
    
    &__counter {
        @include u-text-ellipsis(); // you favorite mixins will help you reduce the code size
        color: green;
            
        &--empty {
            color: red;
        }
    }
    
    &__body {
    }
}
```

Note, that we only used the block name once and it includes the namespace prefix `form-` to ensure uniqueness. Apart from that, we can use mixins with a variety of helpers to make our life even easier.

## API

## IDE Support




