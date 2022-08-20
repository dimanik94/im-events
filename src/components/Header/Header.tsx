/** @jsxImportSource @emotion/react */
import type { FC } from "react";
import type { IHeaderProps } from "./Header.types";
import { Header as AntHeader } from "antd/lib/layout/layout";
import { wrapperStyle } from "./Header.styles";

const Header: FC<IHeaderProps> = () => {
  return <AntHeader css={wrapperStyle}>Header</AntHeader>;
};

export default Header;
