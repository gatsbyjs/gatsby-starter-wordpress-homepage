import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Menu, X } from "react-feather"
import {
  Container,
  Flex,
  FlexList,
  Space,
  NavLink,
  Button,
  InteractiveIcon,
  Nudge,
} from "./ui"
import {
  mobileNavOverlay,
  mobileNavLink,
  desktopHeaderNavWrapper,
  mobileHeaderNavWrapper,
  mobileNavSVGColorWrapper,
} from "./header.css.ts"
import BrandLogo from "./brand-logo"

export default function Header() {
  const data = useStaticQuery(graphql`
    query {
      layout {
        header {
          id
          links {
            id
            href
            text
          }
          cta {
            id
            href
            text
          }
        }
      }
    }
  `)

  const { links, cta } = data.layout.header

  const [isOpen, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = "hidden"
    } else {
      document.body.style.overflowY = "visible"
    }
  }, [isOpen])

  return (
    <header>
      <Container className={desktopHeaderNavWrapper}>
        {/* Desktop / Tablet - Header / Nav */}
        <Space size={2} />
        <Flex>
          <NavLink to="/">
            <BrandLogo />
          </NavLink>
          <nav>
            <FlexList>
              {links &&
                links.map((link) => (
                  <li key={link.id}>
                    <NavLink to={link.href}>{link.text}</NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
          <Space />
          <div>{cta && <Button to={cta.href}>{cta.text}</Button>}</div>
        </Flex>
      </Container>
      {/* Mobile - Header / Nav */}
      <Container className={mobileHeaderNavWrapper[isOpen ? "open" : "closed"]}>
        <Space size={2} />
        <Flex variant="spaceBetween">
          <span
            className={
              mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
            }
          >
            <BrandLogo />
          </span>
          <Flex>
            <Space />
            <div>
              {cta && (
                <Button to={cta.href} variant={isOpen ? "reversed" : "primary"}>
                  {cta.text}
                </Button>
              )}
            </div>
            <Nudge right={3}>
              <InteractiveIcon
                title="Toggle menu"
                onClick={() => setOpen(!isOpen)}
                className={
                  mobileNavSVGColorWrapper[isOpen ? "reversed" : "primary"]
                }
              >
                {isOpen ? <X /> : <Menu />}
              </InteractiveIcon>
            </Nudge>
          </Flex>
        </Flex>
      </Container>
      {isOpen && (
        <div className={mobileNavOverlay}>
          <nav>
            <FlexList responsive variant="stretch">
              {links &&
                links.map((link) => (
                  <li key={link.id}>
                    <NavLink to={link.href} className={mobileNavLink}>
                      {link.text}
                    </NavLink>
                  </li>
                ))}
            </FlexList>
          </nav>
        </div>
      )}
    </header>
  )
}
