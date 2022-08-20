/** @jsxImportSource @emotion/react */
import { Layout } from "antd";
import { FC } from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import Header from "./components/Header/Header";
import { layoutMainStyle } from "./App.styles";
import Main from "./components/Main/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: FC = () => {
  return (
    <Layout style={{ height: "100%" }}>
      <Header />
      <Layout style={layoutMainStyle}>
        <DndProvider backend={HTML5Backend}>
          <Main />
        </DndProvider>
      </Layout>
    </Layout>
  );
};

export default App;
