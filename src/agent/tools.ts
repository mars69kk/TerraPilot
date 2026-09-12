import { defineTool } from '@copilotkit/runtime/v2'
import { z } from 'zod'
import { searchWeb } from './exa.js'

export const researchTravel = defineTool({
  name: 'research_travel',
  description: 'Research a Tokyo travel, accessibility, venue, hotel, or transport question using Exa web search. Return evidence and URLs; do not treat search results as proof unless the source explicitly supports the claim.',
  parameters: z.object({
    query: z.string().min(3),
  }),
  execute: async ({ query }) => {
    if (!process.env.EXA_API_KEY) {
      return { status: 'UNKNOWN', reason: 'EXA_API_KEY is not configured', results: [] }
    }

    try {
      const results = await searchWeb(query)
      return {
        status: 'RESEARCHED',
        results: results.map((r) => ({
          title: r.title,
          url: r.url,
          evidence: r.highlights ?? [],
        })),
      }
    } catch (error) {
      return {
        status: 'UNKNOWN',
        reason: error instanceof Error ? error.message : 'Research failed',
        results: [],
      }
    }
  },
})

export const verifyAccessibility = defineTool({
  name: 'verify_accessibility',
  description: 'Assess an accessibility claim from supplied evidence. Never upgrade missing evidence to VERIFIED.',
  parameters: z.object({
    claim: z.string(),
    evidence: z.string(),
  }),
  execute: async ({ claim, evidence }) => {
    const text = evidence.trim()
    const status = text.length < 20
      ? 'UNKNOWN'
      : /explicitly states|confirmed|step-free|wheelchair accessible|accessible entrance|roll-in/i.test(text)
        ? 'VERIFIED'
        : 'INFERRED'

    return {
      claim,
      status,
      evidence: text || 'No evidence supplied.',
      confidence: status === 'VERIFIED' ? 0.9 : status === 'INFERRED' ? 0.55 : 0.1,
    }
  },
})
