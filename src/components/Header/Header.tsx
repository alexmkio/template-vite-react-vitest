import "./Header.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header() {
  let path = useLocation().pathname;

  return (
    <header>
      <h1>Header</h1>
      {path !== "/" && (
        <nav>
          <Link to="/">Home</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;
