import React, { useEffect, useRef, useState } from 'react'

// Simple grid-based micro game: collect 5 sigils while a shadow hunts you
const GRID = 11
const CELLS = GRID * GRID
const toXY = (i) => ({ x: i % GRID, y: Math.floor(i / GRID) })
const toIndex = (x, y) => y * GRID + x

export default function Game({ onExit }) {
  const [player, setPlayer] = useState(toIndex(Math.floor(GRID/2), Math.floor(GRID/2)))
  const [shadow, setShadow] = useState(toIndex(1, 1))
  const [sigils, setSigils] = useState(() => generateSigils())
  const [collected, setCollected] = useState(0)
  const [status, setStatus] = useState('Collect 5 sigils')

  const keys = useRef({})

  function generateSigils() {
    const set = new Set()
    while (set.size < 5) {
      const i = Math.floor(Math.random() * CELLS)
      if (i !== player && i !== shadow) set.add(i)
    }
    return Array.from(set)
  }

  useEffect(() => {
    const onKey = (e) => {
      keys.current[e.key.toLowerCase()] = e.type === 'keydown'
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKey)
    const loop = setInterval(tick, 160)
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('keyup', onKey); clearInterval(loop) }
  }, [player, shadow, sigils, collected])

  function movePlayer(dx, dy) {
    const { x, y } = toXY(player)
    const nx = Math.max(0, Math.min(GRID - 1, x + dx))
    const ny = Math.max(0, Math.min(GRID - 1, y + dy))
    const ni = toIndex(nx, ny)
    setPlayer(ni)
  }

  function stepShadow() {
    const p = toXY(player)
    const s = toXY(shadow)
    const dx = Math.sign(p.x - s.x)
    const dy = Math.sign(p.y - s.y)
    const chooseAxis = Math.random() < 0.6 // bias towards closing distance
    const nx = Math.max(0, Math.min(GRID - 1, s.x + (chooseAxis ? dx : 0)))
    const ny = Math.max(0, Math.min(GRID - 1, s.y + (!chooseAxis ? dy : 0)))
    setShadow(toIndex(nx, ny))
  }

  function tick() {
    if (status !== 'playing' && status !== 'Collect 5 sigils') return
    setStatus('playing')

    if (keys.current['w'] || keys.current['arrowup']) movePlayer(0, -1)
    if (keys.current['s'] || keys.current['arrowdown']) movePlayer(0, 1)
    if (keys.current['a'] || keys.current['arrowleft']) movePlayer(-1, 0)
    if (keys.current['d'] || keys.current['arrowright']) movePlayer(1, 0)

    // collect
    if (sigils.includes(player)) {
      setSigils(sigils.filter((i) => i !== player))
      const next = collected + 1
      setCollected(next)
      if (next >= 5) {
        setStatus('You escaped the woods.')
      }
    }

    // chase
    stepShadow()

    // check lose
    if (player === shadow) {
      setStatus('The shadow found you.')
    }
  }

  function reset() {
    setPlayer(toIndex(Math.floor(GRID/2), Math.floor(GRID/2)))
    setShadow(toIndex(1, 1))
    setSigils(generateSigils())
    setCollected(0)
    setStatus('Collect 5 sigils')
  }

  return (
    <section className="relative min-h-screen w-full bg-black text-white flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-red-950/40" />
      <div className="relative z-10 w-full max-w-3xl">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onExit} className="text-sm text-white/70 hover:text-white">← Back</button>
          <div className="text-sm text-white/70">Sigils: {collected}/5</div>
          <button onClick={reset} className="text-sm text-white/70 hover:text-white">Reset</button>
        </div>
        <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID}, minmax(0, 1fr))` }}>
          {Array.from({ length: CELLS }).map((_, i) => {
            const isPlayer = i === player
            const isShadow = i === shadow
            const isSigil = sigils.includes(i)
            return (
              <div key={i}
                   className={`aspect-square border border-white/5 relative overflow-hidden ${isShadow ? 'bg-red-900/30' : 'bg-white/[0.02]'} `}>
                {/* vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-white/0 via-white/0 to-black/70" />
                {isSigil && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_12px_2px_rgba(239,68,68,0.6)]" />
                </div>}
                {isPlayer && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_16px_2px_rgba(255,255,255,0.6)]" />
                </div>}
                {isShadow && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-black border border-red-700 shadow-[0_0_16px_2px_rgba(127,29,29,0.5)]" />
                </div>}
              </div>
            )
          })}
        </div>
        <p className="mt-4 text-center text-white/80">{status}</p>
        <div className="mt-2 text-center text-xs text-white/50">Move with WASD or arrows</div>
      </div>
    </section>
  )
}
