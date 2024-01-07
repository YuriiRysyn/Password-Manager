import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

import { signIn } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../..';

// Types
import { RequestStatusEnum } from '../../redux/constants';
import { ISignInUserData } from '../../types/userDataTypes';

import './SignIn.scss';

import { Loader } from '../Loader/Loader';

export const SignIn = () => {
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const [form] = Form.useForm();

  const requestStatus = user.signInRequestStatus;
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
