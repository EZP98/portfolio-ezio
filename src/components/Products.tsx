import React from 'react';
import ScrollReveal from './ScrollReveal';
import './Products.css';

const Products: React.FC = () => {
  const products = [
    { id: 1, badge: 'Accessories', title: 'Wine Preservation Kit', price: '€129.00' },
    { id: 2, badge: 'Technology', title: 'Smart Wine Stopper', price: '€89.00' },
    { id: 3, badge: 'Limited Edition', title: 'Albicchiere Pro', price: '€199.00' },
    { id: 4, badge: 'Accessories', title: 'Wine Glass Set', price: '€59.00' },
    { id: 5, badge: 'Technology', title: 'Digital Sommelier', price: '€249.00' },
    { id: 6, badge: 'Premium', title: 'Wine Cellar Monitor', price: '€179.00' },
  ];

  return (
    <section className="products-section" id="products">
      <ScrollReveal>
        <div className="products-header">
          <h2 className="products-title">Product Drops</h2>
          <div className="products-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </ScrollReveal>

      <div className="products-grid">
        {products.map((product, index) => (
          <ScrollReveal key={product.id} delay={index * 100}>
            <div className="product-card">
              <div className="product-badge">{product.badge}</div>
              <div className="product-image">
                <img src="/api/placeholder/280/200" alt={product.title} />
                <div className="product-hover-indicator">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
};

export default Products;
