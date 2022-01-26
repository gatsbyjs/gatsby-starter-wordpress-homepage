import { createGlobalTheme } from "@vanilla-extract/css"
import { colors } from "./colors.css.ts"

const space = {
  0: 0,
  1: "4px",
  2: "8px",
  3: "16px",
  4: "32px",
  5: "64px",
  6: "128px",
}

const fontSizes = {
  0: "12px",
  1: "14px",
  2: "16px",
  3: "18px",
  4: "24px",
  5: "32px",
  6: "48px",
}

const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
}

const fonts = {
  text: '"DM Sans", sans-serif',
  heading: '"DM Sans", sans-serif',
  serif: '"DM Serif Text", serif',
  mono: "Menlo, monospace",
}

const lineHeights = {
  text: 1.65,
  heading: 1.25,
  tight: 1.1,
}

const letterSpacings = {
  normal: 0,
  tight: "-0.02em",
  wide: "0.08em",
}

const sizes = {
  container: "1280px",
  narrow: "1024px",
  wide: "1280px",
  avatar: "48px",
}

const radii = {
  button: "10px",
  large: "24px",
  circle: "99999px",
}

export const theme = createGlobalTheme(":root", {
  colors,
  space,
  fontSizes,
  fontWeights,
  fonts,
  lineHeights,
  letterSpacings,
  sizes,
  radii,
})
