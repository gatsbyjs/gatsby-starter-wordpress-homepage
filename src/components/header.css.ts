import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { mediaQueries } from "./ui.css"

export const desktopHeaderNavWrapper = style({
  display: "none",
  "@media": {
    [mediaQueries.small]: {
      display: "block",
    },
  },
})

const mobileHeaderNavWrapperBase = style({
  display: "block",
  position: "relative",
  paddingTop: theme.space[3],
  "@media": {
    [mediaQueries.small]: {
      display: "none",
    },
  },
})

export const mobileHeaderNavWrapper = styleVariants({
  open: [
    mobileHeaderNavWrapperBase,
    {
      background: theme.colors.primary,
    },
  ],
  closed: [mobileHeaderNavWrapperBase],
})

export const mobileNavSVGColorWrapper = styleVariants({
  primary: [{ color: theme.colors.primary }],
  reversed: [{ color: theme.colors.background }],
})

export const mobileNavOverlay = style({
  position: "absolute",
  width: "100vw",
  height: "100vh",
  background: theme.colors.primary,
  zIndex: 1,
  "@media": {
    [mediaQueries.small]: {
      display: "none",
    },
  },
})

export const mobileNavLinkList = style({
  marginTop: theme.space[5],
  marginLeft: theme.space[5],
  alignItems: "start",
})

export const mobileNavLink = style({
  color: theme.colors.background,
  fontSize: theme.fontSizes[4],
})
