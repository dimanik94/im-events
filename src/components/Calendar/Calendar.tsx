/** @jsxImportSource @emotion/react */
import { FC, useCallback } from "react";
import { Calendar as AntCalendar } from "antd";
import { CalendarProps } from "antd/lib/calendar/generateCalendar";
import { Moment } from "moment";
import DateFullCell from "../DateFullCell/DateFullCell";
import moment from "moment";
// import locale from "../../locale";

const Calendar: FC = () => {
  // const headerRender = useCallback<
  //   NonNullable<CalendarProps<Moment>["headerRender"]>
  // >((config) => {
  //   console.log("headerRender config", config);
  //   return <div>1</div>;
  // }, []);

  const dateFullCellRender = useCallback<
    NonNullable<CalendarProps<Moment>["dateFullCellRender"]>
  >((date) => {
    // console.log("dateFullCellRender date", date);

    return <DateFullCell date={date} />;
  }, []);

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

  return (
    <AntCalendar
      // headerRender={headerRender}
      dateFullCellRender={dateFullCellRender}
      // monthFullCellRender={monthFullCellRender}
      // dateCellRender={dateCellRender}
      // monthCellRender={monthCellRender}
      // locale={locale}
      disabledDate={(date) => {
        if (date.date() === 3 && date.month() === 8) {
          return true;
        }

        const asd = moment()
          .set("date", date.date())
          .set("month", date.month());

        const asd1 = moment()
          .set("date", moment(moment.now()).date())
          .set("month", moment(moment.now()).month());

        return asd < asd1;
        // return date < moment(moment.now());
      }}
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
          backgroundColor: "#e1faf6 !important",
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
      }}
    />
  );
};

export default Calendar;
