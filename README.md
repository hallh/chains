# Chains

This library will allow you to use async control flow in a middleware style similar to express.

Basically it will look like this:

```javascript
import Chains from 'c4s';

Chains({ foo: 'bar' })
    .then((state, next) => {
        console.log(state.foo); // Output: bar

        state.new_value = 'Sweet';
        next();
    })
    .then((state, next) => {
        console.log(state.new_value, state.foo); // Output: Sweet bar

        next(new Error('Oh Noes'));
    })
    .then((state, next) => {
        // This is skipped because of the next(new Error())
    })
    .catch((error, state) => {
        console.log(error); // Oh Noes
        console.log(state); // { foo: 'bar', new_value: 'Sweet' }
    });
```

Unhandled and thrown errors are also passed to the catch handler. If you do not specify a catch handler, your code may fail silently.
