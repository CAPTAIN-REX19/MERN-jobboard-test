import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <span className="landing-logo">JobBoard</span>
        <Link to="/register" className="btn btn-primary">Login / Register</Link>
      </nav>

      <main className="landing-hero">
        <div className="hero-text">
          <h1>Track Every Job Application <span className="accent">Effortlessly</span></h1>
          <p>
            JobBoard helps you stay organized while job hunting. Add applications,
            track their status, and never lose sight of an opportunity.
          </p>
          <div className="hero-cta">
            <Link to="/register" className="btn btn-primary btn-lg">Get Started — It's Free</Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Jobs Tracked</span>
            </div>
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Status Types</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="card-preview">
            <div className="preview-job">
              <div className="preview-dot interview"></div>
              <div className="preview-info">
                <strong>Frontend Developer</strong>
                <span>Google · Remote</span>
              </div>
              <span className="badge badge-interview">Interview</span>
            </div>
            <div className="preview-job">
              <div className="preview-dot pending"></div>
              <div className="preview-info">
                <strong>React Engineer</strong>
                <span>Meta · New York</span>
              </div>
              <span className="badge badge-pending">Pending</span>
            </div>
            <div className="preview-job">
              <div className="preview-dot declined"></div>
              <div className="preview-info">
                <strong>UI Engineer</strong>
                <span>Netflix · Berlin</span>
              </div>
              <span className="badge badge-declined">Declined</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;
