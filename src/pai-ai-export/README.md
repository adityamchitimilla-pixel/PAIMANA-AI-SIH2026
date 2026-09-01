# 🤖 PAI AI Assistant — Standalone Integration Package

This package contains everything required to run and integrate the **PAI AI Infrastructure & Tendering Assistant** into any React, Next.js, or Vite application.

---

## 📁 Package Directory Structure

```
pai-ai-export/
├── PaiAiAssistant.jsx        # Main standalone React component
├── PaiAiAssistant.css        # Portal theme styles, variables & animations
├── PaiAiDemoApp.jsx          # Ready-to-run demo application
├── data/
│   ├── paimanaData.js        # MoSPI 486th Flash Report dataset & state statistics
│   └── tendersData.js        # CPPP e-tenders, bid debriefs & evaluation reasons
└── README.md                 # Integration & setup documentation
```

---

## 🚀 Quickstart & Setup (2 Steps)

### Step 1: Install Dependencies
In the target project directory, install `lucide-react` (icons library):

```bash
npm install lucide-react
```

*(Ensure React 18+ or React 19 is installed in your project).*

---

### Step 2: Import & Use Component

```jsx
import React from 'react';
import PaiAiAssistant from './pai-ai-export/PaiAiAssistant';

export default function MyProjectApp() {
  const handleSelectProject = (projectId) => {
    console.log("Project selected:", projectId);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <PaiAiAssistant onSelectProject={handleSelectProject} />
    </div>
  );
}
```

---

## ⚙️ Component Props API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `onSelectProject` | `Function` | `undefined` | Callback invoked when user references/clicks a project. |
| `onCustomQuery` | `Async Function` | `undefined` | Optional async handler `async (query: string) => string` to route queries to a custom backend or LLM (e.g. OpenAI / Gemini / Ollama / FastAPI). |
| `customTendersData` | `Array` | `TENDERS_DATA` | Optional custom array to override built-in tender database. |
| `customProjectsData` | `Array` | `DETAILED_PROJECTS` | Optional custom array to override built-in projects dataset. |
| `customStatesData` | `Array` | `STATES_SUMMARY` | Optional custom array to override state infrastructure statistics. |

---

## 🧠 Supported Built-In Query Categories (Offline / Instant)

The built-in engine answers the following types of queries with instant contextual data:

1. **📅 Tender Dates & Deadlines:**
   - *"What are the upcoming and ongoing tender closing dates?"*
   - *"When is the bid submission deadline for NHAI expressway?"*

2. **🔍 Bid Debriefs & Rejection Grounds:**
   - *"Why was Infracon disqualified from the DFCCIL tender?"*
   - *"Why did Bharat Heavy Tech miss winning L1?"*
   - *"Show reasons why Himalayan Infra was rejected"*

3. **🏛️ Tenders Overview & Package Requirements:**
   - *"List active tenders in power and railways"*
   - *"What is the budget and EMD for the RVNL tunneling tender?"*

4. **📊 Macro Cost Overruns & 486th Flash Report:**
   - *"Show me highest cost overrun mega projects"*
   - *"What is the total cost escalation in the 486th Flash Report?"*

5. **🗺️ State Infrastructure Profiles:**
   - *"What is the total infrastructure capital outlay in Maharashtra?"*
   - *"Show infrastructure statistics for Uttar Pradesh / Assam"*

---

## 🔌 Connecting to an LLM / Backend API (Optional)

If you want to connect PAI AI to a remote LLM (such as Gemini, OpenAI, or a Python FastAPI backend), pass the `onCustomQuery` prop:

```jsx
<PaiAiAssistant 
  onCustomQuery={async (userQuery) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userQuery })
    });
    const data = await response.json();
    return data.reply; // Returns text string
  }}
/>
```
