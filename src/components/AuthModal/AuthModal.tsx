/** @jsxImportSource @emotion/react */
import { Button, Form, Input, Modal } from "antd";
import { FC, useCallback, useState } from "react";
import { buttonStyle } from "../../styles/style";
import { baseUrl } from "../../utils/const";
import { fetchData } from "../../utils/fetch/fetchData";
import type { IAuthModalProps } from "./AuthModal.types";

const AuthModal: FC<IAuthModalProps> = ({
  handleCancel,
  handleOk,
  isModalVisible,
  setIsAuthorized,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = useCallback(
    (values: { username: string; password: string }) => {
      console.log("Success:", values);
      setIsLoading(true);

      fetchData(
        `${baseUrl}employees/check?login=${values.username}&password=${values.password}`
      )
        .then((res) => {
          localStorage.setItem("id", res.id);
          localStorage.setItem("letter", (res.userName as string).slice(0, 1));
        })
        .then(() => {
          fetchData(
            `${baseUrl}role/employee/${localStorage.getItem("id")}`
          ).then((res) => {
            localStorage.setItem("role", res.type);
            handleCancel();
            setIsAuthorized(true);
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleCancel, setIsAuthorized]
  );

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  return (
    <Modal
      title="Авторизация"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      centered={true}
      width={440}
      focusTriggerAfterClose={false}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        name="auth-form"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="username" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Логин" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "" }]}>
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            loading={isLoading}
            css={[
              buttonStyle,
              {
                height: "40px",
                width: "100%",
                fontSize: "18px",
                marginTop: "10px",
              },
            ]}
          >
            Войти в систему
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
