import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `multicolor`,
    siteUrl: `https://thepmsquare.github.io/multicolor`,
    // TODO
    description: ``,
  },
  pathPrefix: "/multicolor",
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: false,
  plugins: [
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `multicolor`,
        short_name: `multicolor`,
        start_url: "/",
        icon: "src/images/multicolor.svg",
        display: "fullscreen",
        background_color: `#000000`,
        theme_color: `#00ffff`,
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
  ],
};

export default config;
