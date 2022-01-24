import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, Box, Kicker, Heading, Text } from "./ui"
import Feature from "./feature"

export default function FeatureList(props) {
  return (
    <Container>
      <Section background="muted" radius="large">
        <Box center>
          <Heading>
            {props.kicker && <Kicker>{props.kicker}</Kicker>}
            {props.heading}
          </Heading>
          {props.text && <Text>{props.text}</Text>}
        </Box>
        {props.content.map((feature, i) => (
          <Feature key={feature.id} {...feature} flip={i % 2} />
        ))}
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageFeatureListContent on HomepageFeatureList {
    id
    kicker
    heading
    text
    content {
      id
      ...HomepageFeatureContent
    }
  }
`
