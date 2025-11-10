import { useState } from 'react'


function App() {
  const [count, setCount] = useState(1)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count *2)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
