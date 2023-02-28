import { Link } from "react-router-dom";
import "../Nav/Nav.scss";

export const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        {" "}
        <Link className="navbar__container__list__link" to={"/"}>
          ZOO
        </Link>
      </div>
      <ul className="navbar__container">
        <li className="navbar__container__list">
          <Link className="navbar__container__list__link" to={"/"}>
            Hem
          </Link>
        </li>
        <li className="navbar__container__list">
          <Link className="navbar__container__list__link" to={"/animals"}>
            Djur
          </Link>
        </li>
      </ul>
    </nav>
  );
};
