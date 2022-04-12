import { style, globalStyle } from "@vanilla-extract/css"
import { theme } from "../../src/theme.css"

export const blogPost = style({
  fontSize: theme.fontSizes[3],
})

globalStyle(`${blogPost} img`, {
  maxWidth: "100%",
  height: "auto",
})

globalStyle(`${blogPost} a`, {
  color: "inherit",
  fontWeight: theme.fontWeights.medium,
})

const containedElements = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "pre",
  "ul",
  "ol",
  "dl",
]
  .map((el) => blogPost + " " + el)
  .join(", ")

globalStyle(containedElements, {
  maxWidth: theme.sizes.tight,
  marginLeft: "auto",
  marginRight: "auto",
})

globalStyle(`${blogPost} p`, {
  lineHeight: theme.lineHeights.text,
})

globalStyle(`${blogPost} > p:first-of-type`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h2`, {
  fontSize: theme.fontSizes[5],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h3`, {
  fontSize: theme.fontSizes[4],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h4`, {
  fontSize: theme.fontSizes[3],
  fontWeight: theme.fontWeights.bold,
})

globalStyle(`${blogPost} h5, ${blogPost} h6`, {
  fontSize: theme.fontSizes[2],
  fontWeight: theme.fontWeights.bold,
})
