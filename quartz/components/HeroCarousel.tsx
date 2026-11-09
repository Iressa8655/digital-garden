import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Featured posts for the home page carousel. Add new posts at the top.
const SLIDES = [
  {
    title: "Systematic reviews in medicine, getting started",
    href: "Research/Research-skills/Systematic-reviews-in-medicine,-getting-started",
    image: "attachments/sr-review-pipeline-biorender.jpg",
    tag: "Research skills",
  },
  {
    title: "AI hype versus real ROI",
    href: "Ventures/AI-hype-versus-real-ROI",
    image: "attachments/banner-roi-photo.jpg",
    tag: "Ventures",
  },
  {
    title: "How venture capital actually works",
    href: "Ventures/How-venture-capital-actually-works",
    image: "attachments/banner-vc-photo.jpg",
    tag: "Ventures",
  },
]

const HeroCarousel: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null
  return (
    <section class="hero-carousel" aria-roledescription="carousel">
      <div class="hero-track">
        {SLIDES.map((slide, index) => (
          <a class={`hero-slide${index === 0 ? " active" : ""}`} href={`./${slide.href}`}>
            <img src={`./${slide.image}`} alt="" />
            <div class="hero-caption">
              <span class="hero-tag">{slide.tag}</span>
              <h2>{slide.title}</h2>
              <hr />
              <span class="hero-more">Read more →</span>
            </div>
          </a>
        ))}
      </div>
      <div class="hero-dots">
        {SLIDES.map((_, index) => (
          <button
            class={`hero-dot${index === 0 ? " active" : ""}`}
            data-index={index}
            aria-label={`Show slide ${index + 1}`}
          />
        ))}
      </div>
      <p class="hero-mission">
        Doctor turned AI and health researcher at Oxford. Notes on research methods,
        medical AI and what it takes to build things that help patients.
      </p>
    </section>
  )
}

HeroCarousel.afterDOMLoaded = `
document.addEventListener("nav", () => {
  const root = document.querySelector(".hero-carousel")
  if (!root) return
  const slides = [...root.querySelectorAll(".hero-slide")]
  const dots = [...root.querySelectorAll(".hero-dot")]
  let current = 0
  const show = (next) => {
    slides[current].classList.remove("active")
    dots[current].classList.remove("active")
    current = (next + slides.length) % slides.length
    slides[current].classList.add("active")
    dots[current].classList.add("active")
  }
  let timer = setInterval(() => show(current + 1), 6000)
  dots.forEach((dot) => dot.addEventListener("click", () => {
    clearInterval(timer)
    show(Number(dot.dataset.index))
    timer = setInterval(() => show(current + 1), 6000)
  }))
  window.addCleanup?.(() => clearInterval(timer))
})
`

HeroCarousel.css = `
.hero-carousel { position: relative; margin: 0 0 3rem; }
.hero-track { position: relative; height: 380px; border-radius: 12px; overflow: hidden; background: var(--lightgray); }
.hero-slide { position: absolute; inset: 0; opacity: 0; transition: opacity 0.8s ease; pointer-events: none; }
.hero-slide.active { opacity: 1; pointer-events: auto; }
.hero-slide img { width: 100%; height: 100%; object-fit: cover; margin: 0; border-radius: 0; box-shadow: none; }
.hero-caption { position: absolute; right: 4%; bottom: 10%; width: min(440px, 88%); padding: 1.25rem 1.5rem; background: rgba(49, 39, 42, 0.86); color: #F2EFF0; }
.hero-caption h2 { color: #F2EFF0; margin: 0.25rem 0 0; font-size: 1.5rem; line-height: 1.3; border: none; padding: 0; display: block; }
.hero-caption hr { border: none; height: 1px; background: #DAC1A5; margin: 0.9rem 0; }
.hero-tag { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #DAC1A5; }
.hero-more { font-size: 0.95rem; }
.hero-dots { position: absolute; left: 0; right: 0; top: 420px; z-index: 3; display: flex; justify-content: center; gap: 0.6rem; margin-top: 1rem; }
.hero-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid #fff; background: rgba(255,255,255,0.3); cursor: pointer; padding: 0; }
.hero-dot.active { background: #fff; }
@media (max-width: 600px) { .hero-track { height: 260px; } .hero-caption h2 { font-size: 1.15rem; } }
`

export default (() => HeroCarousel) satisfies QuartzComponentConstructor
