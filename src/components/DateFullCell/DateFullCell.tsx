/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { useDrop } from "react-dnd";
import { IDateFullCellProps } from "./DateFullCell.types";

const DateFullCell: FC<IDateFullCellProps> = (props) => {
  const { date } = props;

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "EVENT",
      drop: (item) => {
        console.log("drop item", item);
        console.log("drop date", date);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <div
      ref={dropRef}
      className="ant-picker-cell-inner ant-picker-calendar-date"
      css={{ backgroundColor: isOver ? "black" : undefined }}
    >
      <div className="ant-picker-calendar-date-value">{date.date()}</div>
      <div className="ant-picker-calendar-date-content"></div>
    </div>
  );
};

export default DateFullCell;
