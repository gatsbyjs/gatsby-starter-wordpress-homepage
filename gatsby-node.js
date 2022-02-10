exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "blocktype",
    extend(options) {
      return {
        resolve(source) {
          return source.internal.type.replace("Wp", "Homepage")
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "recursiveImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source
        },
      }
    },
  })

  actions.createFieldExtension({
    name: "proxyImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp")
          const file = context.nodeModel.getNodeById(source.localFile)
          const image = context.nodeModel.getNodeById({
            id: file.children[0],
          })
          const resolver = imageType.getFields().gatsbyImageData.resolve
          if (!resolver) return null
          return await resolver(image, args, context, info)
        },
      }
    },
  })

  // abstract interfaces
  actions.createTypes(/* GraphQL */ `
    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }

    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: JSON @proxyImage
      image: HomepageImage @recursiveImage
      localFile: File
      url: String
    }

    interface HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage
    }

    interface HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
    }

    interface HomepageProduct implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage
      links: [HomepageLink]
    }

    interface LayoutHeader implements Node {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink]
      cta: HomepageLink
    }

    enum SocialService {
      TWITTER
      FACEBOOK
      INSTAGRAM
      YOUTUBE
      LINKEDIN
      GITHUB
      DISCORD
      TWITCH
    }

    interface LayoutFooter implements Node {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink]
      meta: [HomepageLink]
      socialLinks: [SocialLink]
      copyright: String
    }

    interface Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage
      html: String
    }
  `)

  // creating custom types because WP does not provide these
  actions.createTypes(/* GraphQL */ `
    type HomepageLink implements Node {
      id: ID!
      href: String
      text: String
    }

    type HomepageHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String!
      kicker: String
      subhead: String
      image: HomepageImage @link
      text: String
      links: [HomepageLink] @link
    }

    type HomepageCta implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      links: [HomepageLink] @link
      image: HomepageImage @link
    }

    type HomepageFeatureList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageFeature] @link
    }

    type HomepageLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      text: String
      logos: [HomepageImage] @link
    }

    type HomepageTestimonialList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      content: [HomepageTestimonial] @link
    }

    type HomepageBenefitList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      content: [HomepageBenefit] @link
    }

    type HomepageStat implements Node {
      id: ID!
      value: String
      label: String
      heading: String
    }

    type HomepageStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      image: HomepageImage @link
      icon: HomepageImage @link
      content: [HomepageStat] @link
      links: [HomepageLink] @link
    }

    type HomepageProductList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      text: String
      content: [HomepageProduct] @link
    }

    type Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link
    }
  `)

  actions.createTypes(/* GraphQL */ `
    type WpMediaItem implements Node & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      gatsbyImageData: JSON @proxyImage
      image: HomepageImage @recursiveImage
      localFile: File
      url: String @proxy(from: "mediaItemUrl")
      mediaItemUrl: String
    }

    type WpBenefit implements Node & HomepageBenefit {
      heading: String @proxy(from: "benefit.heading")
      text: String @proxy(from: "benefit.text")
      image: HomepageImage @link @proxy(from: "benefit.image.id")
    }

    type WpProduct implements Node & HomepageProduct {
      heading: String @proxy(from: "product.heading")
      text: String @proxy(from: "product.text")
      image: HomepageImage @link @proxy(from: "product.image.id")
      links: [HomepageLink] @link @proxy(from: "fields.links")
    }

    type WpFeature implements Node & HomepageFeature & HomepageBlock {
      id: ID!
      blocktype: String @blocktype
      feature: JSON
      heading: String @proxy(from: "feature.heading")
      kicker: String @proxy(from: "feature.kicker")
      text: String @proxy(from: "feature.text")
      image: HomepageImage @link @proxy(from: "feature.image.id")
      links: [HomepageLink] @proxy(from: "fields.links") @link
      feature: JSON
    }

    type WpTestimonial implements Node & HomepageTestimonial {
      quote: String @proxy(from: "testimonial.quote")
      source: String @proxy(from: "testimonial.source")
      avatar: HomepageImage @link @proxy(from: "testimonial.avatar.id")
    }

    type WpPage implements Node & Page {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage @link @proxy(from: "featuredImageId")
      content: String
      html: String @proxy(from: "content")
    }
  `)

  // Layout types
  actions.createTypes(/* GraphQL */ `
    type WpHeader implements Node & LayoutHeader {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink] @link @proxy(from: "fields.links")
      cta: HomepageLink @link @proxy(from: "fields.cta")
    }

    type SocialLink implements Node {
      id: ID!
      username: String!
      service: SocialService!
    }

    type WpFooter implements Node & LayoutFooter {
      id: ID!
      contentTypeName: String!
      links: [HomepageLink] @link @proxy(from: "fields.links")
      meta: [HomepageLink] @link @proxy(from: "fields.meta")
      socialLinks: [SocialLink] @link @proxy(from: "fields.socialLinks")
      copyright: String @proxy(from: "footer.copyright")
    }

    type Layout implements Node {
      id: ID!
      header: LayoutHeader @link(by: "contentTypeName")
      footer: LayoutFooter @link(by: "contentTypeName")
    }
  `)
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  actions.createNode({
    id: createNodeId("HomepageLayout"),
    internal: {
      type: "Layout",
      contentDigest: createContentDigest("Layout"),
    },
    header: "header",
    footer: "footer",
  })
}

exports.onCreateNode = ({
  actions,
  node,
  createNodeId,
  createContentDigest,
}) => {
  if (!node.internal.type.includes("Wp")) return

  const createLinkNode =
    (parentId) =>
    ({ title, url }, i) => {
      const linkID = createNodeId(`${parentId} >>> HomepageLink ${i}`)
      actions.createNode({
        id: linkID,
        internal: {
          type: "HomepageLink",
          contentDigest: createContentDigest(JSON.stringify({ title, url })),
        },
        href: url,
        text: title,
      })
      return linkID
    }

  switch (node.internal.type) {
    case "WpPage":
      if (node.slug !== "homepage") return
      const {
        homepageHero,
        homepageCta,
        statList,
        testimonialList,
        productList,
        logoList,
        featureList,
        benefitList,
      } = node

      const heroID = createNodeId(`${node.id} >>> HomepageHero`)
      const ctaID = createNodeId(`${node.id} >>> HomepageCta`)
      const statsID = createNodeId(`${node.id} >>> HomepageStatList`)
      const testimonialsID = createNodeId(
        `${node.id} >>> HomepageTestimonialList`
      )
      const productsID = createNodeId(`${node.id} >>> HomepageProductList`)
      const logosID = createNodeId(`${node.id} >>> HomepageLogoList`)
      const featuresID = createNodeId(`${node.id} >>> HomepageFeatureList`)
      const benefitsID = createNodeId(`${node.id} >>> HomepageBenefitList`)

      actions.createNode({
        id: heroID,
        internal: {
          type: "HomepageHero",
          contentDigest: createContentDigest(JSON.stringify(homepageHero)),
        },
        parent: node.id,
        blocktype: "HomepageHero",
        image: homepageHero.heroImage.id,
        kicker: homepageHero.heroKicker,
        heading: homepageHero.heroHeading,
        text: homepageHero.heroText,
        links: [homepageHero.heroLink, homepageHero.heroSecondaryLink]
          .filter(Boolean)
          .map(createLinkNode(heroID)),
      })

      actions.createNode({
        id: ctaID,
        internal: {
          type: "HomepageCta",
          contentDigest: createContentDigest(JSON.stringify(homepageCta)),
        },
        parent: node.id,
        blocktype: "HomepageCta",
        heading: homepageCta.ctaHeading,
        text: homepageCta.ctaText,
        links: [homepageCta.ctaLink, homepageCta.ctaSecondaryLink]
          .filter(Boolean)
          .map(createLinkNode(ctaID)),
        image: homepageCta.ctaImage.id,
      })

      actions.createNode({
        id: statsID,
        internal: {
          type: "HomepageStatList",
          contentDigest: createContentDigest(JSON.stringify(statList)),
        },
        parent: node.id,
        blocktype: "HomepageStatList",
        kicker: statList.statsKicker,
        heading: statList.statsHeading,
        text: statList.statsText,
        links: [
          statList.statsLink && createLinkNode(statsID)(statList.statsLink),
        ].filter(Boolean),
        icon: statList.statsIcon.id,
        image: statList.statsImage.id,
        content: [
          {
            value: statList.stat1,
            label: statList.stat1label,
          },
          {
            value: statList.stat2,
            label: statList.stat2label,
          },
          {
            value: statList.stat3,
            label: statList.stat3label,
          },
        ].map((stat) => {
          const id = createNodeId(`${statsID} >>> HomepageStat`)
          actions.createNode({
            ...stat,
            id,
            internal: {
              type: "HomepageStat",
              contentDigest: createContentDigest(stat),
            },
          })
          return id
        }),
      })

      actions.createNode({
        id: testimonialsID,
        internal: {
          type: "HomepageTestimonialList",
          contentDigest: createContentDigest(JSON.stringify(testimonialList)),
        },
        parent: node.id,
        blocktype: "HomepageTestimonialList",
        kicker: testimonialList.testimonialsKicker,
        heading: testimonialList.testimonialsHeading,
        content: [
          testimonialList.testimonial1.id,
          testimonialList.testimonial2.id,
          testimonialList.testimonial3.id,
          testimonialList.testimonial4.id,
        ],
      })

      actions.createNode({
        id: productsID,
        internal: {
          type: "HomepageProductList",
          contentDigest: createContentDigest(JSON.stringify(productList)),
        },
        parent: node.id,
        blocktype: "HomepageProductList",
        kicker: productList.productsKicker,
        heading: productList.productsHeading,
        content: [
          productList.product1,
          productList.product2,
          productList.product3,
        ].map((product) => product.id),
      })

      actions.createNode({
        id: logosID,
        internal: {
          type: "HomepageLogoList",
          contentDigest: createContentDigest(JSON.stringify(logoList)),
        },
        parent: node.id,
        blocktype: "HomepageLogoList",
        text: logoList.logosText,
        logos: [
          logoList.logo1,
          logoList.logo2,
          logoList.logo3,
          logoList.logo4,
          logoList.logo5,
        ].map((logo) => logo.id),
      })

      actions.createNode({
        id: featuresID,
        internal: {
          type: "HomepageFeatureList",
          contentDigest: createContentDigest(JSON.stringify(featureList)),
        },
        parent: node.id,
        blocktype: "HomepageFeatureList",
        kicker: featureList.featuresKicker,
        heading: featureList.featuresHeading,
        text: featureList.featuresText,
        content: [featureList.feature1.id, featureList.feature2.id],
      })

      actions.createNode({
        id: benefitsID,
        internal: {
          type: "HomepageBenefitList",
          contentDigest: createContentDigest(JSON.stringify(benefitList)),
        },
        parent: node.id,
        blocktype: "HomepageBenefitList",
        heading: benefitList.benefitsHeading,
        text: benefitList.benefitsText,
        content: [
          benefitList.benefit1.id,
          benefitList.benefit2.id,
          benefitList.benefit3.id,
        ],
      })

      actions.createNode({
        ...node,
        id: createNodeId(`${node.id} >>> Homepage`),
        internal: {
          type: "Homepage",
          contentDigest: node.internal.contentDigest,
        },
        parent: node.id,
        blocktype: "Homepage",
        image: node.featuredImageId,
        content: [
          heroID,
          logosID,
          productsID,
          featuresID,
          benefitsID,
          statsID,
          testimonialsID,
          ctaID,
        ],
      })

      break
    case "WpFeature":
      if (node.feature.link) {
        const linkID = createLinkNode(node.id)(node.feature.link, 0)
        actions.createNodeField({
          node,
          name: "links",
          value: [linkID],
        })
      }
      break
    case "WpProduct":
      if (node.product.link) {
        const linkID = createLinkNode(node.id)(node.product.link, 0)
        actions.createNodeField({
          node,
          name: "links",
          value: [linkID],
        })
      }
      break
    case "WpHeader":
      const { header } = node
      const headerLinks = [
        header.link1,
        header.link2,
        header.link3,
        header.link4,
        header.link5,
      ].map(createLinkNode(node.id))
      const headerCta = createLinkNode(node.id)(header.cta, 9999)
      actions.createNodeField({
        node,
        name: "links",
        value: headerLinks,
      })
      actions.createNodeField({
        node,
        name: "cta",
        value: headerCta,
      })
      break
    case "WpFooter":
      const { footer } = node
      const footerLinks = [
        footer.link1,
        footer.link2,
        footer.link3,
        footer.link4,
        footer.link5,
      ].map(createLinkNode(node.id))
      // TODO currently hard-coded to only these social networks
      const socialLinks = [
        { username: footer.twitter, service: "TWITTER" },
        { username: footer.twitch, service: "TWITCH" },
        { username: footer.instagram, service: "INSTAGRAM" },
        { username: footer.github, service: "GITHUB" },
        { username: footer.youtube, service: "YOUTUBE" },
        { username: footer.facebook, service: "FACEBOOK" },
      ].map((link, i) => {
        const id = createNodeId(`${node.id} >>> SocialLink ${i}`)
        actions.createNode({
          ...link,
          id,
          internal: {
            type: "SocialLink",
            contentDigest: createContentDigest(JSON.stringify(link)),
          },
        })
        return id
      })
      const metaLinks = [footer.termsLink, footer.privacyPolicyLink].map(
        createLinkNode(node.id)
      )
      actions.createNodeField({
        node,
        name: "links",
        value: footerLinks,
      })
      actions.createNodeField({
        node,
        name: "socialLinks",
        value: socialLinks,
      })
      actions.createNodeField({
        node,
        name: "meta",
        value: metaLinks,
      })
      break
  }
}
