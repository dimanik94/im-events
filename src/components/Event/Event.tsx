/** @jsxImportSource @emotion/react */
import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
import { iconsByType } from "../Events/Events";
import {
  defaultItemWrapperStyle,
  iconWrapperStyle,
  tableNameWrapperStyle,
} from "./Event.styles";
import { IEventProps } from "./Event.types";

const Event: FC<IEventProps> = (props) => {
  const { event } = props;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "EVENT",
    item: event,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const itemWrapperStyle = useMemo(
    () => ({
      ...defaultItemWrapperStyle,
      backgroundColor: isDragging ? "#fafafa" : "#f5f5f5",
      borderColor: isDragging ? "#bfbfbf" : "transparent",
    }),
    [isDragging]
  );

  const Icon = iconsByType[event.type as keyof typeof iconsByType];

  return (
    <div css={itemWrapperStyle} ref={dragRef}>
      <div css={tableNameWrapperStyle}>{event.name}</div>
      <div css={iconWrapperStyle}>{Icon}</div>
    </div>
  );
};

export default Event;
