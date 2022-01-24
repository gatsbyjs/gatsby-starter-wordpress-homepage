import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  Section,
  FlexList,
  Text,
  Kicker,
  Heading,
  Flex,
  Box,
  Icon,
  ButtonList,
} from "./ui"

function Stat(props) {
  return (
    <Box>
      <Text variant="serif">{props.value}</Text>
      <Text>{props.label}</Text>
    </Box>
  )
}

export default function StatList(props) {
  return (
    <Container>
      <Section padding={5} radius="large" background="primary">
        <Flex responsive>
          <Box width="half">
            {props.icon && <Icon alt={props.icon.alt} image={props.icon} />}
            <Heading>
              {props.kicker && <Kicker>{props.kicker}</Kicker>}
              {props.heading}
            </Heading>
            {props.text && <Text variant="lead">{props.text}</Text>}
            <FlexList gap={5}>
              {props.content.map((stat) => (
                <li key={stat.id}>
                  <Stat {...stat} />
                </li>
              ))}
            </FlexList>
            <ButtonList links={props.links} reversed />
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
      </Section>
    </Container>
  )
}

export const query = graphql`
  fragment HomepageStatListContent on HomepageStatList {
    id
    kicker
    heading
    text
    image {
      id
      gatsbyImageData
    }
    icon {
      id
      gatsbyImageData
    }
    content {
      id
      value
      label
      heading
    }
    links {
      id
      href
      text
    }
  }
`
