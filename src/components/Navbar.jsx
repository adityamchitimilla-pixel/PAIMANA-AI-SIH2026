import React from 'react';
import { 
  Building2, 
  Activity, 
  Layers, 
  BarChart3, 
  MapPin, 
  Cpu, 
  FileText, 
  Search, 
  Bot,
  Globe,
  Bell
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenReport, onOpenSearch }) {
  const navItems = [
    { id: 'overview', label: 'Dashboard & Overview', icon: Building2 },
    { id: 'early-warning', label: 'AI Early Warning Radar', icon: Activity, badge: 'AI Model' },
    { id: 'gis-map', label: 'National GIS Map', icon: MapPin, badge: 'Interactive' },
    { id: 'projects', label: 'Projects Registry (1,981)', icon: Layers },
    { id: 'benchmarking', label: 'Benchmarking & Drivers', icon: BarChart3 },
    { id: 'north-east', label: 'NER Special Focus (229)', icon: MapPin },
    { id: 'cuf-simulator', label: 'CUF & What-If Sandbox', icon: Cpu },
    { id: 'assistant', label: 'Drishti AI Assistant', icon: Bot, badge: 'LLM' }
  ];

  return (
    <header style={{ display: 'flex', flexDirection: 'column', width: '100%', background: '#ffffff', borderBottom: '1px solid var(--border-gov)' }}>
      {/* 1. Official Top Government Strip (Tricolor Accent & National Links) */}
      <div style={{
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        padding: '3px 1.5rem',
        fontSize: '11px',
        color: '#475569',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        {/* Tricolor top border accent */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #ff9933 0%, #ff9933 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%, #138808 100%)'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingTop: '2px' }}>
          <span>भारत सरकार | <strong>GOVERNMENT OF INDIA</strong></span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span>सांख्यिकी और कार्यक्रम कार्यान्वयन मंत्रालय | <strong>Ministry of Statistics and Programme Implementation</strong></span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '2px' }}>
          <span style={{ cursor: 'pointer' }}>Screen Reader Access</span>
          <span>|</span>
          <div style={{ display: 'flex', gap: '4px', fontWeight: 600 }}>
            <span style={{ cursor: 'pointer', padding: '0 2px' }}>A-</span>
            <span style={{ cursor: 'pointer', padding: '0 2px' }}>A</span>
            <span style={{ cursor: 'pointer', padding: '0 2px' }}>A+</span>
          </div>
          <span>|</span>
          <span style={{ cursor: 'pointer', color: 'var(--gov-blue-accent)', fontWeight: 600 }}>English / हिन्दी</span>
        </div>
      </div>

      {/* 2. Main Government Portal Brand Header */}
      <div style={{
        padding: '0.8rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: '#ffffff'
      }}>
        {/* National Emblem & Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Ashoka Lion Emblem Representation */}
          <div style={{
            width: '46px',
            height: '46px',
            background: '#ffffff',
            border: '1.5px solid #cbd5e1',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <svg viewBox="0 0 100 100" width="34" height="34">
              <path d="M50 8 L54 22 L68 22 L57 31 L61 45 L50 36 L39 45 L43 31 L32 22 L46 22 Z" fill="#003366" />
              <circle cx="50" cy="55" r="14" fill="none" stroke="#003366" strokeWidth="3" />
              <circle cx="50" cy="55" r="3" fill="#003366" />
              <path d="M30 75 Q50 68 70 75 L68 85 Q50 80 32 85 Z" fill="#003366" />
              <text x="50" y="96" fontSize="9" fontWeight="900" fill="#003366" textAnchor="middle">सत्यमेव जयते</text>
            </svg>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em' }}>
                PAIMANA <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>| पैमाना</span>
              </h1>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.65rem' }}>
                SIH26103
              </span>
              <span className="gov-badge gov-badge-low" style={{ fontSize: '0.65rem' }}>
                486th Flash Report (April 2026)
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500 }}>
              Project Assessment, Infrastructure Monitoring and Analytics for Nation-building
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              Infrastructure & Project Monitoring Division (IPMD) • MoSPI
            </p>
          </div>
        </div>

        {/* Search & Official Report Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={onOpenSearch}
            className="gov-btn gov-btn-secondary"
            title="Search projects by ID, Name, State or Ministry"
          >
            <Search size={14} />
            <span>Search Portal</span>
          </button>

          <button
            onClick={onOpenReport}
            className="gov-btn gov-btn-primary"
            title="Generate official 486th Flash Report Dossier"
          >
            <FileText size={14} />
            <span>486th Flash Report</span>
          </button>
        </div>
      </div>

      {/* 3. Official Navy Blue Navigation Bar */}
      <nav style={{
        background: 'var(--gov-navy)',
        borderTop: '3px solid var(--gov-saffron)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 1rem',
        overflowX: 'auto'
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 14px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                color: '#ffffff',
                background: isActive ? 'var(--gov-navy-dark)' : 'transparent',
                border: 'none',
                borderBottom: isActive ? '3px solid #ff9933' : '3px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--gov-navy-mid)'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon size={15} color={isActive ? '#ff9933' : '#ffffff'} />
              <span>{item.label}</span>
              {item.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  background: isActive ? '#ff9933' : 'rgba(255, 255, 255, 0.2)',
                  color: isActive ? '#000000' : '#ffffff',
                  fontWeight: 700
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* 4. Official Notice / Ticker Bar */}
      <div style={{
        background: '#fef3c7',
        borderBottom: '1px solid #fde68a',
        padding: '5px 1.5rem',
        fontSize: '0.75rem',
        color: '#92400e',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <strong style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#78350f' }}>
          <Bell size={12} /> FLASH NOTICE:
        </strong>
        <span>
          As of April 2026, 1,981 Central Sector Infrastructure Projects (costing ₹150 Cr+) are under active AI predictive monitoring. Total original outlay: ₹37.13 Lakh Cr | Revised: ₹42.78 Lakh Cr.
        </span>
      </div>
    </header>
  );
}
