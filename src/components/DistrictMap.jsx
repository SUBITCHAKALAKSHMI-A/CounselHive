const DistrictMap = ({ hoveredDistrict, setHoveredDistrict }) => {
  // In a real app, you would use an actual SVG map of Tamil Nadu
  // This is a simplified placeholder
  
  const districts = [
    { name: 'Chennai', x: '75%', y: '15%' },
    { name: 'Coimbatore', x: '40%', y: '35%' },
    { name: 'Madurai', x: '55%', y: '65%' },
    { name: 'Trichy', x: '65%', y: '50%' },
    { name: 'Salem', x: '50%', y: '40%' }
  ]

  return (
    <div className="district-map position-relative" style={{ height: '400px', background: '#f0f8ff' }}>
      {/* This would be your SVG map in production */}
      <div className="position-absolute top-50 start-50 translate-middle text-muted">
        <p className="text-center">Tamil Nadu Map</p>
      </div>
      
      {districts.map(district => (
        <button
          key={district.name}
          className={`district-btn position-absolute rounded-pill ${hoveredDistrict === district.name ? 'btn-primary' : 'btn-outline-primary'}`}
          style={{
            left: district.x,
            top: district.y,
            transform: 'translate(-50%, -50%)',
            zIndex: hoveredDistrict === district.name ? 10 : 5
          }}
          onMouseEnter={() => setHoveredDistrict(district.name)}
          onMouseLeave={() => setHoveredDistrict(null)}
        >
          {district.name}
        </button>
      ))}
    </div>
  )
}

export default DistrictMap