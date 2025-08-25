import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TestimonialCarousel from '../components/TestimonialCarousel';
import QuickAccessWidgets from '../components/QuickAccessWidgets';
import TamilnaduCollegeMap from "./TamilnaduCollegeMap";
import Footer from "../components/Footer";

import { 
  FaGraduationCap, 
  FaUniversity, 
  FaChartLine, 
  FaChevronLeft, 
  FaChevronRight, 
  FaRocket, 
  FaCheck, 
  FaShieldAlt 
} from 'react-icons/fa';

import '../Home.css'; // Custom styles for gamified animations

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [userRank, setUserRank] = useState('');
  const [userCommunity, setUserCommunity] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sampleColleges = {
    OC: {
      ambitious: { name: "PSG College of Technology", branch: "Computer Science Engg" },
      realistic: { name: "Kumaraguru College of Technology", branch: "Electronics and Communication Engg" },
      backup: { name: "Government College of Technology, Coimbatore", branch: "Civil Engineering" }
    },
    BC: {
      ambitious: { name: "SSN College of Engineering", branch: "Information Technology" },
      realistic: { name: "Sri Krishna College of Technology", branch: "Electrical and Electronics Engg" },
      backup: { name: "Coimbatore Institute of Technology", branch: "Mechanical Engineering" }
    },
    MBC: {
      ambitious: { name: "Thiagarajar College of Engineering", branch: "Computer Science Engg" },
      realistic: { name: "K.L.N. College of Engineering", branch: "Electronics and Communication Engg" },
      backup: { name: "Anna University Regional Campus", branch: "Civil Engineering" }
    },
    SC: {
      ambitious: { name: "College of Engineering, Guindy", branch: "Information Technology" },
      realistic: { name: "Government College of Engineering, Salem", branch: "Electrical and Electronics Engg" },
      backup: { name: "Alagappa Chettiar College of Engg", branch: "Mechanical Engineering" }
    },
    ST: {
      ambitious: { name: "National Institute of Technology, Trichy", branch: "Computer Science Engg" },
      realistic: { name: "Government College of Engineering, Thanjavur", branch: "Electronics and Communication Engg" },
      backup: { name: "University College of Engineering, BIT Campus", branch: "Civil Engineering" }
    }
  };

  const images = [
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const nextImage = () => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
  const prevImage = () => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);

  const generatePreview = () => {
    if (!userRank || !userCommunity) return alert("Please enter both your rank and community");
    setIsLoading(true);
    setTimeout(() => {
      const rank = parseInt(userRank);
      let collegeData = sampleColleges[userCommunity];

      if (rank > 50000) {
        collegeData = {
          ...collegeData,
          realistic: collegeData.backup,
          backup: { name: "Regional Engineering College", branch: "Production Engineering" }
        };
      } else if (rank < 5000) {
        collegeData = {
          ...collegeData,
          ambitious: { name: "IIT Madras", branch: "Computer Science Engg" },
          realistic: collegeData.ambitious,
          backup: collegeData.realistic
        };
      }

      setPreviewData(collegeData);
      setShowPreview(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section text-white py-5">
        <div className="container py-1">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4 animate-slideIn">Your Future Starts Here</h1>
              <p className="lead mb-4 animate-slideIn delay-1">Smart College Selection for 12th Graders in Tamil Nadu</p>
              <div className="d-flex gap-3 animate-slideIn delay-2">
                <Link to="/predict-college" className="btn btn-light btn-lg px-4 py-2 fw-bold glowing-btn">
                  Predict My College
                </Link>
                <Link to="/district-colleges" className="btn btn-outline-light btn-lg px-4 py-2 glowing-btn">
                  Explore Colleges
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <div className="image-carousel-container position-relative rounded shadow overflow-hidden">
                <div className="image-carousel-track" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                  {images.map((img, index) => (
                    <img key={index} src={img} alt={`College ${index + 1}`} className="carousel-image" loading="lazy"/>
                  ))}
                </div>
                <button className="carousel-nav-btn prev-btn" onClick={prevImage}><FaChevronLeft /></button>
                <button className="carousel-nav-btn next-btn" onClick={nextImage}><FaChevronRight /></button>
                <div className="carousel-indicators">
                  {images.map((_, index) => (
                    <button key={index} className={index === currentImageIndex ? 'active' : ''} onClick={() => setCurrentImageIndex(index)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Counter */}
      <div className="bg-light py-2 border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 text-center text-md-start">
              <span className="text-muted"><span className="fw-bold text-primary">12,843 Students</span> have optimized their TNEA choices this week</span>
            </div>
            <div className="col-md-4 text-center text-md-end">
              <span className="badge bg-success">Live <span className="pulse-dot"></span></span>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">How We Help You Succeed</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaGraduationCap size={48} className="text-primary mb-3 icon-animate"/>
                  <h4>AI-Powered Predictions</h4>
                  <p>Get accurate college predictions based on 5+ years of TNEA cutoff data and advanced algorithms.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaUniversity size={48} className="text-primary mb-3 icon-animate"/>
                  <h4>Smart Preference Matching</h4>
                  <p>Choose between college-first or branch-first strategies with our interactive preference builder.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm hover-effect">
                <div className="card-body text-center p-4">
                  <FaChartLine size={48} className="text-primary mb-3 icon-animate"/>
                  <h4>Strategic Choice Ordering</h4>
                  <p>We optimize your TNEA choices from ambitious to safe bets, maximizing your admission chances.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <Link to="/how-it-works" className="btn btn-outline-primary px-4 me-3">See How It Works</Link>
            <Link to="/register" className="btn btn-primary px-4">Get Started Now</Link>
          </div>
        </div>
      </section>

      {/* Rank Explorer Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="rank-explorer-card bg-dark bg-opacity-25 p-4 rounded-3 mb-4">
                <h2 className="text-center mb-4">🎮 Where could your rank get you?</h2>
                <p className="text-center mb-4 lead">Enter your details for an instant personalized preview</p>
                <div className="row g-2 mb-4 justify-content-center">
                  <div className="col-md-5">
                    <input type="number" className="form-control form-control-lg" placeholder="Enter Your TNEA Rank" value={userRank} onChange={(e) => setUserRank(e.target.value)}/>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select form-select-lg" value={userCommunity} onChange={(e) => setUserCommunity(e.target.value)}>
                      <option value="">Select Community</option>
                      <option value="OC">OC</option>
                      <option value="BC">BC</option>
                      <option value="MBC">MBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-warning btn-lg w-100 fw-bold d-flex align-items-center justify-content-center" onClick={generatePreview} disabled={isLoading}>
                      {isLoading ? <span className="spinner-border spinner-border-sm me-2" role="status"></span> : "🔍 See My Preview"}
                    </button>
                  </div>
                </div>

                {showPreview && previewData && (
                  <div className="preview-results animate-slideIn mt-4">
                    <div className="row g-4">
                      <div className="col-md-4">
                        <div className="preview-card ambitious p-4 rounded text-center">
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <FaRocket className="text-purple me-2" size={24} />
                            <h5 className="mb-0">Ambitious Choice</h5>
                          </div>
                          <div className="college-name fw-bold fs-5">{previewData.ambitious.name}</div>
                          <div className="branch-name">{previewData.ambitious.branch}</div>
                          <small className="d-block mt-3 opacity-75">A reach option - could happen with cutoff shifts</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="preview-card realistic p-4 rounded text-center">
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <FaCheck className="text-blue me-2" size={24} />
                            <h5 className="mb-0">Realistic Match</h5>
                          </div>
                          <div className="college-name fw-bold fs-5">{previewData.realistic.name}</div>
                          <div className="branch-name">{previewData.realistic.branch}</div>
                          <small className="d-block mt-3 opacity-75">Strong chance based on your rank</small>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="preview-card backup p-4 rounded text-center">
                          <div className="d-flex align-items-center justify-content-center mb-3">
                            <FaShieldAlt className="text-green me-2" size={24} />
                            <h5 className="mb-0">Sure Bet</h5>
                          </div>
                          <div className="college-name fw-bold fs-5">{previewData.backup.name}</div>
                          <div className="branch-name">{previewData.backup.branch}</div>
                          <small className="d-block mt-3 opacity-75">Your safety option with high certainty</small>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-5">
                      <p className="mb-3 fs-5"><strong>This is just a preview!</strong> Unlock your full personalized list with all features.</p>
                      <Link to="/register" className="btn btn-success btn-lg px-5">🎮 Unlock My Full Report (Free)</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tamil Nadu Colleges Map Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5">Tamil Nadu Engineering Colleges Map</h2>
          <TamilnaduCollegeMap />
        </div>
      </section>

      <TestimonialCarousel />
      <QuickAccessWidgets />
      <Footer />
    </div>
  )
}

export default Home;
