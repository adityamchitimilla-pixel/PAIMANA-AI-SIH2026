# 🇮🇳 PAIMANA AI: Smart Project Monitoring & Decision-Support System
### Ministry of Statistics and Programme Implementation (MoSPI / IPMD)
**Smart India Hackathon (SIH 2026) | Problem Statement ID: SIH26103**

---

## 📌 Executive Summary

The **Infrastructure & Project Monitoring Division (IPMD)** of **MoSPI** monitors Central Sector Infrastructure Projects costing **₹150 crore and above** across 17 infrastructural Ministries/Departments.

Originally monitored via the **Online Computerised Monitoring System (OCMS)** since 2006, the platform transitioned into **Project Assessment, Infrastructure Monitoring and Analytics for Nation-building (PAIMANA)**.

This repository implements an **AI-powered decision-support system** that shifts project monitoring from *passive descriptive reporting* to *proactive predictive and prescriptive intelligence*:
1. **Predicts** which infrastructure projects will experience cost overruns and schedule delays before they compound.
2. **Explains root-cause drivers** via Pareto attribution (Land acquisition, Stage-II environmental clearances, contractor liquidity, geological surprises).
3. **Prescribes administrative interventions** for line ministries and cabinet committees.

---

## 📊 Live Dataset: 486th Flash Report (April 2026)

The system is built upon the official **486th Project Monitoring Report (Flash Report)** published on [`https://paimana-proj.mospi.gov.in/ReportPage`](https://paimana-proj.mospi.gov.in/ReportPage):
* **Total Monitored Projects:** **1,981 Central Sector Projects** across **17 Line Ministries** and **22 Sectors**.
* **Original Sanctioned Cost:** **₹37,12,662.01 Crore** (~₹37.13 Lakh Cr).
* **Latest Anticipated Revised Cost:** **₹42,78,402.00 Crore** (~₹42.78 Lakh Cr).
* **Net Cost Escalation:** **+₹5,65,739.99 Crore (+15.24%)**.
* **Cumulative Expenditure:** **₹20,36,107.69 Crore (47.59% of revised outlay)**.
* **Mega Projects (≥ ₹1,000 Cr):** **814 Projects** accounting for **₹31.63 Lakh Crore (85.2%)** of national capital allocation.
* **Special Focus: North Eastern Region (NER):** **229 Ongoing Projects** across the 8 NER States (**₹3.39 Lakh Crore**).

---

## 🌟 Core System Modules

### 1. 🏛️ Executive Dashboard & Overview
* National macro KPIs, 10-year decadal trajectory (2016 vs 2026), and Harmonized Master List (HML 2022) 6-Category sector breakdowns.

### 2. 🗺️ National Infrastructure GIS Map
* High-detail vector SVG map of India with accurate state boundaries, interactive choropleth density metrics (Project Count, Capital Outlay, Disbursals), and multi-state economic corridor overlays (*Mumbai-Ahmedabad Bullet Train, Western DFC, North East Gas Grid, Arunachal Frontier Highway*).

### 3. 🔴 AI Early Warning Risk Radar
* Real-time composite risk scoring (0–100) combining physical progress divergence, milestone velocity, and clearance friction.
* Machine Learning cost escalation and completion date forecasting.
* SHAP feature importance analysis quantifying CUF attributes (59.7%) vs external non-CUF variables (40.3%).

### 4. 📋 Projects Registry & S-Curve Dossiers
* Searchable and filterable ledger of all 1,981 project lines with CSV export and planned vs actual progress S-Curve visualizer.

### 5. 📊 Benchmarking & Root-Cause Analysis
* Cross-ministry performance scorecards and Pareto root-cause decomposition of ₹5.65 Lakh Crore in cost escalations.

### 6. 🏔️ North Eastern Region Special Focus
* Dedicated monitoring framework for the 229 central sector projects across Arunachal Pradesh, Assam, Manipur, Meghalaya, Mizoram, Nagaland, Sikkim, and Tripura.

### 7. 🧪 Common Upload Form (CUF) & What-If Sandbox
* Project registration sandbox with interactive policy levers to test the impact of land handover acceleration and contractor liquidity releases.

### 8. 🤖 PAIMANA Drishti AI Assistant
* LLM-enabled project intelligence assistant for conversational inquiry and automated drafting of Executive Cabinet Briefs.

---

## 🛠️ Technology Stack

* **Frontend:** React 18, Vite, JavaScript (ES6+), Lucide React
* **Styling:** Sovereign Government of India (MoSPI / NIC / National Portal of India) Design System
* **Data Visualizations:** Custom SVG Geospatial Map of India, S-Curve Progress Trajectory Visualizers, Choropleth Density Scales
* **AI / Analytics:** Statistical and Machine Learning inference models (`src/utils/aiEngine.js`)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/adityamchitimilla-pixel/<repo-name>.git
cd <repo-name>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) or [http://localhost:5174/](http://localhost:5174/) in your browser.

### 4. Build for production
```bash
npm run build
```

---

## 👥 Collaboration & Contributing

1. Fork or clone the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add feature description"`
4. Push to branch: `git push origin feature/your-feature-name`
5. Submit a Pull Request.

---

## 📜 License & Acknowledgements
Developed for **Smart India Hackathon (SIH 2026)**.  
Data referenced from **Ministry of Statistics and Programme Implementation (MoSPI / IPMD)**.
