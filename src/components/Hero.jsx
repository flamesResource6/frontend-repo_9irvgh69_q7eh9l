import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/fvh1rcczCU4MCcKH/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/60 to-black/90 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-24 md:py-32 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs tracking-widest uppercase">
          Horror • Survival • Minimalist
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Into The Quiet Woods
        </h1>
        <p className="max-w-2xl text-white/80 text-sm md:text-base">
          A minimalist, dark survival micro‑game. Navigate the geometric forest, collect the sigils, and avoid what hunts in the fog.
        </p>
        <div className="flex items-center gap-4">
          <button onClick={onStart} className="rounded-md bg-red-600 hover:bg-red-500 active:bg-red-700 transition-colors px-6 py-3 font-semibold">
            Start Game
          </button>
          <a href="/test" className="rounded-md bg-white/10 hover:bg-white/15 px-6 py-3 font-semibold text-white/80 transition-colors">
            Check Backend
          </a>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-left w-full">
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-white/70"><span className="font-semibold text-white">Goal:</span> Collect 5 glowing sigils.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-white/70"><span className="font-semibold text-white">Move:</span> WASD or Arrow Keys.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-white/70"><span className="font-semibold text-white">Tip:</span> Stay in the light. The forest moves with you.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
