import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepresspublish", // repo name
  title: "New Release 2.0",
  description: "Coming soon",
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
            text: "λ Deploy to AWS Lamda",
            link: "./../examples/lambda/README.md",
          },
          {
            text: "🔥 Deploy to Worker",
            link: "./../examples/worker/README.md",
          },
          {
            text: "🦖 Deploy to Deno",
            link: "./../examples/deno/README.md",
          },
          { text: "💬 Messsages", link: "/garage" },
        ],
      },
      { text: "🏡 Home", link: "/" },
      { text: "🌟 Examples", link: "/markdown-examples" },
      { text: "📚 API Docs", link: "/api-docs/modules" },
      { text: "🔧 Garage", link: "/garage" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
          { text: "API Docs", link: "/api-docs/modules" },
          { text: "🔧 Garage", link: "/garage" },
        ],
      },
      {
        text: "🚀 Quickstarts",
        items: [
          {
            text: "λ Deploy to AWS Lamda",
            link: "./../examples/lambda/README.md",
          },
          {
            text: "🔥 Deploy to Worker",
            link: "./../examples/worker/README.md",
          },
          {
            text: "🦖 Deploy to Deno",
            link: "./../examples/deno/README.md",
          },
          { text: "💬 Messsages", link: "/garage" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/valgaze/speedybot" },
    ],
  },
});
