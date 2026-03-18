# FuzeJumperz AI Jumpstart

A secure, company-managed AI tool for employees to generate structured prompts and create document cheat-sheets.

## Features

- **Jumpstart**: Generate structured AI prompts for common tasks
  - Reply to client emails
  - Write internal memos
  - Summarise documents
  - Draft report sections
  - Follow up after meetings
  - Custom tasks

- **Debrief**: Create quick cheat-sheets from finished documents
  - Key points extraction
  - Questions/risks to watch
  - History of past cheat-sheets

- **Multi-language support**: English, Simplified Chinese, Traditional Chinese

- **Fair usage tracking**: Weekly confirmed AI-assisted task counter

## Architecture

```
Browser (React + Vite)
       ↓ HTTP
Backend (Node.js + Express)
       ↓
Google Sheets (data storage)
       ↓
Ollama (Qwen2.5 - local LLM)
```

## Prerequisites

- Node.js 18+
- Ollama installed locally
- Google account (for Sheets)

## Setup

### 1. Install Ollama

```bash
# macOS
brew install ollama

# Pull the model
ollama pull qwen2.5

# Start Ollama (runs on port 11434)
ollama serve
```

### 2. Start Backend

```bash
cd server
npm install
npm start
```

### 3. Start Frontend

```bash
cd client
npm install
npm run dev
```

### 4. Set Up Google Sheet

1. Go to Google Sheets and create a new blank spreadsheet
2. Rename it (e.g., "FuzeJumperz Data")
3. Create three tabs:
   - `Settings`
   - `Usage Log`
   - `Debriefs`
4. In the **Settings** tab, add these headers in row 1:
   - A1: `companyCode`
   - B1: `companyName`
   - C1: `maxUsers`
5. In row 2, add your company details:
   - A2: `FUZE2026` (your company code)
   - B2: `Your Company Name`
   - C2: `50`
6. Share the sheet with **"Anyone with the link can edit"**
7. Copy the sheet URL

### 5. Access the App

1. Open the frontend URL (typically http://localhost:5173)
2. Enter your company code
3. Paste your Google Sheet URL
4. Start using the app!

## Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=3001
OLLAMA_URL=http://localhost:11434
DEFAULT_MODEL=qwen2.5
```

## Project Structure

```
/FuzeJumpStarter
├── /client              # React frontend
│   ├── /src
│   │   ├── /components
│   │   │   ├── /common    # Header, Footer, Tabs, Toast
│   │   │   ├── /setup     # Setup wizard
│   │   │   ├── /jumpstart # Jumpstart tab components
│   │   │   └── /debrief   # Debrief tab components
│   │   ├── /context       # React context providers
│   │   ├── /i18n          # Translations
│   │   └── /services      # API client
│   └── vite.config.js
├── /server              # Express backend
│   ├── /routes           # API routes
│   ├── /services         # Ollama, Sheets integrations
│   ├── /prompts          # Prompt templates
│   └── server.js
└── /docs                # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/validate` | Validate company code |
| POST | `/api/setup/connect` | Connect Google Sheet |
| POST | `/api/jumpstart/generate` | Generate prompt |
| POST | `/api/usage/log` | Log confirmed usage |
| GET | `/api/usage/weekly-count` | Get weekly count |
| POST | `/api/debrief/generate` | Generate cheat-sheet |
| POST | `/api/debrief/save` | Save debrief |
| GET | `/api/debrief/history` | Get debrief history |

## Security Notes

- All data processing happens on your local/server infrastructure
- No external AI API calls (all via local Ollama)
- Google Sheet access requires "Anyone with link can edit"
- Usage tracking is anonymized and aggregated

## Troubleshooting

### Ollama not responding
- Ensure Ollama is running: `ollama serve`
- Check the model is installed: `ollama list`

### Cannot connect to Google Sheet
- Verify sharing settings: "Anyone with the link can edit"
- Check the sheet URL is correct and complete

### Invalid company code
- Ensure the company code matches exactly (case-insensitive)
- Check the Settings tab has proper headers

## License

Proprietary - FuzeJumperz Limited
