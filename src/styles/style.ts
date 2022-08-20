const commonStyle = {
  color: "#fff !important",
  fill: "#fff !important",
  borderColor: "rgba(0, 0, 0, 0) !important",
};

export const buttonStyle = {
  height: "28px",
  alignSelf: "center",
  marginRight: "8px",
  fontSize: "12px",
  background: "#0CB3B3 !important",
  borderColor: "rgba(0, 0, 0, 0) !important",
  ":hover": {
    ...commonStyle,
    background: "#50CCC4 !important",
  },
  ":focus": {
    ...commonStyle,
    background: "#50CCC4 !important",
  },
  ":active": {
    ...commonStyle,
    background: "#089494 !important",
  },
};
