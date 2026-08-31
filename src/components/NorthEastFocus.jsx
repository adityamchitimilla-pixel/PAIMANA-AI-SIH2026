import React, { useState } from 'react';
import { 
  NORTH_EAST_SUMMARY, 
  DETAILED_PROJECTS 
} from '../data/paimanaData';
import { 
  MapPin, 
  Mountain, 
  Building, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert, 
  Layers,
  ArrowRight,
  Eye,
  Table
} from 'lucide-react';

export default function NorthEastFocus({ onSelectProject }) {
  const [selectedState, setSelectedState] = useState('ALL');

  // Filter NER projects
  const nerProjects = DETAILED_PROJECTS.filter(p => 
    p.state.includes('Assam') ||
    p.state.includes('Arunachal') ||
    p.state.includes('Manipur') ||
    p.state.includes('Meghalaya') ||
    p.state.includes('Mizoram') ||
    p.state.includes('Nagaland') ||
    p.state.includes('Sikkim') ||
    p.state.includes('Tripura') ||
    p.state.includes('North East')
  );

  const displayedProjects = selectedState === 'ALL'
    ? nerProjects
    : nerProjects.filter(p => p.state.includes(selectedState));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official NER Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
              <span className="gov-badge gov-badge-navy">Special Focus Section II</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                MoSPI 486th Flash Report (Table 5)
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              North Eastern Region (NER) Infrastructure Portfolio
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '850px', marginTop: '2px' }}>
              Special monitoring framework covering <strong>229 active infrastructure projects</strong> across all 8 North Eastern States totaling <strong>₹3,39,489 Crore</strong> in revised outlay.
            </p>
          </div>

          <div style={{ textAlign: 'right', background: '#f8fafc', padding: '8px 14px', borderRadius: '4px', border: '1px solid var(--border-gov)' }}>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
              NER Total Revised Outlay
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--gov-navy-dark)', fontFamily: 'var(--font-mono)' }}>
              ₹3,39,489 <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Cr</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
              ₹1.67L Cr Expended (49.25%)
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '10px'
      }}>
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid var(--gov-navy)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Total Projects in NER</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--gov-navy-dark)', margin: '2px 0' }}>229</div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>Across 12 Central Ministries</div>
        </div>

        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid #7c3aed' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Mega Projects in NER</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6b21a8', margin: '2px 0' }}>43 Proj</div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>₹2.00 Lakh Crore Outlay</div>
        </div>

        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid var(--gov-saffron)' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Major Projects in NER</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#b45309', margin: '2px 0' }}>186 Proj</div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>₹0.86 Lakh Crore Outlay</div>
        </div>

        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid #dc2626' }}>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 700 }}>Cost Overrun in NER</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#dc2626', margin: '2px 0' }}>₹53,785 Cr</div>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600 }}>+18.82% Overall Escalation</div>
        </div>
      </div>

      {/* State Outlay Cards */}
      <div className="gov-card" style={{ padding: '1rem 1.2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
            8 North Eastern States Outlay Matrix (Click to Filter)
          </h3>
          {selectedState !== 'ALL' && (
            <button onClick={() => setSelectedState('ALL')} className="gov-btn gov-btn-secondary" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
              Reset Filter
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '8px'
        }}>
          {NORTH_EAST_SUMMARY.statesBreakdown.map((st) => {
            const isSelected = selectedState === st.state;
            const disbursal = st.costThousandCr > 0 ? ((st.expThousandCr / st.costThousandCr) * 100).toFixed(0) : 0;

            return (
              <div
                key={st.state}
                onClick={() => setSelectedState(isSelected ? 'ALL' : st.state)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '4px',
                  background: isSelected ? '#003366' : '#ffffff',
                  color: isSelected ? '#ffffff' : 'var(--text-primary)',
                  border: isSelected ? '2px solid #002244' : '1px solid var(--border-gov)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <strong>{st.state}</strong>
                  <span style={{
                    padding: '1px 5px',
                    borderRadius: '3px',
                    background: isSelected ? '#ff9933' : '#e2e8f0',
                    color: isSelected ? '#000000' : '#1e293b',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}>
                    {st.count} Proj
                  </span>
                </div>

                <div style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Outlay:</span>
                  <strong>₹{st.costThousandCr} K Cr</strong>
                </div>

                <div style={{ fontSize: '0.75rem', opacity: isSelected ? 0.9 : 0.8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Expended:</span>
                  <strong style={{ color: isSelected ? '#86efac' : '#166534' }}>₹{st.expThousandCr} K Cr ({disbursal}%)</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Projects Table */}
      <div className="gov-card" style={{ overflow: 'hidden' }}>
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Mountain size={16} color="var(--gov-navy)" /> Table 5: Strategic Ongoing Infrastructure Projects in North East {selectedState !== 'ALL' && `(${selectedState})`}
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project ID & Name</th>
                <th>Agency</th>
                <th>State</th>
                <th>Sanctioned (₹ Cr)</th>
                <th>Revised (₹ Cr)</th>
                <th>Progress %</th>
                <th>Target DoC</th>
                <th>AI Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedProjects.map((p) => (
                <tr key={p.id}>
                  <td style={{ maxWidth: '280px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{p.id}</span>
                    <div style={{ fontWeight: 600, color: 'var(--gov-navy-dark)', marginTop: '2px' }}>{p.name}</div>
                  </td>
                  <td>{p.agency}</td>
                  <td>{p.state}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>₹{p.originalCostCr.toLocaleString()}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: p.revisedCostCr > p.originalCostCr ? '#dc2626' : '#166534', fontWeight: 600 }}>
                    ₹{p.revisedCostCr.toLocaleString()}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div className="gov-progress-track" style={{ width: '45px', height: '6px' }}>
                        <div className="gov-progress-fill" style={{ width: `${p.physicalProgress}%` }}></div>
                      </div>
                      <strong>{p.physicalProgress}%</strong>
                    </div>
                  </td>
                  <td>{p.revisedDoC || p.originalTargetDoC}</td>
                  <td>
                    <span className={`gov-badge gov-badge-${p.riskLevel.toLowerCase()}`}>
                      {p.riskLevel}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => onSelectProject(p)}
                      className="gov-btn gov-btn-secondary"
                      style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                    >
                      Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
