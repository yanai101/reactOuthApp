import * as React from 'react';
import Aux from '../../utils/Aux';
import Button from 'material-ui/Button';
import Modal from '../../component/UI/modal/Modal';
import BitModal from '../../component/bitModal/BiyModal';
import { BIT_CONFIG } from '../../config/bitConfig';

interface BiitProps {}

enum BitStatus {
  NULL,
  ACTIVE,
  STOP
}

export default class Biit extends React.Component<any, any> {
  
  bitConfig: any;

  constructor(props: any) {
    super(props);
    this.state = {
      modalOpen: false,
      selectedBit: '',
      bitStatus: BitStatus.ACTIVE,
      bitOptions: ['all', 'one', 'net', 'hardware'],
      bitMapOptions: [...BIT_CONFIG.ENV , ...BIT_CONFIG.NETWORK]
    };
    // this.setBItParms(BIT_CONFIG);
  }

  purchaseCancelHandler = () => {
    this.setState({ modalOpen: false });
  };

  bitHandler = () => {
    this.setState({ modalOpen: true });
  }

  handleChange = (type: any) => {
    this.setState({ selectedBit: type, bitStatus: BitStatus.ACTIVE });
  }

  render() {
    return (
      <Aux>
        <Button color="secondary" onClick={this.bitHandler}>
          Bit
        </Button>
        <Modal
          show={this.state.modalOpen}
          modalClosed={this.purchaseCancelHandler}
        >
          <BitModal
            selectedBit={this.state.selectedBit}
            bitMapOptions={this.state.bitMapOptions}
            handleChange={this.handleChange}
            bitStatus={this.state.bitStatus}
            cancel={this.purchaseCancelHandler}
          />
        </Modal>
      </Aux>
    );
  }
}
