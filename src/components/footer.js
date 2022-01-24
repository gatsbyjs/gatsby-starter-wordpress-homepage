import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import {
  Container,
  Flex,
  FlexList,
  Box,
  Space,
  NavLink,
  Logo,
  Text,
} from "./ui"

const socialMedia = {
  TWITTER: {
    url: "https://twitter.com",
    name: "Twitter",
  },
  INSTAGRAM: {
    url: "https://instagram.com",
    name: "Instagram",
  },
  FACEBOOK: {
    url: "https://facebook.com",
    name: "Facebook",
  },
  YOUTUBE: {
    url: "https://youtube.com",
    name: "YouTube",
  },
  LINKEDIN: {
    url: "https://linkedin.com",
    name: "LinkedIn",
  },
  GITHUB: {
    url: "https://github.com",
    name: "GitHub",
  },
  // TODO: determine correct URLs for Discord
  DISCORD: {
    url: "https://discord.com",
    name: "Discord",
  },
  TWITCH: {
    url: "https://twitch.tv",
    name: "Twitch",
  },
}

const getSocialURL = ({ service, username }) => {
  const domain = socialMedia[service]?.url
  if (!domain) return false
  return `${domain}/${username}`
}

const getSocialName = ({ service }) => {
  return socialMedia[service]?.name
}

export default function Footer(props) {
  const data = useStaticQuery(graphql`
    query {
      layout {
        footer {
          id
          logo {
            id
            gatsbyImageData
          }
          links {
            id
            href
            text
          }
          meta {
            id
            href
            text
          }
          copyright
          socialLinks {
            id
            service
            username
          }
        }
      }
    }
  `)

  const { logo, links, meta, socialLinks, copyright } = data.layout.footer

  return (
    <Box as="footer" paddingY={4}>
      <Container>
        <Flex>
          {logo && <Logo image={logo} />}
          <Space />
          <FlexList>
            {meta &&
              meta.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>{link.text}</NavLink>
                </li>
              ))}
          </FlexList>
          <FlexList>
            {socialLinks &&
              socialLinks.map((link) => {
                const url = getSocialURL(link)
                return (
                  url && (
                    <li key={link.id}>
                      <NavLink to={getSocialURL(link)}>
                        {getSocialName(link)}
                      </NavLink>
                    </li>
                  )
                )
              })}
          </FlexList>
        </Flex>
        <Space size={5} />
        <Flex>
          <FlexList>
            {links &&
              links.map((link) => (
                <li key={link.id}>
                  <NavLink to={link.href}>{link.text}</NavLink>
                </li>
              ))}
          </FlexList>
          <Space />
          <Text variant="small">{copyright}</Text>
        </Flex>
      </Container>
      <Space size={3} />
    </Box>
  )
}
