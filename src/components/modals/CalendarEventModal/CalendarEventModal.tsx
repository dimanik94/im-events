/** @jsxImportSource @emotion/react */
import { Button, Form, Input, Modal } from "antd";
import { map } from "lodash";
import moment from "moment";
import { FC, useCallback, useEffect, useState } from "react";
import { buttonStyle } from "../../../styles/style";
import { baseUrl } from "../../../utils/const";
import { postData, putData } from "../../../utils/fetch/api";
import type { ICalendarEventModalProps } from "./CalendarEventModal.types";

const CalendarEventModal: FC<ICalendarEventModalProps> = ({
  eventId,
  handleCancel,
  isModalVisible,
}) => {
  const [data, setData] = useState<{
    date: Array<number>;
    description: string;
    id: number;
    minNumber: number;
    name: string;
    employees: {
      birthday: string;
      id: number;
      login: string;
      password: string;
      surName: string;
      userName: string;
    }[];
  }>();

  const [comments, setComment] = useState<
    {
      id: number;
      message: string;
      userName: string;
      dateTime: Array<number>;
    }[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      fetch(`${baseUrl}calendar-events/${eventId}`).then((body) => {
        body.json().then((res) => {
          setData(res);
        });
      });
    }

    eventId &&
      fetchData().then(() => {
        fetch(`${baseUrl}/comment/calendar-events/${eventId}`).then((body) => {
          body.json().then((res) => {
            console.log("res", res);
            setComment(res);
          });
        });
      });
  }, [eventId]);

  const onFinish = useCallback(
    (values: { message: string }) => {
      console.log("Success:", values);
      // setIsLoading(true);

      console.log('moment().format("YYYY-MM-DD HH-MM")', moment());

      postData(`${baseUrl}comment/${localStorage.getItem("id")}`, {
        message: values.message,
        dateTime: `${moment().format("YYYY-MM-DD")}T${moment().format(
          "HH:mm:ss"
        )}.751Z`,
      })
        .then((commentID) => {
          putData(
            `${baseUrl}comment/calendar-events/?calendarEventId=${eventId}&commentId=${commentID.toString()}`
          );
        })
        .then(() => {
          fetch(`${baseUrl}calendar-events/${eventId}`)
            .then((body) => {
              body.json().then((res) => {
                setData(res);
              });
            })
            .then(() => {
              fetch(`${baseUrl}/comment/calendar-events/${eventId}`).then(
                (body) => {
                  body.json().then((res) => {
                    console.log("res", res);
                    setComment(res);
                  });
                }
              );
            });
        })
        .finally(() => {});
    },
    [eventId]
  );

  if (!data) {
    return null;
  }

  return (
    <Modal
      title="Карточка события"
      visible={isModalVisible}
      onCancel={handleCancel}
      centered={true}
      width={440}
      focusTriggerAfterClose={false}
      footer={null}
      destroyOnClose={true}
      bodyStyle={{ padding: "8px 16px", maxHeight: "700px", overflow: "auto" }}
    >
      <div css={{ fontSize: "16px", fontWeight: 600 }}>{data.name}</div>
      <div
        css={{ fontStyle: "italic", marginBottom: "12px", color: "#8c8c8c" }}
      >
        {data.description}
      </div>
      <div>{`Дата проведения: ${data.date[2]}.${data.date[1]}.${data.date[0]}`}</div>
      {/* <div>{data.minNumber}</div> */}
      <div
        css={{
          marginTop: "12px",
          fontStyle: data.employees?.length > 0 ? "normal" : "italic",
        }}
      >
        {data.employees.length > 0 ? "Участники:" : "Участников пока нет"}
      </div>
      <div>
        {data.employees.length > 0 && (
          <ul>
            {map(data.employees, (item, key) => (
              <li key={key}>{`${item.userName} ${item.surName}`}</li>
            ))}
          </ul>
        )}
      </div>

      {/* комменты */}
      <div
        css={{
          marginTop: "12px",
        }}
      >
        <div css={{ marginBottom: "6px" }}>Комментарии:</div>
        {comments && comments.length === 0 ? (
          <div
            css={{
              fontStyle: "italic",
              marginBottom: "12px",
              color: "#8c8c8c",
            }}
          >
            Комментариев пока нет
          </div>
        ) : (
          map(comments, (comment, key) => (
            <div
              key={key}
              css={{
                border: "1px solid #d9d9d9",
                padding: "4px",
                marginBottom: "8px",
                position: "relative",
              }}
            >
              <div
                css={{ padding: "0 4px", fontWeight: 500, fontSize: "12px" }}
              >
                {comment.userName}
              </div>
              <div
                css={{
                  fontSize: "10px",
                  position: "absolute",
                  right: "2px",
                  top: "0px",
                }}
              >{`${comment.dateTime[3]}:${
                comment.dateTime[4].toString().length === 1
                  ? `0${comment.dateTime[4]}`
                  : comment.dateTime[4]
              } ${comment.dateTime[2]}.${comment.dateTime[1]}.${
                comment.dateTime[0]
              }`}</div>
              <div css={{ padding: "0 4px", fontSize: "12px" }}>
                {comment.message}
              </div>
            </div>
          ))
        )}
      </div>

      <Form
        name="auth-form"
        labelCol={{ span: 0 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        css={{ marginTop: "20px" }}
        autoComplete="off"
      >
        <Form.Item name="message" css={{ marginBottom: "8px" }}>
          <Input.TextArea
            placeholder="Сообщение"
            css={{ maxHeight: "100px", minHeight: "100px" }}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" css={buttonStyle}>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CalendarEventModal;
