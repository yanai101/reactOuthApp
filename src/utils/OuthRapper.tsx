import * as React from 'react';
import {Component} from 'react';
import Aux from './Aux';
import {withRouter, Redirect} from 'react-router';
import axios from 'axios';
import cls from './outerRapper.scss';
import UserAction from '../services/UserActionsService';
import {UserActions} from '../utils/enums/userEnum';

class OuthRapper extends Component<any, any> {
    userToken: any = null;
    needLogin: boolean;
    locationKey: string;
    location: string;

    constructor(props: any) {
        super(props);
        this.state = {
            login: false,
            user: null
        };

        this.userToken = getToken();
        if (this.userToken) {
            this.setHeaders(this.userToken.tokenString);
        }
    }

    // call only once when component are is created
    componentDidMount() {
        this.locationKey = this.props.history.location.key;
        this.location = this.props.history.location.pathname;
        if (this.userToken) {
            this.needLogin = false;
            this.setState((pre: any, poros: any) => {
                // this.props.history.go('/actionsLog');
                return {login: true, user: this.userToken.userData};
            });
        } else {
            this.props.history.replace('/login');
        }
    }

    // call every time when child component are changes.
    componentWillUpdate() {
        const userToken = getToken();
        // doto: need to check user token validation
        if (userToken) {
            console.log('%c[OuthRapper:OuthRapper.js] setting heders', 'color:green');
            // for eny case...
            this.setHeaders(userToken.tokenString);
        } else {
            console.log('%c[OuthRapper:OuthRapper.js] remove heders', 'color:yellow');
            this.setHeaders('');
            this.setState((prev: any, props: any) => {
                return {login: false, user: ''};
            });
        }
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        let needUpdate = this.locationKey !== this.props.history.location.key &&
            this.location !== this.props.history.location.pathname;
        this.locationKey = this.props.history.location.key;
        this.location = this.props.history.location.pathname;
        return needUpdate;
    }

    setHeaders(token: string) {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
        // tslint:disable-next-line:no-string-literal
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        axios.interceptors.request.use(
            req => {
                // console.log(req);
                return req;
            },
            error => {
                // console.log('req error app :', error);
            }
        );

        // Add a response interceptor
        axios.interceptors.response.use( (response) =>  {
            // Do something with response data
            console.log(`response`,response)
            return response;
        },  (error) => {
            if (error.response.status === 401) {
                UserAction.addUserAction({action: UserActions.LOGOUT});
                this.setState({isLogin: false});
                localStorage.removeItem('userToken');
                this.props.history.replace('/login');
            }
            // Do something with response error
            return Promise.reject(error);
        });

    }

    public render() {
        return <Aux>{this.props.children}</Aux>;
    }
}

class AccsessLevel extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            userAccsess: null
        };
    }

    componentWillMount() {
        this.setToken();
    }

    componentWillUpdate() {
        console.log('%c[AccsessLevel:OuthRapper.js] Update user accsess', 'color:pink');
        this.setToken();
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !!this.state.userAccsess !== !!getToken();
    }

    setToken() {
        const userToken = getToken();
        if (userToken) {
            this.setState((prev: any, props: any) => {
                return {userAccsess: userToken.userData};
            });
        } else {
            this.setState((prev: any, props: any) => {
                return {userAccsess: ''};
            });
        }
    }

    render() {
        // let display = <Aux> defulat alloed</Aux> ;
        const display =
            this.props.levels &&
            this.state.userAccsess &&
            this.props.levels.includes(this.state.userAccsess.usertype) ? (
                <Aux>  {this.props.children}</Aux>
            ) : null;

        return <Aux>{display}</Aux>;
    }
}

/// reander props
interface IsLoginProps {
    login?: any;
    logout?: any;
    logoutAction?: boolean;
    showDisable?: boolean;
}

class IsLogin extends Component<IsLoginProps, any> {
    state = {
        isLogin: false
    };

    constructor(props: any) {
        super(props);
    }

    componentWillMount() {
        this.setToken();
    }

    componentWillUpdate() {
        console.log('%c[IsLogin:OuthRapper.js] update login status', 'color:#1cf441');
        this.setToken();
    }

    shouldComponentUpdate(nextProps: any, nextState: any) {
        // xor statment ...
        let result = this.state.isLogin !== !!getToken();
        return result;
    }

    setToken() {
        const userToken = getToken();
        if (userToken) {
            this.setState((prev: any, props: any) => {
                return {isLogin: true};
            });
        } else {
            this.setState((prev: any, props: any) => {
                return {isLogin: false};
            });
        }
    }

    handleClick = () => {
        if (this.state.isLogin && this.props.logoutAction) {
            UserAction.addUserAction({action: UserActions.LOGOUT});
            this.setState({isLogin: false});
            localStorage.removeItem('userToken');
        }
    };

    render() {
        const display = this.state.isLogin ? this.props.login() :
            (this.props.logout ? this.props.logout() : this.props.showDisable ?
                (<span className={cls.disable}>{this.props.login()}</span>) : null);
        return (
            <span onClick={this.handleClick}>
            {display}
        </span>
        );
    }
}

/// general functions
const getToken = () => {
    const token: string = localStorage.getItem('userToken');
    return token ? {userData: parseJwt(token), tokenString: token} : null;
};

const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

const getCurrentUser = (): any => {
    const user = getToken();
    return user ? user : null;
};

const OuthRapperComponent = withRouter(OuthRapper);

export {OuthRapperComponent, AccsessLevel, IsLogin, getCurrentUser};
