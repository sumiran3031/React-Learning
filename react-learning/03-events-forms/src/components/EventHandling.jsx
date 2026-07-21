import { useState } from 'react'

function EventHandling() {
  const [message, setMessage] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)

  const handleClick = () => setMessage('Button clicked! 🎉')

  const handleDoubleClick = () => setMessage('Double clicked! 🔥')

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleKeyDown = (e) => {
    setMessage(`Key pressed: ${e.key}`)
  }

  return (
    <div>
      <h2>🖱️ Event Handling</h2>

      {/* Click events */}
      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '10px 20px', marginRight: '8px',
            backgroundColor: '#3B82F6', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          Click Me
        </button>

        <button
          onDoubleClick={handleDoubleClick}
          style={{
            padding: '10px 20px', marginRight: '8px',
            backgroundColor: '#8B5CF6', color: 'white',
            border: 'none', borderRadius: '8px', cursor: 'pointer'
          }}>
          Double Click Me
        </button>

        <button
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          style={{
            padding: '10px 20px',
            backgroundColor: hovering ? '#22C55E' : '#6B7280',
            color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}>
          {hovering ? 'Hovering! 🟢' : 'Hover Me'}
        </button>
      </div>

      {/* Message display */}
      {message && (
        <p style={{
          padding: '8px 16px', backgroundColor: '#EFF6FF',
          border: '1px solid #3B82F6', borderRadius: '6px',
          color: '#3B82F6', marginBottom: '16px'
        }}>
          {message}
        </p>
      )}

      {/* Keyboard event */}
      <div style={{ marginBottom: '16px' }}>
        <input
          onKeyDown={handleKeyDown}
          placeholder="Press any key here..."
          style={{
            padding: '8px 12px', border: '1px solid #d1d5db',
            borderRadius: '6px', width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Mouse move */}
      <div
        onMouseMove={handleMouseMove}
        style={{
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          border: '1px dashed #d1d5db',
          textAlign: 'center'
        }}>
        <p>Move mouse here 🖱️</p>
        <p>X: {mousePos.x} | Y: {mousePos.y}</p>
      </div>
    </div>
  )
}

export default EventHandling