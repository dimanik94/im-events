/** @jsxImportSource @emotion/react */
import { FC } from "react";
import type { IHeaderProps } from "./Header.types";
import { Header as AntHeader } from "antd/lib/layout/layout";
import { logoStyle, wrapperStyle } from "./Header.styles";
import { Avatar, Button } from "antd";

const Header: FC<IHeaderProps> = () => {
  return (
    <AntHeader css={wrapperStyle}>
      <div css={logoStyle}>ЛОГО</div>
      <div css={{ height: "48px", display: "flex" }}>
        <Button
          type="primary"
          css={{ height: "28px", alignSelf: "center", marginRight: "8px" }}
        >
          Войти
        </Button>
        <Avatar
          css={{
            fontSize: "12px",
            color: "#fff",
            backgroundColor: "#FA8C16",
            alignSelf: "center",
          }}
          size={20}
        >
          {"U"?.toUpperCase() ?? ""}
        </Avatar>
      </div>
    </AntHeader>
  );
};

export default Header;
