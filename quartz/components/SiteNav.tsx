import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { joinSegments, pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

const CV_URL = "https://iressa8655.github.io/"

const SiteNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const baseDir = pathToRoot(fileData.slug!)
  const sections = [
    { label: "CV", href: CV_URL, external: true },
    { label: "Medicine", href: joinSegments(baseDir, "Medicine") + "/" },
    { label: "Technology", href: joinSegments(baseDir, "Technology") + "/" },
    { label: "Business", href: joinSegments(baseDir, "Business") + "/" },
    { label: "Personal Development", href: joinSegments(baseDir, "Personal-Development") + "/" },
  ]

  // mark the current section as active so it gets highlighted
  const slug = fileData.slug ?? ""
  const isActive = (href: string, label: string): boolean => {
    if (label === "CV") return false
    const seg = label.replace(/ /g, "-")
    return slug === seg || slug.startsWith(seg + "/")
  }

  return (
    <nav class={classNames(displayClass, "site-nav")}>
      <ul>
        {sections.map((s) => (
          <li class={isActive(s.href, s.label) ? "active" : ""}>
            <a
              href={s.href}
              {...(s.external ? { rel: "noopener", target: "_self" } : {})}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

SiteNav.css = `
.site-nav {
  width: 100%;
  margin: 0 0 1.25rem 0;
  border-bottom: 1px solid var(--lightgray);
}
.site-nav ul {
  list-style: none;
  margin: 0;
  padding: 0.6rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  font-family: var(--bodyFont);
  align-items: center;
}
.site-nav li {
  margin: 0;
}
.site-nav a {
  color: var(--darkgray);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
  font-size: 0.78rem;
  transition: color 0.2s;
  border-bottom: 2px solid transparent;
  padding-bottom: 0.2rem;
}
.site-nav a:hover {
  color: var(--secondary);
}
.site-nav li.active a {
  color: var(--secondary);
  border-bottom-color: var(--tertiary);
}
@media (max-width: 600px) {
  .site-nav ul {
    gap: 0.85rem;
  }
  .site-nav a {
    font-size: 0.7rem;
    letter-spacing: 0.06em;
  }
}
`

export default (() => SiteNav) satisfies QuartzComponentConstructor
