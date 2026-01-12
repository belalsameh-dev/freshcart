import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./navbar.css";
import LogoImg from "../../assets/freshcart-logo.svg";
import { useAuth } from "../../hooks/useAuth.js";
import { useCart } from "../../hooks/useCart.js";
import { useWish } from "../../hooks/useWish.js";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const { cartCounter, setCartCounter } = useCart();
  const { wishCounter, setWishCounter } = useWish();

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
    setCartCounter(0);
    setWishCounter(0);
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed z-1 w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={LogoImg} alt="freshcart-logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/products">products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/categories">categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/brands">brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/allorders">orders</NavLink>
              </li>
            </ul>
          )}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? ( <>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link nav-btn active" : "nav-link nav-btn"} data-text="CART" to="/cart">
                  <span className="badge rounded-pill">{cartCounter}</span>
                  <FontAwesomeIcon icon="fa-solid fa-cart-shopping" className="icon" />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link nav-btn active" : "nav-link nav-btn"} data-text="WISHLIST" to="/wishList">
                  <span className="badge rounded-pill">{wishCounter}</span>
                  <FontAwesomeIcon icon="fa-solid fa-heart" className="icon" />
                </NavLink>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-link nav-btn" data-text="LOGOUT">
                  <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className="icon" />
                </button>
              </li>
            </>) : (<>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/login">login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => isActive ? "nav-link active" : "nav-link"} to="/register">register</NavLink>
              </li>
            </>)}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
