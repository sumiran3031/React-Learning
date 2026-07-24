import { useState, useCallback, memo } from 'react'

// memo = component sirf tab re-render hoga jab props change ho
const Button = memo(({ onClick, label, color }) => {
  console.log(`🔵 Button "${label}" rendered`)
  return (
    <button onClick={onClick}
      style={{
        padding: '8px 16px', margin: '4px',
        backgroundColor: color || '#3B82F6',
        color: 'white', border: 'none',
        borderRadius: '6px', cursor: 'pointer'
      }}>
      {label}
    </button>
  )
})

const ExpensiveChild = memo(({ onAdd, onRemove, onReset }) => {
  console.log('👶 ExpensiveChild rendered')
  return (
    <div style={{
      padding: '16px', backgroundColor: '#EFF6FF',
      borderRadius: '8px', border: '1px solid #3B82F6'
    }}>
      <p style={{ margin: '0 0 8px', fontWeight: 'bold' }}>
        Expensive Child Component
      </p>
      <Button onClick={onAdd} label="Add Item" color="#22C55E" />
      <Button onClick={onRemove} label="Remove Last" color="#EF4444" />
      <Button onClick={onReset} label="Reset" color="#6B7280" />
    </div>
  )
})

function UseCallbackDemo() {
  const [items, setItems] = useState(['Item 1', 'Item 2'])
  const [count, setCount] = useState(0)

  console.log('🔄 Parent rendered')

  // ✅ useCallback — function sirf tab naya banao jab dependency change ho
  const handleAdd = useCallback(() => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`])
  }, []) // no dependencies — function kabhi nahi badlega

  const handleRemove = useCallback(() => {
    setItems(prev => prev.slice(0, -1))
  }, [])

  const handleReset = useCallback(() => {
    setItems(['Item 1', 'Item 2'])
  }, [])

  return (
    <div>
      <h2>🔁 useCallback</h2>
      <p style={{ color: '#6B7280' }}>
        Open console — Child re-renders only when its props change!
      </p>

      {/* Counter — child ko affect nahi karta */}
      <div style={{ marginBottom: '16px' }}>
        <h3>Counter (does NOT cause child re-render)</h3>
        <button
          onClick={() => setCount(c => c + 1)}
          style={{
            padding: '8px 20px', backgroundColor: '#F59E0B',
            color: 'white', border: 'none',
            borderRadius: '6px', cursor: 'pointer',
            marginBottom: '8px'
          }}>
          Count: {count} (Click me!)
        </button>
        <p style={{ color: '#6B7280', fontSize: '14px' }}>
          ☝️ Parent re-renders but child stays same (useCallback + memo)
        </p>
      </div>

      {/* Child component */}
      <ExpensiveChild
        onAdd={handleAdd}
        onRemove={handleRemove}
        onReset={handleReset}
      />

      {/* Items list */}
      <div style={{ marginTop: '16px' }}>
        <h3>Items ({items.length})</h3>
        {items.length === 0 ? (
          <p style={{ color: '#6B7280' }}>No items!</p>
        ) : (
          <ul style={{ margin: 0, padding: '0 0 0 20px' }}>
            {items.map((item, i) => (
              <li key={i} style={{ padding: '4px 0', color: '#1f2937' }}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default UseCallbackDemo