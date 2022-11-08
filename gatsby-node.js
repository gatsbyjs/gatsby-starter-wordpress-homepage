const { getGatsbyImageResolver } = require("gatsby-plugin-image/graphql-utils")

exports.createSchemaCustomization = async ({ actions }) => {
  actions.createFieldExtension({
    name: "wpImagePassthroughResolver",
    extend(options) {
      const { args } = getGatsbyImageResolver()
      return {
        args,
        async resolve(source, args, context, info) {
          const imageType = info.schema.getType("ImageSharp")
          const file = context.nodeModel.getNodeById({
            id: source.localFile?.id,
          })
          if (!file) return null
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

  actions.createFieldExtension({
    name: "wpRecursiveImage",
    extend(options) {
      return {
        async resolve(source, args, context, info) {
          return source
        },
      }
    },
  })

  // interfaces
  actions.createTypes(/* GraphQL */ `
    interface HomepageImage implements Node {
      id: ID!
      alt: String
      gatsbyImageData: GatsbyImageData @wpImagePassthroughResolver
      image: HomepageImage
      localFile: File
      url: String
    }

    interface HomepageBlock implements Node {
      id: ID!
      blocktype: String
    }
  `)

  // blocks
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
      kicker: String
      heading: String
      text: String
      links: [HomepageLink] @link
      image: HomepageImage @link
    }

    type HomepageFeature implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      kicker: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
    }

    type HomepageTestimonial implements Node {
      id: ID!
      quote: String
      source: String
      avatar: HomepageImage @link
    }

    type HomepageBenefit implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link
    }

    type HomepageLogo implements Node {
      id: ID!
      image: HomepageImage @link
      alt: String @proxy(from: "image.title")
    }

    type HomepageProduct implements Node {
      id: ID!
      heading: String
      text: String
      image: HomepageImage @link
      links: [HomepageLink] @link
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

    type AboutHero implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      text: String
      image: HomepageImage @link
    }

    type AboutStat implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      value: String
      label: String
    }

    type AboutStatList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      content: [AboutStat] @link
    }

    type AboutProfile implements Node {
      id: ID!
      image: HomepageImage @link
      name: String
      jobTitle: String
    }

    type AboutLeadership implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      kicker: String
      heading: String
      subhead: String
      content: [AboutProfile] @link
    }

    type AboutLogoList implements Node & HomepageBlock {
      id: ID!
      blocktype: String
      heading: String
      links: [HomepageLink] @link
      logos: [HomepageImage] @link
    }
  `)

  // pages
  actions.createTypes(/* GraphQL */ `
    type Homepage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link
    }

    type AboutPage implements Node {
      id: ID!
      title: String
      description: String
      image: HomepageImage @link
      content: [HomepageBlock] @link
    }

    type Page implements Node {
      id: ID!
      slug: String!
      title: String
      description: String
      image: HomepageImage @link
      html: String
    }
  `)

  // WordPress types
  actions.createTypes(/* GraphQL */ `
    type WpMediaItem implements Node & RemoteFile & HomepageImage {
      id: ID!
      alt: String @proxy(from: "altText")
      altText: String
      gatsbyImageData: GatsbyImageData @wpImagePassthroughResolver
      image: HomepageImage @wpRecursiveImage
      localFile: File
      url: String @proxy(from: "mediaItemUrl")
      mediaItemUrl: String
    }
  `)
}

exports.onCreateNode = ({
  node,
  actions,
  getNode,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  if (!node.internal.type.includes("Wp")) return

  const createLinkNode =
    (parent) =>
    ({ url, title, ...rest }, i) => {
      const id = createNodeId(`${parent.id} >>> HomepageLink ${url} ${i}`)
      actions.createNode({
        id,
        internal: {
          type: "HomepageLink",
          contentDigest: createContentDigest({ url, title }),
        },
        href: url,
        text: title,
      })
      return id
    }

  const createItemNode = (parent, type) => (data, i) => {
    const id = createNodeId(`${parent.id} >>> ${type} ${i}`)
    if (data.image) {
      data.image = data.image?.id
    }
    if (data.avatar) {
      data.avatar = data.avatar?.id
    }
    if (Array.isArray(data.link)) {
      data.links = data.link.filter(Boolean).map(createLinkNode(parent))
    }
    actions.createNode({
      ...data,
      id,
      internal: {
        type,
        contentDigest: createContentDigest(data),
      },
    })
    return id
  }

  if (node.internal.type === "WpPage") {
    switch (node.slug) {
      case "homepage":
        // prettier-ignore
        const {
          description,
          hero,
          logoList,
          featureList,
          productList,
          benefitList,
          statList,
          testimonialList,
          cta,
        } = node.homepage

        const content = {
          features: [featureList.feature1, featureList.feature2]
            .filter(Boolean)
            .map((feature) => ({
              ...feature,
              blocktype: "Feature",
            }))
            .map(createItemNode(node, "HomepageFeature")),
          products: [
            productList.product1,
            productList.product2,
            productList.product3,
          ]
            .filter(Boolean)
            .map(createItemNode(node, "HomepageProduct")),
          benefits: [
            benefitList.benefit1,
            benefitList.benefit2,
            benefitList.benefit3,
          ]
            .filter(Boolean)
            .map(createItemNode(node, "HomepageBenefit")),
          stats: [statList.stat1, statList.stat2, statList.stat3]
            .filter(Boolean)
            .map(createItemNode(node, "HomepageStat")),
          testimonials: [
            testimonialList.testimonial1,
            testimonialList.testimonial2,
            testimonialList.testimonial3,
            testimonialList.testimonial4,
          ]
            .filter(Boolean)
            .map(createItemNode(node, "HomepageTestimonial")),
        }

        const blocks = {
          hero: {
            id: createNodeId(`${node.id} >>> HomepageHero`),
            ...hero,
            image: hero.image?.id,
            links: [hero.cta1, hero.cta2]
              .filter(Boolean)
              .map(createLinkNode(node.id)),
          },
          logoList: {
            id: createNodeId(`${node.id} >>> HomepageLogoList`),
            ...logoList,
            logos: logoList.logos?.filter(Boolean).map((logo) => logo.id) || [],
          },
          featureList: {
            id: createNodeId(`${node.id} >>> HomepageFeatureList`),
            ...featureList,
            content: content.features,
          },
          productList: {
            id: createNodeId(`${node.id} >>> HomepageProductList`),
            ...productList,
            content: content.products,
          },
          benefitList: {
            id: createNodeId(`${node.id} >>> HomepageBenefitList`),
            ...benefitList,
            content: content.benefits,
          },
          statList: {
            id: createNodeId(`${node.id} >>> HomepageStatList`),
            ...statList,
            image: statList.image?.id,
            icon: statList.icon?.id,
            links: [statList.link].filter(Boolean).map(createLinkNode(node.id)),
            content: content.stats,
          },
          testimonialList: {
            id: createNodeId(`${node.id} >>> HomepageTestimonialList`),
            ...testimonialList,
            content: content.testimonials,
          },
          cta: {
            id: createNodeId(`${node.id} >>> HompageCta`),
            ...cta,
            image: cta.image?.id,
            links: [cta.link1, cta.link2]
              .filter(Boolean)
              .map(createLinkNode(node.id)),
          },
        }

        actions.createNode({
          ...blocks.hero,
          blocktype: "HomepageHero",
          internal: {
            type: "HomepageHero",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.logoList,
          blocktype: "HomepageLogoList",
          internal: {
            type: "HomepageLogoList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.featureList,
          blocktype: "HomepageFeatureList",
          internal: {
            type: "HomepageFeatureList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.productList,
          blocktype: "HomepageProductList",
          internal: {
            type: "HomepageProductList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.benefitList,
          blocktype: "HomepageBenefitList",
          internal: {
            type: "HomepageBenefitList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.statList,
          blocktype: "HomepageStatList",
          internal: {
            type: "HomepageStatList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.testimonialList,
          blocktype: "HomepageTestimonialList",
          internal: {
            type: "HomepageTestimonialList",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...blocks.cta,
          blocktype: "HomepageCta",
          internal: {
            type: "HomepageCta",
            contentDigest: node.internal.contentDigest,
          },
        })

        actions.createNode({
          ...node.homepage,
          id: createNodeId(`${node.id} >>> Homepage`),
          internal: {
            type: "Homepage",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          title: node.title,
          description,
          image: node.featuredImage?.node?.id,
          content: [
            blocks.hero.id,
            blocks.logoList.id,
            blocks.productList.id,
            blocks.featureList.id,
            blocks.benefitList.id,
            blocks.statList.id,
            blocks.testimonialList.id,
            blocks.cta.id,
          ],
        })

        break
      default:
        actions.createNode({
          ...node.page,
          id: createNodeId(`${node.id} >>> Page ${node.slug}`),
          internal: {
            type: "Page",
            contentDigest: node.internal.contentDigest,
          },
          parent: node.id,
          slug: node.slug,
          title: node.title,
          description: node.page?.description,
          image: node.featuredImage?.node?.id,
          html: node.content,
        })
        break
    }
  }
}

exports.createPages = ({ actions }) => {
  const { createSlice } = actions
  createSlice({
    id: "header",
    component: require.resolve("./src/components/header.js"),
  })
  createSlice({
    id: "footer",
    component: require.resolve("./src/components/footer.js"),
  })
}
      