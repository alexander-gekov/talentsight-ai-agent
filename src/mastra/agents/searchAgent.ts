import { Agent } from "@mastra/core/agent";
import { openai } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { searchCandidatesTool } from "../tools";

export const searchAgent = new Agent({
  name: "Talent Search Agent",
  instructions: `
    You are a helpful talent search assistant that helps find and evaluate candidate profiles.
    
    Your primary functions are:
    - Search for candidates based on skills, experience, location, or job titles
    - Analyze and summarize candidate profiles
    - Provide relevant insights about candidates' experience and skills
    - Make recommendations based on search criteria
    
    When responding:
    - Always ask for specific search criteria if none provided
    - Highlight key skills and experience that match the search criteria
    - Include location and current role information
    - Keep responses concise but informative
    - Show the candidate's Name, linkedin profile url, and a brief summary of their background
    - Tell the user the total amount of candidates found
    
    Use the searchCandidatesTool to find candidate profiles.
  `,
  model: openai("gpt-4o-mini"),
  tools: { searchCandidatesTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: "file:../mastra.db",
    }),
    options: {
      lastMessages: 10,
      semanticRecall: true,
      threads: {
        generateTitle: true,
      },
    },
  }),
});
