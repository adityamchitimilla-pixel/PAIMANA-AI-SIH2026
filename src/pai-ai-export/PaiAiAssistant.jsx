import React, { useState, useRef, useEffect } from 'react';
import './PaiAiAssistant.css';
import { 
  DETAILED_PROJECTS, 
  PAIMANA_SUMMARY, 
  ESCALATION_DRIVERS, 
  STATES_SUMMARY 
} from './data/paimanaData';
import { TENDERS_DATA } from './data/tendersData';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  Copy, 
  Check, 
  HelpCircle,
  KeyRound
} from 'lucide-react';

// Default Gemini API Key (Loaded securely from environment or UI input)
export const DEFAULT_GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

function FormattedChatMessage({ text, isAi }) {
  if (!text) return null;

  const renderInline = (str) => {
    const parts = [];
    let remaining = str;
    let keyIdx = 0;

    while (remaining.length > 0) {
      const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
      const codeMatch = remaining.match(/`(.*?)`/);
      const italicMatch = remaining.match(/(?<!\*)\*([^*]+)\*(?!\*)/);

      let firstMatch = null;
      let matchType = null;
      let minIndex = Infinity;

      if (boldMatch && boldMatch.index < minIndex) {
        minIndex = boldMatch.index;
        firstMatch = boldMatch;
        matchType = 'bold';
      }
      if (codeMatch && codeMatch.index < minIndex) {
        minIndex = codeMatch.index;
        firstMatch = codeMatch;
        matchType = 'code';
      }
      if (italicMatch && italicMatch.index < minIndex) {
        minIndex = italicMatch.index;
        firstMatch = italicMatch;
        matchType = 'italic';
      }

      if (firstMatch) {
        if (firstMatch.index > 0) {
          parts.push(<span key={keyIdx++}>{remaining.substring(0, firstMatch.index)}</span>);
        }

        if (matchType === 'bold') {
          parts.push(
            <strong key={keyIdx++} style={{ color: isAi ? '#0f172a' : '#ffffff', fontWeight: 700 }}>
              {firstMatch[1]}
            </strong>
          );
        } else if (matchType === 'code') {
          parts.push(
            <span
              key={keyIdx++}
              style={{
                background: isAi ? '#e2e8f0' : 'rgba(255, 255, 255, 0.2)',
                color: isAi ? '#0f172a' : '#ffffff',
                padding: '2px 6px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              {firstMatch[1]}
            </span>
          );
        } else if (matchType === 'italic') {
          parts.push(
            <em key={keyIdx++} style={{ color: isAi ? '#475569' : '#e2e8f0' }}>
              {firstMatch[1]}
            </em>
          );
        }

        remaining = remaining.substring(firstMatch.index + firstMatch[0].length);
      } else {
        parts.push(<span key={keyIdx++}>{remaining}</span>);
        break;
      }
    }

    return parts;
  };

  const lines = text.split('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.85rem', lineHeight: '1.5' }}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (!trimmed) {
          return <div key={idx} style={{ height: '4px' }} />;
        }

        if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
          const title = trimmed.replace(/^#+\s*/, '');
          return (
            <div
              key={idx}
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                color: isAi ? 'var(--gov-navy-dark)' : '#ffffff',
                borderBottom: isAi ? '1.5px solid #e2e8f0' : '1px solid rgba(255, 255, 255, 0.2)',
                paddingBottom: '4px',
                marginTop: idx > 0 ? '8px' : '0px',
                marginBottom: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {renderInline(title)}
            </div>
          );
        }

        if (trimmed.startsWith('#### ')) {
          const subtitle = trimmed.replace(/^####\s*/, '');
          return (
            <div
              key={idx}
              style={{
                fontSize: '0.88rem',
                fontWeight: 700,
                color: isAi ? '#003366' : '#93c5fd',
                marginTop: '8px',
                marginBottom: '2px'
              }}
            >
              {renderInline(subtitle)}
            </div>
          );
        }

        if (trimmed.startsWith('> ')) {
          const quote = trimmed.replace(/^>\s*/, '');
          return (
            <div
              key={idx}
              style={{
                background: isAi ? '#f8fafc' : 'rgba(255, 255, 255, 0.1)',
                borderLeft: '4px solid #f59e0b',
                padding: '6px 12px',
                borderRadius: '4px',
                fontStyle: 'italic',
                color: isAi ? '#334155' : '#f1f5f9',
                margin: '4px 0'
              }}
            >
              {renderInline(quote)}
            </div>
          );
        }

        if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
          const bulletText = trimmed.replace(/^[*•-]\s*/, '');
          const isSubItem = line.startsWith('  ') || line.startsWith('\t');
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                paddingLeft: isSubItem ? '16px' : '2px',
                margin: '1px 0'
              }}
            >
              <span style={{ color: isAi ? '#ff9933' : '#93c5fd', fontWeight: 800, lineHeight: '1.4' }}>•</span>
              <div style={{ flex: 1 }}>{renderInline(bulletText)}</div>
            </div>
          );
        }

        if (/^\d+\.\s/.test(trimmed)) {
          const match = trimmed.match(/^(\d+\.)\s*(.*)/);
          const num = match[1];
          const content = match[2];
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'flex-start',
                paddingLeft: '2px',
                margin: '2px 0'
              }}
            >
              <span style={{ color: isAi ? 'var(--gov-navy)' : '#93c5fd', fontWeight: 700 }}>{num}</span>
              <div style={{ flex: 1 }}>{renderInline(content)}</div>
            </div>
          );
        }

        return (
          <div key={idx}>
            {renderInline(trimmed)}
          </div>
        );
      })}
    </div>
  );
}

export default function PaiAiAssistant({ 
  onSelectProject,
  onCustomQuery,
  customTendersData,
  customProjectsData,
  customStatesData
}) {
  const tendersList = customTendersData || TENDERS_DATA;
  const projectsList = customProjectsData || DETAILED_PROJECTS;
  const statesList = customStatesData || STATES_SUMMARY;

  const [apiKey, setApiKey] = useState(DEFAULT_GEMINI_API_KEY);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `### 🤖 Welcome to PAI AI Copilot (Gemini Powered)
I am your intelligent assistant for **National Infrastructure Intelligence & Central E-Procurement** (MoSPI 486th Flash Report & CPPP Tenders).

**You can ask me questions such as:**
* 🚨 **Filtered Tenders:** *"What are the upcoming tenders requiring budget under 1000 cr?"*
* 🚨 **High-Risk Projects:** *"Show me currently in-progress projects that are highly in risk"*
* 💰 **Bidding & EMD Criteria:** *"What is the budget, EMD, and machinery for NHAI expressway tender?"*
* 🔍 **Bid Debriefs & Reasons:** *"Why was Infracon disqualified from the DFCCIL tender?"*
* 🏗️ **Specific Mega Projects:** *"Tell me about the Bullet Train / BharatNet / Polavaram project"*
* 🗺️ **State Infrastructure:** *"What is the total capital outlay in Maharashtra vs Uttar Pradesh?"*`,
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
    "What are the upcoming tenders requiring budget under 1000 cr?",
    "Currently in progress projects that are highly in risk",
    "Why was Infracon disqualified from the DFCCIL signaling tender?",
    "Show root causes of infrastructure delays across India",
    "What is the total infrastructure capital outlay in Maharashtra?"
  ];

  const handleSendMessage = async (textToSend) => {
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

    try {
      let aiResponseText = '';
      if (onCustomQuery) {
        aiResponseText = await onCustomQuery(query);
      } else {
        // Smart programmatic filter engine
        const q = query.toLowerCase();

        if (q.includes("tender") || q.includes("bid")) {
          let targetStatus = null;
          if (q.includes("upcoming")) targetStatus = "upcoming";
          else if (q.includes("ongoing")) targetStatus = "ongoing";
          else if (q.includes("completed")) targetStatus = "completed";

          let maxBudget = null;
          const underMatch = q.match(/(?:under|below|less than|within|max|<|<=)\s*(?:₹|rs\.?)?\s*(\d+(?:\.\d+)?)\s*(?:cr|crore)?/i);
          if (underMatch) maxBudget = parseFloat(underMatch[1]);

          const filtered = tendersList.filter(t => {
            if (targetStatus && t.status !== targetStatus) return false;
            if (maxBudget !== null && t.estimatedCostCr > maxBudget) return false;
            return true;
          });

          if (filtered.length > 0) {
            let res = `### 📋 Matching Tenders (${targetStatus ? targetStatus.toUpperCase() : 'ALL'} | ${maxBudget ? `< ₹${maxBudget} Cr` : ''})\n\n`;
            filtered.forEach((t, idx) => {
              res += `#### ${idx + 1}. ${t.title}\n`;
              res += `* **Tender ID:** \`${t.id}\` | **Agency:** **${t.agency}** (${t.ministry})\n`;
              res += `* **Estimated Cost:** **₹${t.estimatedCostCr.toLocaleString()} Crore** | **EMD:** ₹${t.emdAmountCr} Cr\n`;
              res += `* **Location:** 📍 ${t.location}\n`;
              if (t.status === 'upcoming') {
                res += `* **Pre-Bid Meeting:** ${t.preBidMeetingDate} | **Expected Launch:** ${t.expectedBidOpening}\n\n`;
              } else {
                res += `* **Closing Date:** ${t.bidClosingDate ? t.bidClosingDate.replace('T', ' ') : 'Open'}\n\n`;
              }
            });
            aiResponseText = res;
          }
        }

        if (!aiResponseText) {
          await new Promise(r => setTimeout(r, 400));
          if (q.includes("risk") || q.includes("critical")) {
            const criticals = projectsList.filter(p => p.riskLevel === 'Critical' || p.riskLevel === 'High');
            let res = `### 🚨 In-Progress High-Risk Projects\n\n`;
            criticals.forEach((p, idx) => {
              res += `#### ${idx + 1}. ${p.name}\n`;
              res += `* **ID:** \`${p.id}\` | **Agency:** ${p.agency} (${p.ministry})\n`;
              res += `* **Risk:** 🔴 ${p.riskLevel} (${p.riskScore}/100) | **Progress:** ${p.physicalProgress}%\n`;
              res += `* **Cost:** Sanctioned ₹${p.originalCostCr} Cr ➔ Revised **₹${p.revisedCostCr} Cr**\n\n`;
            });
            aiResponseText = res;
          } else {
            aiResponseText = `### 💡 PAI AI Synthesis for: "${query}"\n\n1,981 central sector projects and 7 active tender packages are indexed in the PAIMANA Flash Report database.`;
          }
        }
      }

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error("Error generating AI response:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (id, text) => {
    const cleanText = text
      .replace(/###\s*/g, '')
      .replace(/####\s*/g, '')
      .replace(/\*\*/g, '')
      .replace(/`/g, '');
    navigator.clipboard.writeText(cleanText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="pai-ai-container">
      {/* Official Top Assistant Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>Gemini LLM Copilot</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-Time Flash Report & CPPP Tenders Integration</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <Bot size={24} color="#ff9933" />
              <span>PAI AI Infrastructure & Tendering Assistant</span>
            </h2>
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
                whiteSpace: 'nowrap'
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="gov-card" style={{ display: 'flex', flexDirection: 'column', height: '640px', background: '#ffffff', borderRadius: '8px', overflow: 'hidden' }}>
        <div className="pai-ai-scroll" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', background: '#f8fafc' }}>
          {messages.map((m) => {
            const isAi = m.sender === 'ai';
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start',
                  maxWidth: isAi ? '92%' : '78%',
                  alignSelf: isAi ? 'flex-start' : 'flex-end',
                  flexDirection: isAi ? 'row' : 'row-reverse'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isAi ? 'var(--gov-navy)' : '#e2e8f0', color: isAi ? '#ff9933' : '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isAi ? <Bot size={20} /> : <User size={18} />}
                </div>

                <div style={{
                  background: isAi ? '#ffffff' : 'var(--gov-navy)',
                  color: isAi ? '#1e293b' : '#ffffff',
                  padding: '1.1rem 1.4rem',
                  borderRadius: '10px',
                  border: isAi ? '1px solid #e2e8f0' : 'none',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  position: 'relative',
                  width: '100%',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.72rem', color: isAi ? '#64748b' : '#cbd5e1' }}>
                    <strong>{isAi ? 'PAI AI Copilot' : 'User'}</strong>
                    <span>{m.timestamp}</span>
                  </div>

                  <FormattedChatMessage text={m.text} isAi={isAi} />

                  {isAi && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px', paddingTop: '6px', borderTop: '1px solid #f1f5f9' }}>
                      <button onClick={() => handleCopy(m.id, m.text)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '0.72rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {copiedId === m.id ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                        <span>{copiedId === m.id ? 'Copied!' : 'Copy response'}</span>
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

        <div style={{ padding: '1rem 1.5rem', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Ask PAI AI: 'what are the upcoming tenders requiring budget under 1000 cr', 'high risk projects'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem', border: '1.5px solid #cbd5e1', borderRadius: '6px', outline: 'none' }}
            />
            <button type="submit" disabled={!input.trim()} className="gov-btn gov-btn-primary">
              <span>Ask PAI AI</span>
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
