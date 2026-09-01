import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Search, 
  FileText, 
  Globe, 
  Bell, 
  ChevronDown, 
  LogOut, 
  ShieldCheck, 
  HardHat, 
  Users, 
  Sparkles
} from 'lucide-react';

export default function Navbar({ 
  currentRole, 
  currentUser, 
  onSwitchRole, 
  onOpenReport, 
  onOpenSearch 
}) {
  const { lang, setLang, languages, t, changeFontSize } = useLanguage();
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

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
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em', margin: 0 }}>
                {t('portalTitle', 'PAIMANA')} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>| पैमाना</span>
              </h1>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.65rem' }}>
                SIH26103
              </span>
              <span className="gov-badge gov-badge-low" style={{ fontSize: '0.65rem' }}>
                {t('flashReportBadge', '486th Flash Report (April 2026)')}
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', fontWeight: 500, margin: 0 }}>
              {t('portalSubTitle', 'Project Assessment, Infrastructure Monitoring and Analytics for Nation-building')}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
              {t('divisionName', 'Infrastructure & Project Monitoring Division (IPMD) • MoSPI')}
            </p>
          </div>
        </div>

        {/* Right Section: Session Pill & Quick Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {currentUser ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: currentRole === 'govt' ? '#eff6ff' : currentRole === 'tender' ? '#fffbeb' : '#ecfdf5',
              border: `1px solid ${currentRole === 'govt' ? '#bfdbfe' : currentRole === 'tender' ? '#fde68a' : '#a7f3d0'}`,
              borderRadius: '6px',
              padding: '6px 12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentRole === 'govt' && <ShieldCheck size={16} color="#1d4ed8" />}
                {currentRole === 'tender' && <HardHat size={16} color="#d97706" />}
                {currentRole === 'citizen' && <Users size={16} color="#059669" />}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: currentRole === 'govt' ? '#1e40af' : currentRole === 'tender' ? '#92400e' : '#065f46' }}>
                    {currentUser.name || currentUser.companyName}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: '#64748b' }}>
                    {currentRole === 'govt' ? 'MoSPI Official' : currentRole === 'tender' ? 'CPPP Bidder' : 'Verified Citizen'}
                  </span>
                </div>
              </div>

              <button
                onClick={onSwitchRole}
                title="Switch Role / Return to Gateway"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#475569',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gov-navy)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; }}
              >
                <LogOut size={12} />
                <span>Switch Role</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onSwitchRole}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--gov-navy)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <Users size={14} />
              <span>Select Role</span>
            </button>
          )}

          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="gov-btn gov-btn-secondary"
            title="Search projects by ID, Name, State or Ministry (Ctrl+K)"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <Search size={14} />
            <span>Search</span>
          </button>

          {/* Official Dossier Button */}
          <button
            onClick={onOpenReport}
            className="gov-btn gov-btn-primary"
            title="Generate official 486th Flash Report Dossier"
            style={{ padding: '6px 12px', fontSize: '0.78rem' }}
          >
            <FileText size={14} />
            <span>Flash Report</span>
          </button>
        </div>
      </div>

      {/* 3. Official Flash Notice / Ticker */}
      <div style={{
        background: '#fef3c7',
        borderBottom: '1px solid #fde68a',
        padding: '4px 1.5rem',
        fontSize: '0.72rem',
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
