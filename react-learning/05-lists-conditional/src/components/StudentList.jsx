import { useState } from 'react'

const initialStudents = [
  { id: 1, name: 'Sumiran', course: 'React', marks: 92, active: true },
  { id: 2, name: 'Riya', course: 'Spring Boot', marks: 85, active: true },
  { id: 3, name: 'Amit', course: 'Java', marks: 78, active: false },
  { id: 4, name: 'Priya', course: 'Docker', marks: 95, active: true },
  { id: 5, name: 'Rahul', course: 'MySQL', marks: 60, active: false },
]

function StudentList() {
  const [students, setStudents] = useState(initialStudents)
  const [sortBy, setSortBy] = useState('name')
  const [showActive, setShowActive] = useState('all')

  const toggleActive = (id) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, active: !s.active } : s
    ))
  }

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id))
  }

  const filtered = students
    .filter(s => {
      if (showActive === 'active') return s.active
      if (showActive === 'inactive') return !s.active
      return true
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'marks') return b.marks - a.marks
      return a.id - b.id
    })

  const getGrade = (marks) => {
    if (marks >= 90) return { g: 'A+', c: '#22C55E' }
    if (marks >= 80) return { g: 'A', c: '#3B82F6' }
    if (marks >= 70) return { g: 'B', c: '#F59E0B' }
    return { g: 'C', c: '#EF4444' }
  }

  return (
    <div>
      <h2>📋 Student List with Sorting + Filtering</h2>

      {/* Controls */}
      <div style={{
        display: 'flex', gap: '12px',
        marginBottom: '16px', flexWrap: 'wrap'
      }}>
        <div>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Sort:</label>
          {['id', 'name', 'marks'].map(s => (
            <button key={s} onClick={() => setSortBy(s)}
              style={{
                margin: '0 4px', padding: '6px 12px',
                backgroundColor: sortBy === s ? '#3B82F6' : '#e5e7eb',
                color: sortBy === s ? 'white' : 'black',
                border: 'none', borderRadius: '6px', cursor: 'pointer'
              }}>
              {s}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontWeight: 'bold', marginRight: '8px' }}>Filter:</label>
          {['all', 'active', 'inactive'].map(f => (
            <button key={f} onClick={() => setShowActive(f)}
              style={{
                margin: '0 4px', padding: '6px 12px',
                backgroundColor: showActive === f ? '#8B5CF6' : '#e5e7eb',
                color: showActive === f ? 'white' : 'black',
                border: 'none', borderRadius: '6px', cursor: 'pointer'
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', gap: '12px',
        marginBottom: '16px'
      }}>
        {[
          { label: 'Total', value: students.length, color: '#3B82F6' },
          { label: 'Active', value: students.filter(s => s.active).length, color: '#22C55E' },
          { label: 'Avg Marks', value: Math.round(students.reduce((s, st) => s + st.marks, 0) / students.length), color: '#F59E0B' },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '12px 20px', backgroundColor: `${stat.color}15`,
            border: `1px solid ${stat.color}`, borderRadius: '8px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '40px', textAlign: 'center',
          backgroundColor: '#f9fafb', borderRadius: '8px',
          color: '#6B7280'
        }}>
          <p style={{ fontSize: '48px', margin: 0 }}>📭</p>
          <p>No students found!</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#3B82F6', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Course</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Marks</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Grade</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Status</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student, index) => {
              const { g, c } = getGrade(student.marks)
              return (
                <tr key={student.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? 'white' : '#f9fafb',
                    opacity: student.active ? 1 : 0.6
                  }}>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb' }}>
                    {student.name}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', color: '#6B7280' }}>
                    {student.course}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', textAlign: 'center', fontWeight: 'bold' }}>
                    {student.marks}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', textAlign: 'center', color: c, fontWeight: 'bold' }}>
                    {g}
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: '12px', fontSize: '12px',
                      backgroundColor: student.active ? '#DCFCE7' : '#FEE2E2',
                      color: student.active ? '#22C55E' : '#EF4444'
                    }}>
                      {student.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td style={{ padding: '10px', borderBottom: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <button
                      onClick={() => toggleActive(student.id)}
                      style={{
                        padding: '4px 8px', marginRight: '4px',
                        backgroundColor: student.active ? '#F59E0B' : '#22C55E',
                        color: 'white', border: 'none',
                        borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
                      }}>
                      {student.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteStudent(student.id)}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#EF4444', color: 'white',
                        border: 'none', borderRadius: '4px',
                        cursor: 'pointer', fontSize: '12px'
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default StudentList