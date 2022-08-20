/** @jsxImportSource @emotion/react */
import { Button, Form, Input, InputNumber, Modal } from "antd";
import moment from "moment";
import { FC, useCallback, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { buttonStyle } from "../../styles/style";
import { IDateFullCellProps } from "./DateFullCell.types";
import mainLogo from "../../styles/msh.jpg";

const DateFullCell: FC<IDateFullCellProps> = (props) => {
  const { date } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const event = useRef<{ name: string; type: string }>();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onFinish = useCallback((values: any) => {
    console.log("Success:", values);
  }, []);

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  const renderModal = useCallback(() => {
    return (
      <Modal
        title="Новое мероприятие"
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
          initialValues={{ remember: false, eventName: event.current?.name }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item name="eventName" rules={[{ required: true, message: "" }]}>
            <Input placeholder="Название мероприятия" />
          </Form.Item>

          <Form.Item name="description">
            <Input.TextArea
              placeholder="Описание"
              css={{ maxHeight: "100px", minHeight: "100px" }}
            />
          </Form.Item>

          <Form.Item name="minMembers" rules={[{ type: "number" }]}>
            <InputNumber placeholder="123" min={1} max={1000} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              type="primary"
              htmlType="submit"
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
              Добавить мероприятие
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    );
  }, [handleCancel, handleOk, isModalVisible, onFinish, onFinishFailed]);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "EVENT",
      drop: (item: { name: string; type: string }) => {
        console.log("drop item", item);
        console.log("drop date", date);

        event.current = item;
        showModal();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  let resultClassName;

  if (moment().date() === date.date()) {
    resultClassName =
      "ant-picker-cell-inner ant-picker-calendar-date ant-picker-calendar-date-today";
  } else {
    resultClassName = "ant-picker-cell-inner ant-picker-calendar-date";
  }

  return (
    <>
      <div
        ref={dropRef}
        className={resultClassName}
        css={{ backgroundColor: isOver ? "#f5f5f5" : undefined }}
      >
        <div className="ant-picker-calendar-date-value">{date.date()}</div>
        <div
          className="ant-picker-calendar-date-content"
          css={{ textAlign: "center !important" as any }}
        >
          {date.date() === 3 && date.month() === 8 && (
            <img src={mainLogo} width="50px" height="50px" alt="msh" />
          )}
        </div>
      </div>
      {renderModal()}
    </>
  );
};

export default DateFullCell;
