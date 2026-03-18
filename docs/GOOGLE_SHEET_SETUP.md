# Google Sheet Setup Guide for FuzeJumperz AI Jumpstart

## Quick Setup (Manual)

### Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **+ Blank** to create a new spreadsheet
3. Name it something like "FuzeJumperz Data"

### Step 2: Create the Required Tabs

You need to create exactly **3 tabs**:

#### Tab 1: Settings
1. The first tab should already be named "Sheet1"
2. Rename it to: **Settings**
3. In Row 1, add these headers:
   - Cell A1: `companyCode`
   - Cell B1: `companyName`
   - Cell C1: `maxUsers`
4. In Row 2, add your company details:
   - Cell A2: Your company code (e.g., `FUZE2026`)
   - Cell B2: Your company name (e.g., `FuzeJumperz`)
   - Cell C2: Max users allowed (e.g., `50`)

#### Tab 2: Usage Log
1. Click the **+** button next to the tab names
2. Rename the new sheet to: **Usage Log**
3. In Row 1, add these headers:
   - Cell A1: `Timestamp`
   - Cell B1: `Task Type`
   - Cell C1: `Language`
   - Cell D1: `Anonymised`
   - Cell E1: `Confirmed`

#### Tab 3: Debriefs
1. Click the **+** button next to the tab names
2. Rename the new sheet to: **Debriefs**
3. In Row 1, add these headers:
   - Cell A1: `Timestamp`
   - Cell B1: `Title`
   - Cell C1: `Type`
   - Cell D1: `Cheat Sheet Content`

### Step 3: Share the Sheet

1. Click the **Share** button in the top right
2. Under "Get link", click the dropdown
3. Select **"Anyone with the link"**
4. Choose **"Editor"** (not "Viewer")
5. Click **Done**

### Step 4: Copy the URL

1. Click **Share** again
2. Click **Copy link**
3. The URL should look like:
   ```
   https://docs.google.com/spreadsheets/d/XXXXX/edit
   ```

## Your First Company Code

For testing, use this in your Settings tab:

| companyCode | companyName | maxUsers |
|-------------|-------------|----------|
| FUZE2026 | FuzeJumperz | 50 |

## Adding More Companies

To add more companies, simply add more rows in the Settings tab:

| companyCode | companyName | maxUsers |
|-------------|-------------|----------|
| FUZE2026 | FuzeJumperz | 50 |
| DEMO | Demo Company | 10 |
| ABC123 | ABC Corp | 25 |

## Troubleshooting

### "Invalid company code" error
- Check the code matches exactly (it's case-insensitive)
- Ensure the headers are in Row 1
- Make sure there's data in Row 2

### "Cannot access sheet" error
- Verify sharing is set to "Anyone with link can edit"
- Check the URL is complete and correct
- Try opening the URL in a private/incognito window

### "Sheet not found" error
- Make sure all 3 tabs exist
- Tab names must be exactly: `Settings`, `Usage Log`, `Debriefs`

## Support

Need help? Contact your AI trainer or IT support.
