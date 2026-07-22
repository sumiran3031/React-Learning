import { useState, useEffect } from 'react'

function ApiCall() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userId, setUserId] = useState(1)
  const [selectedPost, setSelectedPost] = useState(null)

  // Fetch posts jab bhi userId change ho
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      setPosts([])

      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=5`
        )
        if (!res.ok) throw new Error('Failed to fetch!')
        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [userId]) // userId change pe refetch

  // Fetch single post
  useEffect(() => {
    if (!selectedPost) return

    const fetchPost = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${selectedPost}`
      )
      const data = await res.json()
      console.log('Selected post:', data)
    }

    fetchPost()
  }, [selectedPost])

  return (
    <div>
      <h2>🌐 API Call with useEffect</h2>
      <p style={{ color: '#6B7280' }}>
        Fetching from JSONPlaceholder API (real API call!)
      </p>

      {/* User selector */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontWeight: 'bold', marginRight: '8px' }}>
          Select User:
        </label>
        {[1, 2, 3, 4, 5].map(id => (
          <button
            key={id}
            onClick={() => setUserId(id)}
            style={{
              margin: '0 4px', padding: '6px 14px',
              backgroundColor: userId === id ? '#3B82F6' : '#e5e7eb',
              color: userId === id ? 'white' : 'black',
              border: 'none', borderRadius: '6px', cursor: 'pointer'
            }}>
            User {id}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{
          padding: '24px', textAlign: 'center',
          color: '#3B82F6', fontSize: '18px'
        }}>
          ⏳ Loading posts...
        </div>
      )}

      {/* Error */}
      {error && (
        <div style={{
          padding: '12px', backgroundColor: '#FEF2F2',
          border: '1px solid #EF4444', borderRadius: '6px',
          color: '#EF4444'
        }}>
          ❌ Error: {error}
        </div>
      )}

      {/* Posts */}
      {!loading && !error && posts.map(post => (
        <div
          key={post.id}
          onClick={() => setSelectedPost(post.id)}
          style={{
            padding: '12px 16px', marginBottom: '8px',
            backgroundColor: selectedPost === post.id ? '#EFF6FF' : 'white',
            border: `1px solid ${selectedPost === post.id ? '#3B82F6' : '#e5e7eb'}`,
            borderRadius: '8px', cursor: 'pointer',
            transition: 'all 0.2s'
          }}>
          <h4 style={{ margin: '0 0 4px', color: '#1f2937', textTransform: 'capitalize' }}>
            {post.title}
          </h4>
          <p style={{ margin: 0, color: '#6B7280', fontSize: '14px' }}>
            {post.body.substring(0, 80)}...
          </p>
          <span style={{ fontSize: '12px', color: '#9CA3AF' }}>
            Post #{post.id}
          </span>
        </div>
      ))}
    </div>
  )
}

export default ApiCall