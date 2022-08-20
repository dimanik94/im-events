/** @jsxImportSource @emotion/react */
import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { FC } from "react";
import "./App.css";

const App: FC = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{ backgroundColor: "#2c2c2c", height: 48, color: "white" }}
      >
        Header
      </Header>
      <Layout
        style={{ height: "calc(100% - 48px)", display: "flex", flex: "auto" }}
      >
        <Sider css={{ borderRight: "1px solid gray" }}>Sider</Sider>
        <Content style={{ width: "100%" }}>
          <div css={{ color: "red" }}>Content</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
