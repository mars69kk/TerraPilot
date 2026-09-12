# TerraPilot 255-Minute Build Checklist

## 0–30 min — Bootstrap
- [ ] Clone/pull branch
- [ ] `npm install`
- [ ] Add `OPENAI_API_KEY` and `EXA_API_KEY`
- [ ] Start Vite + runtime
- [ ] Confirm UI and agent runtime load

## 30–60 — Trip Context
- [ ] Tokyo / 4 days / 2 travellers
- [ ] Wheelchair traveller constraint
- [ ] Low-carbon transport preference
- [ ] Accessibility + sustainability scores

## 60–90 — Agent
- [ ] CopilotKit chat works
- [ ] Agent reads trip context
- [ ] Agent explains constraints

## 90–120 — Research & Evidence
- [ ] Exa search tool
- [ ] Hotel accessibility evidence
- [ ] Route/attraction evidence
- [ ] VERIFIED / INFERRED / UNKNOWN labels

## 120–150 — Money Feature
- [ ] Detect accessibility conflict
- [ ] Explain why it fails
- [ ] Find alternative
- [ ] Ask approval
- [ ] Approval changes itinerary

## 150–180 — Sustainability
- [ ] Detect unnecessary taxi legs
- [ ] Offer accessible rail alternative
- [ ] Show simple relative emissions improvement

## 180–205 — Accessibility Scout
- [ ] One controlled image scenario
- [ ] Detect potential step/barrier
- [ ] Show alternative entrance

## 205–240 — Polish
- [ ] Agent activity timeline
- [ ] Evidence cards
- [ ] Clear confidence labels
- [ ] Mobile/browser sanity check

## 240–255 — Freeze
- [ ] Build succeeds
- [ ] Demo works twice from clean refresh
- [ ] Deploy
- [ ] Record 2-minute video
- [ ] Verify public GitHub repo

### Cut first
Trigger.dev → Auth0 → ClickHouse → live/general vision → sophisticated carbon accounting.

### Never cut
**Conflict → explanation → alternative → approval → replan.**
