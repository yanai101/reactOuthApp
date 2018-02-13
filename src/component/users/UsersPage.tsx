import * as React from 'react';
import {
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom';
import Users from './usersList/users';
import UsersForm from './userForm/UserForm';

const UsersPage = () => { 
    return (
    <section> 
        <Switch>
          <Route path="/users/new"  component={UsersForm}/>
          <Route path="/users/:id" component={UsersForm}/>
          <Route path="/users" component={Users}/>
        </Switch>
    </section>
    );
  }

export default UsersPage;  