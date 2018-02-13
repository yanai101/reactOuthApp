import * as React from 'react';
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom';
import UsersPage from './component/users/UsersPage';
import UsersActions from './conteners/userActionList/UserList';
import Login from './conteners/login/Login';
import UserDetails from './component/userDetails/UserDetails';
import { AccsessLevel , OuthRapperComponent , IsLogin } from './utils/OuthRapper';

import cls from './app.scss';
import Bit from './conteners/bit/Bit';
import { UserEnum } from './utils/enums/userEnum';

// const UsersActions = () => import( /* webpackChunkName: "below-fold" */ './conteners/userActionList/UserList');

// definition for props and state...
export class App extends React.Component<Iprop, {}> {

  render() {
    return (
      <BrowserRouter basename="/">
        <main className={cls.App}>
        <OuthRapperComponent>
          <div className={cls.AppHader}>
            <nav>
              <ul className={cls.Nav}>
                <li>
                  <IsLogin
                      logoutAction={true}
                      login={() => (<NavLink to="/login">LogOut</NavLink>)}
                      logout={() => (<NavLink to="/login">Login</NavLink>)}
                  />
                </li>
                <li>
                <IsLogin
                      login={() => (<NavLink to="/actionsLog">User History</NavLink>)}
                />
                </li>
                <AccsessLevel levels={[UserEnum.ADMIN]}>
                  <li>
                    <NavLink to="/users">Users <span>list</span></NavLink>
                  </li>
                  </AccsessLevel>
                  <AccsessLevel levels={[UserEnum.ADMIN , UserEnum.ATTACK]}>
                  <li className={cls.noPedding}>
                    <Bit/>
                  </li>
                  </AccsessLevel>
              </ul>
            </nav>
          </div>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/actionsLog/:id" component={UserDetails} />
            <Route path="/actionsLog" component={UsersActions} />
            <Route path="/users" component={UsersPage} />
            <Route path="/" component={Login} />
            <Route path="**"  component={Login}/>
            <Route component={Login} />>
          </Switch>
          </OuthRapperComponent>
        </main>
      </BrowserRouter>
    );
  }
}

interface Iprop {}