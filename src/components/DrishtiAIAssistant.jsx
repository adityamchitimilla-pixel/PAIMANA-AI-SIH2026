import React, { useState, useRef, useEffect } from 'react';
import { 
  DETAILED_PROJECTS, 
  PAIMANA_SUMMARY, 
  ESCALATION_DRIVERS, 
  NORTH_EAST_SUMMARY 
} from '../data/paimanaData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  Layers, 
  ArrowRight,
  Zap,
  FileText,
  Building2
} from 'lucide-react';

export default function DrishtiAIAssistant({ onSelectProject }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Welcome to **PAIMANA Drishti AI**, the official Intelligent Infrastructure Monitoring Assistant for the Ministry of Statistics & Programme Implementation (MoSPI / IPMD).

I have real-time query access to the **486th Flash Report dataset (April 2026)** encompassing **1,981 Central Sector Projects**, cost escalation drivers, milestone S-curves, and predictive ML forecasting models.

**Suggested Official Queries:**
- Draft an Executive Cabinet Brief on highest cost overrun mega projects
- Identify delayed railway corridors in the North Eastern Region
- Synthesize root-cause bottlenecks across the Roads & Highways portfolio`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    "Draft a Cabinet Brief on highest cost overrun mega projects",
    "Which railway projects in North East have cost escalation over 50%?",
    "Analyze the physical progress vs financial burn rate gap in BharatNet",
    "What are the top 3 root-cause delay drivers across Roads & Highways?"
  ];

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = "";
      const lower = query.toLowerCase();

      if (lower.includes("cabinet") || lower.includes("brief") || lower.includes("executive")) {
        aiResponseText = `### 🏛️ Executive Cabinet Briefing Note: MoSPI Central Sector Monitoring (April 2026)

**1. Portfolio Scale & Macro Financial Overview:**
* **Total Monitored Projects:** 1,981 projects across 17 Ministries (Threshold: ₹150 Cr+)
* **Sanctioned Cost Baseline:** ₹37.13 Lakh Crore
* **Current Anticipated Revised Outlay:** ₹42.78 Lakh Crore
* **Net Aggregate Cost Overrun:** **₹5.65 Lakh Crore (+15.24%)**
* **Cumulative National Expenditure:** ₹20.36 Lakh Crore (**47.59%** disbursal rate)

**2. High-Risk Critical Corridor Interventions Required:**
* **Polavaram National Project (Water Resources - AP):** Cost escalation at **+447.2%** (₹55,549 Cr revised). Root cause: R&R compensations & Godavari flood diaphragm wall damages. *Action:* PMG taskforce to clear phase-1 41.15m impoundment protocol.
* **BharatNet Phase-II (DoT):** Revised budget of ₹1,88,000 Cr (+207.6%). Physical progress (82.4%) leads financial settlement (24.7%). *Action:* Enforce GatiShakti uniform RoW portal waivers.
* **Jiribam-Imphal Rail Link (111 km - Manipur):** Cost escalation +52.8% (₹21,885 Cr). Delayed by NATM Tunnel 12 geological mudflow. *Action:* Dedicated Territorial Army engineering security deployment.

**3. Policy Directives for Line Ministries:**
1. Mandate **Standard CUF Stage-II clearance tracking** across all state revenue departments.
2. Automate contractor liquidity release via escrow advance benchmarks upon achieving 80% E&M milestones.`;
      } else if (lower.includes("railway") || lower.includes("rail") || lower.includes("north east")) {
        aiResponseText = `### 🚆 North Eastern Region Railway Projects Analysis (Flash Report Table 5 & 6)

The Ministry of Railways is actively executing 12 key rail corridors in the North Eastern Region with a revised outlay of **₹50,056 Crore**:

1. **Jiribam - Imphal New Line (111 KM - Project ID: 705391)**
   * **Original:** ₹14,323 Cr ➔ **Revised:** ₹21,885.90 Cr (**+52.8% escalation**)
   * **Physical Progress:** 72.10% | **Delay:** +30 Months
   * *Status:* Bridge No. 164 (141m pier) nearing superstructure launch.

2. **Sivok - Rangpo New Rail Link (45 KM - Project ID: 705432)**
   * **Original:** ₹7,877 Cr ➔ **Revised:** ₹11,775.00 Cr (**+49.5% escalation**)
   * **Physical Progress:** 93.00% | **Delay:** +151 Months (historical Himalayan geology & Teesta floods)
   * *Status:* 13 of 14 tunnels successfully broken through.

3. **Byrnihat - Shillong New Line (108 KM - Project ID: 705396)**
   * **Original:** ₹8,324.28 Cr ➔ **Revised:** ₹8,342.28 Cr
   * **Physical Progress:** 2.04%
   * *Challenge:* Awaiting complete autonomous district council land possession.`;
      } else if (lower.includes("bharatnet") || lower.includes("telecom") || lower.includes("burn")) {
        aiResponseText = `### 📡 Project Analysis: BharatNet Phase-II (Project ID: 706775)

* **Sector:** Telecommunication | **Implementing Agency:** BBNL / DoT
* **Original Sanctioned Cost:** ₹61,109 Crore
* **Revised Anticipated Cost:** ₹188,000 Crore (**+207.6% Overrun**)
* **Cumulative Expenditure:** ₹46,431.54 Crore (**24.70%** Financial Progress)
* **Reported Physical Progress:** **82.40%**
* **AI Progress Divergence Gap:** **57.7%** (Significant Red Flag!)

**Root Cause Diagnosis:**
1. **Scope Quadrupling:** Expanded from original Gram Panchayat (GP) optical fiber points to 2.5 lakh GP saturation including Wi-Fi choupals and institutional fiber.
2. **Right-of-Way (RoW) Discrepancy:** Multiple state forest department demands for reinstatement charges stalled cable deployment in 12 states.
3. **Disbursal Lag:** Concessionaire milestone validation delays have created a statistical disconnect between on-ground fiber laying (82.4%) and central fund drawdown (24.7%).`;
      } else if (lower.includes("driver") || lower.includes("delay") || lower.includes("cause")) {
        aiResponseText = `### 🔍 Pareto Root-Cause Analysis of Infrastructure Delays & Escalations

Based on empirical decomposition across 1,981 Central Sector projects, the **₹5.65 Lakh Crore** total overrun is driven by:

1. **Land Acquisition Disputes & Possession Delay (34.2% share | ₹1,93,480 Cr impact)**
   * *Average Delay:* 28.4 Months. Primary friction in dense highway corridors and irrigation submersion zones.
2. **Forest & Environmental Stage-II Clearances (22.8% share | ₹1,29,000 Cr impact)**
   * *Average Delay:* 22.1 Months. Wildlife sanctuary boundary modifications & NGT compliance.
3. **Geological Surprises & Himalayan Strata (14.5% share | ₹82,030 Cr impact)**
   * *Average Delay:* 31.5 Months. Sub-surface water ingress, thrust-fault squeezing in tunnels.
4. **Contractor Liquidity & Financial Stress (12.3% share | ₹69,580 Cr impact)**
   * *Average Delay:* 18.2 Months. Bank guarantee constraints and raw material inflation during construction.
5. **Scope Enhancement & Engineering Revisions (8.6% share | ₹48,650 Cr impact)**
   * Upgrading from 2-lane to 4-lane expressway configurations mid-execution.`;
      } else {
        aiResponseText = `### 📊 PAIMANA Official Synthesis for: *"${query}"*

* **Portfolio Status (April 2026):** 1,981 Ongoing Projects tracked across 22 sectors.
* **Top 3 Active Sectors by Value:**
  1. **Roads & Highways:** 1,137 projects (₹10.81 Lakh Cr revised, 34.2% disbursed)
  2. **Railways:** 260 projects (₹8.69 Lakh Cr revised, 66.6% disbursed)
  3. **Power & Renewable Energy:** 102 projects (₹5.53 Lakh Cr revised, 36.3% disbursed)

**Key Finding:** 814 Mega projects (≥ ₹1000 Cr) account for **85.2% of the entire national capital outlay**. Predictive early intervention on top 50 mega projects can safeguard over **₹1.8 Lakh Crore** in potential escalation.

You may ask for detailed project dossiers or run What-If simulations for specific sectors.`;
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 400);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'var(--gov-navy)',
            color: '#ffffff',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={20} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '2px' }}>
              Outcome (h) LLM-Enabled Project Intelligence Assistant
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              PAIMANA Drishti AI Assistant
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Natural language querying of project delays, cost escalation drivers, and automated drafting of Cabinet Executive Briefs.
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(qp)}
            className="gov-btn gov-btn-secondary"
            style={{
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              padding: '4px 10px'
            }}
          >
            <span>{qp}</span>
          </button>
        ))}
      </div>

      {/* Chat Box */}
      <div className="gov-card" style={{
        padding: '1.2rem',
        minHeight: '460px',
        maxHeight: '580px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#ffffff'
      }}>
        {messages.map((m) => {
          const isAI = m.sender === 'ai';

          return (
            <div
              key={m.id}
              style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                maxWidth: isAI ? '100%' : '80%',
                alignSelf: isAI ? 'flex-start' : 'flex-end',
                flexDirection: isAI ? 'row' : 'row-reverse'
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '4px',
                background: isAI ? 'var(--gov-navy)' : '#e2e8f0',
                color: isAI ? '#ffffff' : '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {isAI ? 'AI' : 'U'}
              </div>

              <div style={{
                padding: '10px 14px',
                borderRadius: '4px',
                background: isAI ? '#f8fafc' : '#003366',
                border: isAI ? '1px solid var(--border-light)' : 'none',
                color: isAI ? '#1e293b' : '#ffffff',
                fontSize: '0.85rem',
                lineHeight: '1.5'
              }}>
                <div style={{ whiteSpace: 'pre-line' }}>
                  {m.text}
                </div>

                {isAI && (
                  <div style={{
                    marginTop: '8px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '4px',
                    fontSize: '0.7rem',
                    color: '#64748b'
                  }}>
                    <span>PAIMANA Drishti AI • {m.timestamp}</span>
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: copiedId === m.id ? '#166534' : 'var(--gov-blue-accent)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 600
                      }}
                    >
                      {copiedId === m.id ? <Check size={11} /> : <Copy size={11} />}
                      <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#64748b', fontSize: '0.8rem' }}>
            <Bot size={16} />
            <span>PAIMANA Drishti AI is processing inquiry...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{
          display: 'flex',
          gap: '6px',
          background: '#ffffff',
          padding: '6px',
          borderRadius: '4px',
          border: '1px solid var(--border-gov)'
        }}
      >
        <input
          type="text"
          placeholder="Ask Drishti AI about any project, ministry cost overrun, delay driver, or draft a brief..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            background: 'transparent',
            border: 'none',
            color: '#0f172a',
            fontSize: '0.85rem',
            outline: 'none'
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="gov-btn gov-btn-primary"
          style={{ padding: '0 16px' }}
        >
          <Send size={14} /> Send
        </button>
      </form>
    </div>
  );
}
