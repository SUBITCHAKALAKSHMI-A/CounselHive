import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SavedColleges from './SavedColleges';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PredictCollege = ({
  results, setResults,
  cutoff, setCutoff,
  category, setCategory,
  districts, setDistricts,
  branches, setBranches,
  limitChoice, setLimitChoice,
  savedColleges, setSavedColleges
}) => {
  const [availableDistricts, setAvailableDistricts] = useState([]);
  const [availableBranches, setAvailableBranches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [inputFocus, setInputFocus] = useState({
    cutoff: false,
    district: false,
    branch: false,
  });

  const API_BASE = 'http://127.0.0.1:5000/api';

  // Inline CSS styles (same as your code)
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    headerTitle: {
      margin: '0 0 10px 0',
      fontSize: '2.5em',
      fontWeight: '700',
      textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
    },
    headerSubtitle: {
      margin: '0',
      opacity: '0.9',
      fontSize: '1.2em',
      fontWeight: '300'
    },
    statusBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'white',
      padding: '15px 20px',
      borderRadius: '10px',
      marginBottom: '25px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      border: '1px solid #e2e8f0'
    },
    statusItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      fontWeight: '500'
    },
    statusOnline: {
      color: '#38a169'
    },
    statusOffline: {
      color: '#e53e3e'
    },
    statusChecking: {
      color: '#d69e2e'
    },
    inputSection: {
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      marginBottom: '30px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0'
    },
    inputGroup: {
      marginBottom: '20px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ccc',
      borderRadius: '6px',
      padding: '12px',
      background: '#f9f9f9'
    },
    label: {
      fontWeight: 'bold',
      marginBottom: '8px',
      display: 'block'
    },
    input: {
      width: '100%',
      maxWidth: '300px',
      padding: '14px',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      outline: 'none',
      backgroundColor: '#f7fafc'
    },
    inputFocus: {
      borderColor: '#667eea',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    select: {
      width: '100%',
      padding: '8px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#888',
      borderRadius: '4px',
      background: '#fff'
    },
    multiselectContainer: {
      maxHeight: '250px',
      overflowY: 'auto',
      border: '2px solid #e2e8f0',
      borderRadius: '10px',
      padding: '20px',
      background: 'white',
      transition: 'all 0.3s ease'
    },
    multiselectGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: '12px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '12px 15px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      margin: '0',
      border: '1px solid transparent'
    },
    checkboxLabelHover: {
      backgroundColor: '#f7fafc',
      borderColor: '#cbd5e0'
    },
    checkboxLabelSelected: {
      backgroundColor: '#ebf8ff',
      borderColor: '#4299e1'
    },
    radioGroup: {
      display: 'flex',
      gap: '20px',
      flexWrap: 'wrap'
    },
    radioLabel: {
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '12px 20px',
      borderRadius: '10px',
      transition: 'all 0.2s ease',
      border: '2px solid #e2e8f0',
      backgroundColor: '#f7fafc'
    },
    radioLabelSelected: {
      borderColor: '#667eea',
      backgroundColor: '#ebf8ff',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    errorMessage: {
      background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
      color: '#c53030',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #fc8181',
      margin: '25px 0',
      fontWeight: '600',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    successMessage: {
      background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
      color: '#22543d',
      padding: '20px',
      borderRadius: '10px',
      border: '1px solid #48bb78',
      margin: '25px 0',
      fontWeight: '600',
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    actionButtons: {
      display: 'flex',
      gap: '15px',
      marginTop: '30px',
      flexWrap: 'wrap'
    },
    predictButton: {
      padding: '18px 35px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '17px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      flex: '2',
      minWidth: '220px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    predictButtonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
    },
    predictButtonDisabled: {
      opacity: '0.6',
      cursor: 'not-allowed',
      transform: 'none'
    },
    clearButton: {
      padding: '18px 35px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '17px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(135deg, #718096 0%, #4a5568 100%)',
      color: 'white',
      flex: '1',
      minWidth: '150px'
    },
    clearButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(113, 128, 150, 0.3)'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '3px solid transparent',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    },
    resultsSection: {
      marginTop: '30px',
      background: 'white',
      padding: '30px',
      borderRadius: '15px',
      boxShadow: '0 5px 20px rgba(0,0,0,0.08)',
      border: '1px solid #e2e8f0'
    },
    resultsHeader: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    resultsTitle: {
      color: '#38a169',
      marginBottom: '10px',
      fontSize: '1.8em',
      fontWeight: '600'
    },
    resultsSummary: {
      color: '#718096',
      fontSize: '1.1em',
      fontWeight: '500'
    },
    tableContainer: {
      overflowX: 'auto',
      borderRadius: '12px',
      border: '2px solid #e2e8f0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '900px'
    },
    tableHeader: {
      background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
      padding: '18px',
      textAlign: 'left',
      fontWeight: '600',
      color: '#2d3748',
      borderBottom: '3px solid #e2e8f0',
      fontSize: '15px'
    },
    tableCell: {
      padding: '18px',
      borderBottom: '1px solid #e2e8f0',
      transition: 'background-color 0.2s ease'
    },
    collegeRow: {
      transition: 'all 0.2s ease'
    },
    collegeRowHover: {
      backgroundColor: '#f7fafc',
      transform: 'scale(1.01)'
    },
    collegeInfo: {
      lineHeight: '1.5'
    },
    collegeName: {
      fontWeight: '600',
      color: '#2d3748',
      marginBottom: '5px',
      fontSize: '15px'
    },
    collegeCode: {
      fontSize: '13px',
      color: '#718096',
      fontWeight: '500'
    },
    probability: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '600',
      textAlign: 'center',
      display: 'inline-block',
      minWidth: '80px',
      fontSize: '14px'
    },
    probabilityHigh: {
      background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
      color: '#22543d'
    },
    probabilityMedium: {
      background: 'linear-gradient(135deg, #fefcbf 0%, #faf089 100%)',
      color: '#744210'
    },
    probabilityLow: {
      background: 'linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%)',
      color: '#742a2a'
    },
    typeBadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontWeight: '600',
      fontSize: '13px',
      display: 'inline-block',
      minWidth: '80px',
      textAlign: 'center'
    },
    typeSafe: {
      background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
      color: '#22543d'
    },
    typeOther: {
      background: 'linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)',
      color: '#1a365d'
    },
    noResults: {
      textAlign: 'center',
      padding: '50px',
      color: '#718096',
      fontSize: '1.2em',
      background: 'white',
      borderRadius: '15px',
      marginTop: '20px',
      border: '2px dashed #e2e8f0'
    },
    selectedCount: {
      fontSize: '12px',
      color: '#888',
      marginLeft: '8px'
    },
    loadingOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      color: 'white',
      fontSize: '20px',
      fontWeight: '600'
    },
    loadingSpinner: {
      width: '60px',
      height: '60px',
      border: '5px solid transparent',
      borderTop: '5px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '20px'
    }
  };

  const getInputStyle = (field) => ({
    ...styles.input,
    ...(inputFocus[field] ? styles.inputFocus : {})
  });

  const getSelectStyle = (field) => ({
    ...styles.select,
    ...(inputFocus[field] ? { borderColor: '#667eea', boxShadow: '0 0 0 3px rgba(102,126,234,0.15)' } : {})
  });

  // Add keyframes for spinner animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Check backend status on component mount
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        setBackendStatus('checking');
        const response = await fetch(`${API_BASE}/health`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Add timeout
          signal: AbortSignal.timeout(5000)
        });

        if (response.ok) {
          const data = await response.json();
          setBackendStatus('online');
          setError('');
          console.log('Backend status: online', data);
        } else {
          setBackendStatus('offline');
          console.log('Backend status: offline - response not ok');
        }
      } catch (error) {
        setBackendStatus('offline');
        console.log('Backend status: offline - connection failed', error);
      }
    };

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 10000);
    return () => clearInterval(interval);
  }, [API_BASE]);

  // Load available districts and branches
  useEffect(() => {
    const loadOptions = async () => {
      if (backendStatus !== 'online') return;

      try {
        console.log('Loading districts and branches from backend...');

        const [districtsRes, branchesRes] = await Promise.all([
          fetch(`${API_BASE}/districts`),
          fetch(`${API_BASE}/branches`)
        ]);

        if (!districtsRes.ok) throw new Error(`Districts API error: ${districtsRes.status}`);
        if (!branchesRes.ok) throw new Error(`Branches API error: ${branchesRes.status}`);

        const districtsData = await districtsRes.json();
        const branchesData = await branchesRes.json();

        console.log('Districts loaded:', districtsData.length);
        console.log('Branches loaded:', branchesData.length);

        setAvailableDistricts(districtsData);
        setAvailableBranches(branchesData);
        setError('');
      } catch (err) {
        console.error('Failed to load options:', err);
        // Set fallback data
        setAvailableDistricts(["Ariyalur",
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
          "Virudhunagar"]);

        setAvailableBranches([
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
        ]);
      }
    };

    loadOptions();
  }, [API_BASE, backendStatus]);

  const predictColleges = async () => {
    if (!cutoff || cutoff === '') {
      setError('Please enter your cutoff marks');
      return;
    }

    const cutoffValue = parseFloat(cutoff);
    if (isNaN(cutoffValue) || cutoffValue < 0 || cutoffValue > 200) {
      setError('Please enter valid cutoff marks between 0 and 200');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      console.log('Sending prediction request...', {
        cutoff: cutoffValue,
        category,
        districts,
        branches,
        limit: limitChoice
      });

      const response = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cutoff: cutoffValue,
          category: category === 'All' ? 'all' : category.toLowerCase(), // Handle "All" category
          districts: districts.map(d => d.toLowerCase()),
          branches: branches.map(b => b.toLowerCase()),
          limit: limitChoice
        })
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Prediction failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        setResults(data.results || []);
        if (data.results.length === 0) {
          setError('No colleges found matching your criteria. Try adjusting your cutoff marks or filters.');
        }
      } else {
        throw new Error(data.error || 'Prediction failed');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError(err.message || 'Failed to connect to prediction service. Make sure the Python backend is running on port 5000.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDistrictChange = (district) => {
    setDistricts(prev =>
      prev.includes(district)
        ? prev.filter(d => d !== district)
        : [...prev, district]
    );
  };

  const handleBranchChange = (branch) => {
    setBranches(prev =>
      prev.includes(branch)
        ? prev.filter(b => b !== branch)
        : [...prev, branch]
    );
  };

  const clearFilters = () => {
    setCutoff('');
    setCategory('All');
    setDistricts([]);
    setBranches([]);
    setLimitChoice(50);
    setError('');
    setResults([]);
  };

  const getProbabilityStyle = (probability) => {
    if (probability > 70) return { ...styles.probability, ...styles.probabilityHigh };
    if (probability > 40) return { ...styles.probability, ...styles.probabilityMedium };
    return { ...styles.probability, ...styles.probabilityLow };
  };

  const getTypeStyle = (type) => {
    return type === 'safe'
      ? { ...styles.typeBadge, ...styles.typeSafe }
      : { ...styles.typeBadge, ...styles.typeOther };
  };

  const getStatusText = () => {
    switch (backendStatus) {
      case 'online': return 'Backend Connected ✅';
      case 'offline': return 'Backend Offline ❌';
      case 'checking': return 'Checking Backend... 🔄';
      default: return 'Unknown Status';
    }
  };

  const getStatusStyle = () => {
    switch (backendStatus) {
      case 'online': return styles.statusOnline;
      case 'offline': return styles.statusOffline;
      case 'checking': return styles.statusChecking;
      default: return {};
    }
  };

  const downloadResults = () => {
   if (!cutoff || cutoff === '' || cutoff === null || typeof cutoff === 'undefined') {
      alert('Please enter your cutoff marks and click Predict Colleges before downloading the list.');
      return;
    }
    if (!results.length) {
      alert('No college list to download. Please enter your cutoff marks and click Predict Colleges first.');
      return;
    }
      

    // Prompt user for format
    const format = window.prompt('Which format do you want to download?\nType "csv" or "pdf".', 'csv');
    if (!format) return;

    if (format.toLowerCase() === 'csv') {
      // Prepare CSV header
      const header = [
        "College Name",
        "Branch",
        "District",
        "Category",
        "Required Cutoff",
        "Admission Probability",
        "Type"
      ];
      const rows = results.map(college => [
        `"${college.collegeName}"`,
        `"${college.branchName}"`,
        `"${college.district}"`,
        `"${college.category || 'N/A'}"`,
        college.requiredCutoff.toFixed(2),
        `${college.admissionProbability}%`,
        college.type
      ]);
      const csvContent = [header, ...rows].map(e => e.join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "college_predictions.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else if (format.toLowerCase() === 'pdf') {
      // Simple PDF export using window.print (for table only)
      const printWindow = window.open('', '', 'width=900,height=700');
      printWindow.document.write('<html><head><title>College Predictions</title></head><body>');
      printWindow.document.write('<h2>College Predictions</h2>');
      printWindow.document.write('<table border="1" style="width:100%;border-collapse:collapse;">');
      printWindow.document.write('<tr><th>College Name</th><th>Branch</th><th>District</th><th>Category</th><th>Required Cutoff</th><th>Admission Probability</th><th>Type</th></tr>');
      results.forEach(college => {
        printWindow.document.write(
          `<tr>
          <td>${college.collegeName}</td>
          <td>${college.branchName}</td>
          <td>${college.district}</td>
          <td>${college.category || 'N/A'}</td>
          <td>${college.requiredCutoff.toFixed(2)}</td>
          <td>${college.admissionProbability}%</td>
          <td>${college.type}</td>
        </tr>`
        );
      });
      printWindow.document.write('</table></body></html>');
      printWindow.document.close();
      printWindow.print();
    } else {
      alert('Invalid format. Please type "csv" or "pdf".');
    }
  };
  // Save college to localStorage and state
  const handleSaveCollege = (college) => {
    const formattedCollege = {
      collegeCode: college.collegeCode,
      collegeName: college.collegeName,
      branchCode: college.branchCode,
      branchName: college.branchName,
      category: college.category,
      cutoff: college.requiredCutoff,
      savedAt: new Date().toLocaleString()
    };

    // Check if already saved
    const isAlreadySaved = savedColleges.some(
      c => c.collegeCode === formattedCollege.collegeCode && c.branchCode === formattedCollege.branchCode
    );

    if (!isAlreadySaved) {
      const newSavedList = [...savedColleges, formattedCollege];
      setSavedColleges(newSavedList);
      localStorage.setItem('savedColleges', JSON.stringify(newSavedList));
      alert(`${formattedCollege.collegeName} (${formattedCollege.branchName}) has been saved to your Saved Colleges!`);
    } else {
      alert('This college is already in your Saved Colleges!');
    }
  };

  // Keep savedColleges in sync with localStorage
  useEffect(() => {
    localStorage.setItem('savedColleges', JSON.stringify(savedColleges));
  }, [savedColleges]);

  // Sort results: safe first, then others, both descending by probability
  const sortedResults = [...results].sort((a, b) => {
    if (a.type === b.type) {
      return b.admissionProbability - a.admissionProbability;
    }
    return a.type === 'safe' ? -1 : 1;
  });

  const saveCurrentPreference = () => {
    if (!cutoff || cutoff === '' || cutoff === null || typeof cutoff === 'undefined') {
      alert('Please enter your cutoff marks before saving a preference.');
      return;
    }
    const preference = {
      id: Date.now(),
      cutoff,
      category,
      districts,
      branches,
      limitChoice,
      timestamp: new Date().toISOString()
    };
    const existing = JSON.parse(localStorage.getItem('userPreferences') || '[]');
    // Check for duplicate (same cutoff, category, districts, branches, limitChoice)
    const isDuplicate = existing.some(p =>
      p.cutoff === preference.cutoff &&
      p.category === preference.category &&
      JSON.stringify(p.districts) === JSON.stringify(preference.districts) &&
      JSON.stringify(p.branches) === JSON.stringify(preference.branches) &&
      p.limitChoice === preference.limitChoice
    );
    if (isDuplicate) {
      alert('This preference is already saved!');
      return;
    }
    const updatedPreferences = [...existing, preference];
    localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
    alert('✅ Preference saved successfully!');
  };

  return (
    <div style={styles.container}>
      {/* Loading Overlay */}
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={{ textAlign: 'center' }}>
            <div style={styles.loadingSpinner}></div>
            <div>Analyzing colleges... Please wait</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>🎓 TNEA College Predictor</h1>
        <p style={styles.headerSubtitle}>
          Get personalized college recommendations based on your cutoff marks using machine learning
        </p>
      </div>

      {/* Status Bar */}
      <div style={styles.statusBar}>
        <div style={styles.statusItem}>
          <span>Status:</span>
          <span style={getStatusStyle()}>{getStatusText()}</span>
        </div>
        <div style={styles.statusItem}>
          <span>API:</span>
          <span style={{ color: '#667eea', fontWeight: '600' }}>{API_BASE}</span>
        </div>
        <div style={styles.statusItem}>
          <span>Loaded:</span>
          <span>{availableDistricts.length} districts, {availableBranches.length} branches</span>
        </div>
      </div>

      {/* Input Section */}
      <div style={styles.inputSection}>
        {/* Cutoff Marks Input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Enter your cutoff marks *{' '}
            <input
              type="number"
              min="0"
              max="200"
              step="0.01"
              value={cutoff}
              onChange={(e) => setCutoff(e.target.value)}
              placeholder="e.g., 185.75"
              style={getInputStyle('cutoff')}
              onFocus={() => setInputFocus(f => ({ ...f, cutoff: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, cutoff: false }))}
            />
          </label>
        </div>

        {/* Category Selection */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Select your category *
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={getSelectStyle('category')}
              onFocus={() => setInputFocus(f => ({ ...f, category: true }))}
              onBlur={() => setInputFocus(f => ({ ...f, category: false }))}
              // disabled={backendStatus !== 'online'}
            >
              <option value="All">All Categories</option>
              <option value="OC">OC</option>
              <option value="BC">BC</option>
              <option value="BCM">BCM</option>
              <option value="MBC">MBC</option>
              <option value="SC">SC</option>
              <option value="SCA">SCA</option>
              <option value="ST">ST</option>
            </select>
          </label>
        </div>

        {/* Districts Dropdown */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Preferred district (optional)
            <span style={styles.selectedCount}>{districts.length ? 1 : 0} selected</span>
          </label>
          <select
            value={districts[0] || ''}
            onChange={e => setDistricts(e.target.value ? [e.target.value] : [])}
            style={getSelectStyle('district')}
            onFocus={() => setInputFocus(f => ({ ...f, district: true }))}
            onBlur={() => setInputFocus(f => ({ ...f, district: false }))}
            // disabled={backendStatus !== 'online'}
          >
            <option value="">All Districts</option>
            {availableDistricts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Branches Dropdown */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>
            Preferred branch (optional)
            <span style={styles.selectedCount}>{branches.length ? 1 : 0} selected</span>
          </label>
          <select
            value={branches[0] || ''}
            onChange={e => setBranches(e.target.value ? [e.target.value] : [])}
            style={getSelectStyle('branch')}
            onFocus={() => setInputFocus(f => ({ ...f, branch: true }))}
            onBlur={() => setInputFocus(f => ({ ...f, branch: false }))}
            // disabled={backendStatus !== 'online'}
          >
            <option value="">All Branches</option>
            {availableBranches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>

        {/* Results Limit */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Number of results to display</label>
          <div style={styles.radioGroup}>
            {[50, 70, 100].map(limit => (
              <label
                key={limit}
                style={{
                  ...styles.radioLabel,
                  ...(limitChoice === limit ? styles.radioLabelSelected : {})
                }}
                onMouseEnter={(e) => limitChoice !== limit && Object.assign(e.target.style, styles.checkboxLabelHover)}
                onMouseLeave={(e) => limitChoice !== limit && Object.assign(e.target.style, { backgroundColor: '#f7fafc', borderColor: '#e2e8f0' })}
              >
                <input
                  type="radio"
                  value={limit}
                  checked={limitChoice === limit}
                  onChange={(e) => setLimitChoice(parseInt(e.target.value))}
                  style={{ marginRight: '10px', transform: 'scale(1.1)' }}
                  // disabled={backendStatus !== 'online'}
                />
                Top {limit}
              </label>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={styles.errorMessage}>
            ⚠️ {error}
          </div>
        )}

        {/* Success Message */}
        {results.length > 0 && !error && (
          <div style={styles.successMessage}>
            ✅ Found {results.length} colleges matching your criteria!
          </div>
        )}

        {/* Action Buttons */}
        <div style={styles.actionButtons}>
          <button
            style={{
              ...styles.clearButton,
              ...(backendStatus === 'online' && !loading ? { ...styles.clearButtonHover } : {})
            }}
            onClick={clearFilters}
            disabled={loading || backendStatus !== 'online'}
            onMouseEnter={(e) => backendStatus === 'online' && !loading && Object.assign(e.target.style, styles.clearButtonHover)}
            onMouseLeave={(e) => backendStatus === 'online' && !loading && Object.assign(e.target.style, { transform: 'none', boxShadow: 'none' })}
          >
            🗑️ Clear Filters
          </button>
          <button
            style={{
              ...styles.predictButton,
              ...(backendStatus === 'online' && !loading && cutoff ? { ...styles.predictButtonHover } : {}),
              ...((loading || backendStatus !== 'online' || !cutoff) ? styles.predictButtonDisabled : {})
            }}
            onClick={predictColleges}
            disabled={loading || backendStatus !== 'online' || !cutoff}
            onMouseEnter={(e) => backendStatus === 'online' && !loading && cutoff && Object.assign(e.target.style, styles.predictButtonHover)}
            onMouseLeave={(e) => backendStatus === 'online' && !loading && cutoff && Object.assign(e.target.style, { transform: 'none', boxShadow: styles.predictButton.boxShadow })}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Predicting...
              </>
            ) : (
              '🎯 Predict Colleges'
            )}
          </button>
          <button
            style={{
              ...styles.predictButton,
              background: 'linear-gradient(135deg, #38a169 0%, #48bb78 100%)',
              color: 'white',
              minWidth: '220px'
            }}
            onClick={downloadResults}
           
          >
            📥 Download List
          </button>
          <button
            style={{
              ...styles.predictButton,
              background: 'linear-gradient(135deg, #f6ad55 0%, #fbd38d 100%)',
              color: '#2d3748',
              minWidth: '220px'
            }}
            onClick={saveCurrentPreference}
          >
            💾 Save Preference
          </button>
        </div>
      </div>

      {/* Results Section */}
      {sortedResults.length > 0 && (
        <div style={styles.resultsSection}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>🎓 College Predictions</h2>
            <div style={styles.resultsSummary}>
              Showing {sortedResults.length} colleges •
              {' '}{sortedResults.filter(r => r.type === 'safe').length} safe options •
              {' '}{sortedResults.filter(r => r.type === 'other').length} other options
            </div>
          </div>

          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>College Name</th>
                  <th style={styles.tableHeader}>Branch</th>
                  <th style={styles.tableHeader}>District</th>
                  <th style={styles.tableHeader}>Category</th>
                  <th style={styles.tableHeader}>Required Cutoff</th>
                  <th style={styles.tableHeader}>Admission Probability</th>
                  <th style={styles.tableHeader}>Type</th>
                  <th style={styles.tableHeader}>Save</th>
                </tr>
              </thead>
              <tbody>
                {sortedResults.map((college, index) => (
                  <tr
                    key={`${college.collegeCode}-${college.branchCode}-${index}`}
                    style={styles.collegeRow}
                  >
                    <td style={styles.tableCell}>
                      <div style={styles.collegeInfo}>
                        <div style={styles.collegeName}>{college.collegeName}</div>
                        <div style={styles.collegeCode}>Code: {college.collegeCode}</div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={styles.collegeInfo}>
                        <div style={styles.collegeName}>{college.branchName}</div>
                        <div style={styles.collegeCode}>Code: {college.branchCode}</div>
                      </div>
                    </td>
                    <td style={styles.tableCell}>{college.district}</td>
                    <td style={styles.tableCell}>{college.category || 'N/A'}</td>
                    <td style={styles.tableCell}>
                      <strong>{college.requiredCutoff.toFixed(2)}</strong>
                    </td>
                    <td style={styles.tableCell}>
                      <div style={getProbabilityStyle(college.admissionProbability)}>
                        {college.admissionProbability}%
                      </div>
                    </td>
                    <td style={styles.tableCell}>
                      <span style={getTypeStyle(college.type)}>
                        {college.type === 'safe' ? '🎯 Safe' : '💡 Other'}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      <button
                        style={{
                          background: '#007bff',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          transition: 'background 0.3s ease'
                        }}
                        onClick={() => handleSaveCollege(college)}
                      >
                        {savedColleges.some(
                          c => c.collegeCode === college.collegeCode && c.branchCode === college.branchCode
                        ) ? 'Saved' : 'Save'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!loading && results.length === 0 && cutoff && !error && backendStatus === 'online' && (
        <div style={styles.noResults}>
          <p>No colleges found for your criteria. Try adjusting your cutoff marks or filters.</p>
        </div>
      )}
    </div>
  );
};

export default PredictCollege;