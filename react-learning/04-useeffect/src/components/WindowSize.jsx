import { useState, useEffect } from 'react'

function WindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  const [scrollY, setScrollY] = useState(0)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  // Window resize listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    // Cleanup — event listener remove karo
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Online/Offline listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const getDeviceType = () => {
    if (windowSize.width < 640) return '📱 Mobile'
    if (windowSize.width < 1024) return '💻 Tablet'
    return '🖥️ Desktop'
  }

  return (
    <div>
      <h2>📐 Window Size + Event Listeners</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>

        <div style={{
          padding: '16px', backgroundColor: '#EFF6FF',
          borderRadius: '8px', border: '1px solid #3B82F6'
        }}>
          <h4 style={{ margin: '0 0 8px', color: '#3B82F6' }}>📐 Window Size</h4>
          <p style={{ margin: '4px 0' }}>Width: <strong>{windowSize.width}px</strong></p>
          <p style={{ margin: '4px 0' }}>Height: <strong>{windowSize.height}px</strong></p>
          <p style={{ margin: '4px 0' }}>Device: <strong>{getDeviceType()}</strong></p>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '8px 0 0' }}>
            Try resizing window!
          </p>
        </div>

        <div style={{
          padding: '16px', backgroundColor: '#F0FDF4',
          borderRadius: '8px', border: '1px solid #22C55E'
        }}>
          <h4 style={{ margin: '0 0 8px', color: '#22C55E' }}>📜 Scroll Position</h4>
          <p style={{ margin: '4px 0' }}>ScrollY: <strong>{Math.round(scrollY)}px</strong></p>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '8px 0 0' }}>
            Try scrolling the page!
          </p>
        </div>

        <div style={{
          padding: '16px',
          backgroundColor: isOnline ? '#F0FDF4' : '#FEF2F2',
          borderRadius: '8px',
          border: `1px solid ${isOnline ? '#22C55E' : '#EF4444'}`,
          gridColumn: 'span 2'
        }}>
          <h4 style={{ margin: '0 0 8px', color: isOnline ? '#22C55E' : '#EF4444' }}>
            🌐 Network Status
          </h4>
          <p style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>
            {isOnline ? '✅ Online' : '❌ Offline'}
          </p>
          <p style={{ fontSize: '12px', color: '#6B7280', margin: '8px 0 0' }}>
            Try turning off WiFi to see this change!
          </p>
        </div>
      </div>
    </div>
  )
}

export default WindowSize