import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepresspublish/", // repo name
  title: "New Release 2.0",
  description: "Coming soon",
  markdown: {
    theme: "vitesse-dark",
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav: [
      {
        text: "🚀 Quickstarts",
        items: [
          {
            text: "🦖 Deploy to Deno",
            link: "/examples/deno/README.md",
          },
          {
            text: "💻 Deploy to Boring 'ol server Webhook/websockets",
            link: "/examples/express-incoming-webhook/README.md",
          },
          { text: "💬 Messsages", link: "/garage" },
        ],
      },
      { text: "🏡 Home", link: "/" },
      { text: "🌟 Examples", link: "/markdown-examples" },
      { text: "📚 API Docs", link: "/api-docs/modules" },
      { text: "🔧 Garage", link: "/garage" },
      { text: "🐣 Webhooks for Babies", link: "/webhooks_for_babies.md" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "API Docs", link: "/api-docs/modules" },
          { text: "🔧 Garage", link: "/garage" },
          { text: "🐣 Webhooks for Babies", link: "/webhooks_for_babies.md" },
        ],
      },
      {
        text: "🚀 Quickstarts",
        collapsed: true,

        items: [
          {
            text: "🦖 Deploy to Deno",
            link: "/examples/deno/README.md",
          },
          {
            text: "💻 Deploy to Boring 'ol server Webhook/websockets",
            link: "/examples/express-incoming-webhook/README.md",
          },
          {
            text: "λ Deploy to AWS Lamda",
            link: "/examples/aws-lambda/README.md",
          },
          {
            text: "🔥 Deploy to Worker",
            link: "/examples/worker/README.md",
          },

          { text: "💬 Messsages", link: "/garage" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/valgaze/speedybot" },
    ],
  },
  vite: {},
});
