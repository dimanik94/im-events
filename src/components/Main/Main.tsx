/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

const Main: FC = () => {
  return (
    <>
      <Sider css={{ borderRight: "1px solid gray" }}>Sider</Sider>
      <Content style={{ width: "100%" }}>
        <div css={{ color: "red" }}>Content</div>
      </Content>
    </>
  );
};

export default Main;
