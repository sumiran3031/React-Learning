function StudentCard({ name, course, marks }) {
  const getGrade = (marks) => {
    if (marks >= 90) return { grade: 'A+', color: 'green' }
    if (marks >= 80) return { grade: 'A', color: 'blue' }
    if (marks >= 70) return { grade: 'B', color: 'orange' }
    return { grade: 'C', color: 'red' }
  }

  const { grade, color } = getGrade(marks)

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '16px',
      margin: '8px',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      width: '200px',
      display: 'inline-block'
    }}>
      <h3 style={{ margin: '0 0 8px', color: '#1f2937' }}>{name}</h3>
      <p style={{ margin: '4px 0', color: '#6b7280' }}>📚 {course}</p>
      <p style={{ margin: '4px 0', color: '#6b7280' }}>📊 Marks: {marks}</p>
      <p style={{
        margin: '8px 0 0',
        fontWeight: 'bold',
        color: color,
        fontSize: '18px'
      }}>
        Grade: {grade}
      </p>
    </div>
  )
}

export default StudentCard