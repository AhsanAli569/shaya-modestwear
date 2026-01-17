
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";
import logo from "../assets/shaya-logo.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem("userId");
      setIsLoggedIn(!!userId);
    };

    checkLoginStatus();
    fetchAvailableCategories();
    
    // Listen for storage changes (login/logout in other tabs)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const fetchAvailableCategories = async () => {
    try {
      const res = await fetch("https://shayamodestwear-backend.onrender.com/api/products");
      const products = await res.json();
      
      // Handle both array and single object responses
      const productArray = Array.isArray(products) ? products : [products];
      
      // Get unique categories from products
      const categoriesMap = new Map();
      productArray.forEach(product => {
        if (product && product.category) {
          const cat = product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
          if (!categoriesMap.has(cat)) {
            categoriesMap.set(cat, {
              name: product.category,
              slug: cat,
              count: 1
            });
          } else {
            categoriesMap.get(cat).count++;
          }
        }
      });
      
      setAvailableCategories(Array.from(categoriesMap.values()));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-main">
        <div className="navbar-group-left">
          <Link to="/" className="navbar-logo-link">
            <img src={logo} alt="Shaya Logo" className="navbar-logo" />
          </Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/about">About Us</Link>
            {isLoggedIn && (
              <Link to="/my-orders" className="nav-orders">My Orders</Link>
            )}
          </div>
        </div>
        <div className="navbar-group-right">
          <div className="navbar-actions">
            <Link to="/cart" className="cart-link">
              <span className="cart-icon">🛒</span>
              Cart
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="login-link">Login</Link>
                <Link to="/signup" className="signup-link">Sign Up</Link>
              </>
            ) : (
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            )}
            <Link to="/admin" className="admin-link">
              <span className="admin-icon">⚙️</span>
              Admin
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile menu: only render on mobile and when open */}
      {isMenuOpen && window.innerWidth <= 900 && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="close-menu" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">✕</button>
            <div className="mobile-menu-links">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              {isLoggedIn && (
                <Link to="/my-orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
              )}
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link>
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
                </>
              ) : (
                <button className="logout-btn" onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
              )}
              <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
