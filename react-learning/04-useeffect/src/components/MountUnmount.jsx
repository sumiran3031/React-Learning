import { useState, useEffect } from 'react'

function Child() {
  useEffect(() => {
    console.log('✅ Child mounted!')
    document.title = 'Child is alive!'

    // Cleanup function — component unmount pe run hota hai
    return () => {
      console.log('❌ Child unmounted!')
      document.title = 'React App'
    }
  }, []) // [] = sirf ek baar (mount pe)

  return (
    <div style={{
      padding: '12px', backgroundColor: '#EFF6FF',
      border: '1px solid #3B82F6', borderRadius: '8px'
    }}>
      <p>👶 Child component mounted! (Check console)</p>
    </div>
  )
}

function MountUnmount() {
  const [showChild, setShowChild] = useState(false)
  const [count, setCount] = useState(0)

  // Run on every render
  useEffect(() => {
    console.log('🔄 MountUnmount re-rendered, count:', count)
  })

  // Run only when count changes
  useEffect(() => {
    console.log('📊 Count changed to:', count)
    document.title = `Count: ${count}`
  }, [count])

  // Run only once on mount
  useEffect(() => {
    console.log('🚀 MountUnmount component mounted!')
    return () => console.log('💀 MountUnmount unmounted!')
  }, [])

  return (
    <div>
      <h2>🔄 Mount / Unmount</h2>
      <p style={{ color: '#6B7280' }}>Open browser console to see useEffect logs!</p>

      <div style={{ marginBottom: '16px' }}>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 16px', marginRight: '8px',
            backgroundColor: '#3B82F6', color: 'white',
            border: 'none', borderRadius: '6px', cursor: 'pointer'
          }}>
          Count: {count}
        </button>

        <button
          onClick={() => setShowChild(!showChild)}
          style={{
            padding: '8px 16px',
            backgroundColor: showChild ? '#EF4444' : '#22C55E',
            color: 'white', border: 'none',
            borderRadius: '6px', cursor: 'pointer'
          }}>
          {showChild ? 'Unmount Child' : 'Mount Child'}
        </button>
      </div>

      {showChild && <Child />}
    </div>
  )
}

export default MountUnmount