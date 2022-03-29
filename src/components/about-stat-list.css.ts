import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { media } from "./ui.css"

export const statList = style({
  "@media": {
    [media.small]: {
      gap: theme.space[6],
    },
  },
})

export const statContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  "@media": {
    [media.small]: {
      alignItems: "flex-start",
    },
  },
})
