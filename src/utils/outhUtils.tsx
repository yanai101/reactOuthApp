import * as React from 'react';
import { Component } from 'react';

const outhHandler = (WrappedComponent: any, axios: any) => {
  return class extends Component {
    render() {
        return <WrappedComponent {...this.props} />;
    }
  };
};

export default outhHandler;
