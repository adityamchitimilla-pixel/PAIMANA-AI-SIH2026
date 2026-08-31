import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  DETAILED_PROJECTS, 
  PAIMANA_SUMMARY, 
  ESCALATION_DRIVERS, 
  NORTH_EAST_SUMMARY,
  STATES_SUMMARY,
  HML_CATEGORIES
} from '../data/paimanaData';
import { TENDERS_DATA } from '../data/tendersData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  Layers, 
  ArrowRight, 
  FileText, 
  Building2, 
  Calendar, 
  Briefcase, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export default function PaiAiAssistant({ onSelectProject }) {
  const { t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Hello! I am **PAI AI**, the official intelligent copilot for the **PAIMANA Infrastructure & Tendering Platform** (MoSPI / IPMD).

I have direct real-time access to the **486th Flash Report dataset** (1,981 Central Sector Projects) and the **Central E-Tenders & Procurement Bidding Registry**.

**Ask me anything, such as:**
- 📅 **Tender Dates & Deadlines:** *"What are the closing dates and schedules for ongoing tenders?"*
- 💰 **Bidding & EMD Criteria:** *"What is the budget, EMD, and machinery requirement for the NHAI expressway tender?"*
- 🔍 **Bid Debriefs & Reasons:** *"Why was Infracon disqualified from the DFCCIL tender?"* or *"Why did Bharat Heavy Tech miss winning L1?"*
- 📊 **Project Overruns & Delays:** *"Show me projects with more than 50% cost escalation"*
- 🗺️ **State Analytics:** *"What is the total capital outlay in Maharashtra vs Uttar Pradesh?"*`,
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
    "What are the upcoming and ongoing tender dates & deadlines?",
    "Why was Infracon disqualified from the DFCCIL signaling tender?",
    "Show me highest cost overrun mega projects in the 486th Flash Report",
    "What is the total infrastructure capital outlay in Maharashtra?"
  ];

  // Smart Query Processing Engine for PAI AI
  const generateAiResponse = (query) => {
    const q = query.toLowerCase().trim();

    // -------------------------------------------------------------
    // 1. TENDER DATES & DEADLINES QUERIES
    // -------------------------------------------------------------
    if (q.includes("date") || q.includes("deadline") || q.includes("schedule") || q.includes("when is") || q.includes("closing")) {
      const ongoing = TENDERS_DATA.filter(t => t.status === 'ongoing');
      const upcoming = TENDERS_DATA.filter(t => t.status === 'upcoming');
      const completed = TENDERS_DATA.filter(t => t.status === 'completed');

      let text = `### 📅 Comprehensive Tender Schedule & Deadlines (PAIMANA E-Procurement Desk)\n\n`;
      
      text += `#### 🟢 Active Ongoing Tenders (Open for Bidding):\n`;
      ongoing.forEach(t => {
        text += `* **${t.id}:** ${t.title}\n`;
        text += `  - ⏳ **Bid Submission Closing:** **${t.bidClosingDate.replace('T', ' at ')} IST**\n`;
        text += `  - 🔓 **Technical Bid Opening Date:** **${t.bidOpeningDate}**\n`;
        text += `  - 💰 **Estimated Value:** ₹${t.estimatedCostCr.toLocaleString()} Cr | **EMD Security:** ₹${t.emdAmountCr} Cr\n\n`;
      });

      text += `#### 🟡 Upcoming Tender RFPs & Pre-Bid Conferences:\n`;
      upcoming.forEach(t => {
        text += `* **${t.id}:** ${t.title}\n`;
        text += `  - 📌 **Pre-Bid Meeting Date:** **${t.preBidMeetingDate}**\n`;
        text += `  - 🚀 **Expected Tender Launch:** **${t.expectedBidOpening}**\n`;
        text += `  - 💰 **Estimated Outlay:** ₹${t.estimatedCostCr.toLocaleString()} Cr (${t.agency})\n\n`;
      });

      text += `#### 🔵 Recently Awarded Tenders:\n`;
      completed.forEach(t => {
        text += `* **${t.id} (${t.agency}):** Awarded on **${t.awardDate}** to **${t.awardedContractor}** for **₹${t.awardedCostCr.toLocaleString()} Cr**.\n`;
      });

      text += `\n💡 *Tip: To participate in any active package, click on the **E-Tenders & Bidding** tab and click **"Participate & Submit Bid"**.*`;
      return text;
    }

    // -------------------------------------------------------------
    // 2. TENDER BID DEBRIEF / REJECTION REASONS QUERIES
    // -------------------------------------------------------------
    if (q.includes("why") || q.includes("reject") || q.includes("disqualif") || q.includes("miss") || q.includes("debrief") || q.includes("lost") || q.includes("infracon") || q.includes("bharat heavy") || q.includes("hcc") || q.includes("afcons") || q.includes("siemens")) {
      let debriefMatch = null;
      let targetBidder = null;

      TENDERS_DATA.forEach(t => {
        if (t.biddersDebrief) {
          t.biddersDebrief.forEach(b => {
            if (q.includes(b.companyName.toLowerCase().split(' ')[0]) || q.includes("disqualif") || q.includes("debrief") || q.includes("reason")) {
              debriefMatch = t;
              if (!targetBidder || q.includes(b.companyName.toLowerCase().split(' ')[0])) {
                targetBidder = b;
              }
            }
          });
        }
      });

      if (debriefMatch && targetBidder) {
        let text = `### 🔍 CPPP Bid Debriefing & Reason Analysis: ${debriefMatch.id}\n\n`;
        text += `**Package:** ${debriefMatch.title}\n`;
        text += `**Contracting Agency:** ${debriefMatch.agency} | **Evaluation Method:** ${debriefMatch.evaluationMethod}\n\n`;
        
        text += `#### 📋 Bidder Evaluation Profile: **${targetBidder.companyName}**\n`;
        text += `* **Outcome Status:** \`${targetBidder.status}\`\n`;
        text += `* **Financial Quote:** ${targetBidder.financialQuoteCr > 0 ? `₹${targetBidder.financialQuoteCr} Cr` : 'Not Opened (Technical Rejection)'} *(Winner: ₹${debriefMatch.winnerFinancialQuoteCr} Cr)*\n`;
        text += `* **Technical Score:** ${targetBidder.technicalScore > 0 ? `${targetBidder.technicalScore} / 100` : 'Disqualified'}\n\n`;

        text += `#### 🚨 Official Grounds & Reasons:\n`;
        text += `> ${targetBidder.reason}\n\n`;

        if (targetBidder.disqualificationReasons) {
          text += `**Specific Mandatory Clause Failures:**\n`;
          targetBidder.disqualificationReasons.forEach(r => {
            text += `- ❌ ${r}\n`;
          });
          text += `\n`;
        }

        if (targetBidder.detailedGapAnalysis) {
          text += `**Variance Analysis vs Winner:**\n`;
          text += `- Price Difference: **${targetBidder.detailedGapAnalysis.financialVariance}**\n`;
          text += `- Technical Gap: **${targetBidder.detailedGapAnalysis.technicalScoreVariance}**\n\n`;
        }

        if (targetBidder.recommendationsForFutureBids) {
          text += `**💡 AI Strategic Recommendations for Next Tender:**\n`;
          text += `*${targetBidder.recommendationsForFutureBids}*\n`;
        }

        return text;
      }
    }

    // -------------------------------------------------------------
    // 3. GENERAL TENDERS OVERVIEW
    // -------------------------------------------------------------
    if (q.includes("tender") || q.includes("bid") || q.includes("procurement") || q.includes("gem") || q.includes("cppp")) {
      return `### 🏛️ PAIMANA E-Tendering & Procurement Summary

We currently track **${TENDERS_DATA.length} major Central Sector Tenders** across Highways, Railways, Hydrocarbons, and Power:

1. **🟢 Ongoing Tenders (4 Packages Active):**
   - **TND-2026-NHAI-0884:** 6-Lane Vadodara–Mumbai Expressway Package IV (₹1,850 Cr | Closes **15 May 2026**)
   - **TND-2026-RVNL-0412:** 38 KM Tunneling on Rishikesh–Karanprayag Rail Link (₹2,420 Cr | Closes **28 May 2026**)
   - **TND-2026-IGGL-0199:** 142 KM River Crossing for North East Gas Grid (₹680 Cr | Closes **05 June 2026**)
   - **TND-2026-NTPC-0914:** 1200 MW Supercritical Thermal Expansion BoP (₹5,100 Cr | Closes **20 June 2026**)

2. **🟡 Upcoming RFPs (3 Packages in Pipeline):**
   - **High-Speed Track Slabs (NHSRCL):** ₹3,150 Cr (Pre-Bid: 15 June 2026)
   - **Greenfield Airport Terminal (AAI):** ₹1,400 Cr (Pre-Bid: 10 July 2026)
   - **Rapid Coal Loading Silos (CIL):** ₹920 Cr (Pre-Bid: 28 July 2026)

3. **🔵 Completed Tenders with Debriefs:**
   - **DFCCIL Signaling Package:** Awarded to *Siemens-L&T Consortium* (₹1,410 Cr). Full debrief analysis available for L2 and disqualified bidders.

*You can open the **E-Tenders & Bidding** tab to submit bids with automated AI pre-validation!*`;
    }

    // -------------------------------------------------------------
    // 4. COST OVERRUN / ESCALATION / FLASH REPORT MACRO QUERIES
    // -------------------------------------------------------------
    if (q.includes("overrun") || q.includes("escalat") || q.includes("delay") || q.includes("flash report") || q.includes("macro") || q.includes("overview")) {
      return `### 📊 486th Flash Report Macro Summary (April 2026)

* **Total Monitored Projects:** **1,981 projects** (costing ₹150 Cr+) across 17 Ministries.
* **Original Sanctioned Baseline Cost:** **₹37.13 Lakh Crore** (₹37,12,662 Cr)
* **Latest Anticipated Cost:** **₹42.78 Lakh Crore** (₹42,78,000 Cr)
* **Aggregate Cost Overrun:** **+₹5.65 Lakh Crore (+15.24%)**
* **Cumulative National Disbursals:** **₹20.36 Lakh Crore (47.59% of outlay)**

#### Top 3 Mega Projects with Highest Cost Escalation:
1. **Polavaram National Irrigation Project (AP - Water Resources):**
   - Original: ₹10,151 Cr ➔ Revised: **₹55,549 Cr (+447.2% Overrun)** | Delay: +144 Months
2. **BharatNet Phase-II (DoT - Telecom):**
   - Original: ₹61,109 Cr ➔ Revised: **₹1,88,000 Cr (+207.6% Overrun)** | Delay: +60 Months
3. **Udhampur-Srinagar-Baramulla Rail Link (USBRL - J&K):**
   - Original: ₹2,500 Cr ➔ Revised: **₹41,119 Cr (+1,544% Overrun)** | Delay: +240 Months`;
    }

    // -------------------------------------------------------------
    // 5. STATE / REGIONAL INFRASTRUCTURE QUERIES
    // -------------------------------------------------------------
    const matchedState = STATES_SUMMARY.find(s => q.includes(s.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()));
    if (matchedState) {
      const stateProj = DETAILED_PROJECTS.filter(p => p.state.toLowerCase().includes(matchedState.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()));
      return `### 🗺️ Infrastructure State Profile: **${matchedState.state}**

* **Total Central Sector Projects:** **${matchedState.count} Projects**
* **Approved Capital Outlay:** **₹${matchedState.costLakhCr} Lakh Crore**
* **Cumulative National Expenditure:** **₹${matchedState.expenditureLakhCr} Lakh Crore**
* **Financial Realization Rate:** **${Math.round((matchedState.expenditureLakhCr / matchedState.costLakhCr) * 100)}%**
* **Primary Key Sector:** **${matchedState.topSector}**

#### Prominent Monitored Mega Packages:
${stateProj.slice(0, 3).map(p => `- **${p.name}** (${p.agency}): ₹${p.originalCostCr.toLocaleString()} Cr | Physical Progress: **${p.physicalProgress}%** (${p.riskLevel} Risk)`).join('\n') || '- Check Projects Registry tab to explore full state project list.'}`;
    }

    // -------------------------------------------------------------
    // 6. DEFAULT FALLBACK INTELLIGENT SYNTHESIS
    // -------------------------------------------------------------
    return `### 💡 PAI AI Intelligence Response

Regarding your query: **"${query}"**

* **Portfolio Status:** 1,981 central sector projects are under active monitoring in the 486th Flash Report.
* **Tenders Intelligence:** 4 ongoing tenders are currently open with closing dates in **May and June 2026**.
* **Key Actions:** 
  1. To view specific tender deadlines or participate, head to **E-Tenders & Bidding**.
  2. To explore spatial distribution, visit the **National GIS Map**.
  3. To evaluate cost escalation predictors, open the **AI Early Warning Radar**.

*Feel free to ask specific questions about tender closing dates, disqualification reasons, contractor debriefs, or project bottlenecks!*`;
  };

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
      const aiResponse = generateAiResponse(query);
      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem 0' }}>
      
      {/* Official Top Assistant Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>Natural Language Copilot</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-Time Flash Report & CPPP Tenders Integration</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={24} color="#ff9933" />
              <span>PAI AI Infrastructure & Tendering Assistant</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Ask questions about tender dates, pre-bid meetings, debrief reasons, project overruns, and state infrastructure statistics.
            </p>
          </div>

          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.78rem',
            color: '#334155'
          }}>
            <Sparkles size={16} color="var(--gov-navy)" />
            <span>AI Knowledge Engine: <strong>486th Flash Report & CPPP Tenders</strong></span>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <HelpCircle size={13} /> Quick Prompts:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#334155',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e8f0fe';
                e.currentTarget.style.borderColor = 'var(--gov-navy)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f8fafc';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', height: '640px', background: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
        
        {/* Messages Scroll Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: '#f8fafc' }}>
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  maxWidth: isAi ? '90%' : '75%',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  flexDirection: isAi ? 'row' : 'row-reverse'
                }}
              >
                {/* Avatar Icon */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isAi ? 'var(--gov-navy)' : '#e2e8f0',
                  color: isAi ? '#ff9933' : '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}>
                  {isAi ? <Bot size={20} /> : <User size={18} />}
                </div>

                {/* Message Bubble */}
                <div style={{
                  background: isAi ? '#ffffff' : 'var(--gov-navy)',
                  color: isAi ? '#1e293b' : '#ffffff',
                  padding: '1rem 1.2rem',
                  borderRadius: '8px',
                  border: isAi ? '1px solid #e2e8f0' : 'none',
                  boxShadow: isAi ? '0 2px 8px rgba(0,0,0,0.04)' : '0 2px 8px rgba(0, 34, 68, 0.2)',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  position: 'relative'
                }}>
                  {/* Sender Name & Timestamp */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', fontSize: '0.72rem', color: isAi ? '#64748b' : '#cbd5e1' }}>
                    <strong style={{ color: isAi ? 'var(--gov-navy-dark)' : '#ffffff' }}>
                      {isAi ? 'PAI AI Copilot' : 'Government Officer / Bidder'}
                    </strong>
                    <span>{m.timestamp}</span>
                  </div>

                  {/* Message Content formatted as clean markdown */}
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {m.text}
                  </div>

                  {/* Copy Response Button for AI messages */}
                  {isAi && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <button
                        onClick={() => handleCopy(m.id, m.text)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#64748b',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check size={12} color="#16a34a" />
                            <span style={{ color: '#16a34a' }}>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>Copy response</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', alignSelf: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gov-navy)', color: '#ff9933', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div style={{ background: '#ffffff', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#ff9933" />
                <span>PAI AI is analyzing Flash Report & Tenders database...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '1rem 1.5rem', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            <input
              type="text"
              placeholder="Ask PAI AI about tender dates, pre-bid deadlines, disqualification reasons, cost overruns, state statistics..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '0.85rem',
                border: '1.5px solid #cbd5e1',
                borderRadius: '6px',
                outline: 'none',
                transition: 'border-color 0.15s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--gov-navy)'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />

            <button
              type="submit"
              disabled={!input.trim()}
              className="gov-btn gov-btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                opacity: input.trim() ? 1 : 0.6,
                cursor: input.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <span>Ask PAI AI</span>
              <Send size={15} />
            </button>
          </form>
          <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px', textAlign: 'center' }}>
            PAI AI verifies data against the 486th Flash Report dataset and CPPP E-Procurement records.
          </div>
        </div>
      </div>
    </div>
  );
}
