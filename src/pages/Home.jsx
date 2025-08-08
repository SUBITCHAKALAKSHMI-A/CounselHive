import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import DistrictMap from '../components/DistrictMap';
import TestimonialCarousel from '../components/TestimonialCarousel';
import QuickAccessWidgets from '../components/QuickAccessWidgets';
import { FaGraduationCap, FaUniversity, FaChartLine, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Home = () => {
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">Your Future Starts Here</h1>
              <p className="lead mb-4">
                Smart College Selection for 12th Graders in Tamil Nadu
              </p>
              <div className="d-flex gap-3">
                <Link to="/predict-college" className="btn btn-light btn-lg px-4 py-2 fw-bold">
                  Predict My College
                </Link>
                <Link to="/district-colleges" className="btn btn-outline-light btn-lg px-4 py-2">
                  Explore Colleges
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="image-carousel-container position-relative rounded shadow overflow-hidden">
                <div className="image-carousel-track" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`College ${index + 1}`}
                      className="carousel-image"
                      loading="lazy"
                    />
                  ))}
                </div>
                <button 
                  className="carousel-nav-btn prev-btn"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
                <button 
                  className="carousel-nav-btn next-btn"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
                <div className="carousel-indicators">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={index === currentImageIndex ? 'active' : ''}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rest of your existing code remains exactly the same */}
      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How We Help You Succeed</h2>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaGraduationCap size={48} className="text-primary mb-3" />
                  <h4>Personalized Recommendations</h4>
                  <p>Get college suggestions tailored to your marks, interests, and career aspirations.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaUniversity size={48} className="text-primary mb-3" />
                  <h4>Comprehensive College Data</h4>
                  <p>Access detailed information about all colleges in Tamil Nadu in one place.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaChartLine size={48} className="text-primary mb-3" />
                  <h4>Career Path Guidance</h4>
                  <p>Understand which courses lead to your dream career with our expert advice.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5">
            <blockquote className="blockquote">
              <p className="mb-0 fst-italic">
                "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
              </p>
              <footer className="blockquote-footer mt-2">Malcolm X</footer>
            </blockquote>
          </div>
        </div>
      </section>
      
      {/* District Explorer */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Explore Colleges District-wise in Tamil Nadu</h2>
          
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <DistrictMap 
                hoveredDistrict={hoveredDistrict}
                setHoveredDistrict={setHoveredDistrict}
              />
              
              {hoveredDistrict && (
                <div className="alert alert-info mt-3">
                  Showing colleges in <strong>{hoveredDistrict}</strong> district
                </div>
              )}
              
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                {['Chennai', 'Coimbatore', 'Madurai', 'Trichy', 'Salem'].map(district => (
                  <button 
                    key={district}
                    className="btn btn-outline-primary"
                    onMouseEnter={() => setHoveredDistrict(district)}
                    onMouseLeave={() => setHoveredDistrict(null)}
                  >
                    {district}
                  </button>
                ))}
              </div>
              
              <div className="text-center mt-4">
                <Link to="/district-colleges" className="btn btn-primary px-4">
                  View All Districts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialCarousel />
      
      {/* Quick Access Widgets */}
      <QuickAccessWidgets />
    </div>
  )
}

export default Home