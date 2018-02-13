import * as React from 'react';
import { withRouter } from 'react-router';
import UserOuthService from '../../../services/userOuthService';
import cls from './userForm.scss';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { FormControl  } from 'material-ui/Form';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import UserActionService from '../../../services/UserActionsService';
import { UserActions } from '../../../utils/enums/userEnum';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const names = [
    {type: 'ADMIN', label: 'Admin'},
    {type: 'VIEW', label: 'Viewer'},
    {type: 'ATTACK', label: 'Attacker'},
    {type: 'EXPLOR', label: 'Explorer'},
    {type: 'TECH', label: 'Technician'}
];

class UserForm extends React.Component<any, any> {
    constructor(props: any, {}: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            type: '',
            lastId: ''
        };
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState((pre: any, props: any) => {
                UserOuthService.getUserData(this.props.match.params.id)
                    .then(data => {
                        this.setState((prev: any, prop: any) => {
                            return {...data.user};
                        });
                    })
                    .catch(e => console.log(e));
            });
        }
    }

    handelSubmit = (e: any) => {
        e.preventDefault();
        let {username, password, type} = this.state;
        // todo: check form fields validations
        if (this.props.match.params.id) {
            UserOuthService.editUser(this.props.match.params.id, username, password, type)
                .then(data => {
                        //UserActionService.addUserAction({name: values.userName, action: 'Login'});
                        UserActionService.addUserAction({ action: UserActions.EDIT_USER })
                        this.props.history.replace('/users');
                    },
                    error => {
                        console.log('user not edited');
                    });
        } else {
            UserOuthService.addUser(username, password, type)
                .then(data => {
                        UserActionService.addUserAction({ action: UserActions.ADD_USER });
                        this.props.history.replace('/users');
                    },
                    error => {
                        console.log('user not added');
                    });
        }
        // this.props.form.validateFields((err: any, values: any) => {
        //   if (!err) {
        //   console.log('Received values of form: ', values);
        // }
        // });
    };

    handleChange = (type: string, e: any) => {
        const newValue = e.target.value;
        this.setState((prevState: any, props: any) => {
            return {[type]: newValue};
        });
        // setTimeout(()=>console.log(this.state) , 1000);
    };

    handleClickShowPasssword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    render() {
        return (
            <section>
                {this.state.user ? (
                    <span>
            {this.state.user.password} => {this.state.user.password}
          </span>
                ) : (
                    ''
                )}
                <section className={cls.userFormSection}>
                    <form onSubmit={this.handelSubmit} className={cls.userForm}>
                        <FormControl className={cls.userName}>
                            <InputLabel htmlFor="name-simple">Name</InputLabel>
                            <Input
                                id="name-simple"
                                value={this.state.username}
                                onChange={e => this.handleChange('username', e)}
                            />
                        </FormControl>

                        <FormControl className={cls.userPass}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                id="adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={e => this.handleChange('password', e)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPasssword}
                                            onMouseDown={this.handleClickShowPasssword}
                                        >
                                            {this.state.showPassword ? (
                                                <VisibilityOff/>
                                            ) : (
                                                <Visibility/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>

                        <FormControl className={cls.userType}>
                            <InputLabel htmlFor="name-multiple">User previliges</InputLabel>
                            <Select
                                value={this.state.type}
                                onChange={e => this.handleChange('type', e)}
                                input={<Input id="name-multiple"/>}
                                MenuProps={MenuProps}
                            >
                                {names.map(name => (
                                    <MenuItem key={name.type} value={name.type}>
                                        {' '} {name.label}{' '}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={cls.submitForm}>
                            <button>submit</button>
                            <Button onClick={this.handelSubmit} raised color="primary"> Submit </Button>
                            {/* {this.state.lastId ? (
                <Button
                  raised
                  color="secondary"
                  className="submitForm"
                  onClick={this.deleteUser(this.state.lastId)}
                >
                  {' '}
                  Delete user{' '}
                </Button>
              ) : null} */}
                        </div>
                    </form>
                </section>
            </section>
        );
    }
}

export default withRouter(UserForm);
