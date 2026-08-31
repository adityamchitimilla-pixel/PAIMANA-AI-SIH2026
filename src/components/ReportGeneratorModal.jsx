import React, { useState } from 'react';
import { 
  PAIMANA_SUMMARY, 
  HML_CATEGORIES, 
  MINISTRIES_DATA, 
  NORTH_EAST_SUMMARY,
  DETAILED_PROJECTS,
  ESCALATION_DRIVERS 
} from '../data/paimanaData';
import { 
  X, 
  Printer, 
  Download, 
  FileText, 
  Building, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function ReportGeneratorModal({ onClose }) {
  const [reportScope, setReportScope] = useState('full'); // 'full', 'critical', 'northeast'

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div className="gov-card" style={{
        width: '100%',
        maxWidth: '980px',
        maxHeight: '92vh',
        overflowY: 'auto',
        background: '#ffffff',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Controls Header */}
        <div style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border-gov)',
          background: 'var(--gov-navy)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>
              486th Flash Report on Central Sector Infrastructure Projects (April 2026)
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              Ministry of Statistics and Programme Implementation (MoSPI) • IPMD
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => window.print()}
              className="gov-btn gov-btn-saffron"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              <Printer size={14} /> Print Flash Report PDF
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '3px',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Document Body */}
        <div id="printable-report" style={{
          padding: '2rem',
          background: '#ffffff',
          color: '#0f172a',
          fontFamily: 'var(--font-family)',
          lineHeight: '1.5'
        }}>
          {/* Official MoSPI Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '2px solid var(--gov-navy)',
            paddingBottom: '1rem',
            marginBottom: '1.2rem'
          }}>
            <div>
              <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#475569', fontWeight: 800 }}>
                Government of India • भारत सरकार
              </h5>
              <h4 style={{ fontSize: '0.9rem', color: 'var(--gov-navy)', fontWeight: 700 }}>
                Ministry of Statistics and Programme Implementation (MoSPI)
              </h4>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '3px 0' }}>
                486th Flash Report on Central Sector Infrastructure Projects
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Costing ₹150 Crore & Above • As of <strong>APRIL 2026</strong>
              </p>
            </div>

            <div style={{ textAlign: 'right', borderLeft: '1px solid #cbd5e1', paddingLeft: '1rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--gov-navy)' }}>PAIMANA PORTAL</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>paimana.mospi.gov.in</div>
              <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 700, marginTop: '2px' }}>AI DECISION SUPPORT</div>
            </div>
          </div>

          {/* Key Indicators Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '8px',
            background: '#f8fafc',
            border: '1px solid var(--border-gov)',
            borderRadius: '4px',
            padding: '10px',
            marginBottom: '1.2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Projects Monitored</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gov-navy-dark)' }}>1,981 | 17</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Ongoing | Ministries</div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Original Cost</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>₹37,12,662 Cr</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>~₹37.13 Lakh Crore</div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Revised Cost</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#dc2626' }}>₹42,78,402 Cr</div>
              <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700 }}>+₹5,65,740 Cr (+15.2%)</div>
            </div>

            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Expenditure</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#166534' }}>₹20,36,107 Cr</div>
              <div style={{ fontSize: '0.7rem', color: '#166534' }}>47.59% of Revised Cost</div>
            </div>
          </div>

          {/* Section: Major Sectors Table */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--gov-navy)', borderBottom: '1px solid var(--border-gov)', paddingBottom: '4px', marginBottom: '6px' }}>
              I. Major Sectoral Distribution
            </h3>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Sector Name</th>
                  <th>Project Count</th>
                  <th>Original Cost (₹ Cr)</th>
                  <th>Revised Cost (₹ Cr)</th>
                  <th>Expenditure (₹ Cr)</th>
                  <th>Disbursal %</th>
                </tr>
              </thead>
              <tbody>
                {HML_CATEGORIES[0].sectors.slice(0, 4).concat(HML_CATEGORIES[1].sectors.slice(0, 2)).map((s) => (
                  <tr key={s.name}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.count}</td>
                    <td>₹{s.originalCost.toLocaleString()}</td>
                    <td style={{ color: s.revisedCost > s.originalCost ? '#dc2626' : 'inherit' }}>₹{s.revisedCost.toLocaleString()}</td>
                    <td style={{ color: '#166534', fontWeight: 600 }}>₹{s.expenditure.toLocaleString()}</td>
                    <td>{((s.expenditure / s.revisedCost) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section: Priority AI Interventions Table */}
          <div style={{ marginBottom: '1.2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#991b1b', borderBottom: '1px solid var(--border-gov)', paddingBottom: '4px', marginBottom: '6px' }}>
              II. Priority Early Warning & Escalation Directive
            </h3>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Project ID & Name</th>
                  <th>Ministry</th>
                  <th>Sanctioned / Revised</th>
                  <th>Progress</th>
                  <th>AI Risk Score</th>
                  <th>Prescriptive Directive</th>
                </tr>
              </thead>
              <tbody>
                {DETAILED_PROJECTS.slice(0, 5).map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gov-navy)' }}>{p.id}</span>: {p.name}
                    </td>
                    <td>{p.ministry}</td>
                    <td>₹{p.originalCostCr.toLocaleString()} ➔ ₹{p.revisedCostCr.toLocaleString()} Cr</td>
                    <td>{p.physicalProgress}%</td>
                    <td style={{ fontWeight: 700, color: p.riskScore >= 70 ? '#dc2626' : '#b45309' }}>
                      {p.riskScore}/100 ({p.riskLevel})
                    </td>
                    <td style={{ fontSize: '0.75rem' }}>
                      {p.aiPrescription}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Report Footer */}
          <div style={{
            borderTop: '1px solid var(--border-gov)',
            paddingTop: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: '#64748b'
          }}>
            <span>PAIMANA National Project-Monitoring Ecosystem • Problem Statement SIH26103</span>
            <span>Web Publication Date: April 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
