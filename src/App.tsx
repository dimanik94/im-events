/** @jsxImportSource @emotion/react */
import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import { FC } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { layoutMainStyle } from "./App.styles";
import Main from "./components/Main/Main";

const App: FC = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header />
      <Layout style={layoutMainStyle}>
        <Main />
      </Layout>
    </Layout>
  );
};

export default App;
