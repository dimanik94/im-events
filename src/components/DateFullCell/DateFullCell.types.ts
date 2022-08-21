import { Moment } from "moment";
import { TCalendarEvent } from "../Calendar/Calendar";

export interface IDateFullCellProps {
  date: Moment;
  isDisabled: boolean;
  calendarEvent?: TCalendarEvent;
}
