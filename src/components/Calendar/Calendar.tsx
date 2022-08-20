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
      disabledDate={(date) => date < moment(moment.now())}
    />
  );
};

export default Calendar;
