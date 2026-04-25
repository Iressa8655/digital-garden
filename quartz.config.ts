import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Iressa's Digital Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-GB",
    baseUrl: "iressa8655.github.io/digital-garden",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Corben",        // brand font from H&H logo (info.txt)
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        // Snapped to the H&H brand palette (info.txt from logo pack):
        // bg #F2EFF0, icon-gradient deep purple #3D1755 to champagne #DAC1A5,
        // text/font #31272A, slogan grey #453B3E.
        lightMode: {
          light: "#F2EFF0",          // page background (brand bg)
          lightgray: "#E3DEE0",      // borders, muted surfaces
          gray: "#9A8E92",           // muted text, captions
          darkgray: "#453B3E",       // body text (brand slogan colour)
          dark: "#31272A",           // headings, strong text (brand font colour)
          secondary: "#3D1755",      // links, focus (brand icon gradient start)
          tertiary: "#DAC1A5",       // hover, highlights (brand icon gradient end)
          highlight: "rgba(218, 193, 165, 0.15)",
          textHighlight: "#DAC1A566",
        },
        darkMode: {
          light: "#1A1216",          // background, near-black plum
          lightgray: "#2A2126",      // borders
          gray: "#776B70",           // muted text
          darkgray: "#D6CCD0",       // body text
          dark: "#F2EFF0",           // headings, strong text (brand bg inverted)
          secondary: "#A877C6",      // lifted purple for legibility on dark
          tertiary: "#DAC1A5",       // accent stays champagne
          highlight: "rgba(168, 119, 198, 0.15)",
          textHighlight: "#A877C666",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
