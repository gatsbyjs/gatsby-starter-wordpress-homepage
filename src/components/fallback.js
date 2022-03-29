export default function Fallback({ blocktype }) {
  console.warn(`No component found for: ${blocktype}`)
  return null
}
