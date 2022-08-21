/** @jsxImportSource @emotion/react */
import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useCallback, useState } from "react";
import { buttonStyle as globalButtonStyle } from "../../../styles/style";
import { baseUrl, eventTypes } from "../../../utils/const";
import { fetchData, postData } from "../../../utils/fetch/api";
import { buttonStyle } from "./AddEventLeftPanelModal.styles";
import type { IAddEventLeftPanelModalProps } from "./AddEventLeftPanelModal.types";

const AddEventLeftPanelModal: FC<IAddEventLeftPanelModalProps> = ({
  handleCancel,
  isModalVisible,
  setEvents,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = useCallback(
    (values: { eventName: string; eventType: string }) => {
      setIsLoading(true);

      postData(`${baseUrl}events`, {
        name: values.eventName,
        type: values.eventType,
      })
        .then(() => {
          fetchData(`${baseUrl}events/all`).then((res) => {
            setEvents(res);
            handleCancel();
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [handleCancel, setEvents]
  );

  return (
    <Modal
      title="Новое событие"
      visible={isModalVisible}
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
        autoComplete="off"
        // onChange={clearError}
      >
        <Form.Item name="eventName" rules={[{ required: true, message: "" }]}>
          <Input placeholder="Наименование события" />
        </Form.Item>

        <Form.Item name="eventType" rules={[{ required: true, message: "" }]}>
          <Select
            placeholder="Тип события"
            options={eventTypes.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isLoading}
            loading={isLoading}
            css={[globalButtonStyle, buttonStyle]}
          >
            Предложить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddEventLeftPanelModal;
