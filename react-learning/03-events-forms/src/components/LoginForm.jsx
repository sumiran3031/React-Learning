import { useState } from 'react'

function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const VALID_USER = { username: 'sumiran', password: 'password123' }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.username === VALID_USER.username &&
        form.password === VALID_USER.password) {
      setLoggedIn(true)
    } else {
      setError('Invalid username or password!')
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    setForm({ username: '', password: '' })
  }

  if (loggedIn) {
    return (
      <div>
        <h2>🔐 Login Form</h2>
        <div style={{
          padding: '24px', backgroundColor: '#F0FDF4',
          border: '1px solid #22C55E', borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#22C55E' }}>✅ Welcome, {form.username}!</h3>
          <p>You are successfully logged in.</p>
          <button
            onClick={handleLogout}
            style={{
              padding: '8px 20px', backgroundColor: '#EF4444',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>
            Logout
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>🔐 Login Form</h2>

      <div style={{ maxWidth: '400px' }}>
        {error && (
          <div style={{
            padding: '8px 16px', backgroundColor: '#FEF2F2',
            border: '1px solid #EF4444', borderRadius: '6px',
            color: '#EF4444', marginBottom: '12px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Username:
            </label>
            <input
              name="username" value={form.username}
              onChange={handleChange} placeholder="Enter username"
              required
              style={{
                padding: '8px 12px', border: '1px solid #d1d5db',
                borderRadius: '6px', width: '100%', boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
              Password:
            </label>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                style={{
                  padding: '8px 40px 8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px', width: '100%', boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '8px', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer'
                }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: '100%', padding: '10px',
              backgroundColor: '#3B82F6', color: 'white',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold'
            }}>
            Login
          </button>
        </form>

        <p style={{ color: '#6B7280', fontSize: '12px', marginTop: '8px' }}>
          Demo: username = <b>sumiran</b>, password = <b>password123</b>
        </p>
      </div>
    </div>
  )
}

export default LoginForm