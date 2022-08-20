export const layoutMainStyle = {
  flexDirection: "row",
  height: "calc(100vh - 48px)",
  overflow: "hidden",
  backgroundColor: "white",
} as const;

export const appStyle = () => {
  const scrollbarWidth = "6px";
  const scrollbarHeight = "6px";

  return {
    maxHeight: "100%",

    "::-webkit-scrollbar": {
      position: "absolute",
      width: scrollbarWidth,
      height: scrollbarHeight,
    },
    "::-webkit-scrollbar-track": {
      background: "#fff",
    },
    "::-webkit-scrollbar-thumb": {
      position: "absolute",
      width: scrollbarWidth,
      height: "auto",
      border: "none",
      background: "#d9d9d9",
      borderRadius: "12px",
      ":hover": {
        background: "#bfbfbf",
      },
    },
    "::-webkit-scrollbar-corner": {
      background: "#fff",
    },
    "::-webkit-scrollbar-button": {
      height: "0px",
      width: "0px",
    },
    // Стили для Mozilla. scrollbarWidth: "auto" слишком широкий в Windows, "thin" слишком узкий в Linux и MacOS,
    // а в пикселях ширину скролла для мозиллы задать нельзя. В приоритете OS Windows
    scrollbarWidth: "thin",
    scrollbarColor: `#bfbfbf #fff`,

    ".rc-virtual-list-scrollbar": {
      width: `${scrollbarWidth} !important`,
    },

    ".rc-virtual-list-scrollbar-thumb": {
      background: `#bfbfbf !important`,
      ":hover": {
        background: `#bfbfbf !important`,
      },
    },
  } as const;
};
