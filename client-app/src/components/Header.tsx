import { Link } from "react-router-dom";

function Header() {
  return (
    <nav>
      <Link to="/">Login</Link>{" | "}
      <Link to="/dashboard">Dashboard</Link>{" | "}
      <Link to="/users">Users</Link>
    </nav>
  );
}

export default Header;