import express from 'express'
import cors from 'cors'
import { CopilotRuntime, OpenAIAdapter, copilotRuntimeNodeHttpEndpoint } from '@copilotkit/runtime'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const runtime = new CopilotRuntime({
  agents: {
    terrapilot: {
      model: 'openai:gpt-5.4-mini',
      description: 'TerraPilot travel reality agent',
      systemPrompt: `You are TerraPilot, an agentic travel companion. You plan around traveller constraints, especially wheelchair accessibility and lower-carbon transport. Research before asserting facts. Every accessibility claim must be labelled VERIFIED, INFERRED, or UNKNOWN. Never invent measurements, step-free access, or transport accessibility. When a constraint makes an itinerary infeasible, explain the conflict, propose an alternative, state trade-offs, and request approval before changing the plan.`,
    },
  },
})

const endpoint = copilotRuntimeNodeHttpEndpoint({
  runtime,
  baseUrl: '/api/copilotkit',
  serviceAdapter: new OpenAIAdapter(),
})

app.use('/api/copilotkit', endpoint)
app.listen(3001, () => console.log('TerraPilot agent runtime listening on http://localhost:3001'))
