import { useState, useLayoutEffect } from "react";

import { noop, previous, once } from "./helpers";

const createComponent = methods => {
  const instance = {
    getInitialState: noop,
    componentWillMount: noop,
    componentDidMount: noop,
    componentDidUpdate: noop,
    componentWillUnmount: noop,
    componentDidCatch: noop,
    shouldComponentUpdate: noop,
    ...methods
  };

  Object.keys(instance).forEach(
    method => (instance[method] = instance[method].bind(instance))
  );

  const componentWillMount = once(instance.componentWillMount);
  const getInitialState = once(instance.getInitialState);
  const cache = previous();

  const plainComponent = props => {
    instance.props = props;
    componentWillMount();

    try {
      const [state, setState] = useState(getInitialState());

      instance.state = state;
      instance.setState = (newState, callback = noop) => {
        setState({ ...state, ...newState });
        callback({ ...state });
      };

      useLayoutEffect(() => {
        instance.componentDidMount();
        return instance.componentWillUnmount;
      }, []);

      useLayoutEffect(() => {
        const args = cache({ props, state });
        if (args) {
          const { props: prevProps, state: prevState } = args;
          instance.componentDidUpdate(prevProps, prevState);
        }
      });

      return instance.render();
    } catch (error) {
      instance.componentDidCatch(error);
    }
  };

  return plainComponent;

  // TODO:
  // https://github.com/airbnb/enzyme/issues/1875
  // return memo(plainComponent, instance.shouldComponentUpdate);
};

export default createComponent;
