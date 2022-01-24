import * as React from 'react'
import { Helmet } from 'react-helmet'

export default function Head ({
  title,
  description,
  image,
  ...props
}) {

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en-us',
      }}>
      <meta charSet='utf-8' />
      <title>{title}</title>
      <meta name='description' property='og:description' content={description} />
      <meta property='og:title' content={title} />
      <meta property='og:image' content={image.url} />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image.url} />
    </Helmet>
  )
}
