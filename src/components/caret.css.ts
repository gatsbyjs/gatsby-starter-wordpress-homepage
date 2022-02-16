import { style, styleVariants } from "@vanilla-extract/css"
const caretBase = style({
  transitionProperty: "transform",
  transitionDuration: "0.15s",
  transitionTimingFunction: "ease-in-out",
})

export const caret = styleVariants({
  up: [caretBase, { transform: "rotate(-180deg)" }],
  right: [caretBase, { transform: "rotate(90deg)" }],
  left: [caretBase, { transform: "rotate(-90deg)" }],
  down: [caretBase],
})
