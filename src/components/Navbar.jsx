import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm py-3">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          CounselHive
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/predict-college">College Predictor</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/district-colleges">District-wise Colleges</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">Career Guidance</Link>
            </li>
          </ul>
          
          <div className="d-flex">
            <Link to="/profile" className="btn btn-outline-primary rounded-circle p-2">
              <FaUserCircle size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar