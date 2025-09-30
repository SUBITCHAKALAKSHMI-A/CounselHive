import React, { useState } from 'react';

function ProfileDropdown({ user, onSignOut }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSignIn = () => {
    console.log('Redirecting to sign-in page...');
    alert('Redirecting to sign-in page!');
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        style={{
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
        onClick={toggleDropdown}
      >
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <span
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: '#ccc',
              display: 'inline-block',
              marginRight: '8px',
            }}
          >
            {user ? user.avatar : 'G'}
          </span>
          <span style={{ color: '#00ffff' }}>
            {user ? ` ${user.name}` : 'Guest'}
          </span>
        </span>
        <span style={{ fontSize: '18px' }}>▸</span>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px',
            marginTop: '8px',
            width: '200px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              console.log('My Account clicked');
              setIsOpen(false);
            }}
          >
            <span style={{ marginRight: '8px' }}>👤</span>
            My Account
          </div>
          <div
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => {
              console.log('Settings clicked');
              setIsOpen(false);
            }}
          >
            <span style={{ marginRight: '8px' }}>⚙️</span>
            Settings
          </div>
          <div
            style={{
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#D81B60',
            }}
            onClick={() => {
              onSignOut();
              window.location.href = '/login';
              setIsOpen(false);
            }}
          >
            <span style={{ marginRight: '8px' }}>⬆</span>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;