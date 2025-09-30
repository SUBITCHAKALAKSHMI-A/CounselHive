import { Link } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top shadow-sm py-3">
      <div style={{
        background: "#1e2a38",
        display: "flex",
        color: "white",
        justifyContent: "space-between",  // ✅ camelCase for CSS properties
        alignItems: "center",             // ✅ camelCase for CSS properties
        minHeight: "70px",  // ✅ camelCase
        width: "100%",
        padding: "0 20px",  // ✅ camelCases
      }}>
        <Link className="navbar-brand fw-bold text-primary" to="/">
          CounselHive
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item">
            <Link className="nav-link active text-white ps-4 pe-4" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white ps-4 pe-4" to="/district-colleges">District-wise Colleges</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white ps-4 pe-4" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white ps-4 pe-4" to="/signup">Sign up</Link>
          </li>
        </ul>
      </div>
    </div>
    </nav >
  )
}

export default Navbar