/** @jsxImportSource @emotion/react */
import { Button, Form, Input, Modal } from "antd";
import { FC, useCallback, useState } from "react";
import { buttonStyle as globalButtonStyle } from "../../styles/style";
import { baseUrl } from "../../utils/const";
import { fetchData } from "../../utils/fetch/fetchData";
import { buttonStyle, errorIconStyle, errorStyle } from "./AuthModal.style";
import type { IAuthModalProps } from "./AuthModal.types";

const AuthModal: FC<IAuthModalProps> = ({
  handleCancel,
  handleOk,
  isModalVisible,
  setIsAuthorized,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

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
        .catch((error) => {
          console.log("error", error);
          setHasError(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleCancel, setIsAuthorized]
  );

  const clearError = useCallback(() => {
    setHasError(false);
  }, []);

  const onCancel = useCallback(() => {
    setHasError(false);
    handleCancel();
  }, [handleCancel]);

  return (
    <Modal
      title="Авторизация"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={onCancel}
      centered={true}
      width={440}
      focusTriggerAfterClose={false}
      footer={null}
      destroyOnClose={true}
    >
      {hasError && (
        <div css={errorStyle}>
          <span css={errorIconStyle}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1C4.13438 1 1 4.13438 1 8C1 11.8656 4.13438 15 8 15C11.8656 15 15 11.8656 15 8C15 4.13438 11.8656 1 8 1ZM10.5844 10.6594L9.55313 10.6547L8 8.80313L6.44844 10.6531L5.41563 10.6578C5.34688 10.6578 5.29063 10.6031 5.29063 10.5328C5.29063 10.5031 5.30156 10.475 5.32031 10.4516L7.35313 8.02969L5.32031 5.60938C5.30143 5.58647 5.29096 5.5578 5.29063 5.52812C5.29063 5.45937 5.34688 5.40312 5.41563 5.40312L6.44844 5.40781L8 7.25938L9.55156 5.40938L10.5828 5.40469C10.6516 5.40469 10.7078 5.45937 10.7078 5.52969C10.7078 5.55937 10.6969 5.5875 10.6781 5.61094L8.64844 8.03125L10.6797 10.4531C10.6984 10.4766 10.7094 10.5047 10.7094 10.5344C10.7094 10.6031 10.6531 10.6594 10.5844 10.6594Z"
                fill="#D93A36"
              />
            </svg>
          </span>
          Неверное имя пользователя и/или пароль
        </div>
      )}

      <Form
        name="auth-form"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        autoComplete="off"
        onChange={clearError}
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
            css={[globalButtonStyle, buttonStyle]}
          >
            Войти в систему
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AuthModal;
