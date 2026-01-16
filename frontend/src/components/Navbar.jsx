
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
    <nav className="navbar-modern">
      <div className="navbar-container">
        {/* Hamburger Menu Button */}
        <button 
          className="hamburger-menu" 
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo Section */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">🧕</div>
          <div className="logo-text">
            <span className="logo-name">Shaya</span>
            <span className="logo-tagline">Modestwear</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span> Home
          </Link>
          <Link to="/category" className="nav-link">
            <span className="nav-icon">📦</span> Categories
          </Link>
          <Link to="/about" className="nav-link">
            <span className="nav-icon">ℹ️</span> About Us
          </Link>
          
          {isLoggedIn && (
            <Link to="/my-orders" className="nav-link nav-orders">
              <span className="nav-icon">📋</span> My Orders
            </Link>
          )}
        </div>

        {/* Right Section */}
        <div className="navbar-actions">
          return (
            <nav className="navbar">
              <div className="navbar-left">
                <Link to="/" className="navbar-logo-link">
                  <img src={logo} alt="Shaya Logo" className="navbar-logo" />
                </Link>
                <Link to="/" className="navbar-brand">Shaya MODESTWEAR</Link>
                <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}> 
                  <Link to="/">Home</Link>
                  <Link to="/categories">Categories</Link>
                  <Link to="/about">About Us</Link>
                </div>
              </div>
              <div className="navbar-right">
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
              </div>
            </nav>
          );
          {/* Admin Link */}
          <Link to="/admin" className="admin-link">
            <span className="admin-icon">⚙️</span>
            Admin
          </Link>
        </div>
      </div>

      {/* Full Screen Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
        <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
          {/* Menu Header */}
          <div className="mobile-menu-header">
            <h2>Menu</h2>
            <button 
              className="close-menu" 
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          {/* Categories List */}
          <div className="mobile-menu-content">
            {availableCategories.length > 0 ? (
              availableCategories.map((category, index) => (
                <Link 
                  key={index}
                  to={`/products/${category.slug}`}
                  className="menu-item"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="menu-item-content">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.count} items</span>
                  </div>
                  <span className="menu-arrow">›</span>
                </Link>
              ))
            ) : (
              <div className="menu-empty">
                <p>No categories available yet</p>
              </div>
            )}
          </div>

          {/* Menu Footer */}
          <div className="mobile-menu-footer">
            {isLoggedIn ? (
              <>
                <Link to="/my-orders" className="menu-footer-item" onClick={() => setIsMenuOpen(false)}>
                  <span className="footer-icon">👤</span>
                  <span>My Account</span>
                </Link>
                <button onClick={handleLogout} className="menu-footer-item">
                  <span className="footer-icon">🚪</span>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="menu-footer-item" onClick={() => setIsMenuOpen(false)}>
                  <span className="footer-icon">👤</span>
                  <span>Sign in</span>
                </Link>
                <Link to="/signup" className="menu-footer-item" onClick={() => setIsMenuOpen(false)}>
                  <span className="footer-icon">👥</span>
                  <span>Create an account</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
