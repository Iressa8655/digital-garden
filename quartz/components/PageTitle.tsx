import { joinSegments, pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const logoPath = joinSegments(baseDir, "static/icon.svg")
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir} class="page-title-link">
        <img src={logoPath} alt="" class="page-title-logo" />
        <span class="page-title-text">{title}</span>
      </a>
    </h2>
  )
}

PageTitle.css = `
.page-title {
  font-size: 1.4rem;
  margin: 0;
  font-family: var(--titleFont);
  line-height: 1.2;
}
.page-title-link {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: inherit;
}
.page-title-logo {
  width: 2.2rem;
  height: 2.2rem;
  flex-shrink: 0;
}
.page-title-text {
  display: inline-block;
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
