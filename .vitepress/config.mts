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
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
