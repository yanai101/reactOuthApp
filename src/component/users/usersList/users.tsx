import * as React from 'react';
import {
    Link,
    Redirect
} from 'react-router-dom';

import Button from 'material-ui/Button';
import UserOuthService from '../../../services/userOuthService';
import UserAction from '../../../services/UserActionsService';
import { UserActions } from '../../../utils/enums/userEnum';

class Users extends React.Component<any, any> {
    constructor(props: any, {}: any) {
        super(props);
        this.state = {
            users: null,
            redirect: null
        };
    }

    componentDidMount() {
       this.getUsers();
    }

    getUsers = () => {
        UserOuthService.getAllUsers()
            .then(data => {
                this.setState((prev: any, props: any) => {
                    return {redirect: false, users: data};
                });
            })
            .catch(e => {
                this.setState((prev: any, props: any) => {
                    return {redirect: true};
                });
            });
    }

    userDeleteAlert = (id: string, name: string ) => {
        const answer = confirm(`Delete user ${name}`);
        if (answer) {
            this.deleteUser(id);
        }
    }

    deleteUser = ( userId: string ) => {
        UserOuthService.deleteUser(userId).then(
            (data: any) => {
                this.getUsers();
                UserAction.addUserAction({ action: UserActions.DELETE_USER });
            },
            (error: any) => {
               console.log('error with delete...');
            }
        ) ;
    }

    render() {
        const redirect = this.state.redirect ? <Redirect to="/actionsLog"/> : '';
        let usersList = null;
        if (this.state.users) {
            usersList = this.state.users.users.map((user: any) => {
                return (
                    <li key={user._id}>{user.username}
                            <Link to={`/users/${user._id}`}>
                                 <Button color="primary"> Edit</Button>
                            </Link>
                            <Button color="primary" onClick={(e) => this.userDeleteAlert(user._id , user.username)}> Delete User</Button>
                    </li>
                );
            });
        }

        return (
            <section>
                {redirect}
                <h1>users list</h1>
                <nav><Link to={`/users/new`}> <Button color="primary"> Add User</Button></Link></nav>
                <ul>
                    {usersList}
                </ul>
            </section>

        );
    }

}

export default Users;