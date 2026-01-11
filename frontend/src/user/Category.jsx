import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import "./Category.css";

export default function Category() {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    fetchAvailableCategories();
  }, []);

  const fetchAvailableCategories = async () => {
    try {
      const res = await axios.get("/products");
      setProductsData(res.data);
      
      // Get unique categories with their slugs
      const categoryMap = new Map();
      const productArray = Array.isArray(res.data) ? res.data : [res.data];
      
      productArray.forEach(product => {
        if (product && product.category) {
          const slug = product.category.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
          categoryMap.set(slug, {
            name: product.category,
            slug: slug,
            count: (categoryMap.get(slug)?.count || 0) + 1
          });
        }
      });
      
      setAvailableCategories(Array.from(categoryMap.values()));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Professional Category Structure for Modern Modest-Wear E-commerce
  const categories = [
    {
      id: 1,
      name: "Abayas",
      slug: "abaya",
      icon: "👗",
      description: "Elegant and modest abayas for every occasion",
      subcategories: ["Simple Abaya", "Front Open Abaya", "Closed Abaya", "Embroidered Abaya", "Printed Abaya", "Party/Formal Abaya", "Daily Wear Abaya", "Kaftan Style", "Umbrella Abaya"]
    },
    {
      id: 2,
      name: "Dresses",
      slug: "dress",
      icon: "👗",
      description: "Beautiful modest dresses for all occasions",
      subcategories: ["Maxi Dresses", "Long Frocks", "Casual Dresses", "Formal Dresses", "Party Wear", "Evening Gowns"]
    },
    {
      id: 3,
      name: "Traditional Wear",
      slug: "traditional",
      icon: "🥻",
      description: "Classic Pakistani & Asian fashion",
      subcategories: ["Kurti", "Kurta Sets", "2-Piece Suits", "3-Piece Suits", "Shalwar Kameez", "Palazzo Suits"]
    },
    {
      id: 4,
      name: "Modest Wear",
      slug: "modest",
      icon: "👚",
      description: "Comfortable modest clothing",
      subcategories: ["Long Tops", "Tunics", "Loose Shirts", "Modest Co-ord Sets"]
    },
    {
      id: 5,
      name: "Hijabs & Scarves",
      slug: "hijabs--scarves",
      icon: "🧕",
      description: "Premium quality hijabs and scarves",
      subcategories: ["Chiffon Hijabs", "Silk Hijabs", "Cotton Hijabs", "Lawn Hijabs", "Jersey Hijabs", "Printed Hijabs", "Plain Hijabs"]
    },
    {
      id: 6,
      name: "Stoles",
      slug: "stole",
      icon: "🧣",
      description: "Luxurious stoles for elegant styling",
      subcategories: ["Silk Stole", "Cotton Stole", "Pashmina Stole", "Printed Stole"]
    },
    {
      id: 7,
      name: "Accessories",
      slug: "accessories",
      icon: "✨",
      description: "Complete your modest look",
      subcategories: ["Hijab Pins", "Magnetic Pins", "Undercaps", "Niqab", "Face Veils", "Brooches"]
    },
    {
      id: 8,
      name: "Fashion Bags",
      slug: "bags",
      icon: "👜",
      description: "Stylish handbags and accessories",
      subcategories: ["Handbags", "Clutches", "Wallets", "Belts", "Sunglasses"]
    },
    {
      id: 9,
      name: "Footwear",
      slug: "footwear",
      icon: "👠",
      description: "Comfortable and stylish shoes",
      subcategories: ["Flats", "Sandals", "Khussas", "Heels", "Pumps", "Slippers"]
    },
    {
      id: 10,
      name: "Jewelry",
      slug: "jewelry",
      icon: "💍",
      description: "Beautiful artificial jewelry",
      subcategories: ["Earrings", "Rings", "Bangles", "Bracelets", "Necklaces", "Jewelry Sets"]
    },
    {
      id: 11,
      name: "Beauty & Care",
      slug: "beauty--care",
      icon: "🧴",
      description: "Perfumes and personal care",
      subcategories: ["Perfumes/Attars", "Body Mists", "Skincare", "Makeup"]
    },
    {
      id: 12,
      name: "Winter Collection",
      slug: "winter-collection",
      icon: "🧥",
      description: "Stay warm and stylish",
      subcategories: ["Shawls", "Winter Stoles", "Cardigans", "Coats", "Shrugs"]
    },
    {
      id: 13,
      name: "Gift Items",
      slug: "gifts",
      icon: "🎁",
      description: "Perfect gifts for loved ones",
      subcategories: ["Gift Boxes", "Abaya Covers", "Storage Boxes", "Eid Collection", "Wedding Collection"]
    }
  ];

  return (
    <div className="category-container">
      <div className="category-hero">
        <h1>Shop by Category</h1>
        <p className="hero-subtitle">Discover our curated collection of modest fashion essentials</p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          // Check if any products match this category
          const hasProducts = availableCategories.some(cat => cat.slug === category.slug);
          const productCount = availableCategories.find(cat => cat.slug === category.slug)?.count || 0;
          
          return (
            <div className={`category-card ${!hasProducts ? 'coming-soon' : ''}`} key={category.id}>
              {!hasProducts && (
                <div className="coming-soon-badge">Coming Soon</div>
              )}
              {hasProducts && (
                <div className="products-count-badge">{productCount} item{productCount !== 1 ? 's' : ''}</div>
              )}
              <Link 
                to={hasProducts ? `/products/${category.slug}` : '#'} 
                className="category-link"
                onClick={(e) => {
                  if (!hasProducts) {
                    e.preventDefault();
                    alert('🎉 This category is coming soon! Stay tuned for exciting new products.');
                  }
                }}
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                
                <div className="subcategories-preview">
                  {category.subcategories.slice(0, 3).map((sub, idx) => (
                    <span key={idx} className="subcategory-tag">{sub}</span>
                  ))}
                  {category.subcategories.length > 3 && (
                    <span className="subcategory-tag more">+{category.subcategories.length - 3} more</span>
                  )}
                </div>
                
                <button className="shop-category-btn">
                  {hasProducts ? (
                    <>Shop Now <span className="arrow">→</span></>
                  ) : (
                    <>Coming Soon <span className="arrow">🔜</span></>
                  )}
                </button>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="category-benefits">
        <div className="benefit-item">
          <div className="benefit-icon">🚚</div>
          <h4>Fast Delivery</h4>
          <p>Nationwide shipping</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">💯</div>
          <h4>Quality Assured</h4>
          <p>Premium materials</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">🔒</div>
          <h4>Secure Payment</h4>
          <p>Safe transactions</p>
        </div>
        <div className="benefit-item">
          <div className="benefit-icon">↩️</div>
          <h4>Easy Returns</h4>
          <p>Hassle-free process</p>
        </div>
      </div>
    </div>
  );
}
