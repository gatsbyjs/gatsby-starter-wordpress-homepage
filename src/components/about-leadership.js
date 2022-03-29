import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import {
  Container,
  FlexList,
  Heading,
  Section,
  Text,
  Box,
  Kicker,
  Space,
} from "./ui"

function AboutProfile(props) {
  return (
    <Box width="third" padding={4} center>
      {props.image && (
        <GatsbyImage
          alt={props.image.alt}
          image={getImage(props.image.gatsbyImageData)}
        />
      )}
      <Space size={3} />
      <Box>
        {props.name && (
          <Text variant="medium" bold center>
            {props.name}
          </Text>
        )}
        {props.jobTitle && (
          <Text variant="medium" center>
            {props.jobTitle}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default function AboutLeadership(props) {
  return (
    <Section>
      <Container width="tight">
        <Box center paddingY={4}>
          {props.kicker && <Kicker>{props.kicker}</Kicker>}
          {props.heading && <Heading as="h1">{props.heading}</Heading>}
          {props.subhead && <Text>{props.subhead}</Text>}
        </Box>
        <FlexList gap={0} variant="center" alignItems="start">
          {props.content.map((profile) => (
            <AboutProfile key={profile.id} {...profile} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment AboutLeadershipContent on AboutLeadership {
    id
    kicker
    heading
    subhead
    content {
      id
      name
      jobTitle
      image {
        gatsbyImageData
        alt
      }
    }
  }
`
