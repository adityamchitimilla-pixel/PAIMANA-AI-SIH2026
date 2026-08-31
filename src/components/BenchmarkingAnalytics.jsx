import React, { useState } from 'react';
import { 
  MINISTRIES_DATA, 
  STATES_SUMMARY, 
  ESCALATION_DRIVERS,
  HML_CATEGORIES 
} from '../data/paimanaData';
import { 
  BarChart3, 
  PieChart, 
  Layers, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  MapPin, 
  Building2,
  Info
} from 'lucide-react';

export default function BenchmarkingAnalytics() {
  const [activeView, setActiveView] = useState('ministries'); // 'ministries', 'states', 'drivers'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span className="gov-badge gov-badge-navy">Analytical Modules (e) & (f)</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                MoSPI / IPMD Inter-Ministerial Analytics
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              Benchmarking & Cost Escalation Driver Analysis
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Cross-sectoral performance comparisons and empirical Pareto decomposition of ₹5.65 Lakh Crore in project cost escalations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveView('ministries')}
              className={`gov-btn ${activeView === 'ministries' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
            >
              <Building2 size={14} /> Ministry Benchmarks
            </button>
            <button
              onClick={() => setActiveView('states')}
              className={`gov-btn ${activeView === 'states' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
            >
              <MapPin size={14} /> State Matrix
            </button>
            <button
              onClick={() => setActiveView('drivers')}
              className={`gov-btn ${activeView === 'drivers' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
            >
              <AlertTriangle size={14} /> Escalation Drivers
            </button>
          </div>
        </div>
      </div>

      {/* View 1: Ministry Scorecard */}
      {activeView === 'ministries' && (
        <div className="gov-card" style={{ overflow: 'hidden' }}>
          <div className="gov-card-header">
            <span className="gov-card-title">
              <Building2 size={16} color="var(--gov-navy)" /> Table 1: Ministry-wise Ongoing Projects & Financial Outlay (April 2026)
            </span>
            <span className="gov-badge gov-badge-navy">17 Line Ministries</span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>Ministry / Department Name</th>
                  <th>Projects Count</th>
                  <th>Mega (≥₹1K Cr)</th>
                  <th>Major (&lt;₹1K Cr)</th>
                  <th>Original Cost (₹ Cr)</th>
                  <th>Revised Cost (₹ Cr)</th>
                  <th>Cost Overrun %</th>
                  <th>Expenditure (₹ Cr)</th>
                  <th>Disbursal %</th>
                </tr>
              </thead>
              <tbody>
                {MINISTRIES_DATA.map((m) => {
                  const overrunPct = m.originalCost > 0 ? (((m.revisedCost - m.originalCost) / m.originalCost) * 100).toFixed(1) : 0;
                  const disbursalPct = m.revisedCost > 0 ? ((m.expenditure / m.revisedCost) * 100).toFixed(1) : 0;

                  return (
                    <tr key={m.code}>
                      <td style={{ fontWeight: 600 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gov-navy)', marginRight: '6px' }}>{m.code}</span>
                        {m.name}
                      </td>
                      <td style={{ fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{m.count}</td>
                      <td>{m.mega}</td>
                      <td>{m.major}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>₹{m.originalCost.toLocaleString()}</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: m.revisedCost > m.originalCost ? '#dc2626' : 'inherit', fontWeight: 600 }}>
                        ₹{m.revisedCost.toLocaleString()}
                      </td>
                      <td>
                        <span className={`gov-badge ${overrunPct > 15 ? 'gov-badge-critical' : 'gov-badge-low'}`}>
                          {overrunPct > 0 ? `+${overrunPct}%` : '0%'}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: '#166534', fontWeight: 600 }}>
                        ₹{m.expenditure.toLocaleString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div className="gov-progress-track" style={{ width: '40px', height: '6px' }}>
                            <div className="gov-progress-fill" style={{ width: `${disbursalPct}%` }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{disbursalPct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 2: State Matrix */}
      {activeView === 'states' && (
        <div className="gov-card" style={{ overflow: 'hidden' }}>
          <div className="gov-card-header">
            <span className="gov-card-title">
              <MapPin size={16} color="var(--gov-navy)" /> Table 2: State-wise Ongoing Projects Outlay (35 States & UTs)
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="gov-table">
              <thead>
                <tr>
                  <th>State / Union Territory</th>
                  <th>Region</th>
                  <th>Ongoing Projects</th>
                  <th>Capital Outlay (₹ Lakh Cr)</th>
                  <th>Expenditure (₹ Lakh Cr)</th>
                  <th>Disbursal %</th>
                  <th>Primary Sector Focus</th>
                </tr>
              </thead>
              <tbody>
                {STATES_SUMMARY.map((s, idx) => {
                  const disbursal = s.costLakhCr > 0 ? ((s.expenditureLakhCr / s.costLakhCr) * 100).toFixed(1) : 0;
                  return (
                    <tr key={s.state}>
                      <td style={{ fontWeight: 600 }}>{idx + 1}. {s.state}</td>
                      <td>{s.region || "Central"}</td>
                      <td style={{ fontWeight: 700 }}>{s.count}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>₹{s.costLakhCr} Lakh Cr</td>
                      <td style={{ fontFamily: 'var(--font-mono)', color: '#166534' }}>₹{s.expenditureLakhCr} Lakh Cr</td>
                      <td><strong>{disbursal}%</strong></td>
                      <td style={{ fontSize: '0.75rem', color: '#475569' }}>{s.topSector}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View 3: Escalation Drivers */}
      {activeView === 'drivers' && (
        <div className="gov-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              Pareto Decomposition of Root Causes of Cost Escalation
            </h3>
            <span className="gov-badge gov-badge-critical">₹5.65 Lakh Crore Aggregate Overrun</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ESCALATION_DRIVERS.map((d, idx) => (
              <div 
                key={d.name}
                style={{
                  padding: '10px 14px',
                  background: '#f8fafc',
                  border: '1px solid var(--border-light)',
                  borderRadius: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                    {idx + 1}. {d.name}
                  </span>
                  <div style={{ fontSize: '0.8rem' }}>
                    Impact: <strong style={{ color: '#991b1b' }}>₹{d.impactCr.toLocaleString()} Cr</strong> | Share: <strong>{d.share}%</strong> | Avg Delay: <strong>{d.avgDelayMonths} mo</strong>
                  </div>
                </div>

                <div className="gov-progress-track" style={{ height: '7px' }}>
                  <div 
                    className="gov-progress-fill" 
                    style={{ 
                      width: `${d.share * 2.5}%`, 
                      background: idx === 0 ? '#dc2626' : idx === 1 ? '#ea580c' : 'var(--gov-navy)' 
                    }} 
                  />
                </div>

                <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Affecting {d.affectedProjects} monitored projects</span>
                  <span>Intervention: Fast-track State Revenue & Forest GatiShakti clearance portal</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
