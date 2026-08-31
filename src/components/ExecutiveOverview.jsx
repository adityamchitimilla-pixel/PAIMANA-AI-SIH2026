import React, { useState } from 'react';
import { 
  PAIMANA_SUMMARY, 
  HML_CATEGORIES, 
  MINISTRIES_DATA,
  COMPLETED_PROJECTS_RECENT,
  NEWLY_ADDED_HIGHLIGHTS,
  DETAILED_PROJECTS
} from '../data/paimanaData';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  PlusCircle, 
  Building, 
  Flame, 
  Droplets, 
  Radio, 
  Users, 
  Pickaxe,
  ArrowRight,
  ShieldAlert,
  FileText,
  Building2,
  MapPin,
  Layers
} from 'lucide-react';

export default function ExecutiveOverview({ onSelectProject, onNavigateToTab }) {
  const [selectedHmlCategory, setSelectedHmlCategory] = useState(null);

  const getHmlIcon = (catNum) => {
    switch (catNum) {
      case 1: return Building;
      case 2: return Flame;
      case 3: return Droplets;
      case 4: return Radio;
      case 5: return Users;
      default: return Pickaxe;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Executive Header Card */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span className="gov-badge gov-badge-navy">Executive Summary</span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                486th Flash Report on Central Sector Projects (April 2026)
              </span>
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              National Infrastructure Monitoring Dashboard
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '850px', marginTop: '2px' }}>
              Monthly computerized assessment of <strong>1,981 central sector projects (₹150 Cr+)</strong> across 17 Central Ministries and 22 sectors, with AI-powered predictive cost, time overrun forecasting, and early warning risk indicators.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => onNavigateToTab('gis-map')}
              className="gov-btn gov-btn-primary"
            >
              <MapPin size={14} />
              <span>National GIS Map</span>
            </button>
            <button 
              onClick={() => onNavigateToTab('early-warning')}
              className="gov-btn gov-btn-saffron"
            >
              <ShieldAlert size={14} />
              <span>Early Warning Radar</span>
            </button>
            <button 
              onClick={() => onNavigateToTab('cuf-simulator')}
              className="gov-btn gov-btn-secondary"
            >
              <TrendingUp size={14} />
              <span>What-If Sandbox</span>
            </button>
          </div>
        </div>
      </div>

      {/* Official 5 Key Performance Indicator Cards (from Flash Report Header) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '10px'
      }}>
        {/* Total Projects */}
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid var(--gov-navy)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Ongoing Projects
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--gov-navy-dark)', margin: '2px 0' }}>
            1,981 <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>| 17 Min.</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
            +87% Project Count Growth (vs 2016)
          </div>
        </div>

        {/* Original Cost */}
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid var(--gov-navy-mid)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Original Sanctioned Cost
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a', margin: '2px 0' }}>
            ₹37.13 <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Lakh Cr</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            ₹37,12,662 Crore Approved Baseline
          </div>
        </div>

        {/* Revised Cost */}
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid #dc2626' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#991b1b', fontWeight: 700 }}>
            Latest Revised Cost
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#dc2626', margin: '2px 0' }}>
            ₹42.78 <span style={{ fontSize: '0.85rem', color: '#991b1b' }}>Lakh Cr</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 700 }}>
            Cost Overrun: +₹5.65 Lakh Cr (+15.2%)
          </div>
        </div>

        {/* Expenditure */}
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid var(--gov-green)' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#166534', fontWeight: 700 }}>
            Cumulative Expenditure
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#166534', margin: '2px 0' }}>
            ₹20.36 <span style={{ fontSize: '0.85rem', color: '#166534' }}>Lakh Cr</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600 }}>
            47.59% of Revised Cost Outlay
          </div>
        </div>

        {/* Scale Breakdown */}
        <div className="gov-card" style={{ padding: '12px 16px', borderTop: '3px solid #7c3aed' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700 }}>
            Mega Projects (≥ ₹1000 Cr)
          </div>
          <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#6b21a8', margin: '2px 0' }}>
            814 <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Projects</span>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569' }}>
            Outlay: ₹31.63 Lakh Cr (85.2% of Total)
          </div>
        </div>
      </div>

      {/* Official 10-Year Decadal Growth & Physical/Financial Progress Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '1rem'
      }}>
        {/* 10-Year Trajectory */}
        <div className="gov-card">
          <div className="gov-card-header">
            <span className="gov-card-title">
              <TrendingUp size={16} color="var(--gov-navy)" /> 10-Year Trend Analysis (April 2016 vs April 2026)
            </span>
            <span className="gov-badge gov-badge-navy">MoSPI Decadal Index</span>
          </div>

          <div style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Metric 1 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '3px' }}>
                <span style={{ color: '#475569' }}>Project Volume Monitored</span>
                <strong style={{ color: 'var(--gov-navy-dark)' }}>1,061 ➔ 1,981 Projects (+87%)</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill" style={{ width: '87%' }}></div>
              </div>
            </div>

            {/* Metric 2 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '3px' }}>
                <span style={{ color: '#475569' }}>Total Portfolio Capital Value</span>
                <strong style={{ color: '#9a3412' }}>₹12.51L Cr ➔ ₹37.13L Cr (+189%)</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill" style={{ width: '92%', background: 'var(--gov-saffron)' }}></div>
              </div>
            </div>

            {/* Metric 3 */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '3px' }}>
                <span style={{ color: '#475569' }}>Cumulative Expenditure Outlay</span>
                <strong style={{ color: '#166534' }}>₹5.68L Cr ➔ ₹20.36L Cr (+245%)</strong>
              </div>
              <div className="gov-progress-track">
                <div className="gov-progress-fill" style={{ width: '96%', background: 'var(--gov-green)' }}></div>
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid var(--border-light)',
              padding: '8px 12px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: '#475569'
            }}>
              Official Observation: Capital investments have tripled over the past decade, demonstrating rapid asset expansion under PM GatiShakti and Central Infrastructure Masterplans.
            </div>
          </div>
        </div>

        {/* Physical vs Financial Progress Breakdown */}
        <div className="gov-card">
          <div className="gov-card-header">
            <span className="gov-card-title">
              <Building2 size={16} color="var(--gov-navy)" /> Physical vs Financial Progress Distribution
            </span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '0.75rem' }}>
              <span style={{ color: 'var(--gov-navy)', fontWeight: 600 }}>■ Physical %</span>
              <span style={{ color: '#b45309', fontWeight: 600 }}>■ Financial %</span>
            </div>
          </div>

          <div style={{ padding: '1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {PAIMANA_SUMMARY.progressBuckets.physical.map((item, idx) => {
              const finItem = PAIMANA_SUMMARY.progressBuckets.financial[idx];
              const maxCount = 801;
              const physWidth = (item.count / maxCount) * 100;
              const finWidth = (finItem.count / maxCount) * 100;

              return (
                <div key={item.range} style={{ fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 600 }}>{item.range}</span>
                    <span style={{ color: '#475569' }}>
                      <strong style={{ color: 'var(--gov-navy)' }}>{item.count}</strong> Physical | <strong style={{ color: '#b45309' }}>{finItem.count}</strong> Financial
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${physWidth}%`, height: '100%', background: 'var(--gov-navy)' }} />
                    </div>
                    <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${finWidth}%`, height: '100%', background: 'var(--gov-saffron)' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Harmonized Master List (HML 2022) Sector Overview Cards */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Building size={16} color="var(--gov-navy)" /> Harmonized Master List (HML 2022) Category Classifications
          </span>
          <span className="gov-badge gov-badge-navy">6 Key Categories</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '10px',
          padding: '1rem'
        }}>
          {HML_CATEGORIES.map((cat) => {
            const isSelected = selectedHmlCategory?.id === cat.id;

            return (
              <div 
                key={cat.id}
                onClick={() => setSelectedHmlCategory(isSelected ? null : cat)}
                style={{
                  padding: '12px 14px',
                  background: isSelected ? '#e8f0fe' : '#ffffff',
                  border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--border-gov)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--gov-navy)', background: '#e2e8f0', padding: '1px 6px', borderRadius: '2px' }}>
                    CATEGORY {cat.categoryNumber}
                  </span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>
                    {cat.expenditurePercent}% Expended
                  </span>
                </div>

                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '4px' }}>
                  {cat.name}
                </h4>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '2px' }}>
                  <span>Projects Monitored:</span>
                  <strong style={{ color: '#0f172a' }}>{cat.projectCount}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>
                  <span>Sanctioned Cost:</span>
                  <strong>₹{(cat.originalCostCr / 100000).toFixed(2)}L Cr</strong>
                </div>

                <div className="gov-progress-track" style={{ height: '6px', marginTop: '6px' }}>
                  <div className="gov-progress-fill" style={{ width: `${cat.expenditurePercent}%` }}></div>
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--gov-blue-accent)', fontWeight: 600, marginTop: '6px', textAlign: 'right' }}>
                  {isSelected ? 'Collapse Sub-Sectors ▲' : 'View Sub-Sectors ▼'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected HML Sub-Sectors Detailed Table */}
        {selectedHmlCategory && (
          <div style={{ padding: '0 1rem 1rem 1rem' }}>
            <div style={{ background: '#f8fafc', border: '1px solid var(--border-light)', borderRadius: '4px', padding: '12px' }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy)', marginBottom: '8px' }}>
                Sub-Sector Breakdown: {selectedHmlCategory.name} ({selectedHmlCategory.projectCount} Projects)
              </h4>

              <div style={{ overflowX: 'auto' }}>
                <table className="gov-table">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Sector Name</th>
                      <th>Project Count</th>
                      <th>Original Cost (₹ Cr)</th>
                      <th>Revised Cost (₹ Cr)</th>
                      <th>Expenditure (₹ Cr)</th>
                      <th>Disbursal %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedHmlCategory.sectors.map((sec, sIdx) => {
                      const disbursalPct = sec.revisedCost > 0 ? ((sec.expenditure / sec.revisedCost) * 100).toFixed(1) : 0;
                      return (
                        <tr key={sec.name}>
                          <td>{sIdx + 1}</td>
                          <td style={{ fontWeight: 600 }}>{sec.name}</td>
                          <td>{sec.count}</td>
                          <td>₹{sec.originalCost.toLocaleString()}</td>
                          <td style={{ color: sec.revisedCost > sec.originalCost ? '#dc2626' : 'inherit', fontWeight: 600 }}>
                            ₹{sec.revisedCost.toLocaleString()}
                          </td>
                          <td style={{ color: '#166534', fontWeight: 600 }}>₹{sec.expenditure.toLocaleString()}</td>
                          <td><strong>{disbursalPct}%</strong></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Strategic Central Sector Projects Table */}
      <div className="gov-card">
        <div className="gov-card-header">
          <span className="gov-card-title">
            <Layers size={16} color="var(--gov-navy)" /> Featured Mega Infrastructure Corridors Under Monitoring
          </span>
          <button 
            onClick={() => onNavigateToTab('projects')}
            className="gov-btn gov-btn-secondary" 
            style={{ fontSize: '0.75rem', padding: '2px 8px' }}
          >
            All 1,981 Projects ➔
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project ID & Title</th>
                <th>Agency / Sector</th>
                <th>State / Territory</th>
                <th>Sanctioned Cost</th>
                <th>Revised Cost</th>
                <th>Physical Progress</th>
                <th>Target DoC</th>
                <th>AI Risk Score</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {DETAILED_PROJECTS.slice(0, 6).map((proj) => (
                <tr key={proj.id}>
                  <td style={{ maxWidth: '280px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{proj.id}</span>
                    <div style={{ fontWeight: 600, color: 'var(--gov-navy-dark)', marginTop: '2px' }}>{proj.name}</div>
                  </td>
                  <td>
                    <div><strong>{proj.agency}</strong></div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{proj.sector}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{proj.state}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>₹{proj.originalCostCr.toLocaleString()} Cr</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: proj.revisedCostCr > proj.originalCostCr ? '#dc2626' : '#166534', fontWeight: 600 }}>
                    ₹{proj.revisedCostCr.toLocaleString()} Cr
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div className="gov-progress-track" style={{ width: '60px', height: '6px' }}>
                        <div className="gov-progress-fill" style={{ width: `${proj.physicalProgress}%` }}></div>
                      </div>
                      <strong>{proj.physicalProgress}%</strong>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>{proj.revisedDoC || proj.originalTargetDoC}</td>
                  <td>
                    <span className={`gov-badge gov-badge-${proj.riskLevel.toLowerCase()}`}>
                      {proj.riskLevel} • {proj.riskScore}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => onSelectProject(proj)}
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
