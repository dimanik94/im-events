import { Moment } from "moment";
import { Dispatch, SetStateAction } from "react";
import { TCalendarEvent } from "../Calendar/Calendar";

export interface IDateFullCellProps {
  date: Moment;
  isDisabled: boolean;
  calendarEvent?: TCalendarEvent;
  setCalendarEvents: Dispatch<
    SetStateAction<Record<string, TCalendarEvent> | undefined>
  >;
  isAuthorized: boolean;
  showBirthdays: boolean;
}
