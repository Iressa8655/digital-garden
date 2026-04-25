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
        header: "Playfair Display",
        body: "Inter",
        code: "JetBrains Mono",
      },
      colors: {
        // Matched to the Lovable CV site (iressa8655.github.io):
        // background = warm lavender, primary = aubergine purple,
        // accent = champagne tan, headings in plum.
        lightMode: {
          light: "#F0EDF1",          // page background, warm lavender
          lightgray: "#E5E2E8",      // borders, muted surfaces
          gray: "#A89BA3",           // muted text, captions
          darkgray: "#5E4F58",       // body text
          dark: "#2D2128",           // headings, strong text (deep plum)
          secondary: "#6B3B7E",      // links, focus (aubergine purple from gradient start)
          tertiary: "#C4A882",       // hover, highlights (champagne tan from gradient end)
          highlight: "rgba(196, 168, 130, 0.15)",
          textHighlight: "#C4A88266",
        },
        darkMode: {
          light: "#1E161B",          // background, very dark plum
          lightgray: "#2E2530",      // borders
          gray: "#7A6E76",           // muted text
          darkgray: "#D4C8CE",       // body text
          dark: "#F4F1F6",           // headings, strong text
          secondary: "#A877C6",      // links (lifted purple for dark)
          tertiary: "#C4A882",       // accent stays champagne
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
