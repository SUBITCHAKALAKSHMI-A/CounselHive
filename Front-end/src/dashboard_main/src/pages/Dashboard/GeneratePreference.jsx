import React, { useState } from 'react';
import './GeneratePreference.css';

const GeneratePreference = ({ navigate }) => {
  const [preferences, setPreferences] = useState({
    location: '',
    cutoff: '',
    branch: '',
    category: ''
  });

  const locations = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kancheepuram",
    "Kanchipuram",
    "Kanyakumari",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Nagapattinam",
    "Nagappattinam",
    "Nagercoil",
    "Namakkal",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Salem",
    "Sivaganagi",
    "Sivaganga",
    "Sivagangai",
    "Thanjavur",
    "The Nilgiris",
    "Theni",
    "Thiruvallur",
    "Thiruvannamalai",
    "Thiruvarur",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelvei",
    "Tirunelveli",
    "Tiruppur",
    "Tirupur",
    "Tiruvallur",
    "Tiruvanamalai",
    "Tiruvannamalai",
    "Tuticorin",
    "Vellore",
    "Villupuram",
    "Virudhunagar"
  ];

  const branches = [
    "Aeronautical Engineering",
    "Aerospace Engineering",
    "Agricultural Engineering",
    "Artificial Intelligence And Data Science",
    "Artificial Intelligence And Machine Learning",
    "Automobile Engineering",
    "B.Plan",
    "Bachelor Of Design",
    "Bio Medical Engineering",
    "Bio Technology",
    "Bio Technology And Bio Chemical Engineering",
    "Ceramic Technology",
    "Chemical And Electro Chemical Engineering",
    "Chemical Engineering",
    "Civil And Structural Engineering",
    "Civil Engineering",
    "Civil Engineering (Environmental Engineering)",
    "Civil Engineering (Tamil Medium)",
    "Computer And Communication Engineering",
    "Computer Science And Business System",
    "Computer Science And Design",
    "Computer Science And Engineering",
    "Computer Science And Engineering (Ai And Machine Learning)",
    "Computer Science And Engineering (Cyber Security)",
    "Computer Science And Engineering (Data Science)",
    "Computer Science And Engineering (Internet Of Things And Cyber Security Including Block Chain Technology)",
    "Computer Science And Engineering (Internet Of Things)",
    "Computer Science And Engineering (Tamil)",
    "Computer Science And Technology",
    "Cyber Security",
    "Electrical And Computer Engineering",
    "Electrical And Electronics Engineering",
    "Electronic Instrumentation And Control Engineering",
    "Electronics And Communication Engineering",
    "Electronics And Computer Engineering",
    "Electronics And Instrumentation Engineering",
    "Electronics Engineering (Vlsi Design And Technology)",
    "Environmental Engineering",
    "Fashion Technology",
    "Food Technology",
    "Geo Informatics",
    "Handloom And Textile Technology",
    "Industrial Bio Technology",
    "Industrial Engineering And Management",
    "Information Technology",
    "Instrumentation And Control Engineering",
    "Interior Design",
    "Leather Technology",
    "M.Tech. Computer Science And Engineering (Integrated 5 Years)",
    "Manufacturing Engineering",
    "Marine Engineering",
    "Mechanical And Automation Engineering",
    "Mechanical And Mechatronics Engineering (Additive Manufacturing)",
    "Mechanical And Smart Manufacturing",
    "Mechanical Engineering",
    "Mechanical Engineering (Automobile)",
    "Mechanical Engineering (Manufacturing)",
    "Mechanical Engineering (Tamil Medium)",
    "Mechatronics Engineering",
    "Medical Electronics",
    "Metallurgical Engineering",
    "Petro Chemical Engineering",
    "Petro Chemical Technology",
    "Petroleum Engineering",
    "Pharmaceutical Technology",
    "Plastic Technology",
    "Production Engineering",
    "Robotics And Automation",
    "Rubber And Plastic Technology",
    "Safety And Fire Engineering",
    "Textile Chemistry",
    "Textile Technology"
  ];

  const communityTypes = ['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'];

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const savePreference = () => {
    // require cutoff, branch, category, district
    if (!preferences.cutoff) {
      alert('Please, Must fill cutoff marks before saving the preference.');
      return;
    }
    if(preferences.cutoff>200 || preferences.cutoff<0){
      alert('Cutoff marks must be between 0 and 200.');
      return;
    }

    const newPreference = {
      id: Date.now(),
      cutoff: preferences.cutoff,
      branches: [preferences.branch],
      districts: [preferences.location],
      category: preferences.category,
      // keep limitChoice optional (not part of this simplified form)
      timestamp: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem('userPreferences') || '[]');
    const updatedPreferences = [...existing, newPreference];
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));

    alert('✅ Preference saved successfully.');
    setPreferences({
      location: '',
      cutoff: '',
      branch: '',
      category: ''
    });

    if (typeof navigate === 'function') navigate('saved-preferences');
  };

  const clearPreferences = () => {
    if (window.confirm('Are you sure you want to clear the form?')) {
      setPreferences({
        location: '',
        cutoff: '',
        branch: '',
        category: ''
      });
    }
  };

  return (
    <div className="generate-preference-container">
      <header className="preference-header">
        <h1>🎯 Set Your College Preferences</h1>
        <p>Fill cutoff, branch, category and district to save preference.</p>
      </header>

      <div className="preference-main-content">
        <div className="preference-settings-card">
          <div className="card-row">
            <label>📊 Cutoff</label>
            <input
              type="number"
              min="0"
              value={preferences.cutoff}
              onChange={(e) => handlePreferenceChange('cutoff', e.target.value)}
              placeholder="Enter cutoff marks"
            />
          </div>

          <div className="card-row">
            <label>🎓 Branch</label>
            <select
              value={preferences.branch}
              onChange={(e) => handlePreferenceChange('branch', e.target.value)}
            >
              <option value="">All branches</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>

          <div className="card-row">
            <label>👥 Category</label>
            <select
              value={preferences.category}
              onChange={(e) => handlePreferenceChange('category', e.target.value)}
            >
              <option value="">All categories</option>
              {communityTypes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="card-row">
            <label>📍 District</label>
            <select
              value={preferences.location}
              onChange={(e) => handlePreferenceChange('location', e.target.value)}
            >
              <option value="">All districts</option>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="preference-actions">
            <button onClick={savePreference} className="save-preference-btn">💾 Save Preference</button>
            <button onClick={clearPreferences} className="clear-preference-btn">🗑️ Clear</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratePreference;