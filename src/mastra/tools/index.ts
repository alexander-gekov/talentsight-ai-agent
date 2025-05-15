import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import type { ToolExecutionContext } from "@mastra/core";

import Typesense from "typesense";

interface CandidateDocument {
  [key: string]: any;
}

interface TypesenseSearchResult {
  hits: Array<{
    document: CandidateDocument;
  }>;
  found: number;
}

export const typesense = new Typesense.Client({
  apiKey: process.env.TYPESENSE_API_KEY as string,
  nodes: [
    {
      host: process.env.TYPESENSE_HOST as string,
      port: 443,
      protocol: "https",
    },
  ],
  connectionTimeoutSeconds: 60,
  cacheSearchResultsForSeconds: 5,
});

const inputSchema = z.object({
  query: z
    .string()
    .describe(
      "Search query to find candidates based on skills, location, or job titles"
    ),
});

export const searchCandidatesTool = createTool({
  id: "search-candidates",
  description:
    "Search for candidates in the talent database based on skills, location, or job titles. Returns detailed profiles including experience and skills.",
  inputSchema,
  execute: async ({ context }: { context: { query: string } }) => {
    const results = await searchTalentsLinkedin(context.query);

    return {
      total: results.found,
      candidates: results.hits.map((hit) => hit.document),
    };
  },
});

export const searchTalentsLinkedin = async (
  query: string
): Promise<TypesenseSearchResult> => {
  const searchResults = (await typesense
    .collections("talents-sep2024")
    .documents()
    .search({
      q: query,
      query_by:
        "experiences.title, headline, current_job_title, current_job_description,experiences.description, occupation, summary, skills, city, country_full_name, full_name",
      query_by_weights: "20,18,30,13,10,4,12,15,1,1,4",
      facet_by:
        "current_company, industry, education.school, education.field_of_study, country_full_name, city, has_email, has_github, languages_array, experiences.company, open_to_work",
      exclude_fields: "embedding",
      sort_by: "_text_match(buckets: 10):desc",
      prioritize_exact_match: true,
      prioritize_token_position: true,
      split_join_tokens: "off",
      snippet_threshold: 1000,
      text_match_type: "max_weight",
      drop_tokens_threshold: 1,
      typo_tokens_threshold: 1,
      prefix: false,
      per_page: 10,
    })) as unknown as TypesenseSearchResult;
  return searchResults;
};
