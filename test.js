import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import createComponent from "./index";

Enzyme.configure({ adapter: new Adapter() });

describe("lifecycle", () => {
  const lifecycleMethods = {
    getInitialState: jest.fn(),
    componentWillMount: jest.fn(),
    componentDidMount: jest.fn(),
    componentDidUpdate: jest.fn(),
    componentWillUnmount: jest.fn(),
    render: jest.fn().mockReturnValue(null)
  };

  const Foo = createComponent(lifecycleMethods);

  const wrapper = mount(<Foo />);

  describe("mount", () => {
    describe("getInitialState", () => {
      it("should be called", () => {
        expect(lifecycleMethods.getInitialState).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentWillMount", () => {
      it("should be called", () => {
        expect(lifecycleMethods.componentWillMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidMount", () => {
      it("should be called", () => {
        expect(lifecycleMethods.componentDidMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidUpdate", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentDidUpdate).toHaveBeenCalledTimes(0);
      });
    });

    describe("componentWillUnmount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentWillUnmount).toHaveBeenCalledTimes(0);
      });
    });
  });

  describe("update", () => {
    describe("getInitialState", () => {
      it("should not be called", () => {
        wrapper.setProps({ bar: "foo" });
        expect(lifecycleMethods.getInitialState).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentWillMount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentWillMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidMount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentDidMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidUpdate", () => {
      it("should be called", () => {
        expect(lifecycleMethods.componentDidUpdate).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentWillUnmount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentWillUnmount).toHaveBeenCalledTimes(0);
      });
    });

    it("should call componentDidUpdate", () => {});
  });

  describe("unmount", () => {
    describe("getInitialState", () => {
      it("should not be called", () => {
        wrapper.unmount();
        expect(lifecycleMethods.getInitialState).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentWillMount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentWillMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidMount", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentDidMount).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentDidUpdate", () => {
      it("should not be called", () => {
        expect(lifecycleMethods.componentDidUpdate).toHaveBeenCalledTimes(1);
      });
    });

    describe("componentWillUnmount", () => {
      it("should be called", () => {
        expect(lifecycleMethods.componentWillUnmount).toHaveBeenCalledTimes(1);
      });
    });
  });
});
