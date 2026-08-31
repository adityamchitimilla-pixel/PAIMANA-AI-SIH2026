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
  Waves
} from 'lucide-react';

// Thematic pastel color palette inspired by the official political cartography
const STATE_PALETTE = [
  '#f97316', // Vibrant Orange
  '#86efac', // Soft Green
  '#d8b4fe', // Lilac
  '#fef08a', // Cream Yellow
  '#6ee7b7', // Mint Teal
  '#fbbf24', // Amber
  '#bae6fd', // Sky Blue
  '#cbd5e1', // Slate
  '#fbcfe8', // Pink
  '#a7f3d0'  // Pale Emerald
];

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

  // Color generator for each state matching the user's reference image
  const getStateFill = (location, index, isSelected, isHovered) => {
    if (isSelected) return "#ff9933"; // National Saffron for selected state
    if (isHovered) return "#fdba74";

    const data = getStateData(location);

    if (selectedMetric === 'count') {
      const count = data.count || 0;
      if (count >= 140) return "#ea580c"; // Deep Amber-Orange
      if (count >= 90) return "#86efac";  // Soft Sage Green
      if (count >= 40) return "#d8b4fe";  // Lilac
      if (count >= 15) return "#fef08a";  // Cream Yellow
      return "#bae6fd";                  // Sky Blue
    } else if (selectedMetric === 'outlay') {
      const outlay = data.costLakhCr || 0;
      if (outlay >= 3.5) return "#ea580c";
      if (outlay >= 2.0) return "#86efac";
      if (outlay >= 0.8) return "#d8b4fe";
      return "#fef08a";
    } else {
      const exp = data.expenditureLakhCr || 0;
      if (exp >= 2.0) return "#166534";
      if (exp >= 1.0) return "#86efac";
      if (exp >= 0.4) return "#d8b4fe";
      return "#fef08a";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Map Header */}
      <div className="gov-card" style={{ padding: '1rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '2px' }}>
              PAIMANA Geospatial Portal ➔ <strong>{t('tabGisMap', 'National GIS Map')}</strong>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              {t('mapHeading', 'Geospatial Map of India: Central Sector Infrastructure Outlay')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {t('mapSubheading', 'Official Sovereign Boundary Map of 1,981 Central Sector Projects across all States & UTs.')}
            </p>
          </div>

          {/* Metric Selector Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569' }}>Metric Layer:</span>
            <button
              onClick={() => setSelectedMetric('count')}
              className={`gov-btn ${selectedMetric === 'count' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {t('metricVolume', 'Project Volume')}
            </button>
            <button
              onClick={() => setSelectedMetric('outlay')}
              className={`gov-btn ${selectedMetric === 'outlay' ? 'gov-btn-saffron' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {t('metricOutlay', 'Capital Outlay (₹ L Cr)')}
            </button>
            <button
              onClick={() => setSelectedMetric('expenditure')}
              className={`gov-btn ${selectedMetric === 'expenditure' ? 'gov-btn-green' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              {t('metricExp', 'Expenditure (₹ L Cr)')}
            </button>
          </div>
        </div>

        {/* Region Filter Bar */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          marginTop: '0.8rem',
          paddingTop: '0.6rem',
          borderTop: '1px solid var(--border-light)',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Region:</span>
          {[
            { id: 'ALL', label: t('regionAll', 'All India (35 States & UTs)') },
            { id: 'North', label: t('regionNorth', 'North') },
            { id: 'West', label: t('regionWest', 'West') },
            { id: 'South', label: t('regionSouth', 'South') },
            { id: 'East', label: t('regionEast', 'East') },
            { id: 'Central', label: t('regionCentral', 'Central') },
            { id: 'North East', label: t('regionNE', 'North East (NER)') }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              style={{
                padding: '3px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontWeight: selectedRegion === r.id ? 700 : 500,
                background: selectedRegion === r.id ? 'var(--gov-navy)' : '#ffffff',
                color: selectedRegion === r.id ? '#ffffff' : '#334155',
                border: '1px solid var(--border-gov)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual Grid: Authentic India SVG Map with Surrounding Oceans + State Intelligence Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(540px, 1.45fr) minmax(360px, 1fr)',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Official Vector Map Canvas */}
        <div className="gov-card" style={{ padding: '1rem', background: '#ffffff', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="var(--gov-navy)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                Official Sovereign Cartography of India & Surrounding Oceans
              </h3>
            </div>

            {/* Map Zoom Controls */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2.2, prev + 0.2))}
                className="gov-btn gov-btn-secondary"
                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                title="Zoom in"
              >
                <ZoomIn size={13} />
              </button>
              <button
                onClick={() => setZoomLevel(prev => Math.max(0.8, prev - 0.2))}
                className="gov-btn gov-btn-secondary"
                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                title="Zoom out"
              >
                <ZoomOut size={13} />
              </button>
              <button
                onClick={() => { setZoomLevel(1); setPanOffset({ x: 0, y: 0 }); }}
                className="gov-btn gov-btn-secondary"
                style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                title="Reset zoom"
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          {/* SVG Map Container: Pure Oceanic Basin with Accurate State Contours */}
          <div style={{
            width: '100%',
            height: '680px',
            background: '#0d1522', // Sleek dark oceanic base matching user's reference image
            borderRadius: '6px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)'
          }}>
            <svg
              viewBox={IndiaMapData.viewBox || "0 0 612 696"}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '660px',
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Subtle Oceanic Bathymetry Contours */}
              {/* Arabian Sea Waves (West) */}
              <path d="M 40 380 Q 90 360, 110 420 T 70 520" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              <path d="M 50 440 Q 100 420, 110 480 T 80 570" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
              
              {/* Bay of Bengal Waves (East) */}
              <path d="M 480 400 Q 540 380, 560 450 T 520 540" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              <path d="M 490 460 Q 550 440, 570 510 T 540 600" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />

              {/* Indian Ocean Waves (South) */}
              <path d="M 180 640 Q 300 620, 420 640 T 540 670" fill="none" stroke="#1e293b" strokeWidth="2" strokeDasharray="8 5" opacity="0.6" />

              {/* Crisp Nautical Ocean Labels */}
              {/* 1. Arabian Sea */}
              <g opacity="0.8">
                <text x="85" y="470" fontSize="11" fontWeight="800" fill="#38bdf8" letterSpacing="0.15em" textAnchor="middle">
                  {t('arabianSea', 'ARABIAN SEA')}
                </text>
                <text x="85" y="485" fontSize="8" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (अरब सागर)
                </text>
              </g>

              {/* 2. Bay of Bengal */}
              <g opacity="0.8">
                <text x="510" y="470" fontSize="11" fontWeight="800" fill="#38bdf8" letterSpacing="0.15em" textAnchor="middle">
                  {t('bayOfBengal', 'BAY OF BENGAL')}
                </text>
                <text x="510" y="485" fontSize="8" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (बंगाल की खाड़ी)
                </text>
              </g>

              {/* 3. Indian Ocean */}
              <g opacity="0.85">
                <text x="310" y="665" fontSize="12" fontWeight="800" fill="#38bdf8" letterSpacing="0.18em" textAnchor="middle">
                  {t('indianOcean', 'INDIAN OCEAN')}
                </text>
                <text x="310" y="680" fontSize="9" fontWeight="600" fill="#0284c7" textAnchor="middle">
                  (हिंद महासागर)
                </text>
              </g>

              {/* Official SVG State Polygons with High-Contrast Dark Outlines & Drop Shadow */}
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
                background: '#ffffff',
                border: '2px solid var(--gov-navy)',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                pointerEvents: 'none',
                zIndex: 10,
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--gov-navy-dark)', fontSize: '0.95rem' }}>
                  {hoveredState.name}
                </div>
                {getStateData(hoveredState) && (
                  <div style={{ marginTop: '2px', color: '#334155' }}>
                    {t('projectsMonitored', 'Projects')}: <strong>{getStateData(hoveredState).count}</strong> | 
                    {t('approvedOutlay', 'Outlay')}: <strong>₹{getStateData(hoveredState).costLakhCr}L Cr</strong>
                  </div>
                )}
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>Click to inspect state portfolio</div>
              </div>
            )}

            {/* Map Legend */}
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(6px)',
              border: '1px solid #334155',
              borderRadius: '4px',
              padding: '8px 12px',
              fontSize: '0.7rem',
              color: '#cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
            }}>
              <strong style={{ color: '#ffffff' }}>Thematic Outlay Intensity:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#ea580c', display: 'inline-block', borderRadius: '2px' }}></span> Tier 1 High Outlay (&gt;₹3.5L Cr / &gt;140 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#86efac', display: 'inline-block', borderRadius: '2px' }}></span> Tier 2 Priority Zone (₹2L-₹3.5L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#d8b4fe', display: 'inline-block', borderRadius: '2px' }}></span> Tier 3 Growth Corridor (₹0.8L-₹2L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#fef08a', display: 'inline-block', borderRadius: '2px' }}></span> Standard Development Zone
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#ff9933', display: 'inline-block', borderRadius: '2px', border: '1px solid #ffffff' }}></span> Active Selected State
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Selected State Infrastructure Intelligence Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Active State Profile Card */}
          <div className="gov-card">
            <div className="gov-card-header" style={{ background: '#003366', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="#ff9933" />
                <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 700 }}>
                  {activeLocation.name} • {t('stateProfile', 'Infrastructure Profile')}
                </h4>
              </div>
              <span style={{
                background: '#ff9933',
                color: '#000000',
                fontWeight: 800,
                fontSize: '0.7rem',
                padding: '2px 8px',
                borderRadius: '3px'
              }}>
                {activeStateData.count || 0} {t('projectsMonitored', 'Projects Monitored')}
              </span>
            </div>

            <div style={{ padding: '1rem' }}>
              {/* Financial Metrics Summary */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                background: '#f8fafc',
                border: '1px solid var(--border-light)',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '1rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{t('approvedOutlay', 'Approved Capital Outlay')}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
                    ₹{activeStateData.costLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{t('cumulativeExp', 'Cumulative Expenditure')}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534' }}>
                    ₹{activeStateData.expenditureLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', marginBottom: '0.8rem', color: '#334155' }}>
                <strong>{t('keySector', 'Key Sectoral Focus')}:</strong> <span style={{ color: 'var(--gov-navy)' }}>{activeStateData.topSector}</span>
              </div>

              {/* Projects in this State */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gov-navy-dark)' }}>
                    Central Sector Projects in {activeLocation.name} ({stateProjects.length})
                  </strong>
                </div>

                {stateProjects.length === 0 ? (
                  <div style={{
                    padding: '12px',
                    background: '#f8fafc',
                    border: '1px dashed var(--border-gov)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    color: '#64748b',
                    textAlign: 'center'
                  }}>
                    {activeStateData.count} central sector projects are monitored in {activeLocation.name} in the 486th Flash Report. (Use the <strong>Projects Registry</strong> tab to search all 1,981 project lines).
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '340px', overflowY: 'auto' }}>
                    {stateProjects.map(p => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProject(p)}
                        style={{
                          padding: '8px 10px',
                          background: '#ffffff',
                          border: '1px solid var(--border-light)',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--gov-blue-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{p.id}</span>
                            <span style={{ color: '#64748b' }}>• {p.agency}</span>
                          </div>
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a', lineHeight: '1.25' }}>
                            {p.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#475569', marginTop: '2px' }}>
                            Cost: <strong>₹{p.originalCostCr.toLocaleString()} Cr</strong> | Progress: <strong style={{ color: '#166534' }}>{p.physicalProgress}%</strong>
                          </div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <span className={`gov-badge gov-badge-${p.riskLevel.toLowerCase()}`}>
                            {p.riskLevel}
                          </span>
                          <button
                            className="gov-btn gov-btn-secondary"
                            style={{ padding: '2px 6px', fontSize: '0.65rem', marginTop: '4px', display: 'block' }}
                          >
                            {t('viewDossier', 'Dossier ➔')}
                          </button>
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
