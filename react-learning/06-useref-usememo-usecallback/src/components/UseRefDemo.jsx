import { useState, useRef, useEffect } from 'react'

function UseRefDemo() {
  const [value, setValue] = useState('')
  const inputRef = useRef(null)
  const countRef = useRef(0)
  const timerRef = useRef(null)
  const [renderCount, setRenderCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState(null)
  const [isRunning, setIsRunning] = useState(false)

  // renderCount track karo without re-render
  useEffect(() => {
    countRef.current += 1
  })

  // Focus input
  const focusInput = () => {
    inputRef.current.focus()
    inputRef.current.style.border = '2px solid #3B82F6'
  }

  const clearInput = () => {
    inputRef.current.value = ''
    inputRef.current.focus()
    setValue('')
  }

  // Countdown timer using ref
  const startCountdown = (seconds) => {
    if (timerRef.current) clearInterval(timerRef.current)
    setTimeLeft(seconds)
    setIsRunning(true)

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stopCountdown = () => {
    clearInterval(timerRef.current)
    setIsRunning(false)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  return (
    <div>
      <h2>📌 useRef</h2>

      {/* 1. DOM Access */}
      <div style={{ marginBottom: '24px' }}>
        <h3>1. DOM Access (Focus Input)</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="I can be focused programmatically!"
            style={{
              flex: 1, padding: '8px 12px',
              border: '1px solid #d1d5db', borderRadius: '6px'
            }}
          />
          <button onClick={focusInput}
            style={{
              padding: '8px 16px', backgroundColor: '#3B82F6',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>
            Focus
          </button>
          <button onClick={clearInput}
            style={{
              padding: '8px 16px', backgroundColor: '#EF4444',
              color: 'white', border: 'none',
              borderRadius: '6px', cursor: 'pointer'
            }}>
            Clear
          </button>
        </div>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          Value: {value || '(empty)'}
        </p>
      </div>

      {/* 2. Render count (no re-render) */}
      <div style={{ marginBottom: '24px' }}>
        <h3>2. Render Count (useRef vs useState)</h3>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '12px'
        }}>
          <div style={{
            padding: '16px', backgroundColor: '#EFF6FF',
            borderRadius: '8px', border: '1px solid #3B82F6'
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>
              useRef (no re-render):
            </p>
            <p style={{ margin: 0, fontSize: '24px', color: '#3B82F6' }}>
              {countRef.current} renders
            </p>
          </div>
          <div style={{
            padding: '16px', backgroundColor: '#F0FDF4',
            borderRadius: '8px', border: '1px solid #22C55E'
          }}>
            <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>
              useState (causes re-render):
            </p>
            <p style={{ margin: '0 0 8px', fontSize: '24px', color: '#22C55E' }}>
              {renderCount} clicks
            </p>
            <button
              onClick={() => setRenderCount(c => c + 1)}
              style={{
                padding: '4px 12px', backgroundColor: '#22C55E',
                color: 'white', border: 'none',
                borderRadius: '6px', cursor: 'pointer'
              }}>
              Click (triggers re-render)
            </button>
          </div>
        </div>
      </div>

      {/* 3. Timer with ref */}
      <div>
        <h3>3. Countdown Timer (clearInterval via ref)</h3>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
          {[5, 10, 30].map(s => (
            <button key={s} onClick={() => startCountdown(s)}
              disabled={isRunning}
              style={{
                padding: '8px 16px',
                backgroundColor: isRunning ? '#9CA3AF' : '#8B5CF6',
                color: 'white', border: 'none',
                borderRadius: '6px',
                cursor: isRunning ? 'not-allowed' : 'pointer'
              }}>
              {s}s
            </button>
          ))}
          <button onClick={stopCountdown}
            disabled={!isRunning}
            style={{
              padding: '8px 16px',
              backgroundColor: isRunning ? '#EF4444' : '#9CA3AF',
              color: 'white', border: 'none',
              borderRadius: '6px',
              cursor: isRunning ? 'pointer' : 'not-allowed'
            }}>
            Stop
          </button>
        </div>

        {timeLeft !== null && (
          <div style={{
            padding: '24px', textAlign: 'center',
            backgroundColor: timeLeft === 0 ? '#F0FDF4' : '#FEF9EC',
            border: `2px solid ${timeLeft === 0 ? '#22C55E' : '#F59E0B'}`,
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '64px', fontWeight: 'bold',
              color: timeLeft === 0 ? '#22C55E' : '#F59E0B',
              fontFamily: 'monospace'
            }}>
              {timeLeft}
            </div>
            <p style={{ margin: 0, color: '#6B7280' }}>
              {timeLeft === 0 ? '🎉 Time\'s up!' : 'seconds remaining'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UseRefDemo