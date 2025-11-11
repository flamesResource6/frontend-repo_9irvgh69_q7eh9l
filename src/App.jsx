import React, { useState } from 'react'
import Hero from './components/Hero'
import Game from './components/Game'

function App() {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-black text-white">
      {playing ? (
        <Game onExit={() => setPlaying(false)} />
      ) : (
        <Hero onStart={() => setPlaying(true)} />
      )}
    </div>
  )
}

export default App
