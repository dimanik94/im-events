/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { map } from "lodash";
import Event from "../Event/Event";

export type TEvent = {
  name: string;
  type: string;
};

const events: TEvent[] = [
  {
    name: "ЧКГ",
    type: "Интеллектуальные",
  },
  {
    name: "Сплав",
    type: "Спортивные",
  },
];

const Events: FC = () => {
  return (
    <div css={{ padding: "12px 8px" }}>
      {map(events, (event) => (
        <Event key={event.name} event={event} />
      ))}
    </div>
  );
};

export default Events;
