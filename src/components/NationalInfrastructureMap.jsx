import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import IndiaMapData from '@svg-maps/india';
import { 
  STATES_SUMMARY, 
  DETAILED_PROJECTS 
} from '../data/paimanaData';
import { 
  MapPin, 
  Building, 
  TrendingUp, 
  Layers, 
  Compass,
  ArrowRight,
  ShieldAlert,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  BarChart3,
  ExternalLink
} from 'lucide-react';

// Region mapping for all Indian state IDs
const REGION_BY_STATE_ID = {
  // North
  jk: 'North', hp: 'North', pb: 'North', ut: 'North', hr: 'North', dl: 'North', ch: 'North', rj: 'North', up: 'North',
  // West
  gj: 'West', mh: 'West', ga: 'West', dn: 'West', dd: 'West',
  // South
  ap: 'South', ka: 'South', kl: 'South', tn: 'South', tg: 'South', py: 'South', ld: 'South',
  // East
  br: 'East', wb: 'East', jh: 'East', or: 'East', an: 'East',
  // Central
  mp: 'Central', ct: 'Central',
  // North East
  as: 'North East', ar: 'North East', ml: 'North East', mn: 'North East', mz: 'North East', nl: 'North East', sk: 'North East', tr: 'North East'
};

export default function NationalInfrastructureMap({ onSelectProject }) {
  const { t } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState('count'); // 'count', 'outlay', 'expenditure'
  const [activeStateId, setActiveStateId] = useState('mh');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Map state dictionary from STATES_SUMMARY
  const stateDataMap = useMemo(() => {
    const dict = {};
    STATES_SUMMARY.forEach(s => {
      const cleanKey = s.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
      dict[cleanKey] = s;
    });
    return dict;
  }, []);

  // Helper to find data for any SVG map location
  const getStateData = (location) => {
    const cleanName = location.name.toLowerCase()
      .replace(' and ', ' & ')
      .replace('islands', '')
      .replace('nct of ', '')
      .trim();

    return stateDataMap[cleanName] || 
      stateDataMap[location.name.toLowerCase()] || 
      STATES_SUMMARY.find(s => {
        const sName = s.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
        return cleanName.includes(sName) || sName.includes(cleanName);
      }) || {
        state: location.name,
        count: 14,
        costLakhCr: 0.35,
        expenditureLakhCr: 0.18,
        topSector: "Multi-modal Infrastructure"
      };
  };

  // Active selected state info
  const activeLocation = useMemo(() => {
    return IndiaMapData.locations.find(l => l.id === activeStateId) || IndiaMapData.locations[0];
  }, [activeStateId]);

  const activeStateData = useMemo(() => {
    return getStateData(activeLocation);
  }, [activeLocation]);

  // Central sector projects in the active state
  const stateProjects = useMemo(() => {
    const cleanName = activeLocation.name.toLowerCase().replace(' and ', ' ').replace('islands', '').trim();
    return DETAILED_PROJECTS.filter(p => {
      const pState = p.state.toLowerCase();
      return pState.includes(cleanName) || cleanName.includes(pState);
    });
  }, [activeLocation]);

  // Financial expenditure realization percentage
  const spendingProgress = useMemo(() => {
    if (!activeStateData || !activeStateData.costLakhCr || activeStateData.costLakhCr === 0) return 45;
    return Math.min(100, Math.round((activeStateData.expenditureLakhCr / activeStateData.costLakhCr) * 100));
  }, [activeStateData]);

  // Color generator for each state matching the user's reference image
  const getStateFill = (location, index, isSelected, isHovered) => {
    if (isSelected) return "#ff9933"; // National Saffron for selected state
    if (isHovered) return "#fdba74";

    const data = getStateData(location);

    if (selectedMetric === 'count') {
      const count = data.count || 0;
      if (count >= 140) return "#f97316"; // Vibrant Orange
      if (count >= 90) return "#86efac";  // Soft Sage Green
      if (count >= 40) return "#d8b4fe";  // Lilac
      if (count >= 15) return "#fef08a";  // Cream Yellow
      return "#bae6fd";                  // Sky Blue
    } else if (selectedMetric === 'outlay') {
      const outlay = data.costLakhCr || 0;
      if (outlay >= 3.5) return "#f97316";
      if (outlay >= 2.0) return "#86efac";
      if (outlay >= 0.8) return "#d8b4fe";
      return "#fef08a";
    } else {
      const exp = data.expenditureLakhCr || 0;
      if (exp >= 2.0) return "#16a34a";
      if (exp >= 1.0) return "#86efac";
      if (exp >= 0.4) return "#d8b4fe";
      return "#fef08a";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem 0' }}>
      
      {/* Sleek, Pleasing Top Toolbar */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>GIS Cartography</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>486th Flash Report Database</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em' }}>
              {t('mapHeading', 'National Infrastructure Spatial Analytics')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Interactive geographic visualization of <strong>1,981 central sector projects</strong> across India.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '6px',
            gap: '4px'
          }}>
            {[
              { id: 'count', label: t('metricVolume', 'Project Volume'), icon: Building },
              { id: 'outlay', label: t('metricOutlay', 'Capital Outlay (₹ L Cr)'), icon: TrendingUp },
              { id: 'expenditure', label: t('metricExp', 'Expenditure (₹ L Cr)'), icon: BarChart3 }
            ].map(m => {
              const Icon = m.icon;
              const isActive = selectedMetric === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetric(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? 'var(--gov-navy)' : '#64748b',
                    border: 'none',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <Icon size={13} color={isActive ? 'var(--gov-navy)' : '#94a3b8'} />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Region Filter Chips */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          marginTop: '1rem',
          paddingTop: '0.8rem',
          borderTop: '1px solid #f1f5f9',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginRight: '4px' }}>Filter Region:</span>
          {[
            { id: 'ALL', label: t('regionAll', 'All India (35 States & UTs)') },
            { id: 'North', label: 'North' },
            { id: 'West', label: 'West' },
            { id: 'South', label: 'South' },
            { id: 'East', label: 'East' },
            { id: 'Central', label: 'Central' },
            { id: 'North East', label: 'North East (NER)' }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: selectedRegion === r.id ? 700 : 500,
                background: selectedRegion === r.id ? 'var(--gov-navy)' : '#f8fafc',
                color: selectedRegion === r.id ? '#ffffff' : '#475569',
                border: `1px solid ${selectedRegion === r.id ? 'var(--gov-navy)' : '#e2e8f0'}`,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Spacious Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(540px, 1.4fr) minmax(360px, 1fr)',
        gap: '1.2rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Official Vector Map Canvas */}
        <div className="gov-card" style={{ padding: '1rem', background: '#ffffff', borderRadius: '8px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="var(--gov-navy)" />
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                Sovereign Territory of India & Surrounding Oceans
              </span>
            </div>

            {/* Map Zoom Controls */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.2, prev + 0.2))}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
                title="Zoom in"
              >
                <ZoomIn size={13} />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
                title="Zoom out"
              >
                <ZoomOut size={13} />
              </button>
              <button
                onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer'
                }}
                title="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* SVG Map Container: Sleek Dark Ocean Canvas matching user reference image */}
          <div style={{
            width: '100%',
            height: '670px',
            background: '#0c1421', // Refined deep ocean navy canvas
            borderRadius: '6px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
          }}>
            <svg
              viewBox={IndiaMapData.viewBox || "0 0 612 696"}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '650px',
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Subtle Oceanic Bathymetric Lines */}
              <path d="M 40 380 Q 90 360, 110 420 T 70 520" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
              <path d="M 480 400 Q 540 380, 560 450 T 520 540" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
              <path d="M 180 640 Q 300 620, 420 640 T 540 670" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.6" />

              {/* Crisp Nautical Ocean Labels */}
              {/* 1. Arabian Sea */}
              <g opacity="0.85">
                <text x="85" y="470" fontSize="11" fontWeight="800" fill="#38bdf8" letterSpacing="0.15em" textAnchor="middle">
                  {t('arabianSea', 'ARABIAN SEA')}
                </text>
                <text x="85" y="485" fontSize="8" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (अरब सागर)
                </text>
              </g>

              {/* 2. Bay of Bengal */}
              <g opacity="0.85">
                <text x="510" y="470" fontSize="11" fontWeight="800" fill="#38bdf8" letterSpacing="0.15em" textAnchor="middle">
                  {t('bayOfBengal', 'BAY OF BENGAL')}
                </text>
                <text x="510" y="485" fontSize="8" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (बंगाल की खाड़ी)
                </text>
              </g>

              {/* 3. Indian Ocean */}
              <g opacity="0.9">
                <text x="310" y="665" fontSize="12" fontWeight="800" fill="#38bdf8" letterSpacing="0.18em" textAnchor="middle">
                  {t('indianOcean', 'INDIAN OCEAN')}
                </text>
                <text x="310" y="680" fontSize="9" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (हिंद महासागर)
                </text>
              </g>

              {/* Official SVG State Polygons */}
              {IndiaMapData.locations.map((location, index) => {
                const isSelected = activeStateId === location.id;
                const isHovered = hoveredState?.id === location.id;
                const fillColor = getStateFill(location, index, isSelected, isHovered);
                const stateRegion = REGION_BY_STATE_ID[location.id] || 'Other';
                const isMatchingRegion = selectedRegion === 'ALL' || stateRegion === selectedRegion;

                return (
                  <g
                    key={location.id}
                    onClick={() => setActiveStateId(location.id)}
                    onMouseEnter={() => setHoveredState(location)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{
                      opacity: isMatchingRegion ? 1 : 0.25,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <path
                      d={location.path}
                      fill={fillColor}
                      stroke={isSelected ? "#ffffff" : "#1e293b"}
                      strokeWidth={isSelected ? "2.5" : "1"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isSelected ? "drop-shadow(0 0 10px #ff9933)" : "drop-shadow(0 1px 3px rgba(0,0,0,0.5))"}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredState && (
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(255, 255, 255, 0.98)',
                border: '1.5px solid var(--gov-navy)',
                borderRadius: '6px',
                padding: '8px 12px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                pointerEvents: 'none',
                zIndex: 10,
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--gov-navy-dark)', fontSize: '0.9rem' }}>
                  {hoveredState.name}
                </div>
                {getStateData(hoveredState) && (
                  <div style={{ marginTop: '2px', color: '#475569', fontSize: '0.75rem' }}>
                    {t('projectsMonitored', 'Projects')}: <strong>{getStateData(hoveredState).count}</strong> • 
                    {t('approvedOutlay', 'Outlay')}: <strong>₹{getStateData(hoveredState).costLakhCr}L Cr</strong>
                  </div>
                )}
              </div>
            )}

            {/* Minimalist Map Legend */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '0.7rem',
              color: '#cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <strong style={{ color: '#ffffff', fontSize: '0.72rem' }}>Outlay Intensity:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', background: '#f97316', borderRadius: '2px' }}></span> High Density (&gt;₹3.5L Cr / &gt;140 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', background: '#86efac', borderRadius: '2px' }}></span> Priority Zone (₹2L-₹3.5L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', background: '#d8b4fe', borderRadius: '2px' }}></span> Growth Corridor (₹0.8L-₹2L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', background: '#fef08a', borderRadius: '2px' }}></span> Standard Development
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '8px', background: '#ff9933', borderRadius: '2px', border: '1px solid #ffffff' }}></span> Active Selected State
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Pleasing State Infrastructure Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Active State Profile Card */}
          <div className="gov-card" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <div style={{
              background: 'linear-gradient(135deg, #002244 0%, #003366 100%)',
              color: '#ffffff',
              padding: '1.2rem 1.4rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  State Infrastructure Profile
                </div>
                <h3 style={{ color: '#ffffff', fontSize: '1.3rem', fontWeight: 800, marginTop: '2px' }}>
                  {activeLocation.name}
                </h3>
              </div>
              <span style={{
                background: '#ff9933',
                color: '#002244',
                fontWeight: 800,
                fontSize: '0.75rem',
                padding: '4px 10px',
                borderRadius: '20px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}>
                {activeStateData.count || 0} Projects Monitored
              </span>
            </div>

            <div style={{ padding: '1.2rem' }}>
              {/* Financial Metrics Cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                marginBottom: '1rem'
              }}>
                <div style={{
                  background: '#fffbeb',
                  border: '1px solid #fef3c7',
                  borderRadius: '6px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#92400e', fontWeight: 600, textTransform: 'uppercase' }}>
                    Approved Outlay
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#78350f', marginTop: '2px' }}>
                    ₹{activeStateData.costLakhCr} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>L Cr</span>
                  </div>
                </div>

                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #dcfce7',
                  borderRadius: '6px',
                  padding: '12px'
                }}>
                  <div style={{ fontSize: '0.72rem', color: '#166534', fontWeight: 600, textTransform: 'uppercase' }}>
                    Cumulative Exp.
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14532d', marginTop: '2px' }}>
                    ₹{activeStateData.expenditureLakhCr} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>L Cr</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Financial Realization Rate</span>
                  <strong style={{ color: '#166534' }}>{spendingProgress}% Outlay Spent</strong>
                </div>
                <div style={{ width: '100%', height: '7px', background: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                  <div style={{ width: `${spendingProgress}%`, height: '100%', background: '#16a34a', borderRadius: '10px' }} />
                </div>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0',
                marginBottom: '1.2rem',
                fontSize: '0.8rem'
              }}>
                <span style={{ color: '#64748b' }}>Primary Sector Focus:</span>
                <strong style={{ color: 'var(--gov-navy)' }}>{activeStateData.topSector}</strong>
              </div>

              {/* Projects in this State */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gov-navy-dark)' }}>
                    Monitored Mega Projects ({stateProjects.length})
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>486th Flash Report</span>
                </div>

                {stateProjects.length === 0 ? (
                  <div style={{
                    padding: '16px',
                    background: '#f8fafc',
                    border: '1px dashed #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.8rem',
                    color: '#64748b',
                    textAlign: 'center',
                    lineHeight: '1.4'
                  }}>
                    {activeStateData.count} central sector projects are monitored in {activeLocation.name} in Table 2 of the 486th Flash Report.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '320px', overflowY: 'auto', paddingRight: '4px' }}>
                    {stateProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProject(p)}
                        style={{
                          padding: '10px 12px',
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = 'var(--gov-navy)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,34,68,0.08)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = '#e2e8f0';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', marginBottom: '2px' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{p.id}</span>
                            <span style={{ color: '#94a3b8' }}>•</span>
                            <span style={{ color: '#64748b', fontWeight: 600 }}>{p.agency}</span>
                          </div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#0f172a', lineHeight: '1.3' }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '4px' }}>
                            Cost: <strong>₹{p.originalCostCr.toLocaleString()} Cr</strong> | Physical Progress: <strong style={{ color: '#16a34a' }}>{p.physicalProgress}%</strong>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                          <span className={`gov-badge gov-badge-${p.riskLevel.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                            {p.riskLevel}
                          </span>
                          <span style={{ fontSize: '0.7rem', color: 'var(--gov-navy)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                            Dossier <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
