import React, { useCallback } from "react";
import type { FormInstance } from "antd";
import { Button, Form, Input, Space, Radio } from "antd";
import RunApp from "./";
import styles from "./index.module.scss";

interface SubmitButtonProps {
  form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({
  form,
  children,
}) => {
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

function App() {
  const [form] = Form.useForm();

  const onFinish = useCallback((values: any) => {
    const { api, username, password, ChannelId, ChannelType } = values;
    RunApp({
      api: api || "https://api.botgate.cn/v1/",
      loginInfo: {
        username: username || "15900000002",
        password: password || "a1234567",
      },
      channelInfo: {
        channelID: ChannelId,
        channelType: ChannelType || 2,
      },
    });
  }, []);

  return (
    <div className={styles.app}>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        initialValues={{
          api: "http://106.15.250.63:8090/v1/",
          username: "hellojwt4",
          password: "12345678",
          ChannelId: "hellojwt4_group",
          ChannelType: 2,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="api" label="api地址" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="ChannelId" label="群Code" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="ChannelType"
          label="聊天类型"
          rules={[{ required: true }]}
        >
          <Radio.Group>
            <Radio value={1} disabled>
              单聊
            </Radio>
            <Radio value={2}>群聊</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form}>Submit</SubmitButton>
            <Button htmlType="reset">Reset</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
