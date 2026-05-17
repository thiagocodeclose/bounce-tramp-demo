// @ts-nocheck
"use client";
import { useEffect, useState } from "react";
import { siteData } from "@/lib/site-data";

const css = `
  :root {
    --bc-bg: #FFFBF0;
    --bc-surface: #FFF8E8;
    --bc-card: #FFFFFF;
    --bc-primary: #FF9B00;
    --bc-primary-dark: #E08800;
    --bc-accent: #FFB830;
    --bc-dark: #1A1400;
    --bc-text: #1A1400;
    --bc-muted: rgba(26,20,0,0.5);
    --bc-border: rgba(255,155,0,0.15);
    --font-display: var(--font-nunito), 'Nunito', sans-serif;
    --font-body: var(--font-nunito-sans), 'Nunito Sans', sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--bc-bg); color: var(--bc-text); overflow-x: hidden; }

  /* NAV */
  .bc-nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3rem; height: 64px;
    transition: background 0.3s, box-shadow 0.3s;
    /* Start transparent over video */
  }
  .bc-nav.scrolled {
    background: rgba(255,251,240,0.97);
    box-shadow: 0 1px 20px rgba(26,20,0,0.08);
    backdrop-filter: blur(12px);
  }
  .bc-nav-logo {
    font-family: var(--font-display);
    font-size: 1.9rem; font-weight: 900; letter-spacing: -0.01em;
    color: #fff; text-decoration: none;
    transition: color 0.3s;
  }
  .bc-nav.scrolled .bc-nav-logo { color: var(--bc-text); }
  .bc-nav-logo span { color: var(--bc-primary); }
  .bc-nav-links { display: flex; gap: 2rem; align-items: center; }
  .bc-nav-links a {
    font-size: 0.88rem; font-weight: 600; letter-spacing: 0.02em;
    color: rgba(255,255,255,0.8); text-decoration: none; transition: color 0.2s;
  }
  .bc-nav.scrolled .bc-nav-links a { color: var(--bc-muted); }
  .bc-nav-links a:hover { color: var(--bc-primary) !important; }
  .bc-btn-nav {
    background: var(--bc-primary); color: #fff;
    padding: 0.5rem 1.4rem; border-radius: 100px;
    font-size: 0.85rem; font-weight: 700;
    text-decoration: none; transition: background 0.2s, transform 0.15s;
  }
  .bc-btn-nav:hover { background: var(--bc-primary-dark); transform: scale(1.03); }

  /* ===== CINEMATIC TOP VIDEO HERO ===== */
  .bc-video-wrap {
    position: relative; width: 100%; height: 68vh; overflow: hidden;
  }
  .bc-video-wrap video {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
  }
  .bc-video-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(26,20,0,0.25) 0%, rgba(26,20,0,0.45) 70%, rgba(255,251,240,1) 100%);
  }
  /* Wordmark centered on video */
  .bc-video-wordmark {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -55%);
    text-align: center;
  }
  .bc-wordmark-title {
    font-family: var(--font-display);
    font-size: clamp(5rem, 10vw, 10rem);
    font-weight: 900; letter-spacing: -0.02em;
    color: #fff; line-height: 0.9;
    text-shadow: 0 4px 32px rgba(26,20,0,0.3);
  }
  .bc-wordmark-title span { color: var(--bc-primary); }
  .bc-wordmark-sub {
    font-size: 1rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase;
    color: rgba(255,255,255,0.75); margin-top: 0.5rem;
  }
  /* Bouncing arrow at video bottom */
  .bc-scroll-hint {
    position: absolute; bottom: 4rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
  }
  .bc-scroll-dot {
    width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.6);
    animation: bc-bounce-dot 1.4s infinite;
  }
  .bc-scroll-dot:nth-child(2) { animation-delay: 0.2s; }
  .bc-scroll-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes bc-bounce-dot { 0%,80%,100%{opacity:0.3; transform:translateY(0)} 40%{opacity:1; transform:translateY(-6px)} }

  /* HERO CONTENT — below video, on bg */
  .bc-hero-content {
    background: var(--bc-bg); padding: 4rem 3rem 5rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;
    max-width: 1100px; margin: 0 auto;
  }
  .bc-hero-tag {
    display: inline-flex; align-items: center; gap: 0.5rem;
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--bc-primary); margin-bottom: 1.25rem;
  }
  .bc-hero-tag::before { content: ''; display: block; width: 18px; height: 2px; background: var(--bc-primary); }
  .bc-hero-h2 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 4rem);
    font-weight: 900; line-height: 1.05; letter-spacing: -0.02em;
    color: var(--bc-text); margin-bottom: 1.25rem;
  }
  .bc-hero-h2 em { font-style: normal; color: var(--bc-primary); }
  .bc-hero-desc { font-size: 1rem; line-height: 1.75; color: var(--bc-muted); margin-bottom: 2.25rem; }
  .bc-hero-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
  .bc-btn-primary {
    background: var(--bc-primary); color: #fff;
    padding: 0.9rem 2rem; border-radius: 100px;
    font-weight: 700; font-size: 0.95rem;
    text-decoration: none; transition: background 0.2s, transform 0.15s;
  }
  .bc-btn-primary:hover { background: var(--bc-primary-dark); transform: scale(1.03); }
  .bc-btn-ghost {
    border: 2px solid rgba(26,20,0,0.12); color: var(--bc-muted);
    padding: 0.9rem 2rem; border-radius: 100px;
    font-weight: 600; font-size: 0.95rem;
    text-decoration: none; transition: border-color 0.2s, color 0.2s;
  }
  .bc-btn-ghost:hover { border-color: var(--bc-primary); color: var(--bc-primary); }
  /* Stats on right of hero content */
  .bc-hero-stats { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
  .bc-stat-card { background: var(--bc-card); border: 1px solid rgba(255,155,0,0.1); border-radius: 12px; padding: 1.5rem; }
  .bc-stat-value { font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; color: var(--bc-primary); line-height: 1; margin-bottom: 0.25rem; }
  .bc-stat-label { font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; color: var(--bc-muted); text-transform: uppercase; }

  /* SECTIONS */
  section { padding: 6rem 2rem; }
  .bc-section-tag {
    font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--bc-primary); margin-bottom: 0.5rem; display: inline-block;
  }
  .bc-section-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 4vw, 3.8rem);
    font-weight: 900; letter-spacing: -0.02em; line-height: 1.02;
    color: var(--bc-text); margin-bottom: 1rem;
  }
  .bc-section-sub { font-size: 1rem; line-height: 1.75; color: var(--bc-muted); max-width: 520px; }

  /* WHY BOUNCE */
  .bc-why-section { background: var(--bc-surface); }
  .bc-why-inner { max-width: 1200px; margin: 0 auto; }
  .bc-why-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3rem; flex-wrap: wrap; gap: 2rem; }
  .bc-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .bc-why-card {
    background: var(--bc-card); border-radius: 16px; padding: 2rem 1.75rem;
    border: 1px solid rgba(255,155,0,0.08);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .bc-why-card:hover { border-color: rgba(255,155,0,0.3); box-shadow: 0 8px 32px rgba(255,155,0,0.06); }
  .bc-why-icon { font-size: 2rem; margin-bottom: 1rem; }
  .bc-why-name {
    font-family: var(--font-display);
    font-size: 1.1rem; font-weight: 800; color: var(--bc-text); margin-bottom: 0.6rem;
  }
  .bc-why-desc { font-size: 0.88rem; line-height: 1.65; color: var(--bc-muted); }

  /* CLASSES */
  .bc-classes-section { background: var(--bc-bg); }
  .bc-classes-inner { max-width: 1200px; margin: 0 auto; }
  .bc-classes-header { margin-bottom: 3rem; }
  .bc-classes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  .bc-class-card {
    background: var(--bc-card); border-radius: 16px; padding: 2rem;
    border: 1px solid rgba(255,155,0,0.08);
    transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
  }
  .bc-class-card:hover { border-color: rgba(255,155,0,0.3); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(255,155,0,0.08); }
  .bc-class-badges { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .bc-badge { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.25rem 0.7rem; border-radius: 100px; }
  .bc-badge-level { background: rgba(255,155,0,0.1); color: var(--bc-primary-dark); }
  .bc-badge-dur { background: rgba(26,20,0,0.05); color: var(--bc-muted); }
  .bc-class-name {
    font-family: var(--font-display);
    font-size: 1.2rem; font-weight: 800; color: var(--bc-text); margin-bottom: 0.75rem;
  }
  .bc-class-desc { font-size: 0.88rem; line-height: 1.65; color: var(--bc-muted); }

  /* PRICING */
  .bc-pricing-section { background: var(--bc-surface); }
  .bc-pricing-inner { max-width: 1100px; margin: 0 auto; }
  .bc-pricing-header { text-align: center; margin-bottom: 3.5rem; }
  .bc-pricing-header .bc-section-sub { margin: 0 auto; }
  .bc-pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; }
  .bc-price-card { background: var(--bc-card); border-radius: 20px; padding: 2.5rem 2rem; position: relative; border: 1px solid rgba(255,155,0,0.08); }
  .bc-price-card.highlight { border: 2px solid var(--bc-primary); box-shadow: 0 16px 48px rgba(255,155,0,0.12); }
  .bc-popular-badge {
    position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
    background: var(--bc-primary); color: #fff;
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 1rem; border-radius: 100px; white-space: nowrap;
  }
  .bc-price-name {
    font-family: var(--font-display);
    font-size: 1rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em;
    color: var(--bc-muted); margin-bottom: 0.75rem;
  }
  .bc-price-amount { font-family: var(--font-display); font-size: 3rem; font-weight: 900; color: var(--bc-primary); line-height: 1; margin-bottom: 0.2rem; }
  .bc-price-period { font-size: 0.82rem; color: var(--bc-muted); margin-bottom: 1.75rem; }
  .bc-price-features { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; margin-bottom: 2rem; }
  .bc-price-features li { display: flex; align-items: flex-start; gap: 0.6rem; font-size: 0.88rem; color: var(--bc-muted); }
  .bc-check { color: var(--bc-primary); flex-shrink: 0; font-weight: 800; }
  .bc-price-cta {
    display: block; text-align: center; padding: 0.9rem; border-radius: 100px;
    font-weight: 700; font-size: 0.9rem; letter-spacing: 0.04em;
    text-decoration: none; transition: all 0.2s;
  }
  .bc-price-card.highlight .bc-price-cta { background: var(--bc-primary); color: #fff; }
  .bc-price-card.highlight .bc-price-cta:hover { background: var(--bc-primary-dark); }
  .bc-price-card:not(.highlight) .bc-price-cta { border: 2px solid rgba(26,20,0,0.1); color: var(--bc-muted); }
  .bc-price-card:not(.highlight) .bc-price-cta:hover { border-color: var(--bc-primary); color: var(--bc-primary); }

  /* CTA */
  .bc-cta-section {
    background: var(--bc-primary);
    text-align: center; padding: 7rem 2rem;
    position: relative; overflow: hidden;
  }
  .bc-cta-section::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,255,255,0.12) 0%, transparent 100%);
  }
  .bc-cta-inner { max-width: 600px; margin: 0 auto; position: relative; }
  .bc-cta-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 6vw, 6.5rem);
    font-weight: 900; letter-spacing: -0.02em; line-height: 0.95;
    color: #fff; margin-bottom: 1.25rem;
  }
  .bc-cta-sub { font-size: 1.05rem; color: rgba(255,255,255,0.8); margin-bottom: 2.5rem; line-height: 1.75; }
  .bc-btn-cta {
    background: #fff; color: var(--bc-primary);
    padding: 1.1rem 3rem; border-radius: 100px;
    font-weight: 800; font-size: 1rem;
    text-decoration: none; display: inline-block;
    transition: transform 0.15s, box-shadow 0.2s;
  }
  .bc-btn-cta:hover { transform: scale(1.04); box-shadow: 0 8px 32px rgba(0,0,0,0.15); }

  /* FOOTER */
  .bc-footer { background: var(--bc-dark); padding: 4rem 2rem 2rem; }
  .bc-footer-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; }
  .bc-footer-logo { font-family: var(--font-display); font-size: 1.5rem; font-weight: 900; color: #fff; margin-bottom: 0.75rem; }
  .bc-footer-logo span { color: var(--bc-primary); }
  .bc-footer-desc { font-size: 0.88rem; line-height: 1.6; color: rgba(255,255,255,0.45); max-width: 280px; }
  .bc-footer-h { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 1rem; }
  .bc-footer-links { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .bc-footer-links a { color: rgba(255,255,255,0.45); text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .bc-footer-links a:hover { color: var(--bc-primary); }
  .bc-footer-bottom {
    max-width: 1200px; margin: 2.5rem auto 0;
    padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.78rem; color: rgba(255,255,255,0.3); flex-wrap: wrap; gap: 0.5rem;
  }
  .bc-footer-brand { color: var(--bc-primary); text-decoration: none; font-weight: 700; }

  /* REVEAL */
  .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.65s ease, transform 0.65s ease; }
  .reveal.visible { opacity: 1; transform: none; }

  @media (max-width: 900px) {
    .bc-hero-content { grid-template-columns: 1fr; }
    .bc-hero-stats { grid-template-columns: repeat(2, 1fr); }
    .bc-video-wrap { height: 50vh; }
    .bc-why-grid { grid-template-columns: repeat(2, 1fr); }
    .bc-classes-grid { grid-template-columns: 1fr; }
    .bc-pricing-grid { grid-template-columns: 1fr; }
    .bc-footer-inner { grid-template-columns: 1fr; }
    .bc-nav-links { display: none; }
  }
`;

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function BouncePage() {
  const [scrolled, setScrolled] = useState(false);
  useReveal();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* NAV — transparent over video */}
      <nav className={`bc-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#" className="bc-nav-logo">
          <span>BOUNCE</span>
        </a>
        <div className="bc-nav-links">
          <a href="#classes">Classes</a>
          <a href="#why">Why BOUNCE</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
          <a href="#first" className="bc-btn-nav">
            First Class Free
          </a>
        </div>
      </nav>

      {/* CINEMATIC TOP VIDEO */}
      <div className="bc-video-wrap">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1530655638484-ad69b5f5ca0a?w=1800&q=80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-woman-jumping-happily-on-a-trampoline-40787-large.mp4"
            type="video/mp4"
          />
        </video>
        <div className="bc-video-overlay" />
        <div className="bc-video-wordmark">
          <div className="bc-wordmark-title">
            <span>B</span>OUNCE
          </div>
          <div className="bc-wordmark-sub">Austin, TX — Trampoline Fitness</div>
        </div>
        <div className="bc-scroll-hint">
          <span className="bc-scroll-dot" />
          <span className="bc-scroll-dot" />
          <span className="bc-scroll-dot" />
        </div>
      </div>

      {/* HERO CONTENT — below video */}
      <div id="first" className="bc-hero-content">
        <div>
          <div data-cg-el="hero_eyebrow" className="bc-hero-tag">
            Jump. Fly. Feel Alive.
          </div>
          <h2 data-cg-el="hero_headline_1" className="bc-hero-h2">
            The Workout
            <br />
            That Feels
            <br />
            Like <em>Play.</em>
          </h2>
          <p data-cg-el="hero_subtitle" className="bc-hero-desc">
            Low-impact trampoline fitness that burns 400+ calories per class,
            protects your joints, and leaves you smiling every single time.
            Austin&apos;s most energetic hour.
          </p>
          <div className="bc-hero-actions">
            <a
              data-cg-el="hero_cta_primary"
              href="#pricing"
              className="bc-btn-primary"
            >
              First Class Free
            </a>
            <a
              data-cg-el="hero_cta_secondary"
              href="#classes"
              className="bc-btn-ghost"
            >
              View Schedule
            </a>
          </div>
        </div>
        <div className="bc-hero-stats">
          {siteData.stats.map((s, i) => (
            <div
              key={s.label}
              className="bc-stat-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="bc-stat-value">{s.value}</div>
              <div className="bc-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WHY BOUNCE */}
      <section id="why" className="bc-why-section">
        <div className="bc-why-inner">
          <div className="bc-why-header reveal">
            <div>
              <span className="bc-section-tag">The Science of Joy</span>
              <h2 className="bc-section-title">
                Why
                <br />
                Bounce?
              </h2>
            </div>
            <p className="bc-section-sub">
              Trampoline training isn&apos;t just fun — it&apos;s one of the
              most effective full-body workouts available. Here&apos;s what
              happens when you leave the floor.
            </p>
          </div>
          <div className="bc-why-grid">
            {siteData.benefits.map((b, i) => (
              <div
                key={b.name}
                className="bc-why-card reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="bc-why-icon">{b.icon}</div>
                <div className="bc-why-name">{b.name}</div>
                <p className="bc-why-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLASSES */}
      <section id="classes" className="bc-classes-section">
        <div className="bc-classes-inner">
          <div className="bc-classes-header reveal">
            <span className="bc-section-tag">Class Formats</span>
            <h2 className="bc-section-title">
              Jump Into
              <br />
              Any Class
            </h2>
            <p className="bc-section-sub">
              Six formats for every age and fitness level. No experience
              required for most — just bring willingness to move, laugh, and
              sweat.
            </p>
          </div>
          <div className="bc-classes-grid">
            {siteData.classes.map((c, i) => (
              <div
                key={c.name}
                className="bc-class-card reveal"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="bc-class-badges">
                  <span className="bc-badge bc-badge-level">{c.level}</span>
                  <span className="bc-badge bc-badge-dur">{c.duration}</span>
                </div>
                <div className="bc-class-name">{c.name}</div>
                <p className="bc-class-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bc-pricing-section">
        <div className="bc-pricing-inner">
          <div className="bc-pricing-header reveal">
            <span className="bc-section-tag">Membership</span>
            <h2 className="bc-section-title">
              Ready
              <br />
              to Jump?
            </h2>
            <p className="bc-section-sub">
              Your first class is on us. After that, choose the plan that fits
              your frequency — no long-term contracts.
            </p>
          </div>
          <div className="bc-pricing-grid">
            {siteData.pricing.map((p, i) => (
              <div
                key={p.name}
                className={`bc-price-card reveal${p.highlight ? " highlight" : ""}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {p.highlight && (
                  <span className="bc-popular-badge">Most Popular</span>
                )}
                <div className="bc-price-name">{p.name}</div>
                <div className="bc-price-amount">{p.price}</div>
                <div className="bc-price-period">{p.period}</div>
                <ul className="bc-price-features">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="bc-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#first" className="bc-price-cta">
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bc-cta-section">
        <div className="bc-cta-inner">
          <h2 className="bc-cta-title reveal">Leave The Floor.</h2>
          <p className="bc-cta-sub reveal">
            Come in for your free class. Try the trampoline, meet the coaches,
            and feel the difference between exercise you endure and exercise you
            love.
          </p>
          <a href="#first" className="bc-btn-cta reveal">
            Book Free Class Now
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bc-footer">
        <div className="bc-footer-inner">
          <div>
            <div className="bc-footer-logo">
              <span>BOUNCE</span> Fitness
            </div>
            <p className="bc-footer-desc">
              {siteData.gym.address}
              <br />
              {siteData.gym.phone}
              <br />
              {siteData.gym.email}
            </p>
          </div>
          <div>
            <div className="bc-footer-h">Jump</div>
            <ul className="bc-footer-links">
              <li>
                <a href="#classes">Schedule</a>
              </li>
              <li>
                <a href="#why">Why BOUNCE</a>
              </li>
              <li>
                <a href="#pricing">Pricing</a>
              </li>
              <li>
                <a href="#">Kids Classes</a>
              </li>
            </ul>
          </div>
          <div>
            <div className="bc-footer-h">Studio</div>
            <ul className="bc-footer-links">
              <li>
                <a href="#">First Visit</a>
              </li>
              <li>
                <a href="#">Grip Socks</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bc-footer-bottom">
          <span>
            © {new Date().getFullYear()} BOUNCE Fitness. All rights reserved.
          </span>
          <span>
            Powered by{" "}
            <a href="https://garrison365.com" className="bc-footer-brand">
              Garrison365
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}
