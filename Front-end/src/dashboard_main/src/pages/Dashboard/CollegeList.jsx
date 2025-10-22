import React, { useState, useEffect } from 'react';
import './CollegeList.css';

const CollegeList = () => {
  const [colleges, setColleges] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [expandedCollege, setExpandedCollege] = useState(null);

  // loading state added
  const [loading, setLoading] = useState(false);
  
  // States for input fields
  const [pendingName, setPendingName] = useState('');
  const [pendingDistrict, setPendingDistrict] = useState('');

  // States for actual search filter
  const [searchName, setSearchName] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('http://127.0.0.1:5000/api/college-list')
      .then(res => res.json())
      .then(data => {
        // defensive: ensure array
        const rows = Array.isArray(data) ? data : [];

        // group by College Code and merge Branches
        const grouped = {};
        rows.forEach(item => {
          const code = String(item['College Code'] ?? '').trim();
          if (!code) return;

          if (!grouped[code]) {
            // clone and ensure Branches is an array
            grouped[code] = {
              ...item,
              'Branches': Array.isArray(item['Branches']) ? [...item['Branches']] : []
            };
          } else {
            // merge branches avoiding duplicates (by Branch Code + Branch Name)
            const existing = grouped[code];
            const seen = new Set(existing['Branches'].map(b => `${b['Branch Code'] || ''}||${b['Branch Name'] || ''}`));
            if (Array.isArray(item['Branches'])) {
              item['Branches'].forEach(b => {
                const key = `${b['Branch Code'] || ''}||${b['Branch Name'] || ''}`;
                if (!seen.has(key)) {
                  existing['Branches'].push(b);
                  seen.add(key);
                }
              });
            }
            // fill missing top-level fields if empty
            ['College Name','District','Type','Established'].forEach(f => {
              if ((!existing[f] || existing[f] === '') && item[f]) existing[f] = item[f];
            });
          }
        });

        const merged = Object.values(grouped);
        setColleges(merged);
        setLoading(false);
      })
      .catch(() => {
        setColleges([]);
        setLoading(false);
      });
    const savedFavorites = localStorage.getItem('collegeFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Filter only when searchName or searchDistrict changes
  useEffect(() => {
    // Keep all characters (do not strip punctuation). Only trim & lowercase for case-insensitive substring match.
    const normalizeKeepAll = s => String(s || '').trim().toLowerCase();
    const nameQuery = normalizeKeepAll(searchName);
    const districtQuery = normalizeKeepAll(searchDistrict);

    const filtered = colleges.filter(college => {
      const collegeName = normalizeKeepAll(college['College Name']);
      const collegeDistrict = normalizeKeepAll(college['District']);

      // If both provided, require both queries to be substrings (considers all characters)
      if (nameQuery && districtQuery) {
        return collegeName.includes(nameQuery) && collegeDistrict.includes(districtQuery);
      }
      // Only name provided
      if (nameQuery) {
        return collegeName.includes(nameQuery);
      }
      // Only district provided
      if (districtQuery) {
        return collegeDistrict.includes(districtQuery);
      }
      // Neither provided -> include all
      return true;
    });

    setFilteredColleges(filtered);
  }, [searchName, searchDistrict, colleges]);

  const toggleFavorite = (collegeCode, branchCode) => {
    const favoriteKey = `${collegeCode}-${branchCode}`;
    const newFavorites = new Set(favorites);

    if (newFavorites.has(favoriteKey)) {
      newFavorites.delete(favoriteKey);
    } else {
      newFavorites.add(favoriteKey);
    }

    setFavorites(newFavorites);
    localStorage.setItem('collegeFavorites', JSON.stringify([...newFavorites]));
  };

  const isFavorite = (collegeCode, branchCode) => {
    return favorites.has(`${collegeCode}-${branchCode}`);
  };

  const toggleCollegeExpansion = (collegeCode) => {
    setExpandedCollege(expandedCollege === collegeCode ? null : collegeCode);
  };

  // decide which list to render: all when both search fields empty, otherwise filtered
  const displayedColleges = ( (searchName || searchDistrict) && (searchName.trim() || searchDistrict.trim()) )
    ? filteredColleges
    : colleges;

  return (
    <div className="college-list-container">
      <header className="page-header">
        <h1>Engineering Colleges in Tamil Nadu</h1>
        <p className="subtitle">Browse {displayedColleges.length} colleges with detailed cutoff scores</p><br />
         {loading && (
           <div style={{ textAlign: 'center', color: '#666', margin: '12px 0', fontWeight: '600' }}>
             Wait, colleges are loading...
           </div>
         )}
        <div style={{ display: 'flex', gap: '16px', marginTop: '16px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search by College Name"
            value={pendingName}
            onChange={e => {
              const v = e.target.value;
              setPendingName(v);
              // update live filter on every character
              setSearchName(v);
            }}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '220px'
            }}
          />
          <input
            type="text"
            placeholder="Search by District"
            value={pendingDistrict}
            onChange={e => {
              const v = e.target.value;
              setPendingDistrict(v);
              // update live filter on every character
              setSearchDistrict(v);
            }}
            style={{
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              width: '180px'
            }}
          />
          <button
            onClick={() => {
              setSearchName(pendingName);
              setSearchDistrict(pendingDistrict);
            }}
            style={{
              padding: '8px 18px',
              background: '#3182ce',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
          <button
            onClick={() => {
              setPendingName('');
              setPendingDistrict('');
              setSearchName('');
              setSearchDistrict('');
            }}
            style={{
              padding: '8px 18px',
              background: '#e2e8f0',
              color: '#2d3748',
              border: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
        </div>
      </header>

      {/* Colleges Grid */}
      <div className="colleges-grid">
        {displayedColleges.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#888', marginTop: '32px' }}>
            No colleges found.
          </div>
        ) : (
          displayedColleges.map((college, collegeIndex) => {
            const isExpanded = expandedCollege === college['College Code'];

            // create a stable unique key: code + short normalized name
            const safeName = String(college['College Name'] || '').replace(/[^a-z0-9]/gi, '').slice(0, 30);
            const collegeKey = `${college['College Code']}-${safeName}-${collegeIndex}`;
            return (
              <div key={collegeKey} className="college-card">
                <div className="college-header">
                  <div className="college-title">
                    <h3 className="college-name">{college['College Name']}</h3>
                    <button
                      onClick={() => toggleFavorite(college['College Code'], 'all')}
                      className={`favorite-btn ${isFavorite(college['College Code'], 'all') ? 'favorited' : ''}`}
                    >
                      {isFavorite(college['College Code'], 'all') ? '★' : '☆'}
                    </button>
                  </div>
                  <div className="college-meta">
                    <span className="college-code">Code: {college['College Code']}</span>
                    <span className="college-district">{college['District']}</span>
                    {college['Type'] && <span className={`college-type ${college['Type'].toLowerCase()}`}>{college['Type']}</span>}
                    {college['Established'] && <span className="established">Est. {college['Established']}</span>}
                  </div>
                </div>

                <div className="branches-section">
                  <div className="branches-header">
                    <span className="branches-count">
                      {college['Branches'].length} branch{college['Branches'].length !== 1 ? 'es' : ''} available
                    </span>
                    <button
                      onClick={() => toggleCollegeExpansion(college['College Code'])}
                      className="expand-btn"
                    >
                      {isExpanded ? '▲ Collapse' : '▼ Expand'} Branches
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="branches-list">
                      {college['Branches'].map((branch, index) => {
                        // branch key: include parent college code so it's unique across the whole list
                        const branchKey = `${college['College Code']}-${branch['Branch Code']}-${index}`;
                        return (
                          <div key={branchKey} className="branch-item">
                            <div className="branch-header">
                              <div className="branch-info">
                                <strong>{branch['Branch Name']}</strong>
                                <span className="branch-code">({branch['Branch Code']})</span>
                              </div>
                              <button
                                onClick={() => toggleFavorite(college['College Code'], branch['Branch Code'])}
                                className={`favorite-btn small ${isFavorite(college['College Code'], branch['Branch Code']) ? 'favorited' : ''}`}
                              >
                                {isFavorite(college['College Code'], branch['Branch Code']) ? '★' : '☆'}
                              </button>
                            </div>
                            <div className="cutoff-scores">
                              <div className="cutoff-grid">
                                {['OC', 'BC', 'BCM', 'MBC', 'SC', 'SCA', 'ST'].map(cat => (
                                  <span className="cutoff-item" key={cat}>
                                    <span className="category">{cat}:</span>
                                    <span className="score">{branch['Cutoff'][cat] ?? 'N/A'}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CollegeList;