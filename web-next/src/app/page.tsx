import Link from "next/link";
import SectionMountains from "@/components/SectionMountains";
import DailyMessage from "@/components/DailyMessage";

export default function HomePage() {
  return (
    <>
      <section className="hero" aria-label="Introduction">
        <svg
          className="hero-mandala"
          viewBox="0 0 400 400"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="110" />
          <circle cx="200" cy="200" r="70" />
          <g>
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse
                key={i}
                cx="200"
                cy="70"
                rx="16"
                ry="42"
                transform={i === 0 ? undefined : `rotate(${i * 45} 200 200)`}
              />
            ))}
          </g>
        </svg>
        <svg
          className="hero-mountains"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path
            className="mtn-back"
            d="M0,320 L0,190 L130,105 L250,165 L370,60 L490,145 L610,45 L730,125 L850,75 L970,155 L1090,95 L1210,175 L1330,115 L1440,185 L1440,320 Z"
          />
          <path
            className="mtn-front"
            d="M0,320 L0,235 L110,150 L210,205 L330,95 L430,185 L550,75 L660,165 L770,105 L890,195 L1010,125 L1130,205 L1250,135 L1360,215 L1440,170 L1440,320 Z"
          />
        </svg>
        <div className="container hero-inner">
          <div className="hero-text">
            <p className="eyebrow">
              Formally Shri Pragya Maha Avatar Babaji Avataran Pith Foundation
            </p>
            <h1>MaBap Foundation</h1>
            <p className="tagline-hi">अविरतम् सेवा महे</p>
            <p className="tagline-en">Devoted to the Seva of Humanity</p>
            <p className="hero-mission">
              Guided by the eternal teachings of Shri Shri Maha Avatar Babaji,
              MaBap Foundation walks the path of seva — serving humanity and
              awakening spiritual advancement through education, healthcare,
              community development and the living practice of Sanatan
              Dharma.
            </p>
            <Link href="/donate" className="hero-cta">
              Donate Now
            </Link>
          </div>
          <div className="hero-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/babaji-hero.jpg"
              alt="Devotional portrait of Shri Shri Maha Avatar Babaji seated in meditation before the Himalayas"
              className="hero-portrait"
            />
          </div>
        </div>
      </section>

      <div className="section-divider-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>

      <section
        className="message-section has-mountains"
        aria-label="Today's Divine Message"
      >
        <SectionMountains />
        <div className="container">
          <p className="eyebrow eyebrow-center">Today&apos;s Divine Message</p>
          <p className="message-intro">
            A moment of stillness, offered anew each day.
          </p>
          <blockquote className="message-card" id="daily-message">
            <span className="quote-mark" aria-hidden="true">
              &ldquo;
            </span>
            <DailyMessage />
          </blockquote>
          <Link href="/messages" className="cta-link message-archive-link">
            See past messages &amp; blog &rarr;
          </Link>
        </div>
      </section>

      <section className="gurus-section has-mountains" aria-label="Guruji and Guruma">
        <SectionMountains />
        <div className="container">
          <p className="eyebrow eyebrow-center">Our Spiritual Guides</p>
          <h2 className="section-title-center">Guruji &amp; Guruma</h2>
          <div className="ornament-divider" aria-hidden="true"></div>
          <p className="gurus-intro">
            Under the divine guidance of Babaji, Guruji and Guruma lead MaBap
            Foundation&apos;s spiritual practice and daily message, carrying
            forward the living tradition of seva and Sanatan Dharma.
          </p>

          <div className="gurus-grid">
            <div className="guru-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/guruji-harishkumar.jpg"
                alt="Dr. Harishkumar Dhanjibhai (Guruji)"
                className="guru-photo"
              />
              <h3 className="guru-name">Dr. Harishkumar Dhanjibhai</h3>
              <p className="guru-title">Guruji</p>
            </div>
            <div className="guru-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/guruma-kokilaben.jpg"
                alt="Kokila Ben (Guruma)"
                className="guru-photo"
              />
              <h3 className="guru-name">Kokila Ben</h3>
              <p className="guru-title">Guruma</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pillars-section has-mountains" aria-label="Our Four Pillars">
        <SectionMountains />
        <div className="container">
          <p className="eyebrow eyebrow-center">What We Stand For</p>
          <h2 className="section-title-center">Our Four Pillars</h2>
          <div className="ornament-divider" aria-hidden="true"></div>
          <p className="pillars-tagline">Sahkar, Sangathan, Seva aur Samarpan</p>

          <div className="pillars-grid">
            {[
              {
                name: "Prakrutik Chikitsa",
                desc: "Healing, Naturopathy, Alternative Medicines & Yoga",
              },
              {
                name: "Sanskrutik Vikas",
                desc: "Community Development & Social Empowerment",
              },
              {
                name: "Dharmik Abhyas",
                desc: "Study of Scriptures, Universal Religion & Sanatan Dharma",
              },
              {
                name: "Adhyatmik Unnati",
                desc: "Meditation & Spiritual Practices",
              },
            ].map((pillar) => (
              <div className="pillar-card" key={pillar.name}>
                <span className="pillar-glyph" aria-hidden="true">
                  &#2384;
                </span>
                <h3 className="pillar-name">{pillar.name}</h3>
                <p className="pillar-desc">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="highlights has-mountains" aria-label="Our Impact">
        <SectionMountains />
        <div className="container">
          <p className="eyebrow">Six Years of Seva</p>
          <h2>A Record You Can Trust</h2>

          <div className="highlights-grid">
            <div className="stat-card stat-blue">
              <span className="stat-num">26</span>
              <span className="stat-label">Toy &amp; Games Libraries</span>
            </div>
            <div className="stat-card stat-saffron">
              <span className="stat-num">9,500+</span>
              <span className="stat-label">Children Reached Annually</span>
            </div>
            <div className="stat-card stat-blue">
              <span className="stat-num">15</span>
              <span className="stat-label">Digital Classrooms</span>
            </div>
            <div className="stat-card stat-saffron">
              <span className="stat-num">1,500+</span>
              <span className="stat-label">Students Reached via CSR</span>
            </div>
          </div>

          <div className="highlights-photos">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/highlight-1.jpg"
              alt="Rows of schoolchildren holding up smiley-ball toys during a Toy & Games Library celebration"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/highlight-2.jpg"
              alt="Students and MaBap Foundation volunteers holding newly distributed toys and games at a school"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/highlight-3.jpg"
              alt="A teacher leading a lesson on a digital classroom screen installed by MaBap Foundation"
            />
          </div>

          <Link href="/our-work" className="cta-link">
            See our full impact &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
