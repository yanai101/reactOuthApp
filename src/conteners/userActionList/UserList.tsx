import * as React from 'react';
import UserActionsService from '../../services/UserActionsService';
import { UserActions } from '../../utils/enums/userEnum';
import { Link } from 'react-router-dom';
import Button from 'material-ui/Button';
import './userList.scss';

const style = {
    margin: 12,
};

class UsersActions extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userActions: []
        };
    }

    componentDidMount() {
       this.getUserActions();
    }

    getUserActions(){
        UserActionsService.getUsersActions().then(data => {
            this.setState(
                {userActions: data.UsersActions}
            );

        });
    }

     allLogDeleteAlert = ( id?: string) => {
        const answer = id ? confirm(`Delete log ???`) : confirm(`Delete all log ???`);
        if (answer) {
            this.deleteLogs(id);
        }
    }

    deleteLogs( id?: string) {
        UserActionsService.deleteUserActions(id).
            then(
            data => {
                this.getUserActions();
                id ? UserActionsService.addUserAction( { action : UserActions.DELETE_ACTION }) :
                    UserActionsService.addUserAction( { action : UserActions.DELETE_ALL_ACTIONS } );
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        let actions = <span>Loading...</span>;
        if (this.state.userActions) {
            actions = this.state.userActions.map((action: any, index: number) => {
                return (
                    <li key={index} className="user-details">
                        {action.name} - {action.action}
                        <Link to={`/actionsLog/${action._id}`}> <Button color="primary">User Details</Button></Link>
                        <Button color="primary" onClick={e => this.allLogDeleteAlert(action._id)}>Delete Action</Button>
                    </li>);
            });
        }

        return (
            <div>
                <h1> Users Action List</h1>
                <nav>
                    <Button color="primary" onClick={e => this.allLogDeleteAlert()}>Delete All log</Button>
                </nav>
                <ul>
                    {actions}
                </ul>
            </div>
        );
    }
}

export default UsersActions;
