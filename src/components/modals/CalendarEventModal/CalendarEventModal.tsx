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
  }>();
  const [likes, setLikes] = useState<
    {
      birthday: string;
      id: number;
      login: string;
      password: string;
      surName: string;
      userName: string;
    }[]
  >();

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
        fetch(`${baseUrl}employees/calendar-event/${eventId}`).then((body) => {
          body.json().then((res) => {
            console.log("res", res);
            setLikes(res);
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
          fontStyle: likes && likes?.length > 0 ? "normal" : "italic",
        }}
      >
        {likes && likes?.length > 0 ? "Участники:" : "Участников пока нет"}
      </div>
      <div>
        {likes && likes?.length > 0 && (
          <ul>
            {map(likes, (item, key) => (
              <li key={key}>{`${item.userName} ${item.surName}`}</li>
            ))}
          </ul>
        )}
      </div>
    </Modal>
  );
};

export default CalendarEventModal;
