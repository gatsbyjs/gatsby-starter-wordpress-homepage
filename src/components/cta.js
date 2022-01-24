import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Container, Section, Heading, Text, ButtonList } from "./ui"

export default function HomepageCta(props) {
  return (
    <Container>
      <Section padding={5} radius="large" background="primary">
        <Heading center>{props.heading}</Heading>
        <Text as="p" center variant="lead">
          {props.text}
        </Text>
        <ButtonList links={props.links} variant="center" reversed />
        {props.image && (
          <GatsbyImage alt={props.image.alt} image={getImage(props.image)} />
        )}
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageCtaContent on HomepageCta {
    id
    heading
    text
    image {
      id
      gatsbyImageData
    }
    links {
      id
      href
      text
    }
  }
`
