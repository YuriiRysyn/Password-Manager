import React from 'react';
import 'antd/dist/antd.css';

import { Spin, Space } from 'antd';

export const Loader = () => (
  <Space size="middle">
    <Spin size="large" />
  </Space>
);
