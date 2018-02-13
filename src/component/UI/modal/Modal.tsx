import * as React from 'react';
import { Component } from 'react';

import Aux from '../../../utils/Aux';
import Backdrop from '../backdrop/backdrop';
import cls from './modal.scss';

class Modal extends React.Component<any, any> {
  constructor(props: any, {  }: any) {
    super(props);
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  componentWillUpdate() {
    console.log('[Modal] WillUpdate');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className={cls.Modal}
          style={{
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? 1 : 0
          }}
        > 
            <div>{this.props.children} </div>  
        </div>
      </Aux>
    );
  }
}

export default Modal;
