import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  Flex,
  Box,
  Heading,
  Kicker,
  Text,
  ButtonList,
} from "./ui"

// TODO add prop for reversed order
export default function Feature(props) {
  return (
    <Section background="muted">
      <Container>
        <Flex gap={4} variant="responsive">
          <Box width="half" order={props.flip ? 1 : null}>
            <Heading>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Heading>
            <Text variant="lead">{props.text}</Text>
            <ButtonList links={props.links} />
          </Box>
          <Box width="half">
            {props.image && (
              <GatsbyImage
                alt={props.image.alt}
                image={getImage(props.image)}
              />
            )}
          </Box>
        </Flex>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment HomepageFeatureContent on HomepageFeature {
    id
    kicker
    heading
    text
    links {
      id
      href
      text
    }
    image {
      id
      gatsbyImageData
      alt
    }
  }
`
