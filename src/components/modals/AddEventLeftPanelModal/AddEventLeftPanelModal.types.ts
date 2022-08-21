import { TEvent } from "../../Events/Events";

export interface IAddEventLeftPanelModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  setEvents: (events: TEvent[]) => void;
}
