import React from 'react';

const CompareColleges = ({ comparisonData = [] }) => {
  // Container styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '1400px',
    margin: '0 auto'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
  };

  const titleStyle = {
    color: '#333',
    marginBottom: '8px',
    fontSize: '32px',
    fontWeight: '700'
  };

  const subtitleStyle = {
    color: '#666',
    fontSize: '16px'
  };

  // Comparison table styles
  const comparisonSectionStyle = {
    background: 'white',
    padding: '25px',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)'
  };

  const comparisonTitleStyle = {
    marginBottom: '20px',
    color: '#333',
    fontSize: '20px',
    fontWeight: '600'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px'
  };

  const thStyle = {
    background: '#f5f5f5',
    padding: '12px 8px',
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #ddd',
    position: 'sticky',
    left: '0',
    minWidth: '150px'
  };

  const tdStyle = {
    padding: '12px 8px',
    borderBottom: '1px solid #eee',
    textAlign: 'center'
  };

  const collegeHeaderStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    fontWeight: '600',
    textAlign: 'center'
  };

  const emptyStateStyle = {
    textAlign: 'center',
    padding: '40px',
    color: '#666'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>⚖️ Compare Colleges</h1>
        <p style={subtitleStyle}>
          Compare up to 5 saved colleges based on various criteria
          {comparisonData.length > 0 && ` (${comparisonData.length} selected)`}
        </p>
      </div>

      {/* Comparison Table */}
      {comparisonData.length > 0 ? (
        <div style={comparisonSectionStyle}>
          <h3 style={comparisonTitleStyle}>College Comparison</h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Criteria</th>
                  {comparisonData.map(college => (
                    <th key={college.collegeCode + college.branchCode} style={{ ...thStyle, ...collegeHeaderStyle }}>
                      {college.collegeName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Basic Information */}
                <tr>
                  <td style={thStyle}>College Code</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.collegeCode}</td>
                  ))}
                </tr>
                <tr>
                  <td style={thStyle}>Branch Code</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.branchCode}</td>
                  ))}
                </tr>
                <tr>
                  <td style={thStyle}>Branch Name</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.branchName}</td>
                  ))}
                </tr>
                <tr>
                  <td style={thStyle}>Category</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.category}</td>
                  ))}
                </tr>
                <tr>
                  <td style={thStyle}>Cutoff</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.cutoff}</td>
                  ))}
                </tr>
                <tr>
                  <td style={thStyle}>Saved At</td>
                  {comparisonData.map(college => (
                    <td key={college.collegeCode + college.branchCode} style={tdStyle}>{college.savedAt}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div style={emptyStateStyle}>
          <p>No colleges selected for comparison.</p>
        </div>
      )}
    </div>
  );
};

export default CompareColleges;