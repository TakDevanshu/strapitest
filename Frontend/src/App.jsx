import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [page, setPage] = useState(null);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:1337/api/pages?filters[slug][$eq]=home")
        .then(res => {
          console.log("Page response:", res.data);
          setPage(res.data.data?.[0] || res.data);
        })
        .catch(err => {
          console.error("Page error:", err);
          setPage({}); 
        }),

      axios.get("http://localhost:1337/api/services")
        .then(res => {
          console.log("Services response:", res.data);
          setServices(res.data.data || res.data || []);
        })
        .catch(err => {
          console.error("Services error:", err);
          setServices([]);
        }),

      axios.get("http://localhost:1337/api/blogs")
        .then(res => {
          console.log("Blogs response:", res.data);
          setBlogs(res.data.data || res.data || []);
        })
        .catch(err => {
          console.error("Blogs error:", err);
          setBlogs([]);
        })
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p className="loading-text">Loading CMS...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-logo">STRAPI DEMO</div>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#blog">Blog</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{page?.hero_title || 'Welcome'}</h1>
          <h3 className="hero-subtitle">{page?.hero_subtitle || 'Powered by Strapi'}</h3>
          {typeof page?.content === 'string' && (
            <p className="hero-description">{page.content}</p>
          )}
        </div>
        <div className="hero-decoration"></div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services">
        <div className="section-header">
          <h2>Our Services</h2>
          <div className="section-line"></div>
        </div>
        <div className="services-grid">
          {services.map((s, index) => (
            <div key={s.id} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="service-icon">{s?.icon_name || '🔧'}</div>
              <h3 className="service-title">{s?.title || 'Service'}</h3>
              <p className="service-description">{s?.description || 'Description coming soon...'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="blog">
        <div className="section-header">
          <h2>Latest Insights</h2>
          <div className="section-line"></div>
        </div>
        <div className="blog-list">
          {blogs.map((b, index) => (
            <article key={b.id} className="blog-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="blog-number">{String(index + 1).padStart(2, '0')}</div>
              <div className="blog-content">
                <h3 className="blog-title">{b?.title || 'Blog Post'}</h3>
                <p className="blog-excerpt">{b?.excerpt || 'Excerpt coming soon...'}</p>
                <button className="blog-read-more">Read More →</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">Powered by Strapi Headless CMS</p>
          <div className="footer-decoration"></div>
        </div>
      </footer>
    </div>
  );
}