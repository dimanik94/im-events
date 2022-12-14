/** @jsxImportSource @emotion/react */
import { FC, useCallback, useState } from "react";
import type { IHeaderProps } from "./Header.types";
import { Header as AntHeader } from "antd/lib/layout/layout";
import { avatarStyle, buttonWrapperStyle, wrapperStyle } from "./Header.styles";
import { Avatar, Button } from "antd";
import AuthModal from "../modals/AuthModal/AuthModal";
import { buttonStyle } from "../../styles/style";

const Header: FC<IHeaderProps> = ({ isAuthorized, setIsAuthorized }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("id");
    localStorage.removeItem("letter");
    localStorage.removeItem("role");

    setIsAuthorized(false);
  }, [setIsAuthorized]);

  return (
    <>
      <AntHeader css={wrapperStyle}>
        <div css={{ display: "flex" }}>
          {
            <svg
              width="50"
              height="48"
              viewBox="0 0 50 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="50" height="48" fill="#2C2C2C" />
              <path
                d="M17.1436 18.2445H14V29.2507H17.1436V18.2445Z"
                fill="#F5F5F5"
              />
              <path
                d="M29.8904 29.2508H26.7904V23.3586C26.7904 21.7577 26.172 20.9572 24.935 20.9572C24.3381 20.9572 23.8652 21.1944 23.5161 21.6687C23.1666 22.143 22.9919 22.7138 22.9919 23.3808V29.2508H19.8486V18.2668H22.5991L22.8175 19.512C23.3705 18.5188 24.3162 18.0222 25.6554 18.0222C27.1541 18.0222 28.2021 18.7041 28.7987 20.0678C29.2789 19.3267 29.7958 18.8004 30.3487 18.4892C30.9017 18.1631 31.5784 18 32.3789 18C33.6595 18 34.6929 18.4002 35.4788 19.2007C36.279 20.0011 36.6794 21.35 36.6794 23.2474V29.2508H33.5139V23.3141C33.5139 21.7873 32.9682 21.0239 31.8769 21.0239C31.2802 21.0239 30.7998 21.2537 30.4361 21.7132C30.0721 22.1579 29.8904 22.7063 29.8904 23.3586V29.2508Z"
                fill="#F5F5F5"
              />
            </svg>
          }
          <div
            css={{
              height: "48px",
              display: "flex",
              alignContent: "center",
              lineHeight: "48px",
              fontSize: "14px",
              fontWeight: 500,
              paddingLeft: "8px",
            }}
          >
            ??????????????????
          </div>
        </div>
        <div css={buttonWrapperStyle}>
          <Button
            type="primary"
            css={buttonStyle}
            onClick={isAuthorized ? handleLogout : showModal}
          >
            {isAuthorized ? "??????????" : "??????????"}
          </Button>
          {isAuthorized && (
            <Avatar css={avatarStyle} size={20}>
              {localStorage.getItem("letter")?.toUpperCase() ?? ""}
            </Avatar>
          )}
        </div>
      </AntHeader>
      <AuthModal
        handleCancel={handleCancel}
        isModalVisible={isModalVisible}
        setIsAuthorized={setIsAuthorized}
      />
    </>
  );
};

export default Header;
