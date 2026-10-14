import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import logo from './assets/logo.png'
import { notifyVisit } from './notifyVisit'
import { business, nav, images, industries, services, steps, employment } from './data'

function Logo() {
  return (
    <a href="#home" className="logo">
      <img src={logo} alt="Oncort Professional Services" />

    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Logo />
      <span className="progress" style={{ transform: `scaleX(${progress})` }} />
      <nav className={`nav ${open ? 'open' : ''}`}>
        {nav.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
        ))}
      </nav>
      <a className="btn btn-dark call" href="#contact">Contact Us</a>
      <button className="burger" aria-label="Menu" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} size={24} /></button>
    </header>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <h1>
          Sparkling Spaces,<br />
          <span>Exceptional Results</span>
        </h1>
        <p>
          5-star commercial cleaning solutions in Birmingham, Alabama. Customizable, professional and
          quality-driven. You are our priority.
        </p>
        <div className="hero-btns">
          <a className="btn btn-dark" href={`tel:${business.phone}`}>Call {business.phone}</a>
          <a className="btn btn-lime" href="#contact">Schedule A Consultation</a>
        </div>
        <div className="rating">
          <span>★★★★★ <b>5 Star</b> Commercial Cleaning</span>
          <span>|</span>
          <span>Hospital-grade disinfectants</span>
        </div>
      </div>
      <div className="hero-img" style={{ backgroundImage: `url(${images.hero})` }} />
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section split">
      <img data-reveal="mask" src={images.about} alt="Clean modern office" />
      <div data-reveal="right">
        <p className="eyebrow">Who We Are</p>
        <h2>Make every client feel like our only client</h2>
        <p>
          Oncort Commercial/Janitorial Cleaning Service provides 5-star commercial cleaning solutions
          tailored to your business. Our promise is simple: you are our priority.
        </p>
        <ul className="checks">
          <li>Customizable cleaning plans</li>
          <li>Professional, screened and trained staff</li>
          <li>Quality-driven results, every visit</li>
        </ul>
        <a className="btn btn-dark" href="#contact">Schedule A Consultation</a>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section alt">
      <div className="head" data-reveal>
        <p className="eyebrow">What We Do</p>
        <h2>Cleaning services built for business</h2>
      </div>
      <div className="grid4" data-stagger>
        {services.map((s) => (
          <div className="card" key={s.title}>
            <div className="icon"><Icon name={s.icon} size={24} /></div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

// Pinned section: scrolling flips through the industry photos like a deck of cards.
function Industries() {
  const ref = useRef(null)
  const [pos, setPos] = useState(0)
  const last = industries.length - 1

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const total = r.height - window.innerHeight
      setPos(total > 0 ? clamp(-r.top / total, 0, 1) * last : 0)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [last])

  const active = Math.round(pos)
  const current = industries[active]

  const goTo = (i) => {
    const el = ref.current
    const total = el.offsetHeight - window.innerHeight
    const top = el.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (i / last) * total, behavior: 'smooth' })
  }

  const cardStyle = (i) => {
    const d = i - pos
    if (d <= -1) return { opacity: 0, visibility: 'hidden', zIndex: 0 }
    if (d < 0) {
      // flipping out to the left, then dropping behind
      const t = -d
      return {
        zIndex: 50,
        opacity: 1 - t * 0.9,
        transform: `translate3d(${-t * 38}%, ${t * 4}%, 0) rotateY(${t * 62}deg) rotateZ(${-t * 8}deg) scale(${1 - t * 0.08})`,
      }
    }
    if (d > 3.2) return { opacity: 0, visibility: 'hidden', zIndex: 0 }
    return {
      zIndex: 40 - Math.round(d * 10),
      opacity: clamp(1 - d * 0.22, 0, 1),
      transform: `translate3d(${d * 7}%, ${-d * 4.5}%, ${-d * 60}px) scale(${1 - d * 0.07})`,
    }
  }

  return (
    <section
      className="deck"
      ref={ref}
      style={{ height: `calc(100vh + ${last * 60}vh)` }}
    >
      <div className="deck-sticky">
        <div className="deck-copy">
          <p className="eyebrow">Industries</p>
          <h2>How we can serve your industry needs</h2>
          <div className="deck-info" key={active}>
            <span className="deck-count">
              {String(active + 1).padStart(2, '0')} <i>/ {String(industries.length).padStart(2, '0')}</i>
            </span>
            <h3>{current.title}</h3>
            <p>{current.text}</p>
            <a className="btn btn-dark" href="#contact">Get a quote</a>
          </div>
          <ul className="deck-dots">
            {industries.map((it, i) => (
              <li key={it.title}>
                <button
                  className={i === active ? 'on' : ''}
                  onClick={() => goTo(i)}
                  aria-label={it.title}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="deck-stage">
          {industries.map((it, i) => (
            <figure className="deck-card" key={it.title} style={cardStyle(i)}>
              <img src={it.img} alt={it.title} loading="lazy" />
              <figcaption>{it.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Germs() {
  return (
    <section className="section split reverse green">
      <div data-reveal="left">
        <p className="eyebrow">Getting Rid of Germs</p>
        <h2>Hospital-grade disinfection</h2>
        <p>
          We use hospital-grade disinfectants to help you meet industry standards, so your staff,
          patients and customers stay safe and healthy.
        </p>
        <a className="btn btn-lime" href="#contact">Get a quote</a>
      </div>
      <img data-reveal="mask" src={images.germs} alt="Bathroom being cleaned" />
    </section>
  )
}

function Steps() {
  return (
    <section className="section">
      <div className="head" data-reveal>
        <p className="eyebrow">How It Works</p>
        <h2>Three simple steps</h2>
      </div>
      <div className="grid3" data-stagger>
        {steps.map((s) => (
          <div className="step" key={s.n}>
            <span>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Commitment() {
  return (
    <section className="section split">
      <img data-reveal="mask" src={images.commitment} alt="Spotless office floor" />
      <div data-reveal="right">
        <p className="eyebrow">Our Commitment</p>
        <h2>Floors that shine, spaces that impress</h2>
        <p>
          From floor stripping and waxing to everyday janitorial care, we stand behind every job with
          a commitment to quality and attention to detail.
        </p>
      </div>
    </section>
  )
}

function Employment() {
  return (
    <section id="employment" className="section alt">
      <div className="head" data-reveal>
        <p className="eyebrow">Employment</p>
        <h2>A team you can trust</h2>
      </div>
      <div className="grid4" data-stagger>
        {employment.map((e) => (
          <div className="card" key={e.title}>
            <h3>{e.title}</h3>
            <p>{e.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Referral() {
  return (
    <section id="referral" className="referral" data-stagger>
      <h2>Referral Program</h2>
      <p>Know a business that needs a great cleaning team? Refer them by text, social media or chat and get rewarded.</p>
      <a className="btn btn-lime" href={`mailto:${business.email}?subject=Referral`}>Refer a business</a>
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  const submit = (e) => {
    e.preventDefault()
    setSent(true)
  }
  return (
    <section id="contact" className="section contact">
      <div data-reveal="left">
        <p className="eyebrow">Contact</p>
        <h2>Schedule a “5-Star” Consultation Today!</h2>
        <ul className="info">
          <li><Icon name="pin" /> {business.address}</li>
          <li><Icon name="phone" /> <a href={`tel:${business.phone}`}>{business.phone}</a></li>
          <li><Icon name="headset" /> Toll-free <a href={`tel:${business.tollFree}`}>{business.tollFree}</a></li>
          <li><Icon name="fax" /> Fax {business.fax}</li>
          <li><Icon name="mail" /> <a href={`mailto:${business.email}`}>{business.email}</a></li>
        </ul>
      </div>
      <form onSubmit={submit} data-reveal="right">
        {sent ? (
          <p className="thanks">Thank you! We’ll be in touch shortly.</p>
        ) : (
          <>
            <input required placeholder="Your name" />
            <input required type="email" placeholder="Email address" />
            <input placeholder="Phone" />
            <select defaultValue="">
              <option value="" disabled>Industry</option>
              {industries.map((i) => <option key={i.title}>{i.title}</option>)}
            </select>
            <textarea rows="4" placeholder="Tell us about your facility" />
            <button className="btn btn-dark" type="submit">Request Consultation</button>
          </>
        )}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <Logo />
      <p>© {new Date().getFullYear()} Oncort Commercial/Janitorial Cleaning Service. All rights reserved.</p>
      <p className="privacy">
        For security and analytics we log basic visit details: IP address, approximate location, device and browser.
      </p>
      <div className="social">
        <a href="#home">Facebook</a><a href="#home">Twitter</a><a href="#home">LinkedIn</a><a href="#home">YouTube</a>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    notifyVisit()
    document.querySelectorAll('[data-stagger]').forEach((el) =>
      [...el.children].forEach((c, i) => c.style.setProperty('--i', i)),
    )
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('in', e.isIntersecting)),
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    document.querySelectorAll('[data-reveal],[data-stagger]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Industries />
        <Germs />
        <Steps />
        <Commitment />
        <Employment />
        <Referral />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
