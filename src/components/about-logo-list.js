import * as React from "react"
import { graphql } from "gatsby"
import { Container, CTALink, Heading, FlexList, Section, Box } from "./ui"
import { LogoItem } from "./logo-list"

export default function AboutLogoList(props) {
  return (
    <Container>
      <Section>
        <Box center>
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
          {props.link && (
            <CTALink href={props.link.href}>{props.link.text}</CTALink>
          )}
        </Box>
        <Box padding={6}>
          <FlexList gap={5} variant="center">
            {props.logos.map((logo) => (
              <li key={logo.id}>
                <LogoItem {...logo} />
              </li>
            ))}
          </FlexList>
        </Box>
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment AboutLogoListContent on AboutLogoList {
    id
    heading
    link {
      href
      text
    }
    logos {
      id
      alt
      image {
        id
        gatsbyImageData
        alt
      }
    }
  }
`
