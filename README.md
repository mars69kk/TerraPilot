# TerraPilot

**The travel agent that travels with you.**

TerraPilot is an agentic travel companion that researches, verifies and continuously replans trips around accessibility and sustainability constraints — rather than merely recommending places.

## Hackathon MVP

Demo scenario: 4 days in Tokyo for two travellers, one wheelchair user, with a preference to minimize unnecessary taxi travel.

The winning loop is:

**Trip context → research → verify → detect conflict → explain → propose alternative → approval → replan**

Accessibility claims are explicitly classified as **VERIFIED**, **INFERRED**, or **UNKNOWN**.

## Stack

- React + TypeScript + Vite
- CopilotKit / AG-UI agent UX
- CopilotKit Runtime + OpenAI
- Exa for web research/evidence
- Zod for validation
- Playwright + Vitest
- GitHub Actions
- Google Cloud Run after local demo is stable

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173`.

The agent runtime listens on `http://localhost:3001`.

## Build priorities

1. Agent can understand traveller context.
2. Agent can surface accessibility evidence and uncertainty.
3. Agent can detect an infeasible route.
4. Agent proposes a feasible alternative.
5. User approves and itinerary actually changes.
6. Sustainability improvement is visible.

Do not spend hackathon time building a generic booking engine or database.
