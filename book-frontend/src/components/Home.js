import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import programmingImg from '../assets/image 1.jpeg';
import FullstackImg from '../assets/image 2.jpeg';
import UIUXDesignImg from '../assets/image 3.jpeg';

const Home = () => {
  return (
    <div className="home-wrapper">
      <header className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to <span>BookBazaar</span></h1>
          <p>Explore, Read, and Buy your favorite books online.</p>
          <div className="hero-buttons">
          <Link to="/register" className="hero-btn btn-secondary register-btn">Register</Link>
            <Link to="/login" className="hero-btn btn-secondary login-btn">Login</Link>
           
          </div>
         
        </div>
      </header>

      <section className="featured-books">
        <h2>📖Books</h2>
        <div className="book-grid">
  <div className="book-card">
  <img src={programmingImg} alt="Programming" />

    <h3>Programming Fundamentals</h3>
    <p>Learn the basics of coding with modern languages.</p>
  </div>

  <div className="book-card">
  <img src={FullstackImg} alt="FullStack" />
    <h3>Full Stack Development</h3>
    <p>A complete guide to building web apps from scratch.</p>
  </div>

  <div className="book-card">
  <img src={UIUXDesignImg} alt="ui/ux design" />
    <h3>UI/UX Design</h3>
    <p>Design principles and tools for beautiful interfaces.</p>
  </div>
</div>

      </section>

      <section className="info-section about-section">
  <h2>About BookBazaar</h2>
  <p>
    BookBazaar is your ultimate destination for a vast collection of books across all genres, 
    including programming, full stack development, design, and more. Our mission is to provide 
    readers and learners with high-quality resources to help them grow their skills and explore 
    new worlds through reading.
  </p>
  <p>
    Whether you are a student, professional, or hobbyist, BookBazaar offers carefully curated 
    selections to meet your interests. With an easy-to-use interface, secure checkout, and 
    prompt delivery, shopping for books has never been simpler.
  </p>
  <p>
    We believe in the power of knowledge and strive to create a community where readers can 
    find inspiration, share ideas, and stay updated with the latest releases and trends.
  </p>
  <p>
    Join thousands of happy customers and dive into your next favorite book today!
  </p>
</section>

      <footer className="footer-section">
  <div className="footer-content">
    <p>© 2025 BookBazaar. All rights reserved.</p>
    <p>
      Contact us: <a href="mailto:support@bookbazaar.com">support@bookbazaar.com</a> | Phone: +91 98765 43210
    </p>
  </div>
</footer>
    </div>
  );
};

export default Home;
