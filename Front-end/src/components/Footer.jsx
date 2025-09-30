import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">
          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">CounselHive</h4>
            <p className="small">
              Smart counseling assistant for Tamil Nadu engineering aspirants.  
              Making college selection stress-free and data-driven.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h5 className="fw-semibold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/district-colleges" className="text-light text-decoration-none">District Colleges</Link></li>
              <li><Link to="/predict-college" className="text-light text-decoration-none">Predict My College</Link></li>
              <li><Link to="/how-it-works" className="text-light text-decoration-none">How It Works</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-semibold">Resources</h5>
            <ul className="list-unstyled">
              <li><Link to="/faq" className="text-light text-decoration-none">FAQs</Link></li>
              <li><Link to="/blog" className="text-light text-decoration-none">Blog</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-light text-decoration-none">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-semibold">Connect with Us</h5>
            <div className="d-flex gap-3 mb-3">
              <a href="#" className="text-light fs-5"><FaFacebookF /></a>
              <a href="#" className="text-light fs-5"><FaTwitter /></a>
              <a href="#" className="text-light fs-5"><FaLinkedinIn /></a>
              <a href="#" className="text-light fs-5"><FaInstagram /></a>
            </div>
            <p className="small mb-0">📧 support@counselhive.com</p>
            <p className="small">📍 Chennai, Tamil Nadu</p>
          </div>
        </div>

        <hr className="border-secondary" />
        <div className="text-center small">
          © {new Date().getFullYear()} CounselHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
