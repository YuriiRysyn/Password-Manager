import React, { useEffect, useState } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

import { Loader } from '../Loader/Loader';

export const SignUp = () => {
  const [form] = Form.useForm();

  const [isFailedSignIn, setIsFailedSignIn] = useState(false);
  const [errorInfo, setErrorInfo] = useState('Failed to sign in');
  const [isPending, setIsPending] = useState(false);

  const onSignUp = values => {
    const { username, password, confirmedPassword, remember } = values;

    if (password !== confirmedPassword) {
      setErrorInfo('Incorrect confirming password');
      setIsFailedSignIn(true);

      return;
    }

    setIsFailedSignIn(false);

    console.log('Success:', values);
    form.resetFields();
    form.getFieldError();
    setIsFailedSignIn(true);
    // setErrorInfo();
    // call API
    //   LogIn({
    //     userName: values.username,
    //     password: values.password,
    //     remember: values.remember,
    //   })
    //
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <section className="Authorization Authorization__SignUp SignUp">
      {isPending && (
        <div className="Authorization__loader-container">
          <Loader />
        </div>
      )}
      <Form
        form={form}
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
        onFinish={onSignUp}
        // onFinishFailed={onFinishFailed}
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
          label="Confirm Password"
          name="confirmedPassword"
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>

      {isFailedSignIn && (
        <p className="authorization-error-message">{errorInfo}</p>
      )}
    </section>
  );
};
