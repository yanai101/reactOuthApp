import * as React from 'react';
import cls from './bitModal.scss';
import Button from 'material-ui/Button';
import NotInterested from 'material-ui-icons/NotInterested';
import Aux from '../../utils/Aux';
import { Checkbox , Row , Col } from 'antd';
import { defaultBit } from '../../config/bitConfig';

const CheckboxGroup = Checkbox.Group;

enum BitStatus {
    NULL, ACTIVE, STOP
  }

interface BitProps {
  selectedBit: string;
  handleChange: any;
  bitStatus: BitStatus;
  cancel: any;
  bitMapOptions: [any] ;
}

class BitModal extends React.Component<BitProps, any> { 
  state = {
    bitList : defaultBit,
    bitStatus: this.props.bitStatus,
    bitMapOptions: this.props.bitMapOptions
  };

  constructor(props: BitProps) {
    super(props);
  }
  
  bitActions = () => {
    if (this.state.bitStatus === BitStatus.ACTIVE) {
      console.log('send bit start...');
      this.state.bitMapOptions.map(item => item['tempDisabled'] = true);
      this.setState({ bitStatus: BitStatus.STOP , bitMapOptions: this.state.bitMapOptions });
    }
    if (this.state.bitStatus === BitStatus.STOP) {
      this.state.bitMapOptions.map(item => item['tempDisabled'] = false);
      this.setState({ bitStatus: BitStatus.ACTIVE, bitMapOptions: this.state.bitMapOptions});
      console.log('stopping...');
    }
  }

  handleChange = (event: any) => {
    this.props.handleChange(event.target.value);
  }

  checkBoxClick = (checkedValues: any) => {
    this.setState({bitList : checkedValues});
  }

  disableOptions = (index: number ) => {
   let options = this.state.bitMapOptions;
   options.map((item, i) => {
    if ( i === index) {
      item = Object.assign(item, {disabled: true});
    }
   });

   this.setState((prev: any , props: any) => {return {bitMapOptions : options}; });
  }

  render() {
    return (
      <div className={cls.BitMoadal}>
        <h2> 
            Bit
            <Button fab onClick={this.props.cancel} raised className={cls.cancelBtn} >
              <NotInterested/>
          </Button>
        </h2>
        <Button  onClick={(e) => { this.disableOptions(0); }}> Disable</Button>
        <Checkbox.Group onChange={this.checkBoxClick}>
        <Row className={cls.cols}>
          {
             this.props.bitMapOptions.map((item: any) => {
              return <Col span={8} key={item.value}>
                  <Checkbox disabled={item.disabled || item.tempDisabled}  value={`${item.value}`}>{`${item.label}`}</Checkbox>
              </Col>;
             }
             
            )
          }
        </Row>  
      </Checkbox.Group>
          <section>
          <Button 
                  onClick={this.bitActions} 
                  raised 
                  color="secondary" 
                  disabled={this.state.bitList.length === 0} 
                  className={cls.button}
          >
            {this.state.bitStatus === BitStatus.ACTIVE ? 'Start bit' : 'Stop bit'} 
          </Button>
        </section>
      </div>
    );
  }
 
}

export default BitModal;
