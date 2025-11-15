import { Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>📚 EduVerse</h3>
            <p>Empowering learners worldwide with quality education and practical skills.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/mezowkoky002 " target="_blank" aria-label="Facebook">f</a>
              
              <a href="https://www.linkedin.com/in/moaaz-hussain-4a4586337 " target="_blank" aria-label="LinkedIn">in</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/courses">Courses</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Categories</h4>
            <ul>
              <li><a href="/courses?category=Web Development">Web Development</a></li>
              <li><a href="/courses?category=Design">Design</a></li>
              <li><a href="/courses?category=AI">AI & ML</a></li>
              <li><a href="/courses?category=Cybersecurity">Cybersecurity</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={18} />
                <a href="mailto:info@eduverse.com">info@eduverse.com</a>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <a href="tel:+1234567890">+201289257489</a>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Egypt-cairo-6 October</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} EduVerse. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}