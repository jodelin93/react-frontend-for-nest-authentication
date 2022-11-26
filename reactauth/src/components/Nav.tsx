import { Link } from 'react-router-dom';
export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">
                {' '}
                Home{' '}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" aria-current="page">
                {' '}
                Login{' '}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link" aria-current="page">
                {' '}
                Register{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
