import React, { useState } from 'react';
import { 
  PAIMANA_SUMMARY, 
  STATES_SUMMARY, 
  DETAILED_PROJECTS 
} from '../data/paimanaData';
import { 
  Building2, 
  Search, 
  MapPin, 
  MessageSquarePlus, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  DollarSign, 
  Layers, 
  Camera, 
  Send, 
  FileText, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Filter,
  Sparkles
} from 'lucide-react';
import NationalInfrastructureMap from './NationalInfrastructureMap';

export default function CitizenPortal({ 
  citizenUser, 
  citizenReports, 
  onAddCitizenReport, 
  onSelectProject 
}) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Grievance Form State
  const [reportForm, setReportForm] = useState({
    projectId: DETAILED_PROJECTS[0].id,
    issueType: 'Construction delay & stalled work',
    severity: 'High',
    location: '',
    description: '',
    photoFile: null,
    photoPreview: null
  });
  const [submittedNotification, setSubmittedNotification] = useState(null);

  // Filter projects for Citizen Search
  const filteredProjects = DETAILED_PROJECTS.filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'All' || p.sector === selectedSector;
    const matchesState = selectedState === 'All' || p.state.includes(selectedState);
    const matchesStatus = selectedStatus === 'All' || 
      (selectedStatus === 'Delayed' && p.delayMonths > 0) ||
      (selectedStatus === 'High Risk' && (p.riskLevel === 'Critical' || p.riskLevel === 'High')) ||
      (selectedStatus === 'On Track' && p.delayMonths === 0);
    return matchesQuery && matchesSector && matchesState && matchesStatus;
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setReportForm({ ...reportForm, photoFile: file, photoPreview: previewUrl });
    }
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    const proj = DETAILED_PROJECTS.find(p => p.id === reportForm.projectId) || DETAILED_PROJECTS[0];
    
    const newReport = {
      id: `GRV-2026-${(proj.state.slice(0, 2) || 'IN').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
      projectName: proj.name,
      projectId: proj.id,
      state: proj.state,
      district: proj.state.split(' ')[0],
      location: reportForm.location || 'Local Project Corridor Site',
      issueType: reportForm.issueType,
      severity: reportForm.severity,
      description: reportForm.description,
      reportedBy: `${citizenUser.name} (Aadhaar Verified)`,
      reportedDate: new Date().toISOString().split('T')[0],
      status: 'Under Investigation',
      statusColor: '#f59e0b',
      assignedAgency: proj.agency,
      officialResponse: 'Grievance assigned to Implementing Agency Nodal Officer for on-ground verification.',
      imageUrl: reportForm.photoPreview || 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=500&auto=format&fit=crop&q=60'
    };

    onAddCitizenReport(newReport);
    setSubmittedNotification(newReport.id);
    setReportForm({
      projectId: DETAILED_PROJECTS[0].id,
      issueType: 'Construction delay & stalled work',
      severity: 'High',
      location: '',
      description: '',
      photoFile: null,
      photoPreview: null
    });
    setTimeout(() => setSubmittedNotification(null), 6000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', padding: '1rem 0 3rem 0' }}>
      
      {/* Citizen Welcome Banner */}
      <div className="gov-card" style={{
        padding: '1.5rem 2rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
        borderLeft: '6px solid #10b981',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge" style={{ background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' }}>
                Citizen Transparency Portal
              </span>
              <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
                {citizenUser.authType || 'Aadhaar Verified Citizen'}
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: 0 }}>
              Welcome, {citizenUser.name || 'Citizen of India'}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Track the progress, costs, and timelines of 1,981 Central Sector Infrastructure Projects shaping India.
            </p>
          </div>

          {/* Navigation Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeTab === 'dashboard' ? '2px solid #059669' : '1px solid #cbd5e1',
                background: activeTab === 'dashboard' ? '#ecfdf5' : '#ffffff',
                color: activeTab === 'dashboard' ? '#065f46' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Building2 size={16} />
              <span>Public Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeTab === 'search' ? '2px solid #059669' : '1px solid #cbd5e1',
                background: activeTab === 'search' ? '#ecfdf5' : '#ffffff',
                color: activeTab === 'search' ? '#065f46' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Search size={16} />
              <span>Search Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('map')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeTab === 'map' ? '2px solid #059669' : '1px solid #cbd5e1',
                background: activeTab === 'map' ? '#ecfdf5' : '#ffffff',
                color: activeTab === 'map' ? '#065f46' : '#475569',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <MapPin size={16} />
              <span>Infrastructure Map</span>
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: activeTab === 'feedback' ? '2px solid #059669' : '1px solid #cbd5e1',
                background: activeTab === 'feedback' ? '#059669' : '#ffffff',
                color: activeTab === 'feedback' ? '#ffffff' : '#059669',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 6px rgba(5, 150, 105, 0.2)'
              }}
            >
              <MessageSquarePlus size={16} />
              <span>📢 Citizen Feedback & Report Issue</span>
            </button>
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {submittedNotification && (
        <div style={{
          background: '#dcfce7',
          border: '1px solid #86efac',
          borderRadius: '8px',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#166534'
        }}>
          <CheckCircle2 size={24} color="#16a34a" />
          <div>
            <strong style={{ fontSize: '0.95rem' }}>Grievance Successfully Lodged!</strong>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem' }}>
              Your report tracking ID is <strong>{submittedNotification}</strong>. It has been routed directly to the MoSPI / IPMD Central Executive Review Queue.
            </p>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 1. PUBLIC CITIZEN DASHBOARD */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'dashboard' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Key Public Metric Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid var(--gov-navy)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Projects Monitored</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy-dark)', marginTop: '4px' }}>
                {PAIMANA_SUMMARY.totalProjects.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '4px' }}>Across 17 Union Ministries</div>
            </div>

            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid var(--gov-blue-accent)' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total National Outlay</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--gov-navy-dark)', marginTop: '4px' }}>
                ₹37.13 L Cr
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>Approved Baseline Cost</div>
            </div>

            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid #10b981' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Cumulative Expenditure</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#065f46', marginTop: '4px' }}>
                ₹20.36 L Cr
              </div>
              <div style={{ fontSize: '0.72rem', color: '#059669', marginTop: '4px' }}>47.59% Funds Disbursed</div>
            </div>

            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid #16a34a' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projects Fully Completed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
                801
              </div>
              <div style={{ fontSize: '0.72rem', color: '#16a34a', marginTop: '4px' }}>Delivering Public Value</div>
            </div>

            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Under Active Construction</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b45309', marginTop: '4px' }}>
                951
              </div>
              <div style={{ fontSize: '0.72rem', color: '#b45309', marginTop: '4px' }}>Highways, Rail, Power & Metro</div>
            </div>

            <div className="gov-card" style={{ padding: '1.2rem', borderTop: '4px solid #ef4444' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Projects Facing Delays</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#991b1b', marginTop: '4px' }}>
                229
              </div>
              <div style={{ fontSize: '0.72rem', color: '#991b1b', marginTop: '4px' }}>Subject to AI Early Warning</div>
            </div>
          </div>

          {/* Prominent Mega Projects Showcase */}
          <div className="gov-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: 0 }}>
                  Featured Transformative National Projects
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                  Key infrastructure assets transforming connectivity, logistics, and quality of life.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('search')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-link)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>View All 1,981 Projects</span>
                <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
              {DETAILED_PROJECTS.slice(0, 4).map(p => (
                <div
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '1.2rem',
                    background: '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gov-blue-accent)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--gov-navy)', fontWeight: 700, background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                        {p.agency}
                      </span>
                      <span style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: p.delayMonths > 0 ? '#fee2e2' : '#dcfce7',
                        color: p.delayMonths > 0 ? '#991b1b' : '#166534'
                      }}>
                        {p.delayMonths > 0 ? `Delayed +${p.delayMonths} Mo` : '🟢 On Track'}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1e293b', marginBottom: '8px', lineHeight: '1.3' }}>
                      {p.name}
                    </h4>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                      📍 {p.state} • Sector: <strong>{p.sector}</strong>
                    </div>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', marginBottom: '3px' }}>
                        <span>Physical Progress</span>
                        <strong>{p.physicalProgress}%</strong>
                      </div>
                      <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${p.physicalProgress}%`, background: '#10b981', borderRadius: '3px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#475569', borderTop: '1px solid #f1f5f9', paddingTop: '6px' }}>
                      <span>Sanctioned: <strong>₹{p.originalCostCr.toLocaleString()} Cr</strong></span>
                      <span style={{ color: 'var(--text-link)', fontWeight: 600 }}>Public Dossier →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. PUBLIC PROJECT SEARCH & EXPLORER */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'search' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* Search Controls */}
          <div className="gov-card" style={{ padding: '1.2rem 1.5rem' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <input
                  type="text"
                  placeholder="Search project name, state, implementing agency (NHAI, RVNL, Metro, NTPC)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 38px',
                    fontSize: '0.85rem',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
              </div>

              {/* Sector filter */}
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                style={{
                  padding: '10px 12px',
                  fontSize: '0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              >
                <option value="All">All Sectors (22)</option>
                <option value="Railways">Railways</option>
                <option value="Road Transport & Highways">Road Transport & Highways</option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Water Resources">Water Resources</option>
                <option value="Power">Power & Renewable</option>
              </select>

              {/* Status filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  padding: '10px 12px',
                  fontSize: '0.85rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  outline: 'none',
                  background: '#ffffff'
                }}
              >
                <option value="All">All Project Statuses</option>
                <option value="On Track">🟢 On Track</option>
                <option value="High Risk">🔴 High / Critical Risk</option>
                <option value="Delayed">⏰ Time Delayed</option>
              </select>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Showing <strong>{filteredProjects.length}</strong> public projects matching your criteria
            </div>
          </div>

          {/* Project List Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {filteredProjects.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="gov-card"
                style={{
                  padding: '1.2rem 1.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  borderLeft: p.delayMonths > 0 ? '5px solid #ef4444' : '5px solid #10b981'
                }}
              >
                <div style={{ maxWidth: '650px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#1e40af', fontWeight: 700, background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                      {p.agency}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {p.id}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>• {p.ministry}</span>
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--gov-navy-dark)', margin: '0 0 4px 0' }}>
                    {p.name}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    📍 {p.state} • Sector: <strong>{p.sector}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Sanctioned Cost</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                      ₹{p.originalCostCr.toLocaleString()} Cr
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Physical Progress</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#16a34a' }}>
                      {p.physicalProgress}%
                    </div>
                  </div>

                  <div style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    background: p.delayMonths > 0 ? '#fee2e2' : '#dcfce7',
                    color: p.delayMonths > 0 ? '#991b1b' : '#166534'
                  }}>
                    {p.delayMonths > 0 ? `Delayed (+${p.delayMonths} Mo)` : '🟢 On Track'}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProject(p);
                    }}
                    className="gov-btn gov-btn-primary"
                    style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                  >
                    <span>View Public Dossier</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 3. INTERACTIVE INFRASTRUCTURE GIS MAP */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'map' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="gov-card" style={{ padding: '1rem 1.5rem', background: '#f0fdf4', border: '1px solid #a7f3d0' }}>
            <div style={{ fontSize: '0.85rem', color: '#065f46', fontWeight: 600 }}>
              🗺️ <strong>Citizen Public GIS View:</strong> Click on any Indian State to view the total number of infrastructure packages, sector-wise distribution, and real-time execution status.
            </div>
          </div>
          <NationalInfrastructureMap onSelectProject={onSelectProject} />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 4. CITIZEN FEEDBACK & COMPLAINTS SUBMISSION */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'feedback' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.5rem' }}>
          
          {/* Form */}
          <div className="gov-card" style={{ padding: '1.8rem', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="gov-badge" style={{ background: '#dcfce7', color: '#166534' }}>Civic Audit & Feedback</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Connected to MoSPI Central Review</span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: '0 0 4px 0' }}>
              Report a Project Issue or Provide Ground Feedback
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
              Help the government identify bottlenecks, unmanaged diversions, environmental concerns, or stalled work.
            </p>

            <form onSubmit={handleReportSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Select Infrastructure Project *
                </label>
                <select
                  value={reportForm.projectId}
                  onChange={(e) => setReportForm({ ...reportForm, projectId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '0.85rem',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '6px',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                >
                  {DETAILED_PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.agency} - {p.state})
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Issue Classification *
                  </label>
                  <select
                    value={reportForm.issueType}
                    onChange={(e) => setReportForm({ ...reportForm, issueType: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.85rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Construction delay & stalled work">Construction delay & stalled work</option>
                    <option value="Work stopped unexpectedly">Work stopped unexpectedly</option>
                    <option value="Quality & Structural Safety concern">Quality & Structural Safety concern</option>
                    <option value="Environmental & Dust Mitigation concern">Environmental & Dust Mitigation concern</option>
                    <option value="Road diversion / Waterlogging hazard">Road diversion / Waterlogging hazard</option>
                    <option value="Other ground observation">Other ground observation</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Urgency / Severity
                  </label>
                  <select
                    value={reportForm.severity}
                    onChange={(e) => setReportForm({ ...reportForm, severity: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.85rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      background: '#ffffff'
                    }}
                  >
                    <option value="Critical">🔴 Critical (Immediate Hazard / Stalled)</option>
                    <option value="High">🟠 High (Significant Delay / Road Hazard)</option>
                    <option value="Medium">🟡 Medium (Civic Inconvenience)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Location / Specific Milestone Landmarking *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Near Shilphata Tunnel Shaft 4, KM 42 Canal Reach..."
                  value={reportForm.location}
                  onChange={(e) => setReportForm({ ...reportForm, location: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '0.85rem',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Detailed Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Provide precise details of what you observed on site..."
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    fontSize: '0.85rem',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '6px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Upload Geo-Tagged Site Photo (Optional)
                </label>
                <div style={{
                  border: '2px dashed #cbd5e1',
                  borderRadius: '6px',
                  padding: '1rem',
                  textAlign: 'center',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  position: 'relative'
                }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  />
                  {reportForm.photoPreview ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                      <img
                        src={reportForm.photoPreview}
                        alt="Preview"
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>
                        ✓ Photo attached successfully
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                      <Camera size={24} color="var(--gov-navy)" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Click to capture or upload site photo</span>
                      <span style={{ fontSize: '0.7rem' }}>Supports JPG, PNG with GPS metadata</span>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  padding: '12px',
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '0.5rem',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.25)'
                }}
              >
                <Send size={16} />
                <span>Submit Grievance to MoSPI Oversight Queue</span>
              </button>
            </form>
          </div>

          {/* Grievance Tracking Queue */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: '0 0 4px 0' }}>
                Citizen Grievance Feed & Real-Time Status
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                Live feed of issues logged by citizens and verified by government authorities.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '560px', overflowY: 'auto' }}>
              {citizenReports.map((report) => (
                <div
                  key={report.id}
                  className="gov-card"
                  style={{
                    padding: '1.2rem',
                    background: '#ffffff',
                    borderLeft: `5px solid ${report.statusColor || '#f59e0b'}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-navy)', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                      {report.id}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '12px',
                      background: report.status === 'Resolved' ? '#dcfce7' : report.status === 'Action Initiated' ? '#fee2e2' : '#fef3c7',
                      color: report.status === 'Resolved' ? '#166534' : report.status === 'Action Initiated' ? '#991b1b' : '#92400e'
                    }}>
                      ● {report.status}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>
                    {report.projectName}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '6px' }}>
                    📍 {report.location} ({report.state}) • Reported: {report.reportedDate}
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#334155', background: '#f8fafc', padding: '8px 10px', borderRadius: '4px', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                    "{report.description}"
                  </p>

                  {/* Official Action Response */}
                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '6px',
                    fontSize: '0.75rem',
                    color: '#065f46',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px'
                  }}>
                    <ShieldCheck size={14} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Official Action ({report.assignedAgency}):</strong> {report.officialResponse}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
