export const defaultItemWrapperStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  // backgroundColor: "#f5f5f5",
  margin: "4px 0",
  padding: "4px 8px",
  borderRadius: 2,
  borderWidth: 1,
  borderStyle: "solid",
  cursor: "pointer",
  transition: `${300}ms`,
  ":hover": {
    borderColor: "#BFBFBF",
  },
};

export const iconWrapperStyle = {
  display: "inline-flex",
  alignItems: "center",
  color: "#BFBFBF",
};

export const tableNameWrapperStyle = {
  flexBasis: 201,
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  color: "#434343",
  fontSize: 12,
  lineHeight: "22px",
  fontWeight: 400,
} as const;
