import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, FlexList, Box, Text } from "./ui"
import * as styles from "./about-stat-list.css"

function AboutStat(props) {
  return (
    <Box width="fitContent" className={styles.statContainer}>
      {props.value && <Text variant="stat">{props.value}</Text>}
      {props.label && <Text variant="statLabel">{props.label}</Text>}
    </Box>
  )
}

export default function AboutStatList(props) {
  return (
    <Section>
      <Container>
        <FlexList className={styles.statList} variant="center" responsive>
          {props.content.map((stat) => (
            <AboutStat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Container>
    </Section>
  )
}

export const query = graphql`
  fragment AboutStatListContent on AboutStatList {
    id
    content {
      id
      value
      label
    }
  }
`
