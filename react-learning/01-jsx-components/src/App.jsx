import Header from './components/Header'
import StudentCard from './components/StudentCard'
import Footer from './components/Footer'

const students = [
  { id: 1, name: 'Sumiran', course: 'React', marks: 92 },
  { id: 2, name: 'Sumi', course: 'Spring Boot', marks: 85 },
  { id: 3, name: 'Rahee', course: 'Java', marks: 78 },
  { id: 4, name: 'Chetan', course: 'Docker', marks: 95 },
]

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', minHeight: '100vh', backgroundColor: '#f9fafb' }}>

      
      <Header />

      <main style={{ padding: '0 24px' }}>

        
        <section style={{ marginBottom: '32px' }}>
          <h2>📝 JSX Basics</h2>
          <p>Name: <strong>Sumiran Paparkar</strong></p>
          <p>Course: <strong>React </strong></p>
          <p>Year: <strong>{new Date().getFullYear()}</strong></p>
          <p>Math: <strong>10 * 10 = {10 * 10}</strong></p>
        </section>

        
        <section style={{ marginBottom: '32px' }}>
          <h2>🧩 Student Cards (Reusable Components)</h2>
          <div>
            {/* Manual component usage */}
            <StudentCard name="Sumiran" course="React" marks={92} />

            
            {students.map(student => (
              <StudentCard
                key={student.id}
                name={student.name}
                course={student.course}
                marks={student.marks}
              />
            ))}
          </div>
        </section>

        
        <section style={{ marginBottom: '32px' }}>
          <h2>🔀 Conditional Rendering</h2>
          {students.length > 0
            ? <p>✅ {students.length} students found!</p>
            : <p>❌ No students</p>
          }
          {students.filter(s => s.marks >= 90).length > 0 && (
            <p>🏆 Top students (90+): {students.filter(s => s.marks >= 90).map(s => s.name).join(', ')}</p>
          )}
        </section>

        
        <section style={{ marginBottom: '32px' }}>
          <h2>📋 Lists</h2>
          <ul>
            {students.map(student => (
              <li key={student.id}>
                {student.name} — {student.course} — {student.marks} marks
              </li>
            ))}
          </ul>
        </section>

      </main>

      
      <Footer />

    </div>
  )
}

export default App