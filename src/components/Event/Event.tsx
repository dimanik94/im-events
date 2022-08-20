/** @jsxImportSource @emotion/react */
import { FC, useMemo } from "react";
import { useDrag } from "react-dnd";
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

  return (
    <div css={itemWrapperStyle} ref={dragRef}>
      <div css={tableNameWrapperStyle}>{event.name}</div>
      <div css={iconWrapperStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00052 3.19997C8.00052 3.78907 7.52296 4.26663 6.93385 4.26663C6.34475 4.26663 5.86719 3.78907 5.86719 3.19997C5.86719 2.61086 6.34475 2.1333 6.93385 2.1333C7.52296 2.1333 8.00052 2.61086 8.00052 3.19997ZM6.93385 9.06664C7.52296 9.06664 8.00052 8.58908 8.00052 7.99998C8.00052 7.41087 7.52296 6.93331 6.93385 6.93331C6.34475 6.93331 5.86719 7.41087 5.86719 7.99998C5.86719 8.58908 6.34475 9.06664 6.93385 9.06664ZM11.7339 9.06664C12.323 9.06664 12.8005 8.58908 12.8005 7.99998C12.8005 7.41087 12.323 6.93331 11.7339 6.93331C11.1448 6.93331 10.6672 7.41087 10.6672 7.99998C10.6672 8.58908 11.1448 9.06664 11.7339 9.06664ZM11.7339 4.26663C12.323 4.26663 12.8005 3.78907 12.8005 3.19997C12.8005 2.61086 12.323 2.1333 11.7339 2.1333C11.1448 2.1333 10.6672 2.61086 10.6672 3.19997C10.6672 3.78907 11.1448 4.26663 11.7339 4.26663ZM8.00052 12.8C8.00052 13.3891 7.52296 13.8666 6.93385 13.8666C6.34475 13.8666 5.86719 13.3891 5.86719 12.8C5.86719 12.2109 6.34475 11.7333 6.93385 11.7333C7.52296 11.7333 8.00052 12.2109 8.00052 12.8ZM11.7339 13.8666C12.323 13.8666 12.8005 13.3891 12.8005 12.8C12.8005 12.2109 12.323 11.7333 11.7339 11.7333C11.1448 11.7333 10.6672 12.2109 10.6672 12.8C10.6672 13.3891 11.1448 13.8666 11.7339 13.8666Z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Event;
