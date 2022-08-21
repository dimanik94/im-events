/** @jsxImportSource @emotion/react */
import { Modal } from "antd";
import { map } from "lodash";
import { FC, useEffect, useState } from "react";
import { baseUrl } from "../../../utils/const";
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
      bodyStyle={{ padding: "8px 16px", maxHeight: "500px" }}
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
        Комментарии:
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
              >{`${comment.dateTime[3]}:${comment.dateTime[4]} ${comment.dateTime[2]}.${comment.dateTime[1]}.${comment.dateTime[0]}`}</div>
              <div css={{ padding: "0 4px", fontSize: "12px" }}>
                {comment.message}
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default CalendarEventModal;
