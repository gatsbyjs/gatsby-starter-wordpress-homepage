import { style, styleVariants } from "@vanilla-extract/css"
import { calc } from "@vanilla-extract/css-utils"
import { theme } from "../theme.css"

const breakpoints = ["40em", "52em", "64em"]

export const media = {
  small: `screen and (min-width: ${breakpoints[0]})`,
  medium: `screen and (min-width: ${breakpoints[1]})`,
  large: `screen and (min-width: ${breakpoints[2]})`,
}

export const container = style({
  maxWidth: theme.sizes.container,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: theme.space[4],
  paddingRight: theme.space[4],
})

export type Containers = "normal" | "wide" | "narrow" | "tight" | "fullbleed"

export const containers: Record<Containers, string> = styleVariants({
  normal: [container],
  wide: [
    container,
    {
      maxWidth: theme.sizes.wide,
      paddingLeft: 0,
      paddingRight: 0,
    },
  ],
  narrow: [
    container,
    {
      maxWidth: theme.sizes.narrow,
    },
  ],
  tight: [
    container,
    {
      maxWidth: theme.sizes.tight,
    },
  ],
  fullbleed: [
    container,
    {
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: theme.space[4],
      paddingBottom: theme.space[4],
      "@media": {
        [media.medium]: {
          paddingLeft: theme.space[4],
          paddingRight: theme.space[4],
          paddingTop: theme.space[5],
          paddingBottom: theme.space[5],
        },
      },
    },
  ],
})

export const flex = style({
  display: "flex",
  alignItems: "center",
})

export type FlexVariants =
  | "wrap"
  | "start"
  | "baseline"
  | "columnStart"
  | "column"
  | "end"
  | "stretch"
  | "spaceBetween"
  | "center"
  | "responsive"

export const flexVariants: Record<FlexVariants, string> = styleVariants({
  wrap: {
    flexWrap: "wrap",
  },
  start: {
    alignItems: "flex-start",
  },
  baseline: {
    alignItems: "baseline",
  },
  columnStart: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  column: {
    flexDirection: "column",
  },
  end: {
    alignItems: "flex-end",
  },
  stretch: {
    alignItems: "stretch",
  },
  spaceBetween: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  center: {
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  responsive: {
    flexDirection: "column",
    "@media": {
      [media.small]: {
        flexDirection: "row",
      },
    },
  },
})

export const flexGap = styleVariants(theme.space, (gap) => ({ gap }))

export type Widths =
  | "full"
  | "half"
  | "quarter"
  | "third"
  | "twothirds"
  | "fitContent"

export const widths: Record<Widths, string> = styleVariants(
  {
    full: "100%",
    half: "50%",
    quarter: "25%",
    third: "33.3333%",
    twothirds: "33.3333%",
    fitContent: "fit-content",
  },
  (width) => [
    {
      width: "100%",
      "@media": {
        [media.small]: {
          width,
        },
      },
    },
  ]
)

export const list = style({
  listStyle: "none",
  padding: 0,
  margin: 0,
})

export const padding = styleVariants(theme.space, (padding) => ({ padding }))
export const paddingY = styleVariants(theme.space, (padding) => ({
  paddingTop: padding,
  paddingBottom: padding,
}))
export const marginY = styleVariants(theme.space, (margin) => ({
  marginTop: margin,
  marginBottom: margin,
}))

export const gutter = styleVariants(theme.space, (val: string) => ({
  marginLeft: calc.multiply(val, -1),
  marginRight: calc.multiply(val, -1),
}))

export const radii = styleVariants(theme.radii, (borderRadius) => ({
  overflow: "hidden",
  borderRadius,
}))
export const order = styleVariants({ 0: 0, 1: 1, 2: 2, 3: 3 }, (order) => ({
  "@media": {
    [media.small]: {
      order,
    },
  },
}))
export const box = styleVariants({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
})

export const section = style({
  paddingTop: theme.space[4],
  paddingBottom: theme.space[4],
  "@media": {
    [media.small]: {
      paddingTop: theme.space[5],
      paddingBottom: theme.space[5],
    },
  },
})

export const margin = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (margin) => ({ margin })
)

export const marginLeft = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (marginLeft) => ({ marginLeft })
)

export const marginRight = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (marginRight) => ({ marginRight })
)

export const marginTop = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (marginTop) => ({ marginTop })
)

export const marginBottom = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (marginBottom) => ({ marginBottom })
)

export const margin0 = style({ margin: 0 })

export type TextVariants =
  | "body"
  | "lead"
  | "superHeading"
  | "heading"
  | "subhead"
  | "subheadSmall"
  | "kicker"
  | "caps"
  | "stat"
  | "statLabel"
  | "small"
  | "medium"
  | "mega"
  | "center"
  | "bold"

export const text: Record<TextVariants, string> = styleVariants({
  body: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[2],
      fontWeight: theme.fontWeights.normal,
      lineHeight: theme.lineHeights.text,
      letterSpacing: theme.letterSpacings.normal,
    },
  ],
  lead: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[3],
      fontWeight: theme.fontWeights.normal,
      lineHeight: theme.lineHeights.text,
      letterSpacing: theme.letterSpacings.normal,
    },
  ],
  superHeading: [
    margin0,
    {
      marginTop: theme.space[4],
      marginBottom: theme.space[6],
      fontSize: theme.fontSizes[5],
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.heading,
      letterSpacing: theme.letterSpacings.tight,
      "@media": {
        [media.small]: {
          fontSize: theme.fontSizes[7],
        },
      },
    },
  ],
  heading: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontFamily: theme.fonts.heading,
      fontSize: theme.fontSizes[5],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
      "@media": {
        [media.medium]: {
          fontSize: theme.fontSizes[6],
        },
      },
    },
  ],
  subhead: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[5],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
    },
  ],
  subheadSmall: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[4],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
    },
  ],
  kicker: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontFamily: theme.fonts.mono,
      fontSize: theme.fontSizes[1],
      fontWeight: theme.fontWeights.medium,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.wide,
      textTransform: "uppercase",
    },
  ],
  caps: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontSize: theme.fontSizes[1],
      fontWeight: theme.fontWeights.semibold,
      letterSpacing: theme.letterSpacings.wide,
      textTransform: "uppercase",
      fontStyle: "normal",
    },
  ],
  stat: [
    margin0,
    {
      fontFamily: theme.fonts.mono,
      fontSize: theme.fontSizes[6],
      fontWeight: theme.fontWeights.medium,
      lineHeight: theme.lineHeights.tight,
    },
  ],
  statLabel: [
    margin0,
    {
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes[4],
      lineHeight: theme.lineHeights.heading,
    },
  ],
  small: [
    margin0,
    {
      fontSize: theme.fontSizes[1],
      marginBottom: theme.space[2],
    },
  ],
  medium: [
    margin0,
    {
      fontSize: theme.fontSizes[3],
    },
  ],
  mega: [
    margin0,
    {
      fontSize: "180px",
      fontFamily: theme.fonts.mono,
      lineHeight: theme.lineHeights.solid,
      letterSpacing: theme.letterSpacings.tight,
      "@media": {
        [media.medium]: {
          fontSize: "360px",
        },
      },
    },
  ],
  center: {
    textAlign: "center",
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
})

export const link = style({
  color: "inherit",
  ":hover": {
    color: theme.colors.active,
  },
})

export const navlink = style({
  color: "inherit",
  textDecoration: "none",
  transitionProperty: "color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
  ":hover": {
    color: theme.colors.active,
  },
})

export const navButtonlink = style({
  color: "inherit",
  fontSize: "inherit",
  fontFamily: theme.fonts.text,
  padding: 0,
  background: "none",
  border: "none",
  textDecoration: "none",
  transitionProperty: "color",
  transitionDuration: "0.2s",
  transitionTimingFunction: "ease-in-out",
  ":hover": {
    color: theme.colors.active,
    cursor: "pointer",
  },
})

export const ctaLink = style({
  color: "inherit",
  fontWeight: theme.fontWeights.bold,
  ":hover": {
    color: theme.colors.active,
  },
})

const button = style({
  display: "inline-flex",
  textDecoration: "none",
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes[2],
  lineHeight: theme.lineHeights.solid,
  paddingTop: theme.space[3],
  paddingBottom: theme.space[3],
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  borderRadius: theme.radii.button,
})

export type ButtonVariants = "primary" | "reversed" | "link" | "linkReversed"

export const buttons: Record<ButtonVariants, string> = styleVariants({
  primary: [
    button,
    {
      color: theme.colors.background,
      backgroundColor: theme.colors.primary,
      ":hover": {
        backgroundColor: theme.colors.active,
      },
      ":focus": {
        backgroundColor: theme.colors.active,
      },
    },
  ],
  reversed: [
    button,
    {
      color: theme.colors.primary,
      backgroundColor: theme.colors.background,
      ":hover": {
        color: theme.colors.background,
        backgroundColor: theme.colors.active,
      },
      ":focus": {
        color: theme.colors.background,
        backgroundColor: theme.colors.active,
      },
    },
  ],
  link: [
    button,
    {
      color: "inherit",
      backgroundColor: "transparent",
      ":hover": {
        backgroundColor: theme.colors.muted,
      },
      ":focus": {
        backgroundColor: theme.colors.muted,
      },
    },
  ],
  linkReversed: [
    button,
    {
      color: "inherit",
      backgroundColor: "transparent",
      ":hover": {
        color: theme.colors.primary,
        backgroundColor: theme.colors.muted,
      },
      ":focus": {
        color: theme.colors.primary,
        backgroundColor: theme.colors.muted,
      },
    },
  ],
})

export type Backgrounds = "primary" | "muted"

export const backgrounds: Record<Backgrounds, string> = styleVariants({
  primary: {
    color: theme.colors.background,
    backgroundColor: theme.colors.primary,
  },
  muted: {
    color: theme.colors.primary,
    backgroundColor: theme.colors.muted,
  },
})

export const blockquote = style({
  margin: 0,
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: 0,
  paddingBottom: theme.space[4],
})

export const avatar = style({
  minWidth: 0,
  flexShrink: 0,
  width: theme.sizes.avatar,
  height: theme.sizes.avatar,
  borderRadius: theme.radii.circle,
})

export type LogoSizes = "small" | "medium"

export const logos: Record<LogoSizes, string> = styleVariants({
  small: {
    width: "85px",
    height: "20px",
  },
  medium: {
    maxWidth: "128px",
  },
})

export type IconSizes = "small" | "medium" | "large"

export const icons: Record<IconSizes, string> = styleVariants(
  {
    small: "24px",
    medium: "32px",
    large: "64px",
  },
  (size) => ({
    width: size,
    height: size,
    marginBottom: theme.space[3],
  })
)

export const iconLink = style({
  color: theme.colors.text,
  marginRight: theme.space[3],
  ":hover": {
    color: theme.colors.active,
  },
  ":focus": {
    color: theme.colors.active,
  },
})

export const interactiveIcon = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "transparent",
  border: "none",
  cursor: "pointer",
  width: 48,
  height: 48,
})

export const visuallyHidden = style({
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px",
})

// for debugging only
export const debug = style({
  outline: "1px solid tomato",
})
