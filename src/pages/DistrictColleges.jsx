import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const collegeData = {
  // ... (keep your existing collegeData object exactly as is)
  "Ariyalur": {
    "Private": [
      "Jayam College of Engineering and Technology",
      "M.I.E.T. Engineering College"
    ]
  },
  "Chennai": {
    "Government": [
      "Government College of Engineering, Chennai",
      "Anna University, Chennai",
      "Government College of Technology, Chennai"
    ],
    "Private": [
      "Loyola-ICAM College of Engineering and Technology",
      "B.S. Abdur Rahman Crescent Institute of Science and Technology",
      "R.M.K. Engineering College",
      "Panimalar Engineering College",
      "St. Joseph's College of Engineering",
      "Easwari Engineering College",
      "Jeppiaar Engineering College",
      "Rajalakshmi Engineering College",
      "Sri Sairam Engineering College",
      "Sri Sai Ram Institute of Technology",
      "Adhiparasakthi Engineering College",
      "Aalim Muhammed Salegh College of Engineering",
      "Agni College of Technology",
      "Aksheyaa College of Engineering",
      "Asan Memorial College of Engineering and Technology",
      "Central Institute of Plastics Engineering and Technology",
      "Jawahar Engineering College",
      "Jawahar School of Architecture Planning and Design"
    ]
  },
  "Coimbatore": {
    "Government": ["Government College of Technology, Coimbatore"],
    "Private": [
      "PSG College of Technology",
      "Coimbatore Institute of Technology",
      "Kumaraguru College of Technology",
      "Sri Ramakrishna Engineering College",
      "Karpagam College of Engineering",
      "Sri Krishna College of Engineering & Technology",
      "SNS College of Technology",
      "Dr. Mahalingam College of Engineering and Technology",
      "Tamil Nadu College of Engineering",
      "Rathinam Technical Campus",
      "KPR Institute of Engineering and Technology",
      "Dhanalakshmi Srinivasan College of Engineering",
      "Park College of Engineering and Technology",
      "Hindusthan College of Engineering and Technology",
      "Nehru Institute of Engineering and Technology",
      "Hindustan Institute of Technology",
      "Adhiyamaan College of Engineering"
    ]
  },
  "Cuddalore": {
    "Private": [
      "CK College of Engineering",
      "MRK Institute of Technology",
      "Dr. Navalar Nedunchezhiyan College of Engineering",
      "Krishnaswamy College of Engineering and Technology",
      "St. Anne's College of Engineering and Technology"
    ]
  },
  "Dharmapuri": {
    "Government": [
      "Government College of Engineering, Dharmapuri"
    ]
  },
  "Dindigul": {
    "Private": [
      "P.S.N.A. College of Engineering and Technology"
    ]
  },
  "Erode": {
    "Private": [
      "Kongu Engineering College",
      "Bannari Amman Institute of Technology",
      "Erode Sengunthar Engineering College",
      "Velalar College of Engineering and Technology",
      "Institute of Road and Transport Technology"
    ]
  },
  "Kallakurichi": {
    "Private": [
      "Arignar Anna Institute of Science and Technology",
      "Kallakurichi Institute of Technology"
    ]
  },
  "Kanchipuram": {
    "Government": [
      "Government College of Engineering, Kanchipuram"
    ],
    "Private": [
      "Sri Sivasubramaniya Nadar College of Engineering",
      "Sri Sai Ram Engineering College",
      "Sri Sairam Institute of Technology",
      "Chennai Institute of Technology",
      "Adhiparasakthi Engineering College",
      "Mohamed Sathak AJ College of Engineering",
      "Rajiv Gandhi College of Engineering",
      "Sri Venkateswara College of Engineering",
      "Saveetha Engineering College",
      "Velammal Institute of Technology",
      "Rajalakshmi Institute of Technology",
      "K.C.G College of Technology",
      "Tagore Engineering College"
    ]
  },
  "Karur": {
    "Private": [
      "M. Kumarasamy College of Engineering",
      "Chettinad College of Engineering and Technology"
    ]
  },
  "Krishnagiri": {
    "Government": [
      "Government College of Engineering, Bargur"
    ]
  },
  "Madurai": {
    "Government": [
      "Thiagarajar College of Engineering",
      "Government College of Engineering, Tirunelveli"
    ],
    "Private": [
      "K.L.N. College of Engineering",
      "Sethu Institute of Technology",
      "Velammal College of Engineering and Technology"
    ]
  },
  "Mayiladuthurai": {
    "Private": [
      "Annai College of Engineering and Technology",
      "Dhanalakshmi Srinivasan Engineering College"
    ]
  },
  "Nagapattinam": {
    "Private": [
      "E.G.S. Pillay Engineering College",
      "Sembodai Rukumani College of Engineering",
      "Sir Issac Newton College of Engineering and Technology",
      "Arifa Institute of Engineering and Technology",
      "Prime College of Architecture and Planning"
    ]
  },
  "Namakkal": {
    "Private": [
      "Selvam College of Technology",
      "J.K.K. Nattraja College of Engineering and Technology",
      "Sengunthar Engineering College (Autonomous)"
    ]
  },
  "Nilgiris": {
    "Private": [
      "JSS Academy of Technical Education",
      "Nehru Institute of Engineering and Technology"
    ]
  },
  "Perambalur": {
    "Private": [
      "Perambalur Institute of Engineering and Technology",
      "Sakthi Engineering College"
    ]
  },
  "Pudukkottai": {
    "Private": [
      "Pudukkottai College of Engineering and Technology",
      "Muthayammal Engineering College"
    ]
  },
  "Ramanathapuram": {
    "Private": [
      "Mohamed Sathak Engineering College",
      "Syed Ammal Engineering College"
    ]
  },
  "Ranipet": {
    "Private": [
      "Arunai Engineering College",
      "Dhaanish Ahmed College of Engineering"
    ]
  },
  "Salem": {
    "Government": [
      "Government College of Engineering, Salem"
    ],
    "Private": [
      "AVS Engineering College",
      "Sona College of Technology",
      "Tagore Institute of Engineering and Technology",
      "Institute of Road and Transport Technology"
    ]
  },
  "Sivaganga": {
    "Private": [
      "Sivaganga College of Engineering",
      "P.S.R. Engineering College"
    ]
  },
  "Tenkasi": {
    "Private": [
      "Tenkasi Institute of Technology",
      "V.V.V. College for Women"
    ]
  },
  "Thanjavur": {
    "Private": [
      "Parisutham Institute of Technology & Science",
      "Government College of Engineering, Sengippatti"
    ]
  },
  "Theni": {
    "Private": [
      "Theni Kammavar Sangam College of Technology",
      "Vaigai College of Engineering"
    ]
  },
  "Thoothukudi": {
    "Private": [
      "St. Mother Theresa Engineering College",
      "Dr. Sivanthi Adithanar Engineering College, Tiruchendur"
    ]
  },
  "Tiruchirappalli": {
    "Government": [
      "Government College of Engineering, Srirangam",
      "University Departments of Anna University, Tiruchirappalli (BIT Campus)"
    ],
    "Private": [
      "Vetri Vinayaha College of Engineering and Technology",
      "PSG Institute of Technology and Applied Research"
    ]
  },
  "Tirunelveli": {
    "Government": [
      "Government College of Engineering, Tirunelveli"
    ],
    "Private": [
      "Francis Xavier Engineering College",
      "National Engineering College",
      "University College of Engineering, Nagercoil"
    ]
  },
  "Tirupathur": {
    "Private": [
      "Tirupathur Engineering College",
      "Vani Engineering College"
    ]
  },
  "Tiruppur": {
    "Private": [
      "Tiruppur Kumaran College of Technology",
      "Angel College of Engineering and Technology"
    ]
  },
  "Tiruvallur": {
    "Private": [
      "Apollo Engineering College",
      "Prathyusha Engineering College",
      "Saveetha Engineering College",
      "Velammal Institute of Technology",
      "Velammal Engineering College",
      "R.M.D. Engineering College",
      "Panimalar Engineering College",
      "Easwari Engineering College",
      "Rajalakshmi Institute of Technology",
      "K.C.G College of Technology",
      "Tagore Engineering College"
    ]
  },
  "Tiruvannamalai": {
    "Private": [
      "Arulmigu Meenakshi Amman College of Engineering"
    ]
  },
  "Tiruvarur": {
    "Private": [
      "Anjalai Ammal Mahalingam Engineering College"
    ]
  },
  "Vellore": {
    "Government": [
      "Thanthai Periyar Government Institute of Technology"
    ],
    "Private": [
      "C. Abdul Hakeem College of Engineering & Technology",
      "Kingston Engineering College",
      "Global Institute of Technology",
      "Annai Meera Engineering College",
      "Sree Krishna Engineering"
    ]
  },
  "Viluppuram": {
    "Private": [
      "Viluppuram Engineering College",
      "Thiruvalluvar College of Engineering and Technology"
    ]
  },
  "Virudhunagar": {
    "Private": [
      "Virudhunagar College of Engineering",
      "V.S.B. Engineering College"
    ]
  }
};

const DistrictColleges = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedCollegeType, setSelectedCollegeType] = useState(null);
  const [hoveredCollege, setHoveredCollege] = useState(null);

  const districts = Object.keys(collegeData);

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setSelectedCollegeType(null);
  };

  const handleCollegeTypeSelect = (type) => {
    setSelectedCollegeType(type);
  };

  const goBackToDistricts = () => {
    setSelectedDistrict(null);
    setSelectedCollegeType(null);
  };

  const goBackToCollegeTypes = () => {
    setSelectedCollegeType(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9f9ff 0%, #f0f4ff 100%)',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <Navbar />

      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255,153,102,0.1) 0%, rgba(255,153,102,0) 70%)',
        zIndex: 0
      }}></div>
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(102,153,255,0.1) 0%, rgba(102,153,255,0) 70%)',
        zIndex: 0
      }}></div>

      <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
        {/* District selection view */}
        {!selectedDistrict ? (
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <h1 style={{
              textAlign: 'center',
              marginBottom: '2rem',
              fontWeight: 700,
              color: '#333',
              fontSize: '2.5rem',
              background: 'linear-gradient(90deg, #FF9966, #FF5E62)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              position: 'relative',
              display: 'inline-block',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              Engineering Colleges in Tamil Nadu
            </h1>
            <p style={{
              textAlign: 'center',
              marginBottom: '3rem',
              color: '#666',
              fontSize: '1.1rem',
              maxWidth: '700px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: '1.6'
            }}>
              Select a district to explore available engineering colleges with detailed information
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
              padding: '0 1rem'
            }}>
              {districts.map((district) => (
                <div 
                  key={district}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    border: '1px solid rgba(0,0,0,0.05)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleDistrictSelect(district)}
                  onMouseEnter={() => setHoveredCollege(district)}
                  onMouseLeave={() => setHoveredCollege(null)}
                >
                  {hoveredCollege === district && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, rgba(255,153,102,0.1) 0%, rgba(102,153,255,0.1) 100%)',
                      zIndex: 0
                    }}></div>
                  )}
                  <h3 style={{
                    color: '#333',
                    fontWeight: 600,
                    marginBottom: '1rem',
                    position: 'relative',
                    zIndex: 1
                  }}>{district}</h3>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {collegeData[district].Government && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #66B3FF, #6699FF)',
                        color: 'white',
                        boxShadow: '0 2px 5px rgba(102,153,255,0.3)'
                      }}>
                        {collegeData[district].Government.length} Government
                      </span>
                    )}
                    {collegeData[district].Private && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        borderRadius: '20px',
                        background: 'linear-gradient(135deg, #FF9966, #FF5E62)',
                        color: 'white',
                        boxShadow: '0 2px 5px rgba(255,94,98,0.3)'
                      }}>
                        {collegeData[district].Private.length} Private
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : !selectedCollegeType ? (
          // College type selection view
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                onClick={goBackToDistricts}
                style={{
                  background: 'none',
                  border: '2px solid #6699FF',
                  color: '#6699FF',
                  fontWeight: 600,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <span>←</span> Back to Districts
              </button>
              <h2 style={{
                margin: 0,
                color: '#333',
                fontWeight: 700,
                fontSize: '1.75rem'
              }}>
                {selectedDistrict} District
              </h2>
            </div>

            <p style={{
              marginBottom: '2rem',
              color: '#666',
              fontSize: '1.1rem'
            }}>
              Choose college type to explore institutions in <span style={{
                fontWeight: 600,
                color: '#FF9966'
              }}>{selectedDistrict}</span>
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {collegeData[selectedDistrict].Government && (
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #66B3FF, #6699FF)',
                    borderRadius: '12px',
                    padding: '2rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(102,153,255,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleCollegeTypeSelect("Government")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h3 style={{
                    marginBottom: '0.5rem',
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1
                  }}>Government Colleges</h3>
                  <p style={{
                    margin: 0,
                    opacity: 0.9,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {collegeData[selectedDistrict].Government.length} colleges available
                  </p>
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.5s ease'
                  }}></div>
                </div>
              )}

              {collegeData[selectedDistrict].Private && (
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #FF9966, #FF5E62)',
                    borderRadius: '12px',
                    padding: '2rem',
                    color: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 5px 15px rgba(255,94,98,0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleCollegeTypeSelect("Private")}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h3 style={{
                    marginBottom: '0.5rem',
                    fontWeight: 700,
                    position: 'relative',
                    zIndex: 1
                  }}>Private Colleges</h3>
                  <p style={{
                    margin: 0,
                    opacity: 0.9,
                    position: 'relative',
                    zIndex: 1
                  }}>
                    {collegeData[selectedDistrict].Private.length} colleges available
                  </p>
                  <div style={{
                    position: 'absolute',
                    bottom: '-50px',
                    left: '-50px',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                    transition: 'all 0.5s ease'
                  }}></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // College list view
          <div style={{ animation: 'fadeIn 0.5s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <button
                onClick={goBackToCollegeTypes}
                style={{
                  background: 'none',
                  border: '2px solid #FF9966',
                  color: '#FF9966',
                  fontWeight: 600,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '30px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
              >
                <span>←</span> Back to {selectedDistrict}
              </button>
              <h2 style={{
                margin: 0,
                color: '#333',
                fontWeight: 700,
                fontSize: '1.75rem'
              }}>
                <span style={{
                  background: selectedCollegeType === 'Government' 
                    ? 'linear-gradient(135deg, #66B3FF, #6699FF)' 
                    : 'linear-gradient(135deg, #FF9966, #FF5E62)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800
                }}>
                  {selectedCollegeType}
                </span> Colleges in {selectedDistrict}
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gap: '1rem'
            }}>
              {collegeData[selectedDistrict][selectedCollegeType].map(
                (college, index) => (
                  <div 
                    key={index}
                    style={{
                      background: 'white',
                      borderRadius: '10px',
                      padding: '1.5rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                      borderLeft: `4px solid ${selectedCollegeType === 'Government' ? '#6699FF' : '#FF9966'}`,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(5px)';
                      e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}>
                      <h3 style={{
                        margin: 0,
                        color: '#333',
                        fontWeight: 600,
                        fontSize: '1.1rem'
                      }}>
                        {college}
                      </h3>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        borderRadius: '20px',
                        background: selectedCollegeType === 'Government' 
                          ? 'linear-gradient(135deg, #66B3FF, #6699FF)' 
                          : 'linear-gradient(135deg, #FF9966, #FF5E62)',
                        color: 'white'
                      }}>
                        {selectedCollegeType}
                      </span>
                    </div>
                    <p style={{
                      margin: 0,
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      Located in {selectedDistrict} district
                    </p>
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: selectedCollegeType === 'Government' 
                        ? 'linear-gradient(90deg, #66B3FF, #6699FF)' 
                        : 'linear-gradient(90deg, #FF9966, #FF5E62)',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s ease'
                    }}></div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          * {
            box-sizing: border-box;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      <Footer />
    </div>
  );
};

export default DistrictColleges;