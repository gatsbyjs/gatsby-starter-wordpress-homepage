import * as React from "react"
import { caret } from "./caret.css"

export default function CaretDown({ direction = "down", size = 9 }) {
  const width = size
  const height = (8 / 9) * size

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={caret[direction]}
    >
      <path
        d="M4.93301 7.25C4.74056 7.58333 4.25944 7.58333 4.06699 7.25L0.602886 1.25C0.410435 0.916666 0.650998 0.499999 1.0359 0.499999L7.9641 0.5C8.349 0.5 8.58957 0.916666 8.39712 1.25L4.93301 7.25Z"
        fill="currentColor"
      />
    </svg>
  )
}
