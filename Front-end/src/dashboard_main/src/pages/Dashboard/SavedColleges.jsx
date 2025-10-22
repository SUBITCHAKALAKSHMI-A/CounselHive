import React, { useState } from 'react';

function SavedColleges({ savedColleges, onRemoveCollege, onCompareColleges }) {
  const [selectedForCompare, setSelectedForCompare] = useState([]);

  const handleCheckboxChange = (collegeKey) => {
    if (selectedForCompare.includes(collegeKey)) {
      setSelectedForCompare(selectedForCompare.filter(key => key !== collegeKey));
    } else {
      if (selectedForCompare.length >= 5) {
        alert('You can compare up to 5 colleges at a time.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, collegeKey]);
    }
  };

  const handleCompare = () => {
    if (selectedForCompare.length === 0) {
      alert('Please select at least 2 colleges to compare.');
      return;
    }
    if (selectedForCompare.length === 1) {
      alert('Please select at least 2 colleges to compare.');
      return;
    }
    // Pass selected colleges to parent or navigate
    if (onCompareColleges) {
      const selectedColleges = savedColleges.filter(college =>
        selectedForCompare.includes(`${college.collegeCode}-${college.branchCode}`)
      );
      onCompareColleges(selectedColleges);
    }
  };

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ color: '#2d3748', marginBottom: '8px' }}>🔖 Saved Colleges</h2>
      <p style={{ color: '#4a5568', marginBottom: '16px' }}>Here are the colleges you have saved :</p>
      <br />
      {savedColleges.length === 0 ? (
        <div style={{ color: '#718096', fontStyle: 'italic' }}>No colleges saved yet.</div>
      ) : (
        <>
          <button
            style={{
              background: '#3182ce',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}
            onClick={handleCompare}
          >
            Compare Selected Colleges
          </button>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          >
            <thead>
              <tr style={{ background: '#f7fafc' }}>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>College Code</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>College Name</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Branch Code</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Branch Name</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Category</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Cutoff</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Saved At</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Remove College</th>
                <th style={{ padding: '12px', border: '1px solid #e2e8f0' }}>Compare Colleges</th>
              </tr>
            </thead>
            <tbody>
              {savedColleges.map(college => {
                const collegeKey = `${college.collegeCode}-${college.branchCode}`;
                return (
                  <tr key={collegeKey} style={{ background: '#fff', transition: 'background 0.2s' }}>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.collegeCode}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.collegeName}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.branchCode}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.branchName}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.category}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>{college.cutoff}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0', fontSize: '12px', color: '#718096' }}>{college.savedAt}</td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0' }}>
                      <button
                        style={{
                          background: '#e53e3e',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => (e.target.style.background = '#c53030')}
                        onMouseLeave={e => (e.target.style.background = '#e53e3e')}
                        onClick={() => onRemoveCollege(college.collegeCode, college.branchCode)}
                      >
                        Remove
                      </button>
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedForCompare.includes(collegeKey)}
                        onChange={() => handleCheckboxChange(collegeKey)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        title="Select for comparison"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default SavedColleges;