import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

export const heading = style({
  fontFamily: theme.fonts.mono,
  fontStyle: "normal",
  letterSpacing: "-0.02em",
})

export const link = style({
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
  textAlign: "center",
  color: "inherit",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "center",
  gap: "10px",
})

export const linkChevron = style({
  height: "12px",
})

export const text = style({
  fontSize: theme.fontSizes[4],
  textAlign: "center",
  marginBottom: 0,
})
