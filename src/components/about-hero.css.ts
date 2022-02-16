import { style } from "@vanilla-extract/css"
import { theme } from "../theme.css"

// specific maxWidths are to support design and
// current length of content in the Header and Text
export const aboutHeroHeader = style({
  maxWidth: "1108px",
})

export const aboutHeroText = style({
  fontSize: theme.fontSizes[4],
  marginBottom: theme.space[6],
  maxWidth: "798px",
})

export const aboutHeroImage = style({
  width: "100%",
})
