/** @jsxImportSource @emotion/react */
import { FC, useCallback, useEffect, useState } from "react";
import { Calendar as AntCalendar, Spin } from "antd";
import { CalendarProps } from "antd/lib/calendar/generateCalendar";
import { Moment } from "moment";
import DateFullCell from "../DateFullCell/DateFullCell";
import moment from "moment";
import { forEach } from "lodash";
import { baseUrl } from "../../utils/const";
// import locale from "../../locale";

export type TEmployee = {
  id: number;
  birthday: [number, number, number] | null;
  login: string;
  password: string;
  surName: string;
  userName: string;
};

export type TCalendarEvent = {
  id: number;
  name: string;
  description: string;
  minNumber: number;
  date: [number, number, number];
  employees: TEmployee[];
};

const isDateDisabled = (currentDate: Moment) => {
  // if (currentDate.date() === 3 && currentDate.month() === 8) {
  //   return true;
  // }

  const currentDateMoment = moment()
    .set("date", currentDate.date())
    .set("month", currentDate.month());

  const nowDateMoment = moment()
    .set("date", moment(moment.now()).date())
    .set("month", moment(moment.now()).month());

  return currentDateMoment < nowDateMoment;
};

const Calendar: FC<{ isAuthorized: boolean }> = (props) => {
  const { isAuthorized } = props;

  const [calendarEvents, setCalendarEvents] =
    useState<Record<string, TCalendarEvent>>();

  // const [employees, setEmployees] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
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
    }

    fetchData();
  }, []);

  // useEffect(() => {
  //   forEach(calendarEvents, (calendarEvent, index) => {
  //     const calendarEventId = calendarEvent.id;
  //     console.log("index", index);
  //     console.log("size(calendarEvents)", size(calendarEvents));
  //     console.log("---");
  //     async function fetchData() {
  //       const response = await fetch(
  //         `http://192.168.89.79:8080/employees/calendar-event/${calendarEventId}`
  //       );

  //       response.json().then((res) => {
  //         // console.log("calendarEventId", calendarEventId);
  //         // console.log("res", res);
  //         // console.log("---");
  //         setEmployees((prev) => [
  //           ...prev,
  //           {
  //             calendarEventId,
  //             employees: res,
  //           },
  //         ]);
  //       });
  //     }

  //     fetchData();
  //   });
  // }, [calendarEvents]);

  // const headerRender = useCallback<
  //   NonNullable<CalendarProps<Moment>["headerRender"]>
  // >((config) => {
  //   console.log("headerRender config", config);
  //   return <div>1</div>;
  // }, []);

  const dateFullCellRender = useCallback<
    NonNullable<CalendarProps<Moment>["dateFullCellRender"]>
  >(
    (date) => {
      const calendarEventKey = [
        date.year(),
        date.month() + 1,
        date.date(),
      ].join(".");

      return (
        <DateFullCell
          date={date}
          isDisabled={isDateDisabled(date)}
          calendarEvent={calendarEvents?.[calendarEventKey]}
          setCalendarEvents={setCalendarEvents}
          isAuthorized={isAuthorized}
        />
      );
    },
    [calendarEvents, isAuthorized]
  );

  // const monthFullCellRender = useCallback<
  //   NonNullable<CalendarProps<Moment>["monthFullCellRender"]>
  // >((date) => {
  //   console.log("monthFullCellRender date", date);
  //   return <div>3</div>;
  // }, []);

  // const dateCellRender = useCallback<
  //   NonNullable<CalendarProps<Moment>["dateCellRender"]>
  // >((date) => {
  //   console.log("dateCellRender date", date);
  //   return <div>4</div>;
  // }, []);

  // const monthCellRender = useCallback<
  //   NonNullable<CalendarProps<Moment>["monthCellRender"]>
  // >((date) => {
  //   console.log("monthCellRender date", date);
  //   return <div>5</div>;
  // }, []);

  // console.log("locale", locale);

  // console.log("calendarEvents", calendarEvents);

  if (!calendarEvents) {
    return (
      <Spin
        css={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

  return (
    <AntCalendar
      // headerRender={headerRender}
      dateFullCellRender={dateFullCellRender}
      // monthFullCellRender={monthFullCellRender}
      // dateCellRender={dateCellRender}
      // monthCellRender={monthCellRender}
      // locale={locale}
      disabledDate={(date) => isDateDisabled(date)}
      css={{
        padding: "8px 16px",
        ".ant-picker-calendar-date-today": {
          borderColor: "#0cb3b3 !important",
          // backgroundColor: "#e1faf6 !important",
        },
        ".ant-picker-cell-selected .ant-picker-calendar-date-value": {
          color: "#0cb3b3 !important",
        },
        // ".ant-picker-content": {
        //   height: "calc(100vh - 120px)",
        // },
        ".ant-picker-cell-selected .ant-picker-calendar-date": {
          // backgroundColor: "#e1faf6 !important",
          backgroundColor: "transparent !important",
        },
        ".ant-select:not(.ant-select-disabled):hover .ant-select-selector": {
          borderColor: "#0cb3b3 !important",
        },
        ".ant-select-item-option-selected:not(.ant-select-item-option-disabled)":
          {
            backgroundColor: "#e1faf6 !important",
          },
        ".ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)":
          {
            color: "#0cb3b3 !important",
            borderColor: "#0cb3b3 !important",
          },
        ".ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-of-type":
          {
            borderColor: "#0cb3b3 !important",
          },
        ".ant-radio-button-wrapper:hover": {
          color: "#0cb3b3 !important",
        },
        "td.ant-picker-cell-disabled .ant-picker-calendar-date": {
          background: "#fafafa",
        },
        td: {
          position: "relative",
        },
      }}
    />
  );
};

export default Calendar;
