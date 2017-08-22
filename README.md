# react-bem-factory [![Build Status][ci-img]][ci]

This handy library provides helpers to style your React components using [BEM](https://en.bem.info/methodology/quick-start/) notation with **no pain**.

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

It's a real-world example that shows a complicated mixture of conditional modifiers, external mixin classes and BEM hierarchy. It could have been a nightmare without proper helpers. Just as a reminder, look at this snippet:

```javascript
<div className={`ui-checkbox ${checked ? 'ui-checkbox--checked' : ''} ${triState ? 'ui-checkbox--tri-state' : ''} ${disabled ? 'ui-checkbox--disabled' : ''} ${className ? className : ''}`}>
    <div className={`ui-checkbox__mark ${checked ? 'ui-checkbox__mark--checked' : ''}`} />
</div>);
```

Of course, having written the code like this you might come up with an idea to write a helper. And that's basically what this library does. Below you will find futher explanation on how to use it in even more complex scenarios. For comparison with other alternatives and more info on the design principles please read the next section.

## Why?

The main idea behind this library is to create a simple but powerful approach to styling React components that wouldn't overly complicate things.

There are basically three popular ways to style React components these days:

1. CSS Modules
2. Inline styles
3. BEM styling

They all work and choosing between them is a matter of personal preference.

First of all, this library assumes that you don't want to write your styles in JavaScript or deal with generated class names that CSS Modules provide. In fact, the main idea of this library is that using BEM notation combined with a little bit of discipline is just as good in terms of beating global nature of CSS and even better.

You define the block name only twice: in your styles and in JavaScript. Then, you take advantage of the preprocessor to create clean and maintainable CSS and use this library to declare class names in code.

There are other libraries that may help you with BEM and you might want to consider using them instead. But here are the main points in favour of this one:

1. Clean and simple API without introducing new JSX attributes
2. ESLint-friendly code (to implicit object->string conversions that ESLint and other checkers consider a mistake)
3. Catching common mistakes while running in debug mode
4. Typescript typings
5. Good test coverage

To sum up, if you prefer to write predictable and maintainable code by sometimes restricting yourself in syntax, you might want to try this library.

## Getting Started

The library can be downloaded from npm.

```
npm install react-bem-factory
```

After that, import the factory, create the builder function by calling `bemFactory.block(<block name>)` and use it in the render method or anywhere in the component:

**UserList.jsx**
```javascript
import bemFactory from 'react-bem-factory';

const bem = bemFactory.block('form-user-list');

class UserList extends React.Component {
    // ...

    render () {
        const { users, children } = this.props;
    
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

Of cource there is the problem of shared CSS namespace, which however can be easily fixed by adding namespace prefixes. For example, common ui components like `Button`, `Icon` or `LoadingBar` are likely to be located within the same `ui` directory and could share the block prefix `ui-`. On a bigger scale, while developing a user management module of your application you can isolate all related component into `user-mgt-` prefix and so on. Keep in mind that prefixes are not necessarily to be short: you only have to type them twice (once in `bemFactory.block` and once in your SCSS/Less/Stylus file) and don't worry about the bundle size: gzip will take care of it.

Moving on to the CSS, add a new SCSS (or Less etc.) file next to the component and describe the styling using the benefits of your favorite preprocessor:

**UserList.scss**
```SCSS
// using form- as a namespace prefix
.form-user-list {
    display: flex;
    flex-flow: column;

    // you can easily copy snippets from other components here since the block name is only at the top
    &__header {
    }
    
    &__counter {
        @include u-text-ellipsis(); // your favorite mixins will help you reduce the code size
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

In most cases, you will only need to use the default import, which is the bemFactory.

```javascript
import bemFactory from 'react-bem-factory';
```

### `bemFactory.block(blockName: string): ElementFactory`

The method takes the `blockName` and returns the builder function that you can use to create elements of the same block.

The interface if the builder function is defined like this:

```typescript
interface ElementFactory {
    (elementName?: string|null, ...modifiers: Modifier[]): string;
    themed: (theme: string) => ElementFactory;
    add: (...classNames: Array<string | undefined>) => ElementFactory;
}
```

The builder function uses method chaining to add mixin classes and the theme modifier (if necessarily) and produces the resulting class name string when called.

Example:

```javascript
const bem = bemFactory.block('blockName');

// block itself
bem(); // returns 'blockName'
bem(null); // returns 'blockName'
bem(null, 'modifier1'); // returns 'blockName blockName--modifier1'
bem(null, { modifier1: true }); // returns 'blockName blockName--modifier1'

// block elements
bem('elementName'); // returns 'blockName__elementName'
bem('elementName', 'modifier1'); // returns 'blockName__elementName blockName__elementName--modifier1'
bem('elementName', { modifier1: true }); // returns 'blockName__elementName blockName__elementName--modifier1'

// mixing external class name
bem.add('someClass')(); // returns 'someClass blockName'
bem.add('someClass')('elementName'); // returns 'someClass blockName__elementName'
```

#### Applying themes to the component

Sometimes there is the need to theme a component. For example, while designing a generic Button component you might want to ship it in different colors. Using `ElementFactory.themed(themeName)` is an explicit way to show this intent.

There are several ways to theme a component according to BEM. We could use a modifier for that just as we use state modifiers:

```SCSS
.button {
    &--disabled {
    }
    
    &__icon {
    }
    
    &--disabled &__icon {
    }
}

.button--t-green {
    &--disabled {
    }
    
    &__icon {
    }
    
    &--disabled &__icon {
    }
}
```

The approach suggested by `ElementFactory.themed(themeName)` is a shortcut for that. There is, however, a small difference: in order to cut down the computation cost and reduce the complexity it leaves only the second (themed) part of the classes. So basically, the following code produces the same:

```javascript
const bem1 = bemFactory.block('button').themed('green'); // bem1() will return 'button--t-green'
const bem2 = bemFactory.block('button--t-green'); // bem2() will return 'button--t-green'
```

## IDE Support




