import * as React from 'react';
import { Redirect } from 'react-router';
import { Form, Icon, Input, Button } from 'antd';
import UserOuthService from '../../services/userOuthService';
import UserActionService from  '../../services/UserActionsService';
import { UserActions } from '../../utils/enums/userEnum';

const FormItem = Form.Item;
import cls from './login.scss';

class Login extends React.Component<any, any> {
  constructor(props: any, {  }: any) {
    super(props);
    this.state = {
      login: false,
      error: false
    };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err: Error, values: any) => {
      if (!err) {
        // tslint:disable-next-line:no-console
        console.log('Received values of form: ', values);
        UserOuthService.userLogin(values.userName, values.password)
          .then(
          data => {
            this.setState({error: false}) ;
            if (data.token) {
              localStorage.setItem('userToken', data.token);
              UserActionService.addUserAction({action: UserActions.LOGIN});
                    // .then( (data) => console.log(`[USER.LOGIN]user login ${data} `));
            }
            this.setState((prev: any, pros: any) => {
              return { login: true };
            });
          },
          error => {
            this.setState({error: true}) ;
          }
        )
        .catch((error: ErrorEventHandler) => {
            console.log(error);
          });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const isLogin = this.state.login ? <Redirect to="/actionsLog" /> : '';

    return (
      <div className={cls.loginPage}>
        {isLogin}
        <section className={cls.loginForm}>
          <h2>Login</h2>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className={cls.loginFormButton}
              >
                Log in
              </Button>
            </FormItem>
            {this.state.error ? <span className={cls.Alert}>username and password not match</span> : null}
          </Form>
        </section>
      </div>
    );
  }
}

export default Form.create()(Login);
