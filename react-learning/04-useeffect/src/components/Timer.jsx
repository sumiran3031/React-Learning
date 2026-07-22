import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState([])

  useEffect(() => {
    let interval = null

    if (isRunning) {
      // setInterval start karo
      interval = setInterval(() => {
        setSeconds(s => s + 1)
      }, 1000)
    }

    // Cleanup — interval clear karo
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning]) // isRunning change hone pe re-run

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handleReset = () => {
    setIsRunning(false)
    setSeconds(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps([...laps, seconds])
  }

  return (
    <div>
      <h2>⏱️ Timer (setInterval + useEffect)</h2>

      {/* Timer display */}
      <div style={{
        fontSize: '64px', fontWeight: 'bold',
        color: isRunning ? '#22C55E' : '#1f2937',
        fontFamily: 'monospace', marginBottom: '16px'
      }}>
        {formatTime(seconds)}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setIsRunning(!isRunning)}
          style={{
            padding: '10px 24px',
            backgroundColor: isRunning ? '#F59E0B' : '#22C55E',
            color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          {isRunning ? '⏸ Pause' : '▶️ Start'}
        </button>

        <button
          onClick={handleLap}
          disabled={!isRunning}
          style={{
            padding: '10px 24px',
            backgroundColor: isRunning ? '#3B82F6' : '#9CA3AF',
            color: 'white', border: 'none',
            borderRadius: '8px',
            cursor: isRunning ? 'pointer' : 'not-allowed'
          }}>
          🏁 Lap
        </button>

        <button
          onClick={handleReset}
          style={{
            padding: '10px 24px',
            backgroundColor: '#EF4444', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          🔄 Reset
        </button>
      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div>
          <h4>🏁 Laps:</h4>
          {laps.map((lap, i) => (
            <div key={i} style={{
              padding: '6px 12px', backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb', borderRadius: '6px',
              marginBottom: '4px', display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>Lap {i + 1}</span>
              <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>
                {formatTime(lap)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Timer