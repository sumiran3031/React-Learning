import MountUnmount from './components/MountUnmount'
import Timer from './components/Timer'
import ApiCall from './components/ApiCall'
import WindowSize from './components/WindowSize'

function App() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#3B82F6', borderBottom: '2px solid #3B82F6', paddingBottom: '8px' }}>
        ⚛️ Day 4 — useEffect Hook
      </h1>

      <MountUnmount />
      <hr style={{ margin: '32px 0' }} />

      <Timer />
      <hr style={{ margin: '32px 0' }} />

      <ApiCall />
      <hr style={{ margin: '32px 0' }} />

      <WindowSize />
    </div>
  )
}

export default App