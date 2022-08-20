/** @jsxImportSource @emotion/react */
import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import { FC } from "react";
import "./App.css";
import { layoutMainStyle } from "./App.styles";
import Main from "./components/Main/Main";

const App: FC = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header
        style={{ backgroundColor: "#2c2c2c", height: 48, color: "white" }}
      >
        Header
      </Header>
      <Layout style={layoutMainStyle}>
        <Main />
      </Layout>
    </Layout>
  );
};

export default App;
