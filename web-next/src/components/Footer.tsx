import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/logo.jpg"
            alt="MaBap Foundation logo"
            className="footer-logo"
          />
          <p className="footer-tagline">
            अविरतम् सेवा महे — Devoted to the Seva of Humanity
          </p>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Quick Links</p>
          <nav className="footer-nav" aria-label="Footer">
            <Link href="/">Home</Link>
            <Link href="/about">About Us</Link>
            <Link href="/our-work">Our Work</Link>
            <Link href="/courses-activities">Courses &amp; Activities</Link>
            <Link href="/media">Media</Link>
            <Link href="/donate">Donate</Link>
          </nav>
        </div>

        <div className="footer-col">
          <p className="footer-heading">Get in Touch</p>
          <div className="footer-contact">
            <div className="footer-contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:mabapfoundation@gmail.com" className="contact-value">
                mabapfoundation@gmail.com
              </a>
            </div>
            <div className="footer-contact-item">
              <span className="contact-label">Chairman</span>
              <span className="contact-value">Dr. CA Mayur B. Nayak</span>
            </div>
            <div className="footer-contact-item">
              <span className="contact-label">Director</span>
              <span className="contact-value">Mr. Hitesh Mehta</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>
            &copy; 2026 MaBap Foundation — Registered Section 8 Non-Profit. All
            rights reserved. &middot; <Link href="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
