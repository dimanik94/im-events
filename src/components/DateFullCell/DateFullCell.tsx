/** @jsxImportSource @emotion/react */
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Progress,
  Tooltip,
} from "antd";
import { LikeOutlined, DislikeOutlined } from "@ant-design/icons";
import moment from "moment";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDrop } from "react-dnd";
import { buttonStyle } from "../../styles/style";
import { IDateFullCellProps } from "./DateFullCell.types";
import mainLogo from "../../styles/msh.jpg";
import { filter, find, forEach, isNumber, isUndefined } from "lodash";
import CalendarEventModal from "../modals/CalendarEventModal/CalendarEventModal";
import { baseUrl, birthdays } from "../../utils/const";
import {
  deleteData,
  fetchData,
  postData,
  putData,
} from "../../utils/fetch/api";
import { TCalendarEvent } from "../Calendar/Calendar";

const DateFullCell: FC<IDateFullCellProps> = (props) => {
  const {
    date,
    calendarEvent,
    setCalendarEvents,
    isAuthorized,
    showBirthdays,
  } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const event = useRef<{ name: string; type: string }>();

  useEffect(() => {
    if (!isUndefined(calendarEvent)) {
      const employee = find(
        calendarEvent.employees,
        (employee) => employee.id === Number(localStorage.getItem("id"))
      );

      if (isAuthorized && employee) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [calendarEvent, isAuthorized]);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onFinish = useCallback(
    (values: {
      eventName: string;
      description: string;
      minMembers: number;
    }) => {
      postData(`${baseUrl}calendar-events`, {
        name: values.eventName,
        description: values.description ?? "",
        date: date.format("YYYY-MM-DD"),
        minNumber: values.minMembers ?? 0,
      })
        .then(() => {
          fetchData(`${baseUrl}events/all`).then((res) => {
            handleCancel();
          });
        })
        .then(() => {
          fetch(`${baseUrl}/calendar-events/all`).then((body) => {
            body.json().then((res: TCalendarEvent[]) => {
              const preparedRes: Record<string, any> = {};

              forEach(res, (calendar) => {
                const preparedKey = `${calendar.date.join(".")}`;

                preparedRes[preparedKey] = calendar;
              });

              setCalendarEvents(preparedRes);
            });
          });
        })
        .finally(() => {});
    },
    [date, handleCancel, setCalendarEvents]
  );

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
            <InputNumber
              placeholder="Минимальное количество участников"
              min={1}
              max={1000}
              css={{ width: "100%" }}
            />
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
  }, [handleCancel, isModalVisible, onFinish]);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "EVENT",
      drop: (item: { name: string; type: string }) => {
        event.current = item;
        !calendarEvent && showModal();
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver() && !calendarEvent,
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
    const minNumber = calendarEvent?.minNumber;
    const employeesLength = calendarEvent?.employees.length;

    if (
      (minNumber === 0 && employeesLength === 0) ||
      (minNumber === 1 && employeesLength === 0)
    ) {
      return 0;
    }

    if (minNumber === 0 && employeesLength === 1) {
      return 100;
    }

    if (isNumber(minNumber) && isNumber(employeesLength)) {
      return (employeesLength / minNumber) * 100 > 100
        ? 100
        : (employeesLength / minNumber) * 100;
    }
  }, [calendarEvent?.minNumber, calendarEvent?.employees.length]);

  const isShowProgressBar = useMemo(() => {
    return Boolean(calendarEvent?.name);
  }, [calendarEvent?.name]);

  const getBD = useMemo(() => {
    /* @ts-ignore */
    return birthdays[`${date.date()}.${date.month() + 1}`];
  }, [date]);

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
          {isShowProgressBar && (
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
            if (isAuthorized && calendarEvent) {
              setIsFooterVisible(true);
            }
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
              fontSize: 12,
            }}
          >
            {calendarEvent?.name}
          </div>
          <div
            css={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: 12,
            }}
          >
            {calendarEvent?.description}
          </div>
          {date.date() === 3 && date.month() === 8 && (
            <img
              src={mainLogo}
              width="50px"
              height="50px"
              alt="msh"
              style={{ margin: "auto" }}
            />
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
          if (isAuthorized && calendarEvent) {
            setIsFooterVisible(true);
          }
        }}
        onMouseLeave={(e) => {
          setIsFooterVisible(false);
        }}
      >
        {isFooterVisible && isAuthorized && calendarEvent && (
          <Button
            type="ghost"
            icon={isLiked ? <DislikeOutlined /> : <LikeOutlined />}
            size="small"
            onClick={() => {
              setIsLiked((prev) => !prev);

              if (isLiked) {
                console.log("удаление");
                deleteData(
                  `${baseUrl}calendar-events/?ce_id=${
                    calendarEvent?.id
                  }&emp_id=${Number(localStorage.getItem("id"))}`
                ).then(() => {
                  fetch(`${baseUrl}/calendar-events/all`).then((body) => {
                    body.json().then((res: TCalendarEvent[]) => {
                      console.log("res", res);
                      const preparedRes: Record<string, any> = {};

                      forEach(res, (calendar) => {
                        const preparedKey = `${calendar.date.join(".")}`;

                        preparedRes[preparedKey] = calendar;
                      });

                      setCalendarEvents(preparedRes);
                    });
                  });
                });
              } else {
                console.log("добавление");
                putData(
                  `${baseUrl}calendar-events/?ce_id=${
                    calendarEvent?.id
                  }&emp_id=${Number(localStorage.getItem("id"))}`
                ).then(() => {
                  fetch(`${baseUrl}/calendar-events/all`).then((body) => {
                    body.json().then((res: TCalendarEvent[]) => {
                      console.log("res", res);
                      const preparedRes: Record<string, any> = {};

                      forEach(res, (calendar) => {
                        const preparedKey = `${calendar.date.join(".")}`;

                        preparedRes[preparedKey] = calendar;
                      });

                      setCalendarEvents(preparedRes);
                    });
                  });
                });
              }
            }}
          />
        )}
      </div>
      {isLiked && (
        <div
          css={{
            position: "absolute",
            bottom: 0,
            left: 8,
            color: "#4CAF50",
            zIndex: 99999,
          }}
        >
          <LikeOutlined css={{ fontSize: 12 }} />
        </div>
      )}
      {!!getBD && isAuthorized && showBirthdays && (
        <Tooltip title={`${getBD} 🎁`} css={{ fontSize: "10px !important" }}>
          <span
            css={{
              position: "absolute",
              right: 8,
              bottom: 0,
              zIndex: 999999,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.75 9.86719C6.75 10.1656 6.86853 10.4517 7.0795 10.6627C7.29048 10.8737 7.57663 10.9922 7.875 10.9922C8.17337 10.9922 8.45952 10.8737 8.6705 10.6627C8.88147 10.4517 9 10.1656 9 9.86719C9 9.56882 8.88147 9.28267 8.6705 9.07169C8.45952 8.86071 8.17337 8.74219 7.875 8.74219C7.57663 8.74219 7.29048 8.86071 7.0795 9.07169C6.86853 9.28267 6.75 9.56882 6.75 9.86719ZM15 9.86719C15 10.1656 15.1185 10.4517 15.3295 10.6627C15.5405 10.8737 15.8266 10.9922 16.125 10.9922C16.4234 10.9922 16.7095 10.8737 16.9205 10.6627C17.1315 10.4517 17.25 10.1656 17.25 9.86719C17.25 9.56882 17.1315 9.28267 16.9205 9.07169C16.7095 8.86071 16.4234 8.74219 16.125 8.74219C15.8266 8.74219 15.5405 8.86071 15.3295 9.07169C15.1185 9.28267 15 9.56882 15 9.86719ZM12 1.5C6.20156 1.5 1.5 6.20156 1.5 12C1.5 17.7984 6.20156 22.5 12 22.5C17.7984 22.5 22.5 17.7984 22.5 12C22.5 6.20156 17.7984 1.5 12 1.5ZM18.1641 18.1641C17.3625 18.9656 16.4297 19.5938 15.3914 20.0344C14.3203 20.4891 13.1789 20.7188 12 20.7188C10.8211 20.7188 9.67969 20.4891 8.60625 20.0344C7.56954 19.5965 6.62785 18.9613 5.83359 18.1641C5.03203 17.3625 4.40391 16.4297 3.96328 15.3914C3.51094 14.3203 3.28125 13.1789 3.28125 12C3.28125 10.8211 3.51094 9.67969 3.96562 8.60625C4.40346 7.56954 5.03868 6.62785 5.83594 5.83359C6.6375 5.03203 7.57031 4.40391 8.60859 3.96328C9.67969 3.51094 10.8211 3.28125 12 3.28125C13.1789 3.28125 14.3203 3.51094 15.3937 3.96562C16.4305 4.40346 17.3721 5.03868 18.1664 5.83594C18.968 6.6375 19.5961 7.57031 20.0367 8.60859C20.4891 9.67969 20.7188 10.8211 20.7188 12C20.7188 13.1789 20.4891 14.3203 20.0344 15.3937C19.5971 16.4301 18.9618 17.3711 18.1641 18.1641ZM15.5625 12.4922H14.4352C14.3367 12.4922 14.2523 12.5672 14.2453 12.6656C14.1562 13.8258 13.1836 14.7422 12 14.7422C10.8164 14.7422 9.84141 13.8258 9.75469 12.6656C9.74766 12.5672 9.66328 12.4922 9.56484 12.4922H8.4375C8.41207 12.4922 8.3869 12.4973 8.36351 12.5073C8.34013 12.5173 8.31903 12.532 8.30149 12.5504C8.28395 12.5688 8.27034 12.5906 8.26149 12.6144C8.25264 12.6383 8.24873 12.6637 8.25 12.6891C8.35313 14.6648 9.99609 16.2422 12 16.2422C14.0039 16.2422 15.6469 14.6648 15.75 12.6891C15.7513 12.6637 15.7474 12.6383 15.7385 12.6144C15.7297 12.5906 15.716 12.5688 15.6985 12.5504C15.681 12.532 15.6599 12.5173 15.6365 12.5073C15.6131 12.4973 15.5879 12.4922 15.5625 12.4922Z"
                fill="#262626"
              />
            </svg>
          </span>
        </Tooltip>
      )}
      {renderModal()}
      {calendarEvent && calendarEvent.id && isAuthorized && (
        <CalendarEventModal
          eventId={
            isInfoModalVisible ? calendarEvent?.id.toString() : undefined
          }
          handleCancel={handleInfoCancel}
          isModalVisible={isInfoModalVisible}
          calendarEvent={calendarEvent}
        />
      )}
    </>
  );
};

export default DateFullCell;
