import React, { useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';

import { Form, Input, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';

import { useAppDispatch, useAppSelector } from '../..';
import { signUp } from '../../redux/actions';

import { Loader } from '../Loader/Loader';
import { ISignUpUserData } from '../../types/userDataTypes';
import { RequestStatusEnum } from '../../redux/constants';

export const SignUp = () => {
  const [form] = Form.useForm();
  // const user = useSelector(state => state.user);
  // const dispatch = useDispatch();

  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const requestStatus = user.signUpRequestStatus;

  const isPending = requestStatus === RequestStatusEnum.PENDING;

  const [isFailedSignIn, setIsFailedSignIn] = useState(false);
  const [errorInfo, setErrorInfo] = useState(
    'Failed to sign up. Please, try again later.'
  );

  const onSignUp = (userFormData: ISignUpUserData) => {
    if (!validatePass(userFormData)) {
      return;
    }

    setIsFailedSignIn(false);

    dispatch(signUp(userFormData));

    form.resetFields();
  };

  const validatePass = (userFormData: ISignUpUserData) => {
    const { password, confirmedPassword } = userFormData;

    if (password !== confirmedPassword) {
      setErrorInfo('Incorrect confirming password');
      setIsFailedSignIn(true);

      return false;
    }

    return true;
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

      {(isFailedSignIn || requestStatus === RequestStatusEnum.ERROR) && (
        <p className="authorization-error-message">{errorInfo}</p>
      )}
    </section>
  );
};
