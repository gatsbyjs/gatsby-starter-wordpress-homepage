import * as React from "react"
import { Link as GatsbyLink } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import isAbsoluteURL from "is-absolute-url"
import * as styles from "./ui.css.ts"

export const cx = (...args) => args.filter(Boolean).join(" ")

export function Base({
  as: Component = "div",
  cx: _cx = [],
  className,
  ...props
}) {
  return <Component className={cx(..._cx, className)} {...props} />
}

export function Container({ width = "normal", ...props }) {
  return <Base cx={[styles.containers[width]]} {...props} />
}

export function Flex({
  variant,
  gap = 3,
  gutter,
  wrap,
  responsive,
  cx: _cx,
  ...props
}) {
  return (
    <Base
      cx={[
        styles.flex,
        styles.flexVariants[variant],
        responsive && styles.flexVariants.responsive,
        wrap && styles.flexVariants.wrap,
        gutter && styles.gutter[gutter],
        gutter ? styles.flexGap[0] : styles.flexGap[gap],
        _cx,
      ]}
      {...props}
    />
  )
}

export function Box({
  width = "full",
  background,
  padding,
  paddingY,
  radius,
  center = false,
  order,
  cx,
  ...props
}) {
  return (
    <Base
      cx={[
        styles.widths[width],
        styles.backgrounds[background],
        styles.padding[padding],
        styles.paddingY[paddingY],
        styles.radii[radius],
        center && styles.box.center,
        order && styles.order[order],
        cx,
      ]}
      {...props}
    />
  )
}

export function FlexList({ ...props }) {
  return <Flex as="ul" cx={[styles.list]} {...props} />
}

export function List(props) {
  return <Base as="ul" cx={[styles.list]} {...props} />
}

export function Space({ className, size = "auto", ...props }) {
  return <Base className={cx(styles.margin[size], className)} {...props} />
}

export function Section(props) {
  return <Box as="section" cx={styles.section} {...props} />
}

export function Text({ variant = "body", center, bold, ...props }) {
  return (
    <Base
      cx={[
        styles.text[variant],
        center && styles.text.center,
        bold && styles.text.bold,
      ]}
      {...props}
    />
  )
}

export function Heading({ ...props }) {
  return <Text as="h2" variant="heading" {...props} />
}

export function Subhead({ ...props }) {
  return <Text as="h3" variant="subhead" {...props} />
}

export function Kicker({ ...props }) {
  return <Text variant="kicker" {...props} />
}

export function Link({ to, href, ...props }) {
  const url = href || to
  if (isAbsoluteURL(url)) {
    return (
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      <a href={url} {...props} />
    )
  }
  return <GatsbyLink to={url} {...props} />
}

export function NavLink({ ...props }) {
  return <Base as={Link} cx={[styles.navlink]} {...props} />
}

export function Button({ variant = "primary", ...props }) {
  return <Base as={Link} cx={[styles.buttons[variant]]} {...props} />
}

export function ButtonList({ links = [], reversed = false, ...props }) {
  const getVariant = (i) => {
    if (reversed) {
      return i === 0 ? "reversed" : "linkReversed"
    }
    return i === 0 ? "primary" : "link"
  }
  return (
    <FlexList {...props}>
      {links &&
        links.map((link, i) => (
          <li key={link.id}>
            <Button href={link.href} variant={getVariant(i)}>
              {link.text}
            </Button>
          </li>
        ))}
    </FlexList>
  )
}

export function CTALink(props) {
  return <Base as={Link} cx={[styles.ctaLink]} {...props} />
}

export function LinkList({ links = [], ...props }) {
  return (
    <FlexList {...props}>
      {links &&
        links.map((link, i) => (
          <li key={link.id}>
            <CTALink href={link.href}>{link.text}</CTALink>
          </li>
        ))}
    </FlexList>
  )
}

export function Blockquote(props) {
  return <Base as="blockquote" cx={[styles.blockquote]} {...props} />
}

export function Avatar({ alt, image }) {
  return (
    <GatsbyImage alt={alt} image={getImage(image)} className={styles.avatar} />
  )
}

export function Logo({ alt, image, size = "small" }) {
  return (
    <GatsbyImage
      alt={alt}
      image={getImage(image)}
      className={styles.logos[size]}
    />
  )
}

export function Icon({ alt, image, size = "medium" }) {
  return (
    <GatsbyImage
      alt={alt}
      image={getImage(image)}
      className={styles.icons[size]}
    />
  )
}

export function IconLink(props) {
  return <NavLink cx={[styles.iconLink]} {...props} />
}

export function InteractiveIcon(props) {
  return <Base as="button" cx={[styles.interactiveIcon]} {...props} />
}
