import * as React from 'react';
import { withRouter } from 'react-router';
import UserActionsService from '../../services/UserActionsService';

class UserDetails extends React.Component<any, any> {
  constructor(props: any, {}: any) {
    super(props);
    this.state = {
      user: null,
      open: false,
      error: null
     };
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }
  
  componentDidMount() {
     UserActionsService.getUserAction(this.props.match.params.id)
     .then(data => {
       this.setState((prev: any, prop: any) => {
         return {user: data};
       });
     }).catch(e => {
       this.setState((pre: any , prop: any ) => {return {error: e.message }; } );
     });
  }

  render() {
    return(
      <section>
        {
          this.state.user ? 
           <ul>
             <li>user name : {this.state.user.name}</li>
             <li>user action : {this.state.user.action}</li>
             <li>Action time: {this.state.user.createdAt}</li>
           </ul> 
          : this.state.error ? <span><strong>{this.state.error}</strong></span> : <span>Loading...</span> 
        }
      
      </section>
    ); 
  }
}

export default withRouter(UserDetails);
