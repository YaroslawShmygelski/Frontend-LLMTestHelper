import { useState } from 'react'


export const App = () => {
  const [count, setCount] = useState(1)

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card text-4xl p-64 text-green-600" >
        <button onClick={() => setCount((count) => count *2)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

