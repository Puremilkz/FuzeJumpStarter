# FuzeJumperz AI Jumpstart - Deployment Guide

## For Admin (You)

### Quick Test (Local)
```bash
# Terminal 1 - Backend
cd FuzeJumpStarter/server && npm start

# Terminal 2 - Frontend  
cd FuzeJumpStarter/client && npm run dev
```

Open http://localhost:5173

---

## Deploy to Render.com (Recommended)

### Prerequisites
1. Create a GitHub account if you don't have one
2. Push this project to a GitHub repository
3. Create a [Render.com](https://render.com) account

### Step 1: Upload to GitHub
```bash
cd FuzeJumpStarter
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/FuzeJumpStarter.git
git push -u origin main
```

### Step 2: Deploy to Render
1. Go to [dashboard.render.com](https://dashboard.render.com)
2. Click **New +** → **Blueprint**
3. Connect your GitHub repo
4. Render will detect the `render.yaml` file
5. Click **Apply**

### Step 3: Configure Environment Variables

In Render dashboard, for the **fuzejumperz-api** service:

1. **OLLAMA_API_KEY** (optional) - Get from [ollama.com/api](https://ollama.com/api) if using paid tier
2. **GOOGLE_SHEETS_KEY_FILE** = `sheets-key.json`
3. **Google Sheets Key** - Click on **Environment** → **Secret file**
   - Name: `sheets-key.json`
   - Content: Paste the contents of your `server/sheets-key.json` file

### Step 4: Wait for Deployment
- Backend will be available at: `https://fuzejumperz-api.onrender.com`
- Frontend will be available at: `https://fuzejumperz.onrender.com`

---

## Share with Friends

### Option 1: Local Network (Same WiFi)

Find your computer's IP:
```bash
# macOS
ifconfig | grep "inet " | grep -v 127.0.0.1

# Windows
ipconfig
```

Friends access: `http://YOUR_IP:5173`

**Note:** Only works while your computer is on and servers are running.

---

### Option 2: Deploy to Cloud (Recommended for Real Use)

See **Deploy to Render.com** section above.

---

### Option 3: Static Hosting (Frontend Only)

For the MVP, you can deploy just the frontend to Vercel/Netlify and have friends connect to your local backend.

1. Update `client/src/services/api.js`:
```javascript
const API_BASE = 'http://YOUR_DEPLOYED_BACKEND_URL/api';
```

2. Build and deploy the frontend
3. Friends access the deployed URL
4. Your computer must be on with backend running

---

## Backend Requirements

The backend needs to stay running. Options:

1. **Keep your computer on** (simplest for testing)
2. **Deploy backend to cloud** (for production)
3. **Use a Raspberry Pi/NAS** (always-on at home)

---

## Client Setup Instructions (Share with Friends)

### 1. Get Their Company Code
Give them a company code from your admin sheet (e.g., `DEMO` or add new one)

### 2. Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename tabs:
   - Tab 1: `Usage Log`
   - Tab 2: `Debriefs`
   (The app will auto-add headers)

### 3. Share with Service Account
1. Click **Share**
2. Add this email: `fjzsheets@fuzejumperz.iam.gserviceaccount.com`
3. Give **Editor** access
4. Copy the sheet URL

### 4. Login to App
1. Enter company code
2. Paste Google Sheet URL
3. Click Connect

---

## Troubleshooting

### "Cannot connect to server"
- Make sure backend is running: `cd server && npm start`
- Check firewall settings

### "Invalid company code"
- Add their code to your admin Google Sheet

### "Cannot access sheet"
- Verify service account email was added to sheet
- Check sheet sharing settings

---

## Files to Keep Private

These contain sensitive data - DO NOT share:
- `server/sheets-key.json` - Your Google service account key
- `server/.env` - Environment variables
- `server/config/companies.js` - Company codes and names

---

## Contact

For help, contact: FuzeJumperz AI Support
