import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  Bell,
  ChevronDown,
  Briefcase
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenReport, onOpenSearch }) {
  const { lang, setLang, languages, t, changeFontSize } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: t('tabOverview', 'Dashboard & Overview'), icon: Building2 },
    { id: 'early-warning', label: t('tabEarlyWarning', 'AI Early Warning Radar'), icon: Activity, badge: 'AI Model' },
    { id: 'gis-map', label: t('tabGisMap', 'National GIS Map'), icon: MapPin, badge: 'Interactive' },
    { id: 'projects', label: t('tabProjects', 'Projects Registry (1,981)'), icon: Layers },
    { id: 'tenders', label: t('tabTenders', 'E-Tenders & Bidding'), icon: Briefcase, badge: 'CPPP' },
    { id: 'benchmarking', label: t('tabBenchmarking', 'Benchmarking & Drivers'), icon: BarChart3 },
    { id: 'north-east', label: t('tabNorthEast', 'NER Special Focus (229)'), icon: MapPin },
    { id: 'cuf-simulator', label: t('tabCuf', 'CUF & What-If Sandbox'), icon: Cpu },
    { id: 'assistant', label: t('tabAssistant', 'PAI AI Assistant'), icon: Bot, badge: 'Copilot' }
  ];

  const currentLangObj = languages.find(l => l.code === lang) || languages[0];

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
          <span>{t('govOfIndia', 'GOVERNMENT OF INDIA')} | <strong>भारत सरकार</strong></span>
          <span style={{ color: '#cbd5e1' }}>|</span>
          <span>{t('ministryName', 'Ministry of Statistics and Programme Implementation')}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '2px' }}>
          <span style={{ cursor: 'pointer' }}>{t('screenReader', 'Screen Reader Access')}</span>
          <span>|</span>
          <div style={{ display: 'flex', gap: '4px', fontWeight: 600 }}>
            <span onClick={() => changeFontSize(-1)} style={{ cursor: 'pointer', padding: '0 3px', border: '1px solid #cbd5e1', borderRadius: '2px', background: '#ffffff' }} title="Decrease text size">A-</span>
            <span onClick={() => changeFontSize(0)} style={{ cursor: 'pointer', padding: '0 3px', border: '1px solid #cbd5e1', borderRadius: '2px', background: '#ffffff' }} title="Default text size">A</span>
            <span onClick={() => changeFontSize(1)} style={{ cursor: 'pointer', padding: '0 3px', border: '1px solid #cbd5e1', borderRadius: '2px', background: '#ffffff' }} title="Increase text size">A+</span>
          </div>
          <span>|</span>
          
          {/* Multilingual Selector Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#ffffff',
                border: '1px solid var(--gov-navy)',
                borderRadius: '3px',
                padding: '2px 8px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--gov-navy)',
                cursor: 'pointer'
              }}
            >
              <Globe size={12} color="var(--gov-navy)" />
              <span>{currentLangObj.native} ({currentLangObj.label})</span>
              <ChevronDown size={11} />
            </button>

            {isLangDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '4px',
                background: '#ffffff',
                border: '1px solid var(--border-gov)',
                borderRadius: '4px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                zIndex: 1000,
                minWidth: '180px',
                maxHeight: '260px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ padding: '4px 8px', fontSize: '10px', background: '#f1f5f9', color: '#64748b', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>
                  Select Official Language (8th Schedule)
                </div>
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLang(l.code);
                      setIsLangDropdownOpen(false);
                    }}
                    style={{
                      padding: '6px 10px',
                      textAlign: 'left',
                      fontSize: '11px',
                      background: lang === l.code ? '#e8f0fe' : '#ffffff',
                      color: lang === l.code ? 'var(--gov-navy)' : '#1e293b',
                      border: 'none',
                      borderBottom: '1px solid #f8fafc',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontWeight: lang === l.code ? 700 : 400
                    }}
                    onMouseEnter={(e) => { if (lang !== l.code) e.currentTarget.style.background = '#f1f5f9'; }}
                    onMouseLeave={(e) => { if (lang !== l.code) e.currentTarget.style.background = '#ffffff'; }}
                  >
                    <span>{l.native}</span>
                    <span style={{ fontSize: '10px', color: '#64748b' }}>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
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
                {t('portalTitle', 'PAIMANA')} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>| पैमाना</span>
              </h1>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.65rem' }}>
                SIH26103
              </span>
              <span className="gov-badge gov-badge-low" style={{ fontSize: '0.65rem' }}>
                {t('flashReportBadge', '486th Flash Report (April 2026)')}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500 }}>
              {t('portalSubTitle', 'Project Assessment, Infrastructure Monitoring and Analytics for Nation-building')}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
              {t('divisionName', 'Infrastructure & Project Monitoring Division (IPMD) • MoSPI')}
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
            <span>{t('searchPortal', 'Search Portal')}</span>
          </button>

          <button
            onClick={onOpenReport}
            className="gov-btn gov-btn-primary"
            title="Generate official 486th Flash Report Dossier"
          >
            <FileText size={14} />
            <span>{t('flashReportBtn', '486th Flash Report')}</span>
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
          <Bell size={12} /> {t('flashNoticeTitle', 'FLASH NOTICE:')}
        </strong>
        <span>
          {t('flashNoticeText', 'As of April 2026, 1,981 Central Sector Infrastructure Projects (costing ₹150 Cr+) are under active AI predictive monitoring.')}
        </span>
      </div>
    </header>
  );
}
