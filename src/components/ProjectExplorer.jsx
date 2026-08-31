import React, { useState, useMemo } from 'react';
import { 
  DETAILED_PROJECTS, 
  MINISTRIES_DATA, 
  STATES_SUMMARY 
} from '../data/paimanaData';
import { calculateRiskScore, predictCostOverrun, predictTimeOverrun } from '../utils/aiEngine';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Building, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Layers
} from 'lucide-react';

export default function ProjectExplorer({ onSelectProject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('ALL');
  const [selectedState, setSelectedState] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');
  const [sortBy, setSortBy] = useState('cost'); // 'cost', 'overrun', 'progress', 'delay', 'risk'
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Enrich projects with real-time AI calculations
  const allProjects = useMemo(() => {
    return DETAILED_PROJECTS.map(p => {
      const risk = calculateRiskScore(p);
      const costPred = predictCostOverrun(p);
      const timePred = predictTimeOverrun(p);
      const overrunPct = p.originalCostCr > 0 ? ((p.revisedCostCr - p.originalCostCr) / p.originalCostCr) * 100 : 0;

      return {
        ...p,
        risk,
        costPred,
        timePred,
        overrunPct
      };
    });
  }, []);

  // Filtered & Sorted list
  const filteredProjects = useMemo(() => {
    return allProjects.filter(p => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sector.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesMinistry = selectedMinistry === 'ALL' || p.ministry === selectedMinistry;
      const matchesState = selectedState === 'ALL' || p.state.includes(selectedState);
      const matchesCategory = selectedCategory === 'ALL' || 
        (selectedCategory === 'MEGA' && p.originalCostCr >= 1000) ||
        (selectedCategory === 'MAJOR' && p.originalCostCr < 1000);
      const matchesRisk = selectedRisk === 'ALL' || p.risk.riskLevel.toUpperCase() === selectedRisk;

      return matchesSearch && matchesMinistry && matchesState && matchesCategory && matchesRisk;
    }).sort((a, b) => {
      let valA, valB;
      if (sortBy === 'cost') {
        valA = a.originalCostCr;
        valB = b.originalCostCr;
      } else if (sortBy === 'overrun') {
        valA = a.overrunPct;
        valB = b.overrunPct;
      } else if (sortBy === 'progress') {
        valA = a.physicalProgress;
        valB = b.physicalProgress;
      } else if (sortBy === 'delay') {
        valA = a.delayMonths;
        valB = b.delayMonths;
      } else if (sortBy === 'risk') {
        valA = a.risk.score;
        valB = b.risk.score;
      }
      return sortOrder === 'desc' ? valB - valA : valA - valB;
    });
  }, [allProjects, searchTerm, selectedMinistry, selectedState, selectedCategory, selectedRisk, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage) || 1;
  const paginatedProjects = filteredProjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleExportCSV = () => {
    const headers = "Project ID,Project Name,Ministry,Sector,State,Original Cost (Cr),Revised Cost (Cr),Expenditure (Cr),Physical Progress (%),Delay (Months),AI Risk Score,Risk Level\n";
    const rows = filteredProjects.map(p => 
      `"${p.id}","${p.name.replace(/"/g, '""')}","${p.ministry}","${p.sector}","${p.state}",${p.originalCostCr},${p.revisedCostCr},${p.expenditureCr},${p.physicalProgress},${p.delayMonths},${p.risk.score},"${p.risk.riskLevel}"`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `PAIMANA_Projects_Registry_April2026.csv`;
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Table Filter Header Card */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '2px' }}>
              PAIMANA Database ➔ Table 6 All Ongoing Central Sector Projects (April 2026)
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              Central Sector Projects Repository & Monitoring Ledger
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Filterable ledger of monitored projects costing ₹150 Cr and above across 17 Line Ministries.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="gov-btn gov-btn-secondary"
            title="Download CSV for current filtered table"
          >
            <Download size={14} />
            <span>Export Official CSV</span>
          </button>
        </div>

        {/* Filter Controls Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '8px'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', gridColumn: 'span 2' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search by Project ID (e.g. 705728), Name, Agency, State..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '8px 10px 8px 30px',
                fontSize: '0.85rem',
                border: '1px solid var(--border-gov)',
                borderRadius: '3px',
                outline: 'none'
              }}
            />
          </div>

          {/* Ministry Filter */}
          <div>
            <select
              value={selectedMinistry}
              onChange={(e) => { setSelectedMinistry(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-gov)',
                borderRadius: '3px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="ALL">All Ministries (17)</option>
              {MINISTRIES_DATA.map(m => (
                <option key={m.name} value={m.name}>
                  {m.code} - {m.name} ({m.count})
                </option>
              ))}
            </select>
          </div>

          {/* State Filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => { setSelectedState(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-gov)',
                borderRadius: '3px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="ALL">All States / UTs</option>
              {STATES_SUMMARY.map(s => (
                <option key={s.state} value={s.state}>
                  {s.state} ({s.count})
                </option>
              ))}
            </select>
          </div>

          {/* Scale Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-gov)',
                borderRadius: '3px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="ALL">All Project Scales</option>
              <option value="MEGA">Mega (≥ ₹1000 Cr)</option>
              <option value="MAJOR">Major (&lt; ₹1000 Cr)</option>
            </select>
          </div>

          {/* Risk Filter */}
          <div>
            <select
              value={selectedRisk}
              onChange={(e) => { setSelectedRisk(e.target.value); setCurrentPage(1); }}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '0.8rem',
                border: '1px solid var(--border-gov)',
                borderRadius: '3px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="ALL">All AI Risk Levels</option>
              <option value="CRITICAL">🔴 Critical Risk</option>
              <option value="HIGH">🟠 High Risk</option>
              <option value="MODERATE">🟡 Moderate Risk</option>
              <option value="LOW">🟢 Low / Healthy</option>
            </select>
          </div>
        </div>

        {/* Sorting Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem', fontSize: '0.8rem', color: '#475569' }}>
          <div>
            Found <strong>{filteredProjects.length}</strong> matching project records
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Sort by:</span>
            {[
              { id: 'cost', label: 'Budget' },
              { id: 'overrun', label: 'Overrun %' },
              { id: 'progress', label: 'Progress %' },
              { id: 'delay', label: 'Delay' },
              { id: 'risk', label: 'Risk' }
            ].map(s => (
              <button
                key={s.id}
                onClick={() => {
                  if (sortBy === s.id) {
                    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
                  } else {
                    setSortBy(s.id);
                    setSortOrder('desc');
                  }
                }}
                style={{
                  padding: '2px 8px',
                  borderRadius: '3px',
                  border: '1px solid var(--border-gov)',
                  background: sortBy === s.id ? 'var(--gov-navy)' : '#ffffff',
                  color: sortBy === s.id ? '#ffffff' : '#334155',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: sortBy === s.id ? 700 : 500
                }}
              >
                {s.label} {sortBy === s.id && (sortOrder === 'desc' ? '↓' : '↑')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Official Government Table */}
      <div className="gov-card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="gov-table">
            <thead>
              <tr>
                <th>Project ID & Name</th>
                <th>Agency / Sector</th>
                <th>State</th>
                <th>Sanctioned (₹ Cr)</th>
                <th>Revised (₹ Cr)</th>
                <th>Physical %</th>
                <th>Expenditure (₹ Cr)</th>
                <th>Target DoC</th>
                <th>AI Risk</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProjects.map((p) => {
                const hasCostOverrun = p.revisedCostCr > p.originalCostCr;
                const risk = p.risk;

                return (
                  <tr key={p.id}>
                    <td style={{ maxWidth: '280px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{p.id}</span>
                      {p.isMega && (
                        <span style={{ fontSize: '0.65rem', marginLeft: '6px', padding: '1px 4px', borderRadius: '2px', background: '#f1f5f9', color: '#002244', fontWeight: 800, border: '1px solid #cbd5e1' }}>
                          MEGA
                        </span>
                      )}
                      <div 
                        onClick={() => onSelectProject(p)}
                        style={{ fontWeight: 600, color: '#0f172a', lineHeight: '1.3', marginTop: '2px', cursor: 'pointer' }}
                        title="Click to view dossier"
                      >
                        {p.name}
                      </div>
                    </td>

                    <td>
                      <div><strong>{p.agency}</strong></div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{p.sector}</div>
                    </td>

                    <td style={{ fontSize: '0.8rem' }}>{p.state}</td>

                    <td style={{ fontFamily: 'var(--font-mono)' }}>₹{p.originalCostCr.toLocaleString()}</td>

                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: hasCostOverrun ? '#dc2626' : '#166534' }}>
                        ₹{p.revisedCostCr.toLocaleString()}
                      </span>
                      {hasCostOverrun && (
                        <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: 600 }}>
                          +{p.overrunPct.toFixed(1)}%
                        </div>
                      )}
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div className="gov-progress-track" style={{ width: '50px', height: '6px' }}>
                          <div className="gov-progress-fill" style={{ width: `${p.physicalProgress}%` }}></div>
                        </div>
                        <strong>{p.physicalProgress}%</strong>
                      </div>
                    </td>

                    <td style={{ color: '#166534', fontFamily: 'var(--font-mono)' }}>
                      ₹{p.expenditureCr.toLocaleString()}
                    </td>

                    <td style={{ fontSize: '0.75rem' }}>
                      <div>{p.revisedDoC || p.originalTargetDoC}</div>
                      {p.delayMonths > 0 ? (
                        <span style={{ color: '#b45309', fontWeight: 600 }}>+{p.delayMonths}mo</span>
                      ) : (
                        <span style={{ color: '#166534' }}>On Track</span>
                      )}
                    </td>

                    <td>
                      <span className={`gov-badge gov-badge-${risk.riskLevel.toLowerCase()}`}>
                        {risk.riskLevel} • {risk.score}
                      </span>
                    </td>

                    <td>
                      <button
                        onClick={() => onSelectProject(p)}
                        className="gov-btn gov-btn-secondary"
                        style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 16px',
          background: '#f8fafc',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.8rem',
          color: '#475569'
        }}>
          <div>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({filteredProjects.length} items)
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="gov-btn gov-btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              <ChevronLeft size={13} /> Prev
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="gov-btn gov-btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem', opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
