import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { CopilotKit, CopilotChat } from '@copilotkit/react-core'
import '@copilotkit/react-ui/styles.css'
import './styles.css'

function App() {
  const [replanned, setReplanned] = useState(false)
  const [events, setEvents] = useState([
    'Trip context loaded',
    'Checking hotel accessibility evidence…',
    'Detected accessibility conflict at Senso-ji route',
  ])

  const approveReplan = () => {
    setReplanned(true)
    setEvents((e) => [...e, 'REPLAN approved', 'Accessible route substituted', 'Taxi count reduced: 2 → 0'])
  }

  return (
    <main className="app">
      <header>
        <div>
          <div className="eyebrow">TERRAPILOT</div>
          <h1>The travel agent that travels with you.</h1>
          <p>Research. Verify. Replan — around the traveller, not the destination.</p>
        </div>
        <div className="status">● Agent ready</div>
      </header>

      <section className="grid">
        <aside className="panel">
          <h2>Trip Context</h2>
          <div className="context"><b>Tokyo</b><span>4 days · 2 travellers</span></div>
          <div className="context"><b>Mobility</b><span>One traveller uses a wheelchair</span></div>
          <div className="context"><b>Preference</b><span>Minimize unnecessary taxi travel</span></div>
          <div className="scores"><div><b>91%</b><span>accessibility confidence</span></div><div><b>A−</b><span>sustainability</span></div></div>
          <div className="evidence"><b>Evidence policy</b><span>VERIFIED · INFERRED · UNKNOWN</span></div>
        </aside>

        <section className="panel itinerary">
          <div className="panel-title"><h2>Itinerary</h2><span>{replanned ? 'Replanned' : 'Draft'}</span></div>
          <article><b>Day 1 · Asakusa</b><p>Senso-ji → accessible entrance → Sumida River</p><small>✓ step-free alternative verified</small></article>
          <article><b>Day 2 · Ueno</b><p>Ueno Park → Tokyo National Museum</p><small>✓ accessible toilet confirmed</small></article>
          <article className={replanned ? '' : 'conflict'}><b>Day 3 · Shibuya</b><p>{replanned ? 'Accessible rail route → Shibuya Crossing' : 'Original route contains stairs at transfer'}</p><small>{replanned ? '✓ 6 min longer · 0 taxis' : '⚠ accessibility conflict detected'}</small></article>
          <article><b>Day 4 · Odaiba</b><p>Accessible waterfront route → teamLab area</p><small>○ 1 entrance claim remains UNKNOWN</small></article>
        </section>

        <aside className="panel agent">
          <div className="panel-title"><h2>Agent Activity</h2><span>Live</span></div>
          {events.map((event, i) => <div className="event" key={i}><i>{i === events.length - 1 ? '→' : '✓'}</i>{event}</div>)}
          {!replanned && <button onClick={approveReplan}>Approve REPLAN</button>}
          {replanned && <div className="success">✓ Trip updated around accessibility constraints.</div>}
        </aside>
      </section>

      <section className="chat"><CopilotChat labels={{ title: 'Ask TerraPilot', initial: 'What should I verify or change about this trip?' }} /></section>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode><CopilotKit runtimeUrl="http://localhost:3001/api/copilotkit"><App /></CopilotKit></React.StrictMode>
)
