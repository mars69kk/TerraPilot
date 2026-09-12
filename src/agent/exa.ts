import Exa from 'exa-js'

export type ResearchResult = { title: string; url: string; highlights?: string[] }

export async function searchWeb(query: string): Promise<ResearchResult[]> {
  const exa = new Exa(process.env.EXA_API_KEY)
  const result = await exa.searchAndContents(query, {
    type: 'fast',
    highlights: true,
    numResults: 5,
  })
  return result.results.map((r: any) => ({ title: r.title, url: r.url, highlights: r.highlights }))
}
