import { useState, useMemo, useCallback, memo } from 'react'

const StudentCard = memo(({ student, onDelete }) => {
  console.log(`🃏 Card rendered: ${student.name}`)
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', padding: '10px 16px',
      marginBottom: '6px', backgroundColor: 'white',
      border: '1px solid #e5e7eb', borderRadius: '8px'
    }}>
      <div>
        <span style={{ fontWeight: 'bold' }}>{student.name}</span>
        <span style={{ color: '#6B7280', marginLeft: '8px' }}>{student.course}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{
          fontWeight: 'bold', color: student.marks >= 80 ? '#22C55E' : '#F59E0B'
        }}>
          {student.marks}
        </span>
        <button onClick={() => onDelete(student.id)}
          style={{
            padding: '4px 8px', backgroundColor: '#FEF2F2',
            color: '#EF4444', border: '1px solid #FCA5A5',
            borderRadius: '4px', cursor: 'pointer'
          }}>
          ✕
        </button>
      </div>
    </div>
  )
})

function PerformanceDemo() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Sumiran', course: 'React', marks: 92 },
    { id: 2, name: 'Riya', course: 'Java', marks: 85 },
    { id: 3, name: 'Amit', course: 'Docker', marks: 78 },
    { id: 4, name: 'Priya', course: 'MySQL', marks: 95 },
  ])
  const [search, setSearch] = useState('')
  const [theme, setTheme] = useState('light')

  // useMemo — filter sirf tab karo jab students ya search change ho
  const filtered = useMemo(() => {
    console.log('🔍 Filtering students...')
    return students.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.course.toLowerCase().includes(search.toLowerCase())
    )
  }, [students, search])

  // useMemo — stats sirf tab compute karo jab students change ho
  const stats = useMemo(() => ({
    total: students.length,
    avg: students.length
      ? (students.reduce((s, st) => s + st.marks, 0) / students.length).toFixed(1)
      : 0,
    topStudent: students.reduce(
      (top, s) => s.marks > (top?.marks || 0) ? s : top, null
    )
  }), [students])

  // useCallback — delete function stable rakho
  const handleDelete = useCallback((id) => {
    setStudents(prev => prev.filter(s => s.id !== id))
  }, [])

  return (
    <div>
      <h2>🚀 Performance Optimization Demo</h2>
      <p style={{ color: '#6B7280' }}>
        useRef + useMemo + useCallback + memo combined!
      </p>

      {/* Theme toggle — should NOT re-render cards */}
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        {['light', 'blue', 'green'].map(t => (
          <button key={t} onClick={() => setTheme(t)}
            style={{
              padding: '6px 14px',
              backgroundColor: theme === t ? '#3B82F6' : '#e5e7eb',
              color: theme === t ? 'white' : 'black',
              border: 'none', borderRadius: '6px', cursor: 'pointer'
            }}>
            {t}
          </button>
        ))}
        <span style={{ fontSize: '12px', color: '#6B7280', alignSelf: 'center' }}>
          (Toggle theme → cards should NOT re-render!)
        </span>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        gap: '8px', marginBottom: '16px'
      }}>
        {[
          { label: 'Total', value: stats.total, color: '#3B82F6' },
          { label: 'Average', value: stats.avg, color: '#22C55E' },
          { label: 'Top Student', value: stats.topStudent?.name || '-', color: '#F59E0B' },
        ].map(s => (
          <div key={s.label} style={{
            padding: '12px', textAlign: 'center',
            backgroundColor: `${s.color}15`,
            border: `1px solid ${s.color}`, borderRadius: '8px'
          }}>
            <div style={{ fontWeight: 'bold', color: s.color, fontSize: '20px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        type="text" placeholder="🔍 Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%', padding: '8px 12px',
          border: '1px solid #d1d5db', borderRadius: '6px',
          marginBottom: '12px', boxSizing: 'border-box'
        }}
      />

      {/* Student cards */}
      {filtered.length === 0 ? (
        <p style={{ color: '#6B7280', textAlign: 'center' }}>No students found</p>
      ) : (
        filtered.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  )
}

export default PerformanceDemo