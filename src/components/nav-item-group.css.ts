import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css"
import { media } from "./ui.css"
import { mobileNavLink } from "./header.css"

export const navGroupWrapper = style({
  position: "relative",
})

export const navGroupTitle = style([
  mobileNavLink,
  { ":hover": { color: theme.colors.background } },
  {
    "@media": {
      [media.small]: {
        padding: 0,
        alignItems: "baseline",
        color: "inherit",
        fontSize: "inherit",
        ":hover": { color: theme.colors.active },
      },
    },
  },
])

export const navGroupTitleInner = style({
  "@media": {
    [media.small]: {
      alignItems: "baseline",
    },
  },
})

const navLinkListWrapperBase = style({
  position: "relative",
  whiteSpace: "nowrap",
  width: "fit-content",
  "@media": {
    [media.small]: {
      position: "absolute",
      background: theme.colors.background,
      padding: `${theme.space[3]} ${theme.space[3]} ${theme.space[0]} ${theme.space[3]}`,
      top: "calc(100% + 20px)",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: theme.radii.large,
      minWidth: theme.sizes.navGroupBoxMin,
      maxWidth: theme.sizes.navGroupBoxMax,
      boxShadow: theme.shadows.large,
      selectors: {
        "&::before": {
          content: "",
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%) translateY(calc(-100% + 2px))",
          width: 0,
          height: 0,
          borderStyle: "solid",
          borderWidth: "0 14px 17.3px 14px",
          borderColor: `transparent transparent ${theme.colors.background} transparent`,
        },
      },
    },
  },
})

export const navLinkListWrapper = styleVariants({
  opened: [
    navLinkListWrapperBase,
    {
      "@media": {
        [media.small]: {
          animation: "zoomInUp 0.15s ease-in-out",
        },
      },
    },
  ],
  closed: [
    navLinkListWrapperBase,
    {
      "@media": {
        [media.small]: {
          animation: "zoomOutDown 0.15s ease-in-out",
          animationFillMode: "forwards",
        },
      },
    },
  ],
})

export const navLinkListWrapperInner = style({
  paddingLeft: theme.space[4],
  paddingBottom: theme.space[3],
  "@media": {
    [media.small]: {
      paddingLeft: 0,
      alignItems: "stretch",
    },
  },
})

export const navIcon = style({
  flexShrink: 0,
  width: theme.sizes.navIcon,
  height: theme.sizes.navIcon,
  "@media": {
    [media.small]: {
      width: theme.sizes.navIconSmall,
      height: theme.sizes.navIconSmall,
    },
  },
})

export const navLinkListLink = style([
  mobileNavLink,
  {
    "@media": {
      [media.small]: {
        padding: theme.space[2],
        margin: 0,
        color: "inherit",
        fontSize: theme.fontSizes[2],
        fontWeight: theme.fontWeights.bold,
        borderRadius: theme.radii.button,
        ":hover": {
          background: theme.colors.muted,
          color: "inherit",
        },
      },
    },
  },
])

export const navLinkDescription = style({
  display: "none",
  whiteSpace: "normal",
  "@media": {
    [media.small]: {
      display: "block",
      fontSize: theme.fontSizes[1],
      margin: 0,
      minWidth: "300px",
    },
  },
})

export const navLinkTitle = style({
  margin: 0,
  padding: 0,
})
