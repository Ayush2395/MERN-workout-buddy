import { Link } from "react-router-dom";
import { useAuth, useLogout } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuth();

  const handleLogout = () => {
    return logout();
  };

  return (
    <>
      <header>
        <div className="container">
          <Link to="/">
            <h1>Workout Buddy</h1>
          </Link>
          <nav>
            {user && (
              <div>
                <span>{user.email}</span>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
            {!user && (
              <div>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
