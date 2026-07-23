import ConditionalRendering from './components/ConditionalRendering'
import StudentList from './components/StudentList'
import FilterableList from './components/FilterableList'
import TodoList from './components/TodoList'

function App() {
  return (
    <div style={{
      fontFamily: 'Arial', padding: '24px',
      maxWidth: '900px', margin: '0 auto'
    }}>
      <h1 style={{
        color: '#3B82F6',
        borderBottom: '2px solid #3B82F6',
        paddingBottom: '8px'
      }}>
        Day 5 — Conditional Rendering + Lists
      </h1>

      <ConditionalRendering />
      <hr style={{ margin: '32px 0' }} />

      <StudentList />
      <hr style={{ margin: '32px 0' }} />

      <FilterableList />
      <hr style={{ margin: '32px 0' }} />

      <TodoList />
    </div>
  )
}

export default App