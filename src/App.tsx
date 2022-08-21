/** @jsxImportSource @emotion/react */
import { Layout } from "antd";
import { FC, useState } from "react";
import "./App.css";
import "antd/dist/antd.min.css";
import Header from "./components/Header/Header";
import { appStyle, layoutMainStyle } from "./App.styles";
import Main from "./components/Main/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ConfigProvider } from "antd";
import ruRu from "antd/es/locale/ru_RU";
import moment from "moment";
import "moment/locale/ru";
import { Global } from "@emotion/react";

moment.locale("ru");
moment.updateLocale("ru", {
  week: {
    dow: 1,
  },
} as moment.LocaleSpecification);

const App: FC = () => {
  const [isAuthorized, setIsAuthorized] = useState(
    !!localStorage.getItem("id")
  );

  return (
    <ConfigProvider locale={ruRu}>
      <Global styles={appStyle} />
      <Layout style={{ height: "100%" }}>
        <Header isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
        <Layout style={layoutMainStyle}>
          <DndProvider backend={HTML5Backend}>
            <Main isAuthorized={isAuthorized} />
          </DndProvider>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
