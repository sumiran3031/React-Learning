import { useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Basics', done: true, priority: 'high' },
    { id: 2, text: 'Practice useState Hook', done: true, priority: 'high' },
    { id: 3, text: 'Learn useEffect', done: false, priority: 'medium' },
    { id: 4, text: 'Build Todo App', done: false, priority: 'low' },
  ])
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, {
      id: Date.now(),
      text: input.trim(),
      done: false,
      priority
    }])
    setInput('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.done))
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done
    if (filter === 'completed') return t.done
    return true
  })

  const priorityColor = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#22C55E'
  }

  const remaining = todos.filter(t => !t.done).length

  return (
    <div>
      <h2>✅ Todo List</h2>

      {/* Add todo */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new task..."
          style={{
            flex: 1, padding: '10px 12px',
            border: '1px solid #d1d5db', borderRadius: '8px'
          }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: '10px', border: '1px solid #d1d5db',
            borderRadius: '8px', color: priorityColor[priority]
          }}>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <button
          onClick={addTodo}
          style={{
            padding: '10px 20px', backgroundColor: '#3B82F6',
            color: 'white', border: 'none',
            borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
          }}>
          Add
        </button>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '12px'
      }}>
        <span style={{ color: '#6B7280' }}>
          {remaining} task{remaining !== 1 ? 's' : ''} remaining
        </span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'active', 'completed'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '4px 12px',
                backgroundColor: filter === f ? '#3B82F6' : 'transparent',
                color: filter === f ? 'white' : '#6B7280',
                border: '1px solid #d1d5db', borderRadius: '6px',
                cursor: 'pointer'
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Todo items */}
      {filtered.length === 0 ? (
        <div style={{
          padding: '32px', textAlign: 'center',
          color: '#6B7280', backgroundColor: '#f9fafb',
          borderRadius: '8px'
        }}>
          {filter === 'completed'
            ? '🎉 No completed tasks yet!'
            : filter === 'active'
              ? '✅ All tasks done!'
              : '📝 Add your first task!'}
        </div>
      ) : (
        <div>
          {filtered.map(todo => (
            <div key={todo.id} style={{
              display: 'flex', alignItems: 'center',
              padding: '12px 16px', marginBottom: '8px',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb', borderRadius: '8px',
              opacity: todo.done ? 0.6 : 1
            }}>
              {/* Priority indicator */}
              <div style={{
                width: '4px', height: '40px',
                backgroundColor: priorityColor[todo.priority],
                borderRadius: '2px', marginRight: '12px'
              }} />

              {/* Checkbox */}
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => toggleTodo(todo.id)}
                style={{ marginRight: '12px', width: '18px', height: '18px', cursor: 'pointer' }}
              />

              {/* Text */}
              <span style={{
                flex: 1,
                textDecoration: todo.done ? 'line-through' : 'none',
                color: todo.done ? '#9CA3AF' : '#1f2937'
              }}>
                {todo.text}
              </span>

              {/* Priority badge */}
              <span style={{
                fontSize: '11px', padding: '2px 8px',
                backgroundColor: `${priorityColor[todo.priority]}20`,
                color: priorityColor[todo.priority],
                borderRadius: '12px', marginRight: '8px'
              }}>
                {todo.priority}
              </span>

              {/* Delete */}
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '4px 8px', backgroundColor: '#FEF2F2',
                  color: '#EF4444', border: '1px solid #FCA5A5',
                  borderRadius: '6px', cursor: 'pointer'
                }}>
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Clear completed */}
      {todos.some(t => t.done) && (
        <button
          onClick={clearCompleted}
          style={{
            marginTop: '12px', padding: '8px 16px',
            backgroundColor: 'transparent', color: '#6B7280',
            border: '1px solid #d1d5db', borderRadius: '6px',
            cursor: 'pointer'
          }}>
          🗑️ Clear Completed
        </button>
      )}
    </div>
  )
}

export default TodoList