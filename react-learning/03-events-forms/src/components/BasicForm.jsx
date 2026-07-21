import { useState } from 'react'

function BasicForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [course, setCourse] = useState('react')
  const [agree, setAgree] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault() // page reload rokta hai
    setSubmitted({ name, email, age, gender, course, agree })
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setAge('')
    setGender('')
    setCourse('react')
    setAgree(false)
    setSubmitted(null)
  }

  return (
    <div>
      <h2>📝 Basic Form</h2>

      <form onSubmit={handleSubmit}>

        {/* Text input */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              padding: '8px 12px', border: '1px solid #d1d5db',
              borderRadius: '6px', width: '100%', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Email input */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              padding: '8px 12px', border: '1px solid #d1d5db',
              borderRadius: '6px', width: '100%', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Number input */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Age:
          </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1" max="100"
            style={{
              padding: '8px 12px', border: '1px solid #d1d5db',
              borderRadius: '6px', width: '100%', boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Radio buttons */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Gender:
          </label>
          {['Male', 'Female', 'Other'].map(g => (
            <label key={g} style={{ marginRight: '16px' }}>
              <input
                type="radio"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                style={{ marginRight: '4px' }}
              />
              {g}
            </label>
          ))}
        </div>

        {/* Select dropdown */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Course:
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #d1d5db',
              borderRadius: '6px', width: '100%'
            }}>
            <option value="react">React</option>
            <option value="spring-boot">Spring Boot</option>
            <option value="java">Java</option>
            <option value="docker">Docker</option>
          </select>
        </div>

        {/* Checkbox */}
        <div style={{ marginBottom: '16px' }}>
          <label>
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            I agree to terms and conditions
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="submit"
            disabled={!agree}
            style={{
              padding: '10px 24px',
              backgroundColor: agree ? '#3B82F6' : '#9CA3AF',
              color: 'white', border: 'none',
              borderRadius: '8px', cursor: agree ? 'pointer' : 'not-allowed'
            }}>
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '10px 24px',
              backgroundColor: '#6B7280', color: 'white',
              border: 'none', borderRadius: '8px', cursor: 'pointer'
            }}>
            Reset
          </button>
        </div>
      </form>

      {/* Submitted data */}
      {submitted && (
        <div style={{
          marginTop: '16px', padding: '16px',
          backgroundColor: '#F0FDF4', border: '1px solid #22C55E',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#22C55E', margin: '0 0 8px' }}>✅ Form Submitted!</h3>
          <pre style={{ margin: 0, fontSize: '14px' }}>
            {JSON.stringify(submitted, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default BasicForm