import React, { useState, useEffect } from 'react';
import ProfileDropdown from './ProfileDropdown';
import Chatbot from './Chatbot';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import CollegeList from './CollegeList';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Guest',
    email: '',
    avatar: 'G'
  });
  const [notificationCount, setNotificationCount] = useState(3);
  const navigate = useNavigate();
  const [savedPreferences, setSavedPreferences] = useState([]);
  const [formData, setFormData] = useState({
    course: 'Computer Science',
    budget: '',
    percentage: ''
  });
  // Get user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        name: parsedUser.name || parsedUser.email,
        email: parsedUser.email,
        avatar: parsedUser.name ? parsedUser.name.charAt(0).toUpperCase() : 'G'
      });
    }
  }, []);

  // Mock data for the dashboard
  const overviewData = {
    totalColleges: 136,
    eligibleColleges: 85,
    savedPreferences: 15,
    deadlinesSoon: 4
  };

  const recommendationHighlights = [
    {
      id: 1,
      name: 'College A',
      rank: 12,
      score: 'Fid5',
      placement: 'Placement Lo',
      color: '#FF6B9D'
    },
    {
      id: 2,
      name: 'College B',
      rank: 24,
      score: 'Fas',
      placement: 'Placement 90',
      color: '#4ECDC4'
    },
    {
      id: 3,
      name: 'College C',
      rank: 7,
      score: 'Fes',
      placement: 'Placement 88',
      color: '#FFA07A'
    }
  ];

  const comparisonData = [
    {
      criteria: 'Course/Stream',
      collegeA: 'Computer Science',
      collegeB: 'Mechanical Engineer.'
    },
    {
      criteria: 'Cost/Budget',
      collegeA: '$12,000',
      collegeB: '$3,000'
    },
    {
      criteria: 'Percentage',
      collegeA: '95%',
      collegeB: '90%'
    }
  ];

  const savedColleges = [
    { name: 'College A', status: 'Saved' },
    { name: 'College B', status: 'Saved' }
  ];

  const handleSignOut = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('User signed out');
    window.location.href = '/login';
  };

  const handleSaveCollege = (collegeId) => {
    console.log('College saved:', collegeId);
  };
  // ...inside Dashboard component...

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};

const handleGenerateList = (e) => {
  e.preventDefault();
  // You can add logic to generate a real list here
  const newPreference = {
    course: formData.course,
    budget: formData.budget,
    percentage: formData.percentage,
    date: new Date().toLocaleString()
  };
  setSavedPreferences(prev => [...prev, newPreference]);
  alert('Preference list generated and saved!');
  setFormData({
    course: 'Computer Science',
    budget: '',
    percentage: ''
  });
};

  // const handleGenerateList = () => {
  //   console.log('Generating new college list...');
  // };

  const handleUploadMarks = () => {
    console.log('Uploading marks/scorecard...');
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <div className="top-navbar">
        <div className="logo-section">
          <div className="logo-icon">🎓</div>
          <span className="logo-text">College Preference List Generator</span>
        </div>
        <div className="main-nav">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            className={`nav-link ${activeTab === 'college-list' ? 'active' : ''}`}
            onClick={() => setActiveTab('college-list')}
          >
            College List
          </button>
          <button
            className={`nav-link ${activeTab === 'saved-preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('saved-preferences')}
          >
            Saved Preferences
          </button>
          <div className="notification-icon" onClick={() => setActiveTab('saved-preferences')}>
            🔔
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </div>
        </div>

        {/* Profile Dropdown */}
        <div className="user-profile">
          <ProfileDropdown user={user} onSignOut={handleSignOut} />
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="sidebar">
          <div className="sidebar-nav">
            <button
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <span className="sidebar-icon">📊</span>
              Dashboard
            </button>
            <button
              className={`sidebar-item ${activeTab === 'generate-list' ? 'active' : ''}`}
              onClick={() => setActiveTab('generate-list')}
            >
              <span className="sidebar-icon">📄</span>
              Generate Preference List
            </button>
            <button
              className={`sidebar-item ${activeTab === 'saved-colleges' ? 'active' : ''}`}
              onClick={() => setActiveTab('saved-colleges')}
            >
              <span className="sidebar-icon">🔖</span>
              Saved Colleges
            </button>
            <button
              className={`sidebar-item ${activeTab === 'compare-colleges' ? 'active' : ''}`}
              onClick={() => setActiveTab('compare-colleges')}
            >
              <span className="sidebar-icon">⚖️</span>
              Compare Colleges
            </button>
            <button
              className={`sidebar-item ${activeTab === 'ai-recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-recommendations')}
            >
              <span className="sidebar-icon">🤖</span>
              AI Recommendations
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="main-content">
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Message with User's Name */}
              <div className="welcome-section">
                <h1>Welcome back, {user.name}!</h1>
                <p>Here's your personalized college recommendation dashboard</p>
              </div>

              {/* Overview Section */}
              <div className="overview-section">
                <h2>Overview</h2>
                <div className="overview-cards">
                  <div className="overview-card primary">
                    <div className="card-icon">🏫</div>
                    <div className="card-content">
                      <div className="card-number">{overviewData.totalColleges}</div>
                      <div className="card-label">Total Colleges Analyzed</div>
                    </div>
                  </div>
                  <div className="overview-card">
                    <div className="card-icon">✅</div>
                    <div className="card-content">
                      <div className="card-number">{overviewData.eligibleColleges}</div>
                      <div className="card-label">Eligible Colleges Found</div>
                    </div>
                  </div>
                  <div className="overview-card">
                    <div className="card-icon">🔖</div>
                    <div className="card-content">
                      <div className="card-number">{overviewData.savedPreferences}</div>
                      <div className="card-label">Saved Preferences</div>
                    </div>
                  </div>
                  <div className="overview-card">
                    <div className="card-icon">⏰</div>
                    <div className="card-content">
                      <div className="card-number">{overviewData.deadlinesSoon}</div>
                      <div className="card-label">Application Deadlines Soon</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="quick-actions-section">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                  <button className="action-btn primary" onClick={handleGenerateList}>
                    Generate New College List
                  </button>
                  <label className="action-btn secondary" style={{ cursor: 'pointer' }}>
                    Upload Marks/Scorecard
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleUploadMarks}
                    />
                  </label>
                </div>
              </div>

              {/* Recommendation Highlights Section */}
              <div className="recommendation-section">
                <h2>Recommendation Highlights</h2>
                <div className="recommendation-cards">
                  {recommendationHighlights.map((college) => (
                    <div key={college.id} className="recommendation-card">
                      <div className="college-icon" style={{ backgroundColor: college.color }}>
                        {college.name.charAt(0)}
                      </div>
                      <div className="college-info">
                        <div className="college-name">{college.name}</div>
                        <div className="college-details">
                          <span>Rank {college.rank}</span>
                          <span>{college.score}</span>
                          <span>{college.placement}</span>
                        </div>
                      </div>
                      <button
                        className="save-btn"
                        onClick={() => handleSaveCollege(college.id)}
                      >
                        Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </>
          )}

          {/* Other tab contents remain the same */}
          {activeTab === 'college-list' && (
            <div className="tab-content">
              <h2>College List</h2>
              <p>Your personalized college recommendations will appear here.</p>
              <CollegeList />
            </div>
          )}

          {activeTab === 'saved-preferences' && (
            <div className="tab-content">
              <h2>Saved Preferences</h2>
              <p>Your saved college preferences will appear here.</p>
              <ul style={{ padding: 0 }}>
                {savedPreferences.length === 0 ? (
                  <li style={{ listStyle: 'none', color: '#888' }}>No preferences saved yet.</li>
                ) : (
                  savedPreferences.map((pref, idx) => (
                    <li key={idx} style={{
                      background: '#e0f7fa',
                      margin: '12px 0',
                      padding: '12px',
                      borderRadius: '8px',
                      listStyle: 'none'
                    }}>
                      <strong>Course:</strong> {pref.course}<br />
                      <strong>Budget:</strong> {pref.budget}<br />
                      <strong>Percentage:</strong> {pref.percentage}<br />
                      <small>Saved on: {pref.date}</small>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}

          {activeTab === 'generate-list' && (
            <div className="tab-content">
              <h2>Generate Preference List</h2>
              <p>Choose your preferences and generate a personalized college list.</p>
              <form
                style={{
                  background: '#f7fafd',
                  padding: '24px',
                  borderRadius: '12px',
                  maxWidth: '400px',
                  margin: '24px auto',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)'
                }}
                onSubmit={handleGenerateList}
              >
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 'bold' }}>Course/Stream:</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', marginTop: '6px' }}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Biotechnology">Biotechnology</option>
                  </select>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 'bold' }}>Budget:</label>
                  <input
                    type="number"
                    name="budget"
                    min="1000"
                    max="100000"
                    placeholder="Enter your budget"
                    value={formData.budget}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', marginTop: '6px' }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontWeight: 'bold' }}>Percentage/Score:</label>
                  <input
                    type="number"
                    name="percentage"
                    min="0"
                    max="100"
                    placeholder="Enter your percentage"
                    value={formData.percentage}
                    onChange={handleFormChange}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', marginTop: '6px' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(90deg, #00e0e0 0%, #00ffff 100%)',
                    color: '#1e2a38',
                    fontWeight: 'bold',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '12px',
                    width: '100%',
                    boxShadow: '0 0 12px #5b6e6eff, 0 0 24px #cdd6d6ff',
                    cursor: 'pointer',
                    marginTop: '12px'
                  }}
                >
                  Generate List
                </button>
              </form>
            </div>
          )}

          {activeTab === 'saved-colleges' && (
            <div className="tab-content">
              <h2>Saved Colleges</h2>
              <p>View and manage your saved colleges.</p>
              <div className="saved-colleges-section">

                <div className="saved-colleges-list">
                  {savedColleges.map((college, index) => (
                    <div key={index} className="saved-college-item">
                      {college.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'compare-colleges' && (
            <div className="tab-content">
              <h2>Compare Colleges</h2>
              <p>Compare different colleges side by side.</p>
              {/* College Comparison Section */}
              <div className="comparison-section">
                <h2>College Comparison</h2>
                <div className="comparison-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Criteria</th>
                        <th>College A</th>
                        <th>College B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonData.map((row, index) => (
                        <tr key={index}>
                          <td>{row.criteria}</td>
                          <td>{row.collegeA}</td>
                          <td>{row.collegeB}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai-recommendations' && (
            <div className="tab-content">
              <h2>AI Recommendations</h2>
              <p>Get AI-powered college recommendations.</p>
              <Chatbot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;