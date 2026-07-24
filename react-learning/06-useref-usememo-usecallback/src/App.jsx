import UseRefDemo from './components/UseRefDemo'
import UseMemoDemo from './components/UseMemoDemo'
import UseCallbackDemo from './components/UseCallbackDemo'
import PerformanceDemo from './components/PerformanceDemo'

function App() {
  return (
    <div style={{
      fontFamily: 'Arial', padding: '24px',
      maxWidth: '900px', margin: '0 auto'
    }}>
      <h2 style={{
        color: '#3B82F6',
        borderBottom: '2px solid #3B82F6',
        paddingBottom: '8px'
      }}>
        ⚛️ Day 6 — useRef + useMemo + useCallback
      </h2>

      <UseRefDemo />
      <hr style={{ margin: '32px 0' }} />

      <UseMemoDemo />
      <hr style={{ margin: '32px 0' }} />

      <UseCallbackDemo />
      <hr style={{ margin: '32px 0' }} />

      <PerformanceDemo />
    </div>
  )
}

export default App