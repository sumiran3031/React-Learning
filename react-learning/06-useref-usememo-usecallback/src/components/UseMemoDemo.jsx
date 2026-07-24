import { useState, useMemo } from 'react'

// Expensive calculation simulate karte hain
function expensiveCalc(num) {
  console.log('🔄 Calculating...')
  let result = 0
  for (let i = 0; i < 1000000; i++) {
    result += i
  }
  return result + num
}

function isPrime(n) {
  if (n < 2) return false
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false
  }
  return true
}

function UseMemoDemo() {
  const [number, setNumber] = useState(5)
  const [darkMode, setDarkMode] = useState(false)
  const [students, setStudents] = useState([
    { id: 1, name: 'Sumiran', marks: 92 },
    { id: 2, name: 'Riya', marks: 85 },
    { id: 3, name: 'Amit', marks: 78 },
    { id: 4, name: 'Priya', marks: 95 },
    { id: 5, name: 'Rahul', marks: 60 },
  ])
  const [newMarks, setNewMarks] = useState('')

  // ✅ useMemo — sirf tab recalculate karo jab number change ho
  const expensiveResult = useMemo(() => {
    return expensiveCalc(number)
  }, [number])

  // ✅ useMemo — primes list cache karo
  const primes = useMemo(() => {
    console.log('📊 Computing primes...')
    return Array.from({ length: 50 }, (_, i) => i + 2).filter(isPrime)
  }, []) // empty array = sirf ek baar calculate

  // ✅ useMemo — student stats cache karo
  const stats = useMemo(() => {
    console.log('📈 Computing stats...')
    const total = students.reduce((s, st) => s + st.marks, 0)
    const avg = total / students.length
    const max = Math.max(...students.map(s => s.marks))
    const min = Math.min(...students.map(s => s.marks))
    const passing = students.filter(s => s.marks >= 60).length
    return { avg: avg.toFixed(1), max, min, passing }
  }, [students]) // sirf jab students change ho

  const updateMarks = (id) => {
    if (!newMarks) return
    setStudents(students.map(s =>
      s.id === id ? { ...s, marks: Number(newMarks) } : s
    ))
    setNewMarks('')
  }

  return (
    <div style={{
      backgroundColor: darkMode ? '#1f2937' : 'white',
      color: darkMode ? 'white' : 'black',
      padding: '16px', borderRadius: '8px',
      border: '1px solid #e5e7eb', transition: 'all 0.3s'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ margin: 0 }}>⚡ useMemo</h2>
        <button onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: '6px 14px',
            backgroundColor: darkMode ? '#F59E0B' : '#1f2937',
            color: 'white', border: 'none',
            borderRadius: '6px', cursor: 'pointer'
          }}>
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>

      <p style={{ color: darkMode ? '#9CA3AF' : '#6B7280' }}>
        Open console to see when calculations run!
      </p>

      {/* 1. Expensive calculation */}
      <div style={{ marginBottom: '24px' }}>
        <h3>1. Expensive Calculation (cached)</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <button onClick={() => setNumber(n => n - 1)}
            style={{
              padding: '8px 16px', backgroundColor: '#EF4444',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>−</button>
          <span style={{ padding: '8px 16px', fontSize: '20px', fontWeight: 'bold' }}>
            {number}
          </span>
          <button onClick={() => setNumber(n => n + 1)}
            style={{
              padding: '8px 16px', backgroundColor: '#22C55E',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>+</button>
        </div>
        <p>Result: <strong style={{ color: '#3B82F6' }}>{expensiveResult.toLocaleString()}</strong></p>
        <p style={{ fontSize: '12px', color: darkMode ? '#9CA3AF' : '#6B7280' }}>
          Toggle dark mode → calculation does NOT re-run (cached by useMemo!)
        </p>
      </div>

      {/* 2. Primes */}
      <div style={{ marginBottom: '24px' }}>
        <h3>2. Prime Numbers (computed once)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {primes.map(p => (
            <span key={p} style={{
              padding: '4px 10px',
              backgroundColor: darkMode ? '#374151' : '#EFF6FF',
              color: '#3B82F6', borderRadius: '6px',
              fontSize: '14px', fontWeight: 'bold'
            }}>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Student stats */}
      <div>
        <h3>3. Student Stats (recalculates only when students change)</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px', marginBottom: '16px'
        }}>
          {[
            { label: 'Average', value: stats.avg, color: '#3B82F6' },
            { label: 'Highest', value: stats.max, color: '#22C55E' },
            { label: 'Lowest', value: stats.min, color: '#EF4444' },
            { label: 'Passing', value: stats.passing, color: '#8B5CF6' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '12px', textAlign: 'center',
              backgroundColor: darkMode ? '#374151' : `${stat.color}15`,
              border: `1px solid ${stat.color}`, borderRadius: '8px'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '12px', color: darkMode ? '#9CA3AF' : '#6B7280' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            type="number" min="0" max="100"
            value={newMarks}
            onChange={(e) => setNewMarks(e.target.value)}
            placeholder="New marks..."
            style={{
              padding: '6px 12px', border: '1px solid #d1d5db',
              borderRadius: '6px', width: '120px',
              backgroundColor: darkMode ? '#374151' : 'white',
              color: darkMode ? 'white' : 'black'
            }}
          />
        </div>

        {students.map(s => (
          <div key={s.id} style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', padding: '8px 12px',
            marginBottom: '4px',
            backgroundColor: darkMode ? '#374151' : '#f9fafb',
            borderRadius: '6px'
          }}>
            <span>{s.name}</span>
            <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>{s.marks}</span>
            <button onClick={() => updateMarks(s.id)}
              style={{
                padding: '4px 10px', backgroundColor: '#8B5CF6',
                color: 'white', border: 'none',
                borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
              }}>
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UseMemoDemo