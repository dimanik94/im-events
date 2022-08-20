/// <reference types="@emotion/react/types/css-prop" />
export {};
const theme = {
  s: "s",
} as const;

declare global {
  type TTheme = typeof theme;
}

declare module "@emotion/react" {
  export interface Theme extends TTheme {}
}
