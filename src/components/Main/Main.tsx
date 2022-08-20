/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import Calendar from "../Calendar/Calendar";

const Main: FC = () => {
  return (
    <>
      <Sider theme="light" css={{ borderRight: "1px solid gray" }}>
        Sider
      </Sider>
      <Content>
        <Calendar />
      </Content>
    </>
  );
};

export default Main;
