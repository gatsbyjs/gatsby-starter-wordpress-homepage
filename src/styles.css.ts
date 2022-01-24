import { globalStyle } from "@vanilla-extract/css"
import { theme } from "./theme.css.ts"

globalStyle("body", {
  margin: 0,
  fontFamily: theme.fonts.text,
  color: theme.colors.text,
})

globalStyle("*", {
  boxSizing: "border-box",
})
