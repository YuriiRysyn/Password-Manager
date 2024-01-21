import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';
import './SignIn.scss';
import { Loader } from '../Loader/Loader';

// Logic dependencies
import { useAppDispatch, useAppSelector } from '../../Store/store';
import { signIn } from '../../Store/user/user.actions';

// Types
import { ISignInUserData } from '../../types/userDataTypes';
import { RequestStatusEnum } from '../../types/enums';

export const SignIn = () => {
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const requestStatus = user.signXStatus;
  const isPending = requestStatus === RequestStatusEnum.PENDING;

  const errorInfo = 'Failed to sign in. Please, try again later.';

  const onSignIn = (userFormData: ISignInUserData) => {
    dispatch(signIn(userFormData));

    form.resetFields();
  };

  return (
    <section className="Authorization Authorization__SignIn SignIn">
      {isPending && (
        <div className="Authorization__loader-container">
          <Loader />
        </div>
      )}
      <Form
        form={form}
        className="SignIn__form"
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onSignIn}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
        </Form.Item>
      </Form>

      {requestStatus === RequestStatusEnum.ERROR && (
        <p className="authorization-error-message">{user.error || errorInfo}</p>
      )}
    </section>
  );
};
