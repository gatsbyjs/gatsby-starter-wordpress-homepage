import * as React from "react"
import Layout from "../components/layout"
import { Container, Box, Heading, Text, Link } from "../components/ui"

export default function NotFound(props) {
  return (
    <Layout title="404: Page not found">
      <Box paddingY={4}>
        <Container>
          <Heading variant="mega">404</Heading>
          <Heading as="h1">Page not found</Heading>
          <Text variant="lead">
            Sorry! We couldn’t find the page you were looking for.
            <br />
            <Link to="/">Back to home</Link>
          </Text>
        </Container>
      </Box>
    </Layout>
  )
}
