import React, { useState, useEffect, useRef } from 'react';
import ProfileDropdown from './ProfileDropdown';
import Chatbot from './Chatbot';
import { useNavigate } from 'react-router-dom';
import CollegeList from './CollegeList';
import GeneratePreference from './GeneratePreference';
import SavedPreference from './SavedPreference';
import SavedColleges from './SavedColleges';
import CompareColleges from './CompareColleges';
import PredictCollege from './PredictCollege';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Guest',
    email: '',
    avatar: 'G'
  });
  const navigate = useNavigate();
  const [savedCollegesList, setSavedCollegesList] = useState([]);
  const [results, setResults] = useState(() => {
    // Persist results in localStorage so they survive page reloads
    const saved = localStorage.getItem('predictedResults');
    return saved ? JSON.parse(saved) : [];
  });

  // state used by Compare Colleges feature
  const [comparisonData, setComparisonData] = useState([]);

  // safe localStorage parser
  const parseStored = (key, fallback) => {
    const v = localStorage.getItem(key);
    if (v === null || v === undefined) return fallback;
    try {
      return JSON.parse(v);
    } catch (e) {
      if (typeof v === 'string') {
        if (v.toLowerCase() === 'all') return fallback;
        const arr = v.split(',').map(s => s.trim()).filter(Boolean);
        return arr.length ? arr : fallback;
      }
      return fallback;
    }
  };

  // Notifications state (define BEFORE any useEffect that references `notifications`)
  const defaultNotifications = [
    { id: 1, title: 'Welcome', message: 'Welcome to CounselHive', time: 'Just now', read: false },
    { id: 2, title: 'New Feature', message: 'Check out the new Compare Colleges feature!', time: '1 day ago', read: false },
    { id: 3, title: 'Reminder', message: 'Don\'t forget to save your preferences!', time: '3 days ago', read: false }
  ];
  const [notifications, setNotifications] = useState(() => {
    // initialize from stored only if you want persistent notifications; to reset on refresh
    // use the defaultNotifications so dismiss is in-memory only:
    return Array.isArray(defaultNotifications) ? defaultNotifications : [];
  });
  const [notificationCount, setNotificationCount] = useState(() =>
    Array.isArray(defaultNotifications) ? defaultNotifications.filter(n => !n.read).length : 0
  );

  // local state for inline notification dropdown
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef(null);

  // keep notification count in sync (do NOT persist dismissals)
  useEffect(() => {
    setNotificationCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // close dropdown on outside click / Escape
  useEffect(() => {
    const onDocClick = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setNotifOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const [cutoff, setCutoff] = useState(() => localStorage.getItem('cutoff') || '');
  const [category, setCategory] = useState(() => localStorage.getItem('category') || 'All');

  // use safe parser for districts and branches
  const [districts, setDistricts] = useState(() => parseStored('districts', []));
  const [branches, setBranches] = useState(() => parseStored('branches', []));

  // add missing limitChoice state to prevent ReferenceError
  const [limitChoice, setLimitChoice] = useState(() => {
    const saved = localStorage.getItem('limitChoice');
    try {
      return saved ? JSON.parse(saved) : 50;
    } catch (e) {
      return 50;
    }
  });

  // Inline Styles
  const styles = {
    dashboardContainer: {
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    topNavbar: {
      background: '#1e2a38',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderBottom: '1px solid #2d3e50',
      minHeight: '70px'
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexShrink: 0
    },
    logoIcon: {
      fontSize: '24px',
      color: '#00ffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logoText: {
      fontSize: '18px',
      fontWeight: '600',
      color: 'white',
      whiteSpace: 'nowrap'
    },
    mainNav: {
      display: 'flex',
      gap: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: '0 40px',
      color: 'white',
      paddingLeft: '10px',
      paddingRight: '10px'
    },
    navLink: {
      background: 'none',
      border: 'none',
      padding: '12px 20px',
      fontSize: '14px',
      color: '#cbd5e1',
      cursor: 'pointer',
      borderRadius: '6px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '40px',
      position: 'relative'
    },
    navLinkActive: {
      color: '#00ffff',
      backgroundColor: 'rgba(0, 255, 255, 0.2)',
      fontWeight: '600',
      boxShadow: '0 2px 4px rgba(0, 255, 255, 0.1)'
    },
    sidebarBadge: {
      background: '#ff4757',
      color: 'white',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      marginLeft: 'auto'
    },
    dashboardContent: {
      display: 'flex',
      minHeight: 'calc(100vh - 80px)'
    },
    sidebar: {
      width: '280px',
      background: 'white',
      borderRight: '1px solid #e9ecef',
      padding: '30px 0',
      overflowY: 'auto'
    },
    sidebarNav: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      padding: '0 20px'
    },
    sidebarItem: {
      background: 'none',
      border: 'none',
      padding: '16px 20px',
      fontSize: '14px',
      color: '#666',
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      fontWeight: '500',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      width: '100%'
    },
    sidebarItemActive: {
      backgroundColor: '#e3f2fd',
      color: '#007bff',
      fontWeight: '600'
    },
    sidebarIcon: {
      fontSize: '18px',
      width: '24px',
      textAlign: 'center'
    },
    mainContent: {
      flex: 1,
      padding: '30px',
      overflowY: 'auto',
      backgroundColor: '#f8f9fa'
    },
    welcomeSection: {
      marginBottom: '30px',
      textAlign: 'center'
    },
    welcomeH1: {
      fontSize: '2.5rem',
      color: '#1e2a38',
      marginBottom: '10px'
    },
    welcomeP: {
      color: '#666',
      fontSize: '1.1rem'
    },
    overviewSection: {
      marginBottom: '40px'
    },
    overviewCards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '24px'
    },
    overviewCard: {
      background: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      transition: 'transform 0.3s ease'
    },
    overviewCardPrimary: {
      background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      color: 'white'
    },
    cardIcon: {
      fontSize: '32px',
      color: '#007bff'
    },
    cardContent: {
      flex: 1
    },
    cardNumber: {
      fontSize: '32px',
      fontWeight: '700',
      color: '#333',
      marginBottom: '4px'
    },
    cardLabel: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.4'
    },
    quickActionsSection: {
      marginBottom: '40px'
    },
    actionButtons: {
      display: 'flex',
      gap: '16px'
    },
    actionBtn: {
      padding: '14px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      flex: 1
    },
    actionBtnPrimary: {
      background: '#007bff',
      color: 'white'
    },
    actionBtnSecondary: {
      background: 'white',
      color: '#333',
      border: '1px solid #dee2e6'
    },
    recommendationSection: {
      marginBottom: '40px'
    },
    recommendationCards: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    recommendationCard: {
      background: 'white',
      padding: '16px',
      borderRadius: '12px',
      border: '1px solid #e9ecef',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    collegeIcon: {
      width: '45px',
      height: '45px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: '700',
      fontSize: '18px',
      flexShrink: 0
    },
    collegeInfo: {
      flex: 1,
      minWidth: 0
    },
    collegeName: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '6px'
    },
    collegeDetails: {
      display: 'flex',
      gap: '16px',
      fontSize: '13px',
      color: '#666'
    },
    collegeDetailSpan: {
      padding: '4px 8px',
      backgroundColor: '#f8f9fa',
      borderRadius: '4px'
    },
    saveBtn: {
      background: '#007bff',
      color: 'white',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      fontSize: '12px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
      flexShrink: 0
    },
    tabContent: {
      background: 'white',
      padding: '40px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    },
    tabContentP: {
      color: '#666',
      fontSize: '16px',
      marginTop: '16px'
    },
    userProfile: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      zIndex: 'auto'
    },
    notificationBadge: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#ff4757',
      color: 'white',
      borderRadius: '50%',
      width: '18px',
      height: '18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      fontWeight: 'bold'
    },
    notificationIcon: {
      position: 'relative',
      marginLeft: '10px',
      cursor: 'pointer'
    }
  };

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

    // Load saved colleges from localStorage
    const savedCollegesData = localStorage.getItem('savedColleges');
    if (savedCollegesData) {
      setSavedCollegesList(JSON.parse(savedCollegesData));
    }
  }, []);

  // Save colleges to localStorage whenever savedCollegesList changes
  useEffect(() => {
    localStorage.setItem('savedColleges', JSON.stringify(savedCollegesList));
  }, [savedCollegesList]);

  // Save results to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('predictedResults', JSON.stringify(results));
  }, [results]);

  // Save other states to localStorage on change
  useEffect(() => { localStorage.setItem('cutoff', cutoff); }, [cutoff]);
  useEffect(() => { localStorage.setItem('category', category); }, [category]);
  useEffect(() => { localStorage.setItem('districts', JSON.stringify(districts)); }, [districts]);
  useEffect(() => { localStorage.setItem('branches', JSON.stringify(branches)); }, [branches]);
  useEffect(() => { localStorage.setItem('limitChoice', JSON.stringify(limitChoice)); }, [limitChoice]);

  const handleSaveCollege = (collegeId) => {
    const collegeToSave = recommendationHighlights.find(college => college.id === collegeId);
    if (collegeToSave) {
      const isAlreadySaved = savedCollegesList.some(college => college.id === collegeId);
      if (!isAlreadySaved) {
        const collegeWithTimestamp = {
          ...collegeToSave,
          savedAt: new Date().toLocaleString()
        };
        setSavedCollegesList(prev => [...prev, collegeWithTimestamp]);
        localStorage.setItem('savedColleges', JSON.stringify([...savedCollegesList, collegeWithTimestamp]));
        setActiveTab('saved-colleges');
        alert(`${collegeToSave.name} has been saved to your Saved Colleges!`);
      } else {
        alert('This college is already in your Saved Colleges!');
      }
    }
  };

  const handleRemoveCollege = (collegeCode, branchCode) => {
    const updated = savedCollegesList.filter(
      c => !(c.collegeCode === collegeCode && c.branchCode === branchCode)
    );
    setSavedCollegesList(updated);
    localStorage.setItem('savedColleges', JSON.stringify(updated));
  };

  const recommendationHighlights = [
    {
      id: 1,
      name: "University College Of Engineering Ariyalur",
      code: "UCEARI",
      type: "Government",
      established: "2013",
      rank: 35,
      color: "#1f77b4"
    },
    {
      id: 2,
      name: "Sri Sivasubramaniya Nadar College Of Engineering",
      code: "SSNCE",
      type: "Autonomous",
      established: "1996",
      rank: 4,
      color: "#ff7f0e"
    },
    {
      id: 3,
      name: "Anna University - CEG Campus",
      code: "AUCEG",
      type: "Government",
      established: "1978",
      rank: 1,
      color: "#2ca02c"
    },
    {
      id: 4,
      name: "PSG College of Technology",
      code: "PSGCT",
      type: "Autonomous",
      established: "1951",
      rank: 2,
      color: "#d62728"
    },
    {
      id: 5,
      name: "Annamalai University Faculty Of Engineering",
      code: "AUFET",
      type: "University",
      established: "1929",
      rank: 28,
      color: "#9467bd"
    },
    {
      id: 6,
      name: "Government College Of Engineering Chettikkarai",
      code: "GCECD",
      type: "Government",
      established: "2009",
      rank: 42,
      color: "#8c564b"
    },
    {
      id: 7,
      name: "PSNA College Of Engineering And Technology",
      code: "PSNAC",
      type: "Autonomous",
      established: "1984",
      rank: 31,
      color: "#e377c2"
    },
    {
      id: 8,
      name: "Kongu Engineering College",
      code: "KEC",
      type: "Autonomous",
      established: "1984",
      rank: 8,
      color: "#7f7f7f"
    },
    {
      id: 9,
      name: "University College Of Engineering Nagercoil",
      code: "UCENAG",
      type: "Government",
      established: "2009",
      rank: 33,
      color: "#17becf"
    },
    {
      id: 10,
      name: "Chettinad College Of Engineering And Technology",
      code: "CCET",
      type: "Private",
      established: "2008",
      rank: 45,
      color: "#ff9896"
    },
    {
      id: 11,
      name: "Government College Of Engineering Bargur",
      code: "GCEB",
      type: "Government",
      established: "2007",
      rank: 39,
      color: "#98df8a"
    },
    {
      id: 12,
      name: "Thiagarajar College Of Engineering",
      code: "TCE",
      type: "Autonomous",
      established: "1957",
      rank: 6,
      color: "#ffbb78"
    },
    {
      id: 13,
      name: "A.V.C. College Of Engineering",
      code: "AVCCE",
      type: "Aided",
      established: "1955",
      rank: 25,
      color: "#c5b0d5"
    },
    {
      id: 14,
      name: "K S Rangasamy College Of Technology",
      code: "KSRCT",
      type: "Autonomous",
      established: "1994",
      rank: 18,
      color: "#f7b6d2"
    },
    {
      id: 15,
      name: "Dhanalakshmi Srinivasan Engineering College",
      code: "DSEC",
      type: "Autonomous",
      established: "2009",
      rank: 37,
      color: "#c7c7c7"
    },
    {
      id: 16,
      name: "Mookambigai College Of Engineering",
      code: "MCE",
      type: "Private",
      established: "2001",
      rank: 48,
      color: "#dbdb8d"
    },
    {
      id: 17,
      name: "Syed Ammal Engineering College",
      code: "SAEC",
      type: "Autonomous",
      established: "1998",
      rank: 29,
      color: "#9edae5"
    },
    {
      id: 18,
      name: "Government College Of Engineering Salem",
      code: "GCES",
      type: "Government",
      established: "1998",
      rank: 15,
      color: "#ff9896"
    },
    {
      id: 19,
      name: "Pandian Saraswathi Yadav Engineering College",
      code: "PSYEC",
      type: "Private",
      established: "2001",
      rank: 52,
      color: "#98df8a"
    },
    {
      id: 20,
      name: "Alagappa Chettiar Government College Of Engineering",
      code: "ACGCET",
      type: "Autonomous",
      established: "1950",
      rank: 21,
      color: "#ffbb78"
    },
    {
      id: 21,
      name: "Parisutham Institute Of Technology And Science",
      code: "PITS",
      type: "Autonomous",
      established: "2008",
      rank: 34,
      color: "#c49c94"
    },
    {
      id: 22,
      name: "CSI College Of Engineering",
      code: "CSICE",
      type: "Private",
      established: "1995",
      rank: 46,
      color: "#f7b6d2"
    },
    {
      id: 23,
      name: "Theni Kammavar Sangam College Of Technology",
      code: "TKSCT",
      type: "Private",
      established: "1995",
      rank: 43,
      color: "#c7c7c7"
    },
    {
      id: 24,
      name: "R.M.K. Engineering College",
      code: "RMKEC",
      type: "Autonomous",
      established: "1995",
      rank: 12,
      color: "#dbdb8d"
    },
    {
      id: 25,
      name: "Arunai Engineering College",
      code: "AEC",
      type: "Private",
      established: "1998",
      rank: 38,
      color: "#9edae5"
    },
    {
      id: 26,
      name: "Anjalai Ammal Mahalingam Engineering College",
      code: "AAMEC",
      type: "Aided",
      established: "1947",
      rank: 27,
      color: "#ff9896"
    },
    {
      id: 27,
      name: "University V.O.C. College Of Engineering Thoothukudi",
      code: "UVOCCE",
      type: "Government",
      established: "2009",
      rank: 36,
      color: "#98df8a"
    },
    {
      id: 28,
      name: "University College Of Engineering Tiruchirappalli",
      code: "UCETBI",
      type: "Government",
      established: "1998",
      rank: 19,
      color: "#ffbb78"
    },
    {
      id: 29,
      name: "Government College Of Engineering Tirunelveli",
      code: "GCET",
      type: "Government",
      established: "1981",
      rank: 23,
      color: "#c5b0d5"
    },
    {
      id: 30,
      name: "Thanthai Periyar Government Institute Of Technology",
      code: "TPGIT",
      type: "Government",
      established: "1999",
      rank: 20,
      color: "#c49c94"
    },
    {
      id: 31,
      name: "University College Of Engineering Tindivanam",
      code: "UCETVM",
      type: "Government",
      established: "2009",
      rank: 41,
      color: "#f7b6d2"
    },
    {
      id: 32,
      name: "Mepco Schlenk Engineering College",
      code: "MEPCO",
      type: "Autonomous",
      established: "1984",
      rank: 9,
      color: "#c7c7c7"
    }
  ];

  const overviewData = {
    totalColleges: 434,
    totalDistricts: 44,
    totalBranches: 72,
    deadlinesSoon: 4
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    console.log('User signed out');
    window.location.href = '/login';
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadMarks = () => {
    console.log('Uploading marks/scorecard...');
  };

  const handleCompareColleges = (selectedColleges) => {
    setComparisonData(selectedColleges);
    setActiveTab('compare-colleges');
  };

  // Clear results when Dashboard unmounts
  useEffect(() => {
    return () => {
      setResults([]);
      localStorage.removeItem('predictedResults');
      setCutoff('');
      setCategory('All'); // <-- Set to "All" instead of "OC"
      setDistricts([]);
      setBranches([]);
      setLimitChoice(50);
      localStorage.removeItem('cutoff');
      localStorage.removeItem('category');
      localStorage.removeItem('districts');
      localStorage.removeItem('branches');
      localStorage.removeItem('limitChoice');
    };
  }, []);

  return (
    <div style={styles.dashboardContainer}>
      {/* Top Navigation Bar */}
      <div className='navbar navbar-expand-lg navbar-light bg-dark sticky-top shadow-sm py-3'>
        <div style={styles.logoSection}>
          <div style={styles.logoIcon}>🎓</div>
          <span style={styles.logoText}>College Preference List Generator</span>
        </div>
        <div style={styles.mainNav}>
          <button
            style={{
              ...styles.navLink,
              ...(activeTab === 'home' ? styles.navLinkActive : {})
            }}
            onClick={() => navigate('/')}
          >
            Home
          </button>
          <button
            style={{
              ...styles.navLink,
              ...(activeTab === 'college-list' ? styles.navLinkActive : {})
            }}
            onClick={() => setActiveTab('college-list')}
          >
            College List
          </button>

          <button
            style={{
              ...styles.navLink,
              ...(activeTab === 'predict-college' ? styles.navLinkActive : {})
            }}
            onClick={() => setActiveTab('predict-college')}
          >
            Predict College
          </button>

          <button
            style={{
              ...styles.navLink,
              ...(activeTab === 'saved-preferences' ? styles.navLinkActive : {})
            }}
            onClick={() => setActiveTab('saved-preferences')}
          >
            Saved Preferences
          </button>
          {/* inline notification dropdown (no separate component) */}
          <div
            style={{ position: 'relative' }}
            ref={notifRef}
            onMouseEnter={() => setNotifOpen(true)}   // open on pointer enter
            onMouseLeave={() => setNotifOpen(false)}  // close when pointer leaves the whole area
          >
            <button
              onClick={() => setNotifOpen(v => !v)} // keep click toggle if needed
              aria-label="Notifications"
              style={{ ...styles.notificationIcon, background: 'transparent', border: 'none', color: 'white', fontSize: 20, cursor: 'pointer' }}
            >
              🔔
              {notificationCount > 0 && <span style={styles.notificationBadge}>{notificationCount}</span>}
            </button>

            {notifOpen && (
              <div
                role="dialog"
                aria-label="Notifications"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '48px',
                  width: 420,
                  maxHeight: 420,
                  overflowY: 'auto',
                  background: '#fff',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                  borderRadius: 10,
                  padding: 12,
                  zIndex: 2000
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <strong style={{ fontSize: 16 }}>Notifications</strong>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} style={{ background: 'none', border: 'none', color: '#2b7be3', cursor: 'pointer' }}>Mark all read</button>
                    <button onClick={() => setNotifications([])} style={{ background: 'none', border: 'none', color: '#2b7be3', cursor: 'pointer' }}>Clear</button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <div style={{ padding: 20, textAlign: 'center', color: '#718096' }}>No notifications</div>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} style={{ background: n.read ? '#fff' : '#eef2ff', borderRadius: 10, padding: 12, marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#1a202c' }}>{n.title}</div>
                        <div style={{ color: '#334155', marginTop: 6 }}>{n.message}</div>
                        <div style={{ color: '#94a3b8', marginTop: 6, fontSize: 12 }}>{n.time}</div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 12 }}>
                        {!n.read && <button onClick={() => setNotifications(prev => prev.map(it => it.id === n.id ? { ...it, read: true } : it))} style={{ background: 'none', border: 'none', color: '#2b7be3', cursor: 'pointer' }}>Read</button>}
                        <button onClick={() => setNotifications(prev => prev.filter(it => it.id !== n.id))} style={{ background: 'none', border: 'none', color: '#e53e3e', cursor: 'pointer' }}>Dismiss</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        </div>

        {/* Profile Dropdown */}
        <div style={styles.userProfile}>
          <ProfileDropdown user={user} onSignOut={handleSignOut} />
        </div>
      </div>

      <div style={styles.dashboardContent}>
        {/* Left Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.sidebarNav}>
            <button
              style={{
                ...styles.sidebarItem,
                ...(activeTab === 'dashboard' ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab('dashboard')}
            >
              <span style={styles.sidebarIcon}>📊</span>
              Dashboard
            </button>
            <button
              style={{
                ...styles.sidebarItem,
                ...(activeTab === 'generate-list' ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab('generate-list')}
            >
              <span style={styles.sidebarIcon}>📄</span>
              Generate Preference List
            </button>
            <button
              style={{
                ...styles.sidebarItem,
                ...(activeTab === 'saved-colleges' ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab('saved-colleges')}
            >
              <span style={styles.sidebarIcon}>🔖</span>
              Saved Colleges
              {savedCollegesList.length > 0 && (
                <span style={styles.sidebarBadge}>{savedCollegesList.length}</span>
              )}
            </button>
            <button
              style={{
                ...styles.sidebarItem,
                ...(activeTab === 'compare-colleges' ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab('compare-colleges')}
            >
              <span style={styles.sidebarIcon}>⚖️</span>
              Compare Colleges
            </button>
            <button
              style={{
                ...styles.sidebarItem,
                ...(activeTab === 'ai-recommendations' ? styles.sidebarItemActive : {})
              }}
              onClick={() => setActiveTab('ai-recommendations')}
            >
              <span style={styles.sidebarIcon}>🤖</span>
              AI Recommendations
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div style={styles.mainContent}>
          {activeTab === 'dashboard' && (
            <>
              {/* Welcome Message with User's Name */}
              <div style={styles.welcomeSection}>
                <h1 style={styles.welcomeH1}>Welcome back, {user.name}!</h1>
                <p style={styles.welcomeP}>Here's your personalized college recommendation dashboard</p>
              </div>

              {/* Overview Section */}
              <div style={styles.overviewSection}>
                <h2>Overview</h2>
                <div style={styles.overviewCards}>
                  <div style={{ ...styles.overviewCard, ...styles.overviewCardPrimary }}>
                    <div style={styles.cardIcon}>🏫</div>
                    <div style={styles.cardContent}>
                      <div style={styles.cardNumber}>{overviewData.totalColleges}</div>
                      <div style={styles.cardLabel}>Total Colleges Analyzed</div>
                    </div>
                  </div>
                  <div style={styles.overviewCard}>
                    <div style={styles.cardIcon}>📍</div>
                    <div style={styles.cardContent}>
                      <div style={styles.cardNumber}>{overviewData.totalDistricts}</div>
                      <div style={styles.cardLabel}>Total Districts Analyzed</div>
                    </div>
                  </div>
                  <div style={styles.overviewCard}>
                    <div style={styles.cardIcon}>🌿</div>
                    <div style={styles.cardContent}>
                      <div style={styles.cardNumber}>{overviewData.totalBranches}</div>
                      <div style={styles.cardLabel}>Total Branches Analyzed</div>
                    </div>
                  </div>
                  <div style={styles.overviewCard}>
                    <div style={styles.cardIcon}>⏰</div>
                    <div style={styles.cardContent}>
                      <div style={styles.cardNumber}>{overviewData.deadlinesSoon}</div>
                      <div style={styles.cardLabel}>Application Deadlines Soon</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Section */}
              <div style={styles.quickActionsSection}>
                <h2>Quick Actions</h2>
                <div style={styles.actionButtons}>
                  <button
                    style={{ ...styles.actionBtn, ...styles.actionBtnPrimary }}
                    onClick={() => setActiveTab('generate-list')}
                  >
                    Generate New College List
                  </button>
                  <label
                    style={{ ...styles.actionBtn, ...styles.actionBtnSecondary, cursor: 'pointer' }}
                  >
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
              <div style={styles.recommendationSection}>
                <h2>Recommendation Highlights</h2>
                <div style={styles.recommendationCards}>
                  {recommendationHighlights.map((college) => (
                    <div key={college.id} style={styles.recommendationCard}>
                      <div style={{ ...styles.collegeIcon, backgroundColor: college.color }}>
                        {college.name.charAt(0)}
                      </div>
                      <div style={styles.collegeInfo}>
                        <div style={styles.collegeName}>{college.name}</div>
                        <div style={styles.collegeDetails}>
                          <span style={styles.collegeDetailSpan}>Rank {college.rank}</span>
                          <span style={styles.collegeDetailSpan}>{college.type}</span>
                          <span style={styles.collegeDetailSpan}>Est. {college.established}</span>
                        </div>
                      </div>
                      <button
                        style={{
                          ...styles.saveBtn,
                          background: '#38a169',
                          color: 'white'
                        }}
                        onClick={() => setActiveTab('college-list')}
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'college-list' && (
            <div style={styles.tabContent}>
              <h2>College List</h2>
              <p style={styles.tabContentP}>Your personalized college recommendations will appear here.</p>
              <CollegeList />
            </div>
          )}
          {activeTab === 'predict-college' && (
            <div style={styles.tabContent}>
              <h2>Predict College</h2>
              <p style={styles.tabContentP}>Predict your college based on your preferences.</p>
              <PredictCollege
                results={results}
                setResults={setResults}
                cutoff={cutoff}
                setCutoff={setCutoff}
                category={category}
                setCategory={setCategory}
                districts={districts}
                setDistricts={setDistricts}
                branches={branches}
                setBranches={setBranches}
                limitChoice={limitChoice}
                setLimitChoice={setLimitChoice}
                savedColleges={savedCollegesList}
                setSavedColleges={setSavedCollegesList}
              />
            </div>
          )}

          {activeTab === 'saved-preferences' && (
            <div style={styles.tabContent}>
              <SavedPreference
                setCutoff={setCutoff}
                setCategory={setCategory}
                setDistricts={setDistricts}
                setBranches={setBranches}
                setLimitChoice={setLimitChoice}
                setResults={setResults} // <-- Pass this!
                navigate={setActiveTab}
              />
            </div>
          )}
          {activeTab === 'notifications' && (
            <div style={styles.tabContent}>
              <h2>Notifications</h2>
              <p style={styles.tabContentP}>View and manage your notifications.</p>
              {/* <Notifications initial={notifications} /> */}
            </div>
          )}

          {activeTab === 'generate-list' && (
            <div style={styles.tabContent}>
              <h2>Generate Preference List</h2>
              <p style={styles.tabContentP}>Choose your preferences and generate a personalized college list.</p>
              <GeneratePreference />
            </div>
          )}

          {activeTab === 'saved-colleges' && (
            <div style={styles.tabContent}>
              <SavedColleges
                savedColleges={savedCollegesList}
                onRemoveCollege={handleRemoveCollege}
                onCompareColleges={handleCompareColleges}
              />
            </div>
          )}

          {activeTab === 'compare-colleges' && (
            <div style={styles.tabContent}>
              <CompareColleges comparisonData={comparisonData} />
            </div>
          )}

          {activeTab === 'ai-recommendations' && (
            <div style={styles.tabContent}>
              <h2>AI Recommendations</h2>
              <p style={styles.tabContentP}>Get AI-powered college recommendations.</p>
              <Chatbot />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;