import { useState } from 'react'

const initialState = {
  name: '',
  email: '',
  course: '',
  marks: '',
  phone: ''
}

function StudentForm() {
  const [form, setForm] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [students, setStudents] = useState([])

  // Single handler for all fields!
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    // Clear error on change
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.course.trim()) newErrors.course = 'Course is required'
    if (!form.marks) newErrors.marks = 'Marks is required'
    else if (form.marks < 0 || form.marks > 100) newErrors.marks = 'Marks must be 0-100'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setStudents([...students, { ...form, id: Date.now() }])
    setForm(initialState)
    setErrors({})
  }

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id))
  }

  const inputStyle = (field) => ({
    padding: '8px 12px',
    border: `1px solid ${errors[field] ? '#EF4444' : '#d1d5db'}`,
    borderRadius: '6px', width: '100%', boxSizing: 'border-box'
  })

  return (
    <div>
      <h2>🎓 Student Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

          {/* Name */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Name *</label>
            <input
              name="name" value={form.name}
              onChange={handleChange} placeholder="Full Name"
              style={inputStyle('name')}
            />
            {errors.name && <p style={{ color: '#EF4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Email *</label>
            <input
              name="email" type="email" value={form.email}
              onChange={handleChange} placeholder="email@example.com"
              style={inputStyle('email')}
            />
            {errors.email && <p style={{ color: '#EF4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.email}</p>}
          </div>

          {/* Course */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Course *</label>
            <input
              name="course" value={form.course}
              onChange={handleChange} placeholder="e.g. React, Java"
              style={inputStyle('course')}
            />
            {errors.course && <p style={{ color: '#EF4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.course}</p>}
          </div>

          {/* Marks */}
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Marks *</label>
            <input
              name="marks" type="number" value={form.marks}
              onChange={handleChange} placeholder="0-100"
              min="0" max="100"
              style={inputStyle('marks')}
            />
            {errors.marks && <p style={{ color: '#EF4444', fontSize: '12px', margin: '4px 0 0' }}>{errors.marks}</p>}
          </div>

          {/* Phone */}
          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>Phone</label>
            <input
              name="phone" value={form.phone}
              onChange={handleChange} placeholder="Phone number"
              style={inputStyle('phone')}
            />
          </div>
        </div>

        <button
          type="submit"
          style={{
            marginTop: '16px', padding: '10px 24px',
            backgroundColor: '#3B82F6', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          Add Student
        </button>
      </form>

      {/* Students list */}
      {students.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h3>📋 Registered Students ({students.length})</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#3B82F6', color: 'white' }}>
                <th style={{ padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '8px', textAlign: 'left' }}>Course</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Marks</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s, i) => (
                <tr key={s.id} style={{ backgroundColor: i % 2 === 0 ? 'white' : '#f9fafb' }}>
                  <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb' }}>{s.name}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb' }}>{s.email}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb' }}>{s.course}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>{s.marks}</td>
                  <td style={{ padding: '8px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <button
                      onClick={() => handleDelete(s.id)}
                      style={{
                        padding: '4px 10px', backgroundColor: '#EF4444',
                        color: 'white', border: 'none',
                        borderRadius: '4px', cursor: 'pointer'
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default StudentForm