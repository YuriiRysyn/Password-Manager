import React, { useEffect, useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

import 'antd/dist/antd.css';

import './SignIn.scss';
import { Loader } from '../Loader/Loader';

export const SignIn = () => {
  const [form] = Form.useForm();

  const [isFailedSignIn, setIsFailedSignIn] = useState(false);
  const [errorInfo, setErrorInfo] = useState('Failed to sign in');
  const [isPending, setIsPending] = useState(false);

  const onSignIn = values => {
    const { username, password, remember } = values;

    console.log('Success:', values);
    form.resetFields();
    form.getFieldError();
    setIsFailedSignIn(true);

    
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
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

      {isFailedSignIn && (
        <p className="authorization-error-message">{errorInfo}</p>
      )}
    </section>
  );
};
