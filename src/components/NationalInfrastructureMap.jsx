import React, { useState, useMemo } from 'react';
import { 
  STATES_SUMMARY, 
  DETAILED_PROJECTS, 
  NORTH_EAST_SUMMARY 
} from '../data/paimanaData';
import { 
  MapPin, 
  Building, 
  TrendingUp, 
  AlertTriangle, 
  Layers, 
  Search, 
  Filter, 
  Eye, 
  Globe, 
  Compass,
  ArrowRight,
  ShieldAlert,
  Info,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Table
} from 'lucide-react';

// Official Detailed SVG Geometries for all Indian States & Union Territories (Projection ViewBox: 0 0 800 880)
export const INDIA_STATES_SVG = [
  // 1. Ladakh
  {
    id: "ladakh",
    name: "Ladakh",
    path: "M 290 40 L 350 35 L 395 65 L 415 110 L 390 145 L 345 135 L 325 115 L 305 100 L 290 70 Z",
    center: [350, 85],
    capital: "Leh",
    region: "North"
  },
  // 2. Jammu & Kashmir
  {
    id: "jk",
    name: "Jammu and Kashmir",
    path: "M 240 75 L 290 70 L 305 100 L 325 115 L 310 140 L 265 145 L 235 120 L 235 90 Z",
    center: [270, 110],
    capital: "Srinagar",
    region: "North"
  },
  // 3. Himachal Pradesh
  {
    id: "hp",
    name: "Himachal Pradesh",
    path: "M 310 140 L 345 135 L 360 160 L 345 185 L 315 190 L 300 165 Z",
    center: [330, 160],
    capital: "Shimla",
    region: "North"
  },
  // 4. Punjab
  {
    id: "punjab",
    name: "Punjab",
    path: "M 255 148 L 300 165 L 295 200 L 265 215 L 245 185 Z",
    center: [270, 180],
    capital: "Chandigarh",
    region: "North"
  },
  // 5. Uttarakhand
  {
    id: "uk",
    name: "Uttarakhand",
    path: "M 345 185 L 380 170 L 405 200 L 375 225 L 345 205 Z",
    center: [375, 195],
    capital: "Dehradun",
    region: "North"
  },
  // 6. Haryana
  {
    id: "haryana",
    name: "Haryana",
    path: "M 295 200 L 335 195 L 330 240 L 290 250 L 275 220 Z",
    center: [305, 220],
    capital: "Chandigarh",
    region: "North"
  },
  // 7. Delhi (NCR)
  {
    id: "delhi",
    name: "Delhi (NCR)",
    path: "M 322 225 L 332 225 L 332 235 L 322 235 Z",
    center: [327, 230],
    capital: "New Delhi",
    region: "North"
  },
  // 8. Rajasthan
  {
    id: "rajasthan",
    name: "Rajasthan",
    path: "M 185 210 L 265 215 L 290 250 L 285 320 L 245 365 L 180 340 L 155 270 L 175 230 Z",
    center: [225, 280],
    capital: "Jaipur",
    region: "North"
  },
  // 9. Uttar Pradesh
  {
    id: "up",
    name: "Uttar Pradesh",
    path: "M 330 240 L 375 225 L 435 240 L 490 260 L 485 315 L 420 330 L 370 335 L 340 300 L 335 260 Z",
    center: [405, 275],
    capital: "Lucknow",
    region: "North"
  },
  // 10. Bihar
  {
    id: "bihar",
    name: "Bihar",
    path: "M 490 260 L 550 265 L 565 305 L 515 320 L 485 315 Z",
    center: [525, 290],
    capital: "Patna",
    region: "East"
  },
  // 11. West Bengal
  {
    id: "wb",
    name: "West Bengal",
    path: "M 550 265 L 575 250 L 565 320 L 585 365 L 555 425 L 525 390 L 540 335 L 565 305 Z",
    center: [555, 360],
    capital: "Kolkata",
    region: "East"
  },
  // 12. Jharkhand
  {
    id: "jharkhand",
    name: "Jharkhand",
    path: "M 485 315 L 540 335 L 525 390 L 475 385 L 465 340 Z",
    center: [500, 350],
    capital: "Ranchi",
    region: "East"
  },
  // 13. Odisha
  {
    id: "odisha",
    name: "Odisha",
    path: "M 475 385 L 525 390 L 540 440 L 495 490 L 450 460 L 455 410 Z",
    center: [495, 435],
    capital: "Bhubaneswar",
    region: "East"
  },
  // 14. Chhattisgarh
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    path: "M 420 330 L 465 340 L 455 410 L 450 460 L 420 500 L 400 450 L 410 380 Z",
    center: [430, 420],
    capital: "Raipur",
    region: "Central"
  },
  // 15. Madhya Pradesh
  {
    id: "mp",
    name: "Madhya Pradesh",
    path: "M 285 320 L 370 335 L 420 330 L 410 380 L 380 415 L 290 410 L 260 370 Z",
    center: [340, 365],
    capital: "Bhopal",
    region: "Central"
  },
  // 16. Gujarat
  {
    id: "gujarat",
    name: "Gujarat",
    path: "M 130 310 L 180 340 L 245 365 L 225 435 L 180 430 L 160 455 L 125 415 L 150 375 L 105 360 Z",
    center: [175, 385],
    capital: "Gandhinagar",
    region: "West"
  },
  // 17. Maharashtra
  {
    id: "maharashtra",
    name: "Maharashtra",
    path: "M 225 435 L 290 410 L 380 415 L 400 450 L 380 520 L 310 535 L 245 525 L 205 480 Z",
    center: [300, 475],
    capital: "Mumbai",
    region: "West"
  },
  // 18. Goa
  {
    id: "goa",
    name: "Goa",
    path: "M 235 550 L 245 550 L 245 565 L 235 565 Z",
    center: [240, 558],
    capital: "Panaji",
    region: "West"
  },
  // 19. Telangana
  {
    id: "telangana",
    name: "Telangana",
    path: "M 340 500 L 400 490 L 390 560 L 330 565 L 325 525 Z",
    center: [360, 530],
    capital: "Hyderabad",
    region: "South"
  },
  // 20. Andhra Pradesh
  {
    id: "ap",
    name: "Andhra Pradesh",
    path: "M 390 560 L 450 490 L 470 530 L 420 635 L 350 645 L 350 600 L 330 565 Z",
    center: [405, 595],
    capital: "Amaravati",
    region: "South"
  },
  // 21. Karnataka
  {
    id: "karnataka",
    name: "Karnataka",
    path: "M 245 525 L 310 535 L 330 565 L 350 600 L 330 670 L 275 660 L 245 590 Z",
    center: [290, 600],
    capital: "Bengaluru",
    region: "South"
  },
  // 22. Kerala
  {
    id: "kerala",
    name: "Kerala",
    path: "M 275 660 L 300 675 L 315 755 L 295 765 L 275 700 Z",
    center: [295, 715],
    capital: "Thiruvananthapuram",
    region: "South"
  },
  // 23. Tamil Nadu
  {
    id: "tn",
    name: "Tamil Nadu",
    path: "M 330 670 L 350 645 L 420 635 L 390 730 L 335 770 L 315 755 L 300 675 Z",
    center: [355, 705],
    capital: "Chennai",
    region: "South"
  },
  // 24. Sikkim (NE)
  {
    id: "sikkim",
    name: "Sikkim (NE)",
    path: "M 565 220 L 585 220 L 585 240 L 565 240 Z",
    center: [575, 230],
    capital: "Gangtok",
    region: "North East"
  },
  // 25. Assam (NE)
  {
    id: "assam",
    name: "Assam (NE)",
    path: "M 625 245 L 685 235 L 725 235 L 705 270 L 650 280 L 620 280 L 605 260 Z",
    center: [660, 255],
    capital: "Dispur",
    region: "North East"
  },
  // 26. Arunachal Pradesh (NE)
  {
    id: "arunachal",
    name: "Arunachal Pradesh (NE)",
    path: "M 625 210 L 690 195 L 755 210 L 765 245 L 725 235 L 685 235 L 625 245 Z",
    center: [700, 215],
    capital: "Itanagar",
    region: "North East"
  },
  // 27. Meghalaya (NE)
  {
    id: "meghalaya",
    name: "Meghalaya (NE)",
    path: "M 605 260 L 650 260 L 650 285 L 605 285 Z",
    center: [628, 272],
    capital: "Shillong",
    region: "North East"
  },
  // 28. Nagaland (NE)
  {
    id: "nagaland",
    name: "Nagaland (NE)",
    path: "M 725 235 L 750 250 L 735 280 L 710 265 Z",
    center: [730, 258],
    capital: "Kohima",
    region: "North East"
  },
  // 29. Manipur (NE)
  {
    id: "manipur",
    name: "Manipur (NE)",
    path: "M 710 280 L 735 280 L 730 320 L 705 315 Z",
    center: [720, 300],
    capital: "Imphal",
    region: "North East"
  },
  // 30. Mizoram (NE)
  {
    id: "mizoram",
    name: "Mizoram (NE)",
    path: "M 685 315 L 710 315 L 700 365 L 675 360 Z",
    center: [690, 340],
    capital: "Aizawl",
    region: "North East"
  },
  // 31. Tripura (NE)
  {
    id: "tripura",
    name: "Tripura (NE)",
    path: "M 655 315 L 680 315 L 675 350 L 650 345 Z",
    center: [665, 330],
    capital: "Agartala",
    region: "North East"
  },
  // 32. Andaman & Nicobar
  {
    id: "andaman",
    name: "Andaman & Nicobar",
    path: "M 710 680 L 725 680 L 725 760 L 710 760 Z",
    center: [718, 720],
    capital: "Port Blair",
    region: "UT"
  }
];

// Strategic High-Impact Multi-State Economic Corridors
export const STRATEGIC_CORRIDORS_DATA = [
  {
    id: "bullet-train",
    name: "Mumbai - Ahmedabad High Speed Rail (508 KM)",
    color: "#0284c7",
    points: [[300, 475], [240, 430], [200, 390], [175, 385]],
    costCr: 108000,
    progress: "59.86%",
    agency: "NHSRCL",
    speed: "320 km/h Bullet Train"
  },
  {
    id: "wdfc",
    name: "Western Dedicated Freight Corridor (1504 KM)",
    color: "#ea580c",
    points: [[327, 230], [270, 250], [225, 280], [175, 385], [300, 475]],
    costCr: 124005,
    progress: "96.00%",
    agency: "DFCCIL",
    speed: "Electric Heavy Haul Rail"
  },
  {
    id: "ne-gas-grid",
    name: "North East Gas Grid Pipeline (1656 KM)",
    color: "#166534",
    points: [[555, 360], [628, 272], [660, 255], [720, 300], [690, 340]],
    costCr: 9265,
    progress: "87.60%",
    agency: "IGGL / MoPNG",
    speed: "Hydrocarbon Arterial"
  }
];

export default function NationalInfrastructureMap({ onSelectProject }) {
  const [selectedMetric, setSelectedMetric] = useState('count'); // 'count', 'outlay', 'expenditure'
  const [activeStateName, setActiveStateName] = useState('Maharashtra');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [showCorridors, setShowCorridors] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Map state data dictionary merging Flash Report statistics
  const stateDataMap = useMemo(() => {
    const dict = {};
    STATES_SUMMARY.forEach(s => {
      dict[s.state.toLowerCase()] = s;
      const cleanKey = s.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
      dict[cleanKey] = s;
    });
    return dict;
  }, []);

  // Selected State object with full metrics
  const activeState = useMemo(() => {
    const cleanKey = activeStateName.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    const stat = stateDataMap[cleanKey] || STATES_SUMMARY.find(s => s.state.toLowerCase().includes(cleanKey)) || STATES_SUMMARY[0];
    const geo = INDIA_STATES_SVG.find(g => g.name.toLowerCase().includes(cleanKey)) || INDIA_STATES_SVG[0];
    return {
      ...stat,
      ...geo
    };
  }, [stateDataMap, activeStateName]);

  // Projects in the active selected state
  const stateProjects = useMemo(() => {
    if (!activeState) return [];
    const cleanName = activeState.state.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    return DETAILED_PROJECTS.filter(p => p.state.toLowerCase().includes(cleanName));
  }, [activeState]);

  // Max bounds for color scaling
  const maxProjectCount = 213; // Maharashtra
  const maxOutlayCr = 5.43; // ₹5.43 Lakh Cr

  // Color generator for choropleth state fills
  const getStateFillColor = (stateName, isSelected, isHovered) => {
    if (isSelected) return "#ff9933"; // Official National Saffron for selected state
    if (isHovered) return "#93c5fd";

    const cleanKey = stateName.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    const data = stateDataMap[cleanKey];
    if (!data) return "#e2e8f0";

    if (selectedMetric === 'count') {
      const count = data.count || 0;
      if (count > 150) return "#003366"; // Deep Gov Navy
      if (count > 100) return "#0b4884";
      if (count > 50) return "#1e60a5";
      if (count > 20) return "#3b82f6";
      return "#93c5fd"; // Light Blue
    } else if (selectedMetric === 'outlay') {
      const outlay = data.costLakhCr || 0;
      if (outlay > 4.0) return "#7c2d12"; // Deep Amber
      if (outlay > 2.5) return "#c2410c";
      if (outlay > 1.0) return "#ea580c";
      return "#fed7aa";
    } else {
      // Expenditure
      const exp = data.expenditureLakhCr || 0;
      if (exp > 3.0) return "#14532d"; // Deep Gov Green
      if (exp > 1.5) return "#166534";
      if (exp > 0.5) return "#22c55e";
      return "#bbf7d0";
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Map Header */}
      <div className="gov-card" style={{ padding: '1rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '2px' }}>
              PAIMANA Geospatial Portal ➔ <strong>National Infrastructure GIS Map (April 2026 Data)</strong>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              Geospatial Map of India: Central Sector Infrastructure Outlay
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Detailed spatial mapping of <strong>1,981 Central Sector Projects</strong> across <strong>35 States & UTs</strong> costing ₹150 Crore and above.
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
              Project Volume
            </button>
            <button
              onClick={() => setSelectedMetric('outlay')}
              className={`gov-btn ${selectedMetric === 'outlay' ? 'gov-btn-saffron' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Capital Outlay (₹ L Cr)
            </button>
            <button
              onClick={() => setSelectedMetric('expenditure')}
              className={`gov-btn ${selectedMetric === 'expenditure' ? 'gov-btn-green' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              Expenditure (₹ L Cr)
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
          {['ALL', 'North', 'West', 'South', 'East', 'Central', 'North East'].map(region => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                padding: '3px 10px',
                borderRadius: '3px',
                fontSize: '0.75rem',
                fontWeight: selectedRegion === region ? 700 : 500,
                background: selectedRegion === region ? 'var(--gov-navy)' : '#ffffff',
                color: selectedRegion === region ? '#ffffff' : '#334155',
                border: '1px solid var(--border-gov)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {region === 'ALL' ? 'All India (35 States)' : `${region} Region`}
            </button>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              id="corridorsToggle"
              checked={showCorridors}
              onChange={(e) => setShowCorridors(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="corridorsToggle" style={{ fontSize: '0.75rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
              Show Multi-State Mega Corridors
            </label>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Authentic India Vector Map + State Intelligence Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(480px, 1.35fr) minmax(360px, 1fr)',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: High-Detail Vector Map Canvas */}
        <div className="gov-card" style={{ padding: '1rem', background: '#ffffff', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="var(--gov-navy)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                Geospatial Cartogram: States & Union Territories of India
              </h3>
            </div>

            {/* Map Controls */}
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <button
                onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.2))}
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

          {/* SVG Map Container */}
          <div style={{
            width: '100%',
            height: '620px',
            background: '#f8fafc',
            border: '1px solid var(--border-gov)',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg
              viewBox="80 20 720 840"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Subtle Map Grid lines */}
              <line x1="80" y1="200" x2="780" y2="200" stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="80" y1="400" x2="780" y2="400" stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="80" y1="600" x2="780" y2="600" stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="300" y1="20" x2="300" y2="840" stroke="#e2e8f0" strokeDasharray="3 3" />
              <line x1="500" y1="20" x2="500" y2="840" stroke="#e2e8f0" strokeDasharray="3 3" />

              {/* 1. Render All Indian States SVG Polygons */}
              {INDIA_STATES_SVG.map((state) => {
                const isSelected = activeState?.id === state.id || activeStateName.toLowerCase().includes(state.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim());
                const isHovered = hoveredState?.id === state.id;
                const fillColor = getStateFillColor(state.name, isSelected, isHovered);
                const isMatchingRegion = selectedRegion === 'ALL' || state.region === selectedRegion;

                return (
                  <g
                    key={state.id}
                    onClick={() => setActiveStateName(state.name)}
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    style={{ opacity: isMatchingRegion ? 1 : 0.25, transition: 'opacity 0.2s ease' }}
                  >
                    {/* State Path */}
                    <path
                      d={state.path}
                      fill={fillColor}
                      stroke={isSelected ? "#ff9933" : "#ffffff"}
                      strokeWidth={isSelected ? "3" : "1.5"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />

                    {/* State Label & Pin */}
                    <circle
                      cx={state.center[0]}
                      cy={state.center[1]}
                      r={isSelected ? 4.5 : 3}
                      fill={isSelected ? "#ffffff" : "rgba(0,34,68,0.7)"}
                      stroke={isSelected ? "#ff9933" : "#ffffff"}
                      strokeWidth={isSelected ? 2 : 1}
                    />

                    <text
                      x={state.center[0]}
                      y={state.center[1] + 12}
                      fontSize="9"
                      fontWeight={isSelected ? "800" : "600"}
                      fill={isSelected ? "#002244" : "#1e293b"}
                      textAnchor="middle"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {state.name.replace(' (NE)', '').replace(' (NCR)', '')}
                    </text>
                  </g>
                );
              })}

              {/* 2. Render Strategic Multi-State Corridors */}
              {showCorridors && STRATEGIC_CORRIDORS_DATA.map(c => {
                const pathStr = c.points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`, "");
                return (
                  <g key={c.id}>
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={c.color}
                      strokeWidth="3.5"
                      strokeDasharray="5 3"
                      strokeLinecap="round"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Card Overlay */}
            {hoveredState && (
              <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#ffffff',
                border: '2px solid var(--gov-navy)',
                borderRadius: '4px',
                padding: '8px 12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                pointerEvents: 'none',
                zIndex: 10,
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--gov-navy-dark)', fontSize: '0.9rem' }}>
                  {hoveredState.name} ({hoveredState.capital})
                </div>
                {stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()] && (
                  <div style={{ marginTop: '2px', color: '#334155' }}>
                    Projects: <strong>{stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()].count}</strong> | 
                    Outlay: <strong>₹{stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()].costLakhCr}L Cr</strong>
                  </div>
                )}
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>Click state to view full portfolio</div>
              </div>
            )}

            {/* Map Legend */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              background: '#ffffff',
              border: '1px solid var(--border-gov)',
              borderRadius: '4px',
              padding: '6px 10px',
              fontSize: '0.7rem',
              color: '#334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <strong style={{ color: 'var(--gov-navy-dark)' }}>Choropleth Scale:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '10px', background: '#003366', display: 'inline-block' }}></span> Very High Density (&gt;150 Proj / &gt;₹4L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '10px', background: '#3b82f6', display: 'inline-block' }}></span> High Density (50-100 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '10px', background: '#93c5fd', display: 'inline-block' }}></span> Standard Density (&lt;25 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '12px', height: '10px', background: '#ff9933', display: 'inline-block' }}></span> Active Selected State
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
                  {activeState.name || activeState.state} • Infrastructure Profile
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
                {activeState.count || 0} Projects Monitored
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
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Approved Capital Outlay</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
                    ₹{activeState.costLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Cumulative Expenditure</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534' }}>
                    ₹{activeState.expenditureLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', marginBottom: '0.8rem', color: '#334155' }}>
                <strong>Key Sectoral Focus:</strong> <span style={{ color: 'var(--gov-navy)' }}>{activeState.topSector}</span>
              </div>

              {/* Projects in this State */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gov-navy-dark)' }}>
                    Central Sector Projects in {activeState.name || activeState.state} ({stateProjects.length})
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
                    {activeState.count} projects are monitored in {activeState.state} in Table 2 of the 486th Flash Report. (Use the <strong>Projects Registry</strong> tab to search all 1,981 project lines).
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '320px', overflowY: 'auto' }}>
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
                            Dossier ➔
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Strategic Multi-State Corridors Card */}
          <div className="gov-card">
            <div className="gov-card-header">
              <span className="gov-card-title">
                <Layers size={15} color="var(--gov-navy)" /> Multi-State Economic Corridors
              </span>
              <span className="gov-badge gov-badge-navy">GatiShakti High Priority</span>
            </div>

            <div style={{ padding: '0.8rem 1rem', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              {STRATEGIC_CORRIDORS_DATA.map(c => (
                <div 
                  key={c.id}
                  style={{
                    padding: '8px 10px',
                    background: '#f8fafc',
                    border: '1px solid var(--border-light)',
                    borderRadius: '4px',
                    borderLeft: `4px solid ${c.color}`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--gov-navy-dark)' }}>{c.name}</strong>
                    <span style={{ color: '#166534', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>{c.progress}</span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                    Outlay: <strong>₹{c.costCr.toLocaleString()} Cr</strong> • {c.agency} • {c.speed}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
