# 🎯 TalentSight AI

An intelligent talent search and recruitment assistant powered by AI. TalentSight helps you find the perfect candidates by leveraging advanced search capabilities and natural language processing.

## ✨ Features

- 🔍 **Smart Search**: Search candidates using natural language queries
- 🎯 **Precise Matching**: Advanced text matching and ranking algorithms
- 📊 **Rich Faceting**: Filter by company, industry, education, location, and more
- 🤖 **AI-Powered Analysis**: Get intelligent insights about candidate profiles
- 🌍 **Global Reach**: Search across multiple locations and languages
- 📈 **Experience Tracking**: Detailed work history and skill analysis

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Typesense server
- OpenAI API key

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/talentsight-ai-agent.git

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
```

Configure your environment variables:

```env
TYPESENSE_API_KEY=your_typesense_api_key
TYPESENSE_HOST=your_typesense_host
OPENAI_API_KEY=your_openai_api_key
```

### Usage

```typescript
import { searchAgent } from "./mastra/agents/searchAgent";

// Example: Search for candidates
const response = await searchAgent.generate(
  "Find senior software engineers with React experience in London"
);

console.log(response.text);
```

## 🔧 Configuration

### Search Parameters

The search engine is configured with optimized weights for different fields:

- Current Job Title (30)
- Experience Titles (20)
- Headline (18)
- Skills (15)
- Current Job Description (13)
- Summary (12)
- Experience Descriptions (10)
- Other fields (1-4)

### Faceting

Available facets for filtering:

- Current Company
- Industry
- Education (School & Field)
- Location (Country & City)
- Languages
- Experience
- Availability Status

## 🧠 AI Agent Capabilities

The TalentSight AI agent can:

- Process natural language search queries
- Analyze candidate profiles
- Provide relevant insights
- Make recommendations
- Summarize candidate backgrounds
- Track conversation context

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Support

For support, please open an issue in the GitHub repository or contact the maintainers.
