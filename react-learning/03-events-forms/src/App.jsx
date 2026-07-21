import EventHandling from './components/EventHandling'
import BasicForm from './components/BasicForm'
import StudentForm from './components/StudentForm'
import LoginForm from './components/LoginForm'

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#3B82F6', borderBottom: '2px solid #3B82F6', paddingBottom: '8px' }}>
        ⚛️ Day 3 — Event Handling + Forms
      </h1>

      <EventHandling />
      <hr style={{ margin: '32px 0' }} />

      <BasicForm />
      <hr style={{ margin: '32px 0' }} />

      <StudentForm />
      <hr style={{ margin: '32px 0' }} />

      <LoginForm />
    </div>
  )
}

export default App