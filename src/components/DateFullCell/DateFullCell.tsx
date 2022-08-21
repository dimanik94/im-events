/** @jsxImportSource @emotion/react */
import { Button, Form, Input, InputNumber, Modal, Progress } from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import moment from "moment";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { buttonStyle } from "../../styles/style";
import { IDateFullCellProps } from "./DateFullCell.types";
import mainLogo from "../../styles/msh.jpg";
import { isEmpty, isNumber, isUndefined } from "lodash";
import CalendarEventModal from "../modals/CalendarEventModal/CalendarEventModal";

const DateFullCell: FC<IDateFullCellProps> = (props) => {
  const { date, isDisabled, calendarEvent } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const event = useRef<{ name: string; type: string }>();

  const showModal = useCallback(() => {
    setIsModalVisible(true);
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

  const showInfoModal = useCallback(() => {
    setIsInfoModalVisible(true);
  }, []);

  const handleInfoCancel = useCallback(() => {
    setIsInfoModalVisible(false);
  }, []);

  const renderModal = useCallback(() => {
    return (
      <Modal
        title="Новое мероприятие"
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
            <span className="ant-form-text">
              Минимальное количество участников
            </span>
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
  }, [handleCancel, isModalVisible, onFinish, onFinishFailed]);

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

  const percent = useMemo(() => {
    if (
      isNumber(calendarEvent?.minNumber) &&
      calendarEvent?.employees.length === calendarEvent?.minNumber
    ) {
      return 100;
    }

    return 20;
  }, [calendarEvent?.minNumber, calendarEvent?.employees]);

  return (
    <>
      <div
        ref={dropRef}
        className={resultClassName}
        onClick={showInfoModal}
        css={{
          position: "relative",
          backgroundColor: isOver ? "#f5f5f5" : undefined,
        }}
      >
        <div
          className="ant-picker-calendar-date-value"
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{date.date()}</div>
          {calendarEvent?.name && (
            <Progress
              percent={percent}
              size="small"
              // steps={10}
              showInfo={false}
              css={{ maxWidth: "50px" }}
              strokeColor={percent === 100 ? "#4CAF50" : "#FFDF00"}
            />
          )}
        </div>
        <div
          className="ant-picker-calendar-date-content"
          css={{ display: "flex", flexDirection: "column" }}
          onMouseEnter={() => {
            setIsFooterVisible(true);
          }}
          onMouseLeave={() => {
            setIsFooterVisible(false);
          }}
        >
          {/* {date.date() === 22 && date.month() === 7 && (
            <div
              css={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              Футбол
            </div>
          )} */}
          <div
            css={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {calendarEvent?.name}
          </div>
          <div
            css={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {calendarEvent?.description}
          </div>
          {date.date() === 3 && date.month() === 8 && (
            <img src={mainLogo} width="50px" height="50px" alt="msh" />
          )}
        </div>
      </div>
      <div
        css={{
          position: "absolute",
          width: "calc(100% - 8px)",
          height: isFooterVisible ? 36 : 0,
          // height: 36,
          backgroundColor: "#f0f0f0",
          bottom: 0,
          left: 4,
          zIndex: 10000,
          // transition: "height 300ms",
          opacity: isFooterVisible ? 1 : 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ".ant-btn-ghost:hover": {
            color: isLiked ? "#D93A36" : "#0cb3b3",
            borderColor: isLiked ? "#D93A36" : "#0cb3b3",
          },
        }}
        onMouseEnter={() => {
          setIsFooterVisible(true);
        }}
        onMouseLeave={(e) => {
          setIsFooterVisible(false);
        }}
      >
        {isFooterVisible && (
          <Button
            type="ghost"
            icon={isLiked ? <DislikeOutlined /> : <LikeOutlined />}
            size="small"
            onClick={() => {
              setIsLiked((prev) => !prev);
            }}
          />
        )}
      </div>
      {isLiked && (
        <div
          css={{ position: "absolute", bottom: 0, left: 4, color: "#4CAF50" }}
        >
          <LikeOutlined css={{ fontSize: 12 }} />
        </div>
      )}
      {renderModal()}
      {calendarEvent && calendarEvent.id && (
        <CalendarEventModal
          eventId={
            isInfoModalVisible ? calendarEvent?.id.toString() : undefined
          }
          handleCancel={handleInfoCancel}
          isModalVisible={isInfoModalVisible}
        />
      )}
    </>
  );
};

export default DateFullCell;
