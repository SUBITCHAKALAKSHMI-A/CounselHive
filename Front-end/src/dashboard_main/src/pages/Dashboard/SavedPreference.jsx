import React, { useState, useEffect } from 'react';
import './SavedPreference.css';

const SavedPreference = ({ setCutoff, setCategory, setDistricts, setBranches, setLimitChoice, setResults, navigate }) => {
  const [savedPreferences, setSavedPreferences] = useState([]);

  // Load saved preferences on component mount
  useEffect(() => {
    loadSavedPreferences();
  }, []);

  const loadSavedPreferences = () => {
    const saved = JSON.parse(localStorage.getItem('userPreferences') || '[]');
    setSavedPreferences(saved);
  };

  const applySavedPreference = (pref) => {
    setCutoff(pref.cutoff);
    setCategory(pref.category);
    setDistricts(pref.districts);
    setBranches(pref.branches);
    setLimitChoice(pref.limitChoice);
    setResults([]); // Clear previous results
    alert('✅ Preference applied!');
    navigate('predict-college'); // Switch tab to Predict College
  };

  const deletePreference = (id) => {
    if (window.confirm('Are you sure you want to delete this preference?')) {
      const updated = savedPreferences.filter(p => p.id !== id);
      setSavedPreferences(updated);
      localStorage.setItem('userPreferences', JSON.stringify(updated));
    }
  };

  const clearAllSavedPreferences = () => {
    if (window.confirm('Are you sure you want to delete ALL saved preferences?')) {
      setSavedPreferences([]);
      localStorage.setItem('userPreferences', '[]');
    }
  };

  return (
    <div className="saved-preferences-container">
      <header className="saved-preferences-header">
        <h1>💾 Saved Preferences</h1>
        <p>Manage your saved college preferences</p>
      </header>

      <div className="saved-preferences-content">
        <div className="saved-preferences-card">
          <div className="preferences-controls">
            <button 
              onClick={loadSavedPreferences}
              className="refresh-btn"
            >
              🔄 Refresh List
            </button>
            {savedPreferences.length > 0 && (
              <button 
                onClick={clearAllSavedPreferences}
                className="clear-all-btn"
              >
                🗑️ Clear All
              </button>
            )}
          </div>

          {savedPreferences.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <h3>No Saved Preferences</h3>
              <p>Your saved preferences will appear here once you save them.</p>
            </div>
          ) : (
            <div className="saved-preferences-list">
              {savedPreferences
                .slice() // create a copy
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // descending by timestamp
                .map(pref => (
                  <div key={pref.id} className="saved-preference-item">
                    <div style={{
                      background: '#fff',
                      borderRadius: '16px',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                      padding: '32px',
                      marginBottom: '24px',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '24px', marginBottom: '10px' }}>📚 Cutoff: <strong>{pref.cutoff}</strong></div>
                      <div style={{ fontSize: '22px', marginBottom: '8px' }}>🎓 Branch: <strong>{(pref.branches && pref.branches[0]) || 'All'}</strong></div>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>👥 Category: <strong>{(pref.category) || 'All'}</strong></div>
                      <div style={{ fontSize: '20px', marginBottom: '8px' }}>📍 District: <strong>{(pref.districts && pref.districts[0]) || 'All'}</strong></div>
                      <div style={{ color: '#718096', fontSize: '15px', marginBottom: '18px' }}>
                        Saved: {pref.timestamp ? new Date(pref.timestamp).toLocaleDateString() : ''}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '18px' }}>
                        <button
                          style={{
                            background: '#38a169',
                            color: 'white',
                            border: 'none',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            fontSize: '18px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onClick={() => applySavedPreference(pref)}
                        >
                          ✅ Apply
                        </button>
                        <button
                          style={{
                            background: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            padding: '14px 32px',
                            borderRadius: '10px',
                            fontSize: '18px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                          onClick={() => deletePreference(pref.id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedPreference;