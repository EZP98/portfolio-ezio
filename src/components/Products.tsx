import React from 'react';
import './Products.css';

const Products: React.FC = () => {
  return (
    <section className="products-section" id="products">
      <div className="products-header">
        <h2 className="products-title">Product Drops</h2>
        <div className="products-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="products-grid">
        <div className="product-card">
          <div className="product-badge">Accessories</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Wine Preservation Kit" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Wine Preservation Kit</h3>
            <p className="product-price">€129.00</p>
          </div>
        </div>

        <div className="product-card">
          <div className="product-badge">Technology</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Smart Wine Stopper" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Smart Wine Stopper</h3>
            <p className="product-price">€89.00</p>
          </div>
        </div>

        <div className="product-card">
          <div className="product-badge">Limited Edition</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Albicchiere Pro" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Albicchiere Pro</h3>
            <p className="product-price">€199.00</p>
          </div>
        </div>

        <div className="product-card">
          <div className="product-badge">Accessories</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Wine Glass Set" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Wine Glass Set</h3>
            <p className="product-price">€59.00</p>
          </div>
        </div>

        <div className="product-card">
          <div className="product-badge">Technology</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Digital Sommelier" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Digital Sommelier</h3>
            <p className="product-price">€249.00</p>
          </div>
        </div>

        <div className="product-card">
          <div className="product-badge">Premium</div>
          <div className="product-image">
            <img src="/api/placeholder/280/200" alt="Wine Cellar Monitor" />
            <div className="product-hover-indicator">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Wine Cellar Monitor</h3>
            <p className="product-price">€179.00</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;