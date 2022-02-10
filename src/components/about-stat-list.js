import * as React from "react"
import { graphql } from "gatsby"
import { Container, Section, FlexList, Box, Text } from "./ui"
import * as styles from "./about-stat-list.css.ts"

function AboutStat(props) {
  return (
    <Box width="fitContent" className={styles.statContainer}>
      {props.value && <Text className={styles.statHeader}>{props.value}</Text>}
      {props.label && <Text className={styles.statKicker}>{props.label}</Text>}
    </Box>
  )
}

export default function AboutStatList(props) {
  return (
    <Container>
      <Section>
        <FlexList className={styles.statList} variant="center" responsive>
          {props.content.map((stat) => (
            <AboutStat key={stat.id} {...stat} />
          ))}
        </FlexList>
      </Section>
    </Container>
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
