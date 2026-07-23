import { useState } from 'react'

function ConditionalRendering() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [role, setRole] = useState('user')
  const [score, setScore] = useState(75)
  const [loading, setLoading] = useState(false)

  const simulateLoad = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'A+', color: '#22C55E', msg: '🏆 Excellent!' }
    if (score >= 80) return { grade: 'A', color: '#3B82F6', msg: '🎉 Great job!' }
    if (score >= 70) return { grade: 'B', color: '#F59E0B', msg: '👍 Good work!' }
    if (score >= 60) return { grade: 'C', color: '#F97316', msg: '📚 Keep trying!' }
    return { grade: 'F', color: '#EF4444', msg: '❌ Need improvement' }
  }

  const { grade, color, msg } = getGradeInfo(score)

  return (
    <div>
      <h2>🔀 Conditional Rendering</h2>

      {/* 1. if/else style */}
      <div style={{ marginBottom: '24px' }}>
        <h3>1. Login/Logout Toggle</h3>
        {isLoggedIn ? (
          <div style={{
            padding: '12px', backgroundColor: '#F0FDF4',
            border: '1px solid #22C55E', borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <p style={{ margin: 0 }}>✅ Welcome back, Sumiran!</p>
          </div>
        ) : (
          <div style={{
            padding: '12px', backgroundColor: '#FEF2F2',
            border: '1px solid #EF4444', borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <p style={{ margin: 0 }}>❌ Please login to continue</p>
          </div>
        )}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          style={{
            padding: '8px 20px',
            backgroundColor: isLoggedIn ? '#EF4444' : '#22C55E',
            color: 'white', border: 'none',
            borderRadius: '6px', cursor: 'pointer'
          }}>
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
      </div>

      {/* 2. Role-based rendering */}
      <div style={{ marginBottom: '24px' }}>
        <h3>2. Role-Based UI</h3>
        <div style={{ marginBottom: '8px' }}>
          {['user', 'admin', 'superadmin'].map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              style={{
                margin: '0 4px', padding: '6px 14px',
                backgroundColor: role === r ? '#3B82F6' : '#e5e7eb',
                color: role === r ? 'white' : 'black',
                border: 'none', borderRadius: '6px', cursor: 'pointer'
              }}>
              {r}
            </button>
          ))}
        </div>

        <div style={{
          padding: '12px', backgroundColor: '#f9fafb',
          borderRadius: '8px', border: '1px solid #e5e7eb'
        }}>
          <p>📋 View Posts</p>
          {role === 'admin' || role === 'superadmin' ? (
            <p>✏️ Edit Posts</p>
          ) : null}
          {role === 'superadmin' && (
            <p>🗑️ Delete Posts (SuperAdmin only)</p>
          )}
          {role === 'superadmin' && (
            <p>⚙️ System Settings (SuperAdmin only)</p>
          )}
        </div>
      </div>

      {/* 3. Score based */}
      <div style={{ marginBottom: '24px' }}>
        <h3>3. Score Grading</h3>
        <input
          type="range" min="0" max="100"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <div style={{
          padding: '16px', backgroundColor: `${color}20`,
          border: `2px solid ${color}`, borderRadius: '8px',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '48px', fontWeight: 'bold', color }}>{grade}</span>
          <p style={{ color, fontWeight: 'bold', margin: '4px 0' }}>
            Score: {score}/100
          </p>
          <p style={{ margin: 0 }}>{msg}</p>
        </div>
      </div>

      {/* 4. Loading state */}
      <div>
        <h3>4. Loading State</h3>
        <button
          onClick={simulateLoad}
          disabled={loading}
          style={{
            padding: '8px 20px', marginBottom: '12px',
            backgroundColor: loading ? '#9CA3AF' : '#3B82F6',
            color: 'white', border: 'none',
            borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer'
          }}>
          {loading ? '⏳ Loading...' : '🔄 Simulate Load'}
        </button>

        {loading ? (
          <div style={{
            padding: '24px', textAlign: 'center',
            backgroundColor: '#f9fafb', borderRadius: '8px'
          }}>
            <div style={{
              width: '40px', height: '40px',
              border: '4px solid #e5e7eb',
              borderTop: '4px solid #3B82F6',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 8px'
            }} />
            <p style={{ color: '#6B7280' }}>Loading data...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{
            padding: '16px', backgroundColor: '#F0FDF4',
            borderRadius: '8px', border: '1px solid #22C55E'
          }}>
            ✅ Data loaded successfully!
          </div>
        )}
      </div>
    </div>
  )
}

export default ConditionalRendering