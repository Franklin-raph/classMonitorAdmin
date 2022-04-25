import React from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  if(localStorage.getItem('admin')) console.log("Admin in")
  else console.log("No admin in")

  const handleLogout = () =>{
    //   axios.get('/auth/signout')
    //   localStorage.removeItem('jwt')
    //   historyRoute(`/`)
    //   window.location.reload()
    //   console.log("User is signed out")
  
          fetch('https://classroommonitorbackend.herokuapp.com/auth/admin/logout')
          navigate(`/`)
          window.location.reload()
  
          localStorage.removeItem('admin')
  
          window.location.reload(true)
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{zIndex:'1'}}>
          <div className="container">
            <a className="navbar-brand" href="#">Class Monitor Admin</a>
            <div className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {localStorage.getItem('admin')?
                <>
                  <li className="nav-item">
                    <Link to="/dashboard" className="nav-link">
                      Dashboard
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link to="/allstuents" className="nav-link">
                      View Students
                    </Link>
                  </li> */}
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link">
                      Tasks
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/" className="nav-link" onClick={ handleLogout }>
                      Signout
                    </Link>
                  </li>
                </>
                :
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      Login
                    </Link>
                  </li>
                }
              </ul>
            </div>
          </div>
        </nav>
    </div>
  )
}

export default Navbar