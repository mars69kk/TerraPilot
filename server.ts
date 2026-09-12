import express from 'express'
import cors from 'cors'
import {
  BuiltInAgent,
  CopilotRuntime,
  InMemoryAgentRunner,
} from '@copilotkit/runtime/v2'
import { createCopilotExpressHandler } from '@copilotkit/runtime/v2/express'

const app = express()

const systemPrompt = `You are TerraPilot, an agentic travel companion. You plan around traveller constraints, especially wheelchair accessibility and lower-carbon transport.

Rules:
- Research before asserting facts when live evidence is needed.
- Every accessibility claim must be labelled VERIFIED, INFERRED, or UNKNOWN.
- Never invent measurements, step-free access, accessible toilets, transport accessibility, or venue policies.
- When a constraint makes an itinerary infeasible, explain the conflict, propose an accessible alternative, state trade-offs, and request approval before changing the plan.
- Prefer lower-carbon transport when it remains accessible and practical.
- Be concise and decision-oriented during the demo.`

const agent = new BuiltInAgent({
  model: 'openai:gpt-5.4-mini',
  prompt: systemPrompt,
  maxSteps: 5,
})

const runtime = new CopilotRuntime({
  agents: { terrapilot: agent },
  runner: new InMemoryAgentRunner(),
})

const handler = createCopilotExpressHandler({
  runtime,
  basePath: '/api/copilotkit',
  cors: { origin: 'http://localhost:5173' },
})

app.use(express.json())
app.use('/api/copilotkit', handler)

app.get('/health', (_req, res) => res.json({ ok: true, agent: 'terrapilot' }))

app.listen(3001, () => console.log('TerraPilot agent runtime listening on http://localhost:3001'))
