# Google Cloud API Setup Guide

## Overview

To enable Google Sheets integration, you need to:
1. Create a Google Cloud project
2. Enable the Google Sheets API
3. Create an API Key
4. Add restrictions (recommended)

---

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top
3. Click **"New Project"**
4. Name it: `FuzeJumperz`
5. Click **Create**

---

## Step 2: Enable Google Sheets API

1. In the left sidebar, go to **APIs & Services** → **Library**
2. Search for **"Google Sheets API"**
3. Click on it
4. Click **Enable**

---

## Step 3: Create API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **"+ Create Credentials"**
3. Select **"API key"**
4. Copy the generated API key

---

## Step 4: Add Restrictions (Recommended)

1. Click on your API key in the credentials list
2. Under **API restrictions**, select **"Restrict key"**
3. Check **"Google Sheets API"**
4. Under **Website restrictions**, add your app URL (e.g., `localhost:5173` for development)
5. Click **Save**

---

## Step 5: Configure the App

1. Create a `.env` file in the `server` folder:

```bash
cd server
cp .env.example .env
```

2. Edit `.env` and add your API key:

```env
PORT=3001
OLLAMA_URL=http://localhost:11434
DEFAULT_MODEL=qwen2.5
GOOGLE_SHEETS_API_KEY=AIzaSy...your-key-here
```

3. Restart the backend:

```bash
# Stop current server (Ctrl+C)
npm start
```

---

## Step 6: Test

1. Open the app at http://localhost:5173
2. Enter a company code
3. Paste a Google Sheet URL with "Anyone with link can edit" access
4. Click **Connect**

---

## Troubleshooting

### "API not enabled"
- Go to Google Cloud Console → APIs & Services → Library
- Search and enable "Google Sheets API"

### "API key not valid"
- Check the API key is correct
- Ensure API key restrictions allow your domain

### "Access denied"
- Make sure the Google Sheet is shared with "Anyone with link can edit"
- Check API key has "Google Sheets API" enabled

---

## Cost

Google Sheets API is **free** for up to:
- 100 read requests/day
- 100 write requests/day

For most small business use, this is sufficient at no cost.

Learn more: https://developers.google.com/sheets/api/limits
