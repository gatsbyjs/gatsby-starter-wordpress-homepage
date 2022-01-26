import { globalStyle } from "@vanilla-extract/css"
import { theme } from "./theme.css.ts"

globalStyle("body", {
  margin: 0,
  fontFamily: theme.fonts.text,
  color: theme.colors.text,
  backgroundColor: theme.colors.background,
})

globalStyle("*", {
  boxSizing: "border-box",
})
