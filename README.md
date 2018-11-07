## react-hook-component

With the [React hooks](https://reactjs.org/docs/hooks-intro.html) the `React.Component` will be deprecated soon ⚰️.
Not only this new hook all-functional API is disgusting 🤢, it also forces us to rewrite our apps, which takes greater than zero hours 💰. This project allows you to write your react components in the old-fasioned way, as you love ❤️ and are used to do. No need to learn new react, which will be deprecated in a year anyway.

## Example

```js
import React from "react";
import createComponent from "react-hook-component";

// Our component definition looks like in the good old days 🤩
const Counter = createComponent({
  getInitialState() {
    return {
      count: 0
    };
  },

  handleIncrement() {
    this.setState({
      count: this.state.count + 1
    });
  },

  handleDecrement() {
    this.setState({
      count: this.state.count - 1
    });
  },

  render() {
    const { count } = this.state;

    return (
      <div>
        <span>{count}</span>
        <button>+</button>
        <button>-</button>
      </div>
    );
  }
});
```

## Tests

See `test.js`

## TODO

- [] - implement getDefaultProps
- [] - implement forceUpdate
- [] - tests for state, props
- [] - test shouldComponentUpdate when enzyme ready

Feel free to open PR if you want to help!
