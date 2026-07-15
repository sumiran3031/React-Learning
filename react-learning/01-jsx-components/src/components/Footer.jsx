function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      textAlign: 'center',
      padding: '16px',
      marginTop: '32px'
    }}>
      <p>© {year} Sumiran Paparkar | React Learning Journey</p>
      <p style={{ opacity: 0.6, fontSize: '14px' }}>
        Consistency
      </p>
    </footer>
  )
}

export default Footer