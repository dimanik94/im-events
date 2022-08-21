/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Calendar from "../Calendar/Calendar";
import Events from "../Events/Events";

const Main: FC = () => {
  return (
    <>
      <Sider
        width={256}
        theme="light"
        css={{ borderRight: "1px solid #f0f0f0" }}
      >
        <Events />
      </Sider>
      <Content css={{ overflowY: "auto", position: "relative" }}>
        <Calendar />
      </Content>
    </>
  );
};

export default Main;
