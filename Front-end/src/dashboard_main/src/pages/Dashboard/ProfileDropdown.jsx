import React, { useState, useRef, useEffect } from 'react';

function ProfileDropdown({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);

  // ref + outside click / Escape close handling
  const containerRef = useRef(null);
  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setIsOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignIn = () => {
    console.log('Redirecting to sign-in page...');
    alert('Redirecting to sign-in page!');
  };

  // Inline Styles
  const styles = {
    profileDropdown: {
      position: 'relative',
      display: 'inline-block',
      zIndex: 1003
    },
    profileTrigger: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    },
    profileTriggerHover: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)'
    },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #00ffff 0%, #00e0e0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: '#1e2a38',
      fontSize: '16px'
    },
    avatarLarge: {
      width: '48px',
      height: '48px',
      fontSize: '20px'
    },
    username: {
      color: 'white',
      fontWeight: '500',
      fontSize: '14px'
    },
    dropdownArrow: {
      color: 'white',
      fontSize: '10px',
      transition: 'transform 0.3s'
    },
    dropdownArrowOpen: {
      transform: 'rotate(180deg)'
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      width: '250px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 1002,
      marginTop: '8px',
      overflow: 'hidden',
      animation: 'dropdownFadeIn 0.2s ease'
    },
    dropdownHeader: {
      padding: '16px',
      backgroundColor: '#f8f9fa'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column'
    },
    userName: {
      fontWeight: '600',
      color: '#333',
      fontSize: '14px'
    },
    userEmail: {
      color: '#666',
      fontSize: '12px',
      marginTop: '2px'
    },
    dropdownDivider: {
      height: '1px',
      backgroundColor: '#e9ecef',
      margin: '4px 0'
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      color: '#333',
      fontSize: '14px',
      zIndex: 1003
    },
    dropdownItemHover: {
      backgroundColor: '#f8f9fa'
    },
    dropdownItemSignOut: {
      color: '#e74c3c'
    },
    dropdownItemSignOutHover: {
      backgroundColor: '#ffeaea'
    },
    itemIcon: {
      fontSize: '16px',
      width: '20px',
      textAlign: 'center'
    }
  };

  // Animation keyframes as style tag
  const animationStyles = `
    @keyframes dropdownFadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <div
      ref={containerRef}
      style={styles.profileDropdown}
      onMouseEnter={() => setIsOpen(true)}   // open on hover
      onMouseLeave={() => setIsOpen(false)}  // close when pointer leaves
    >
      {/* Add animation styles */}
      <style>{animationStyles}</style>
      
      <div
        style={{
          ...styles.profileTrigger,
          ...(isOpen ? styles.profileTriggerHover : {})
        }}
        onClick={toggleDropdown}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={styles.avatar}>
            {user ? user.avatar : 'G'}
          </span>
          <span style={styles.username}>
            {user ? user.name : 'Guest'}
          </span>
        </span>
        <span style={{
          ...styles.dropdownArrow,
          ...(isOpen ? styles.dropdownArrowOpen : {})
        }}>
          ▸
        </span>
      </div>

      {isOpen && (
        <div style={styles.dropdownMenu}>
          {/* User Info Header */}
          <div style={styles.dropdownHeader}>
            <div style={styles.userInfo}>
              <div style={{...styles.avatar, ...styles.avatarLarge}}>
                {user ? user.avatar : 'G'}
              </div>
              <div style={styles.userDetails}>
                <div style={styles.userName}>{user ? user.name : 'Guest User'}</div>
                {user && user.email && (
                  <div style={styles.userEmail}>{user.email}</div>
                )}
              </div>
            </div>
          </div>

          <div style={styles.dropdownDivider} />

          {/* Dropdown Items */}
          <div
            style={styles.dropdownItem}
            onClick={() => {
              console.log('My Account clicked');
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={styles.itemIcon}>👤</span>
            My Account
          </div>

          <div
            style={styles.dropdownItem}
            onClick={() => {
              console.log('Settings clicked');
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.dropdownItemHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={styles.itemIcon}>⚙️</span>
            Settings
          </div>

          <div style={styles.dropdownDivider} />

          <div
            style={{
              ...styles.dropdownItem,
              ...styles.dropdownItemSignOut
            }}
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = styles.dropdownItemSignOutHover.backgroundColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <span style={styles.itemIcon}>🚪</span>
            Sign Out
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;