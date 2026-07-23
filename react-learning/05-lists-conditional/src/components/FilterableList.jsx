import { useState } from 'react'

const products = [
  { id: 1, name: 'React Book', category: 'Books', price: 499, rating: 4.5 },
  { id: 2, name: 'Spring Boot Course', category: 'Courses', price: 999, rating: 4.8 },
  { id: 3, name: 'Docker Guide', category: 'Books', price: 299, rating: 4.2 },
  { id: 4, name: 'Java Masterclass', category: 'Courses', price: 799, rating: 4.6 },
  { id: 5, name: 'MySQL Tutorial', category: 'Videos', price: 399, rating: 4.3 },
  { id: 6, name: 'AWS Workshop', category: 'Videos', price: 1299, rating: 4.7 },
  { id: 7, name: 'TypeScript Book', category: 'Books', price: 599, rating: 4.4 },
  { id: 8, name: 'DevOps Course', category: 'Courses', price: 1099, rating: 4.9 },
]

function FilterableList() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(2000)
  const [sortBy, setSortBy] = useState('name')

  const categories = ['All', ...new Set(products.map(p => p.category))]

  const filtered = products
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'price') return a.price - b.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })

  const stars = (rating) => '⭐'.repeat(Math.floor(rating))

  return (
    <div>
      <h2>🔍 Filterable Product List</h2>

      {/* Filters */}
      <div style={{
        backgroundColor: '#f9fafb', padding: '16px',
        borderRadius: '8px', marginBottom: '16px'
      }}>
        {/* Search */}
        <input
          type="text" placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '8px 12px',
            border: '1px solid #d1d5db', borderRadius: '6px',
            marginBottom: '12px', boxSizing: 'border-box'
          }}
        />

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {/* Category */}
          <div>
            <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Category:</label>
            {categories.map(c => (
              <button key={c} onClick={() => setCategory(c)}
                style={{
                  margin: '0 4px', padding: '4px 12px',
                  backgroundColor: category === c ? '#3B82F6' : '#e5e7eb',
                  color: category === c ? 'white' : 'black',
                  border: 'none', borderRadius: '6px', cursor: 'pointer'
                }}>
                {c}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div>
            <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Sort:</label>
            {['name', 'price', 'rating'].map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                style={{
                  margin: '0 4px', padding: '4px 12px',
                  backgroundColor: sortBy === s ? '#8B5CF6' : '#e5e7eb',
                  color: sortBy === s ? 'white' : 'black',
                  border: 'none', borderRadius: '6px', cursor: 'pointer'
                }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Price range */}
        <div style={{ marginTop: '12px' }}>
          <label style={{ fontWeight: 'bold' }}>
            Max Price: ₹{maxPrice}
          </label>
          <input
            type="range" min="200" max="2000" step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            style={{ width: '100%', marginTop: '4px' }}
          />
        </div>
      </div>

      {/* Results count */}
      <p style={{ color: '#6B7280', marginBottom: '12px' }}>
        Showing <strong>{filtered.length}</strong> of {products.length} products
      </p>

      {/* Products grid */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '40px', textAlign: 'center',
          color: '#6B7280', backgroundColor: '#f9fafb',
          borderRadius: '8px'
        }}>
          <p style={{ fontSize: '40px' }}>🔍</p>
          <p>No products match your filters</p>
          <button
            onClick={() => { setSearch(''); setCategory('All'); setMaxPrice(2000) }}
            style={{
              padding: '8px 16px', backgroundColor: '#3B82F6',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          {filtered.map(product => (
            <div key={product.id} style={{
              padding: '16px', backgroundColor: 'white',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <span style={{
                fontSize: '11px', padding: '2px 8px',
                backgroundColor: '#EFF6FF', color: '#3B82F6',
                borderRadius: '12px'
              }}>
                {product.category}
              </span>
              <h4 style={{ margin: '8px 0 4px', fontSize: '14px' }}>
                {product.name}
              </h4>
              <p style={{ color: '#3B82F6', fontWeight: 'bold', margin: '4px 0' }}>
                ₹{product.price}
              </p>
              <p style={{ margin: 0, fontSize: '12px' }}>
                {stars(product.rating)} {product.rating}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FilterableList