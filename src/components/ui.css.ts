import { style, styleVariants } from "@vanilla-extract/css"
import { theme } from "../theme.css.ts"

const breakpoints = ["40em", "52em", "64em"]

const mqAliases = ["small", "medium", "large"]
const media = breakpoints
  .map((n) => `screen and (min-width: ${n})`)
  .reduce((a, b, i) => {
    a[mqAliases[i]] = b
    return a
  }, {})

export const mediaQueries = media

export const container = style({
  maxWidth: theme.sizes.container,
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: theme.space[4],
  paddingRight: theme.space[4],
})

export const containers = styleVariants({
  normal: [container],
  wide: [container],
  narrow: [
    container,
    {
      maxWidth: theme.sizes.narrow,
    },
  ],
})

export const flex = style({
  display: "flex",
  alignItems: "center",
})

export const flexVariants = styleVariants({
  wrap: {
    flexWrap: "wrap",
  },
  start: {
    alignItems: "flex-start",
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

export const widths = styleVariants(
  {
    full: "100%",
    half: "50%",
    quarter: "25%",
    third: "33.3333%",
    twothirds: "33.3333%",
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
export const gutter = styleVariants(theme.space, (val) => ({
  marginLeft: `calc(-1 * ${val})`,
  marginRight: `calc(-1 * ${val})`,
}))
export const radii = styleVariants(theme.radii, (borderRadius) => ({
  borderRadius,
}))
export const order = styleVariants([0, 1, 2, 3], (order) => ({ order }))
export const box = styleVariants({
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
})

export const section = style({
  paddingTop: theme.space[5],
  paddingBottom: theme.space[5],
})

export const margin = styleVariants(
  {
    ...theme.space,
    auto: "auto",
  },
  (margin) => ({ margin })
)

export const margin0 = style({ margin: 0 })

export const text = styleVariants({
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
  heading: [
    margin0,
    {
      marginBottom: theme.space[3],
      fontSize: theme.fontSizes[6],
      fontWeight: theme.fontWeights.extrabold,
      lineHeight: theme.lineHeights.tight,
      letterSpacing: theme.letterSpacings.tight,
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
  kicker: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontSize: theme.fontSizes[2],
      fontWeight: theme.fontWeights.semibold,
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
  serif: [
    margin0,
    {
      marginBottom: theme.space[2],
      fontFamily: theme.fonts.serif,
      fontSize: theme.fontSizes[6],
      lineHeight: theme.lineHeights.tight,
    },
  ],
  small: [
    margin0,
    {
      fontSize: theme.fontSizes[1],
      marginBottom: theme.space[2],
    },
  ],
  center: {
    textAlign: "center",
  },
  bold: {
    fontWeight: theme.fontWeights.bold,
  },
})

export const navlink = style({
  color: "inherit",
  textDecoration: "none",
  ":hover": {
    color: theme.colors.black,
  },
})

export const ctaLink = style({
  color: "inherit",
  fontWeight: theme.fontWeights.bold,
  ":hover": {
    color: theme.colors.black,
  },
})

const button = style({
  display: "inline-flex",
  textDecoration: "none",
  fontWeight: theme.fontWeights.bold,
  fontSize: theme.fontSizes[2],
  lineHeight: 1,
  paddingTop: theme.space[3],
  paddingBottom: theme.space[3],
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  borderRadius: theme.radii.button,
})

export const buttons = styleVariants({
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

export const backgrounds = styleVariants({
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

export const logos = styleVariants({
  small: {
    width: "85px",
    height: "20px",
  },
  medium: {
    maxWidth: "128px",
  },
})

export const icons = styleVariants(
  {
    small: "24px",
    medium: "32px",
    large: "64px",
  },
  (size) => ({
    width: size,
    height: size,
    marginBottom: theme.space[2],
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
})

// for debugging only
export const debug = style({
  outline: "1px solid tomato",
})
