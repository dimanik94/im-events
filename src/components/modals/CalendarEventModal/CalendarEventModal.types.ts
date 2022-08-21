import { TCalendarEvent } from "../../Calendar/Calendar";

export interface ICalendarEventModalProps {
  eventId: string | undefined;
  isModalVisible: boolean;
  handleCancel: () => void;
  calendarEvent: TCalendarEvent;
}
