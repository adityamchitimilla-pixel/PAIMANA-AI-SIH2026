import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
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
  Table,
  Waves
} from 'lucide-react';

// High-Precision Sovereign Cartographic Geometries for All 35 Indian States & Union Territories (India-Only, ViewBox: 40 10 780 870)
export const INDIA_EXCLUSIVE_STATES = [
  // 1. Ladakh
  {
    id: "ladakh",
    name: "Ladakh",
    path: "M 290 35 C 310 25, 345 20, 365 30 C 390 40, 420 70, 430 105 C 435 125, 410 145, 385 145 C 360 145, 340 135, 325 115 C 310 95, 280 65, 290 35 Z",
    center: [360, 85],
    capital: "Leh",
    region: "North"
  },
  // 2. Jammu & Kashmir
  {
    id: "jk",
    name: "Jammu and Kashmir",
    path: "M 235 75 C 255 65, 280 60, 290 70 C 305 85, 320 105, 325 115 C 315 135, 295 145, 270 148 C 245 150, 225 125, 225 100 C 225 85, 230 78, 235 75 Z",
    center: [265, 110],
    capital: "Srinagar",
    region: "North"
  },
  // 3. Himachal Pradesh
  {
    id: "hp",
    name: "Himachal Pradesh",
    path: "M 310 138 C 325 135, 345 135, 360 145 C 375 155, 370 175, 355 188 C 340 195, 315 192, 305 178 C 295 160, 300 142, 310 138 Z",
    center: [335, 162],
    capital: "Shimla",
    region: "North"
  },
  // 4. Punjab
  {
    id: "punjab",
    name: "Punjab",
    path: "M 255 148 C 275 148, 295 158, 305 168 C 302 185, 298 202, 285 215 C 270 220, 250 205, 245 185 C 242 165, 248 152, 255 148 Z",
    center: [272, 180],
    capital: "Chandigarh",
    region: "North"
  },
  // 5. Uttarakhand
  {
    id: "uk",
    name: "Uttarakhand",
    path: "M 355 185 C 370 170, 395 170, 412 190 C 420 205, 405 225, 385 232 C 365 235, 345 215, 345 198 C 345 190, 350 186, 355 185 Z",
    center: [380, 202],
    capital: "Dehradun",
    region: "North"
  },
  // 6. Haryana
  {
    id: "haryana",
    name: "Haryana",
    path: "M 285 200 C 305 195, 330 195, 335 205 C 340 225, 335 248, 320 255 C 300 260, 280 248, 275 228 C 272 215, 278 205, 285 200 Z",
    center: [305, 225],
    capital: "Chandigarh",
    region: "North"
  },
  // 7. Delhi (NCR)
  {
    id: "delhi",
    name: "Delhi (NCR)",
    path: "M 322 225 C 334 225, 334 225, 334 237 C 334 237, 322 237, 322 237 Z",
    center: [328, 231],
    capital: "New Delhi",
    region: "North"
  },
  // 8. Rajasthan
  {
    id: "rajasthan",
    name: "Rajasthan",
    path: "M 175 215 C 215 205, 265 212, 285 225 C 295 245, 290 290, 285 320 C 275 350, 245 370, 215 365 C 185 360, 155 330, 145 285 C 140 245, 155 225, 175 215 Z",
    center: [220, 285],
    capital: "Jaipur",
    region: "North"
  },
  // 9. Uttar Pradesh
  {
    id: "up",
    name: "Uttar Pradesh",
    path: "M 335 210 C 375 215, 435 230, 485 250 C 500 270, 495 305, 475 320 C 445 335, 395 340, 360 330 C 335 315, 325 270, 325 240 C 325 225, 330 215, 335 210 Z",
    center: [410, 275],
    capital: "Lucknow",
    region: "North"
  },
  // 10. Bihar
  {
    id: "bihar",
    name: "Bihar",
    path: "M 485 250 C 525 255, 555 260, 568 280 C 570 300, 555 315, 530 322 C 505 325, 480 315, 475 295 C 472 275, 478 258, 485 250 Z",
    center: [525, 288],
    capital: "Patna",
    region: "East"
  },
  // 11. West Bengal
  {
    id: "wb",
    name: "West Bengal",
    path: "M 550 255 C 570 245, 580 260, 575 290 C 570 325, 590 365, 575 415 C 560 435, 535 410, 530 375 C 525 340, 545 310, 555 285 C 558 270, 545 262, 550 255 Z",
    center: [555, 355],
    capital: "Kolkata",
    region: "East"
  },
  // 12. Jharkhand
  {
    id: "jharkhand",
    name: "Jharkhand",
    path: "M 475 315 C 510 320, 535 330, 535 355 C 535 378, 515 395, 485 395 C 460 395, 450 365, 455 340 C 458 322, 468 316, 475 315 Z",
    center: [495, 355],
    capital: "Ranchi",
    region: "East"
  },
  // 13. Odisha
  {
    id: "odisha",
    name: "Odisha",
    path: "M 465 385 C 505 385, 540 405, 550 435 C 555 465, 520 495, 485 498 C 455 500, 440 465, 442 430 C 445 400, 455 388, 465 385 Z",
    center: [495, 442],
    capital: "Bhubaneswar",
    region: "East"
  },
  // 14. Chhattisgarh
  {
    id: "chhattisgarh",
    name: "Chhattisgarh",
    path: "M 410 335 C 445 340, 455 375, 450 420 C 445 460, 435 505, 415 515 C 395 520, 390 475, 395 435 C 400 390, 400 350, 410 335 Z",
    center: [422, 425],
    capital: "Raipur",
    region: "Central"
  },
  // 15. Madhya Pradesh
  {
    id: "mp",
    name: "Madhya Pradesh",
    path: "M 285 320 C 335 325, 385 325, 410 340 C 415 370, 405 405, 375 418 C 345 425, 295 420, 265 395 C 248 375, 260 340, 285 320 Z",
    center: [340, 368],
    capital: "Bhopal",
    region: "Central"
  },
  // 16. Gujarat
  {
    id: "gujarat",
    name: "Gujarat",
    path: "M 115 315 C 155 320, 185 340, 235 365 C 240 395, 215 440, 180 440 C 150 440, 140 458, 115 430 C 95 400, 125 370, 95 350 C 85 335, 100 320, 115 315 Z",
    center: [168, 382],
    capital: "Gandhinagar",
    region: "West"
  },
  // 17. Maharashtra
  {
    id: "maharashtra",
    name: "Maharashtra",
    path: "M 215 435 C 275 415, 345 415, 395 440 C 405 475, 385 525, 345 538 C 300 545, 245 535, 215 505 C 195 475, 200 450, 215 435 Z",
    center: [300, 478],
    capital: "Mumbai",
    region: "West"
  },
  // 18. Goa
  {
    id: "goa",
    name: "Goa",
    path: "M 235 550 C 248 550, 248 550, 248 565 C 248 565, 235 565, 235 565 Z",
    center: [241, 558],
    capital: "Panaji",
    region: "West"
  },
  // 19. Telangana
  {
    id: "telangana",
    name: "Telangana",
    path: "M 335 495 C 375 485, 405 490, 405 525 C 405 555, 375 572, 345 570 C 320 565, 315 530, 325 505 C 328 498, 332 496, 335 495 Z",
    center: [362, 530],
    capital: "Hyderabad",
    region: "South"
  },
  // 20. Andhra Pradesh
  {
    id: "ap",
    name: "Andhra Pradesh",
    path: "M 395 540 C 445 490, 480 525, 465 575 C 445 625, 395 650, 355 648 C 340 625, 345 580, 365 565 C 380 550, 390 545, 395 540 Z",
    center: [412, 595],
    capital: "Amaravati",
    region: "South"
  },
  // 21. Karnataka
  {
    id: "karnataka",
    name: "Karnataka",
    path: "M 235 525 C 285 530, 325 545, 345 575 C 355 615, 340 670, 305 675 C 270 680, 245 625, 235 575 C 230 550, 232 532, 235 525 Z",
    center: [290, 605],
    capital: "Bengaluru",
    region: "South"
  },
  // 22. Kerala
  {
    id: "kerala",
    name: "Kerala",
    path: "M 270 660 C 295 670, 305 700, 315 745 C 310 765, 290 770, 280 745 C 265 710, 260 680, 270 660 Z",
    center: [290, 715],
    capital: "Thiruvananthapuram",
    region: "South"
  },
  // 23. Tamil Nadu
  {
    id: "tn",
    name: "Tamil Nadu",
    path: "M 325 665 C 365 640, 415 645, 405 705 C 395 750, 355 778, 325 775 C 305 765, 305 720, 315 685 C 318 672, 322 668, 325 665 Z",
    center: [360, 710],
    capital: "Chennai",
    region: "South"
  },
  // 24. Sikkim (NE)
  {
    id: "sikkim",
    name: "Sikkim (NE)",
    path: "M 565 218 C 585 218, 585 218, 585 238 C 585 238, 565 238, 565 238 Z",
    center: [575, 228],
    capital: "Gangtok",
    region: "North East"
  },
  // 25. Assam (NE)
  {
    id: "assam",
    name: "Assam (NE)",
    path: "M 620 242 C 665 230, 715 230, 725 250 C 715 275, 665 285, 625 282 C 605 275, 605 255, 620 242 Z",
    center: [662, 258],
    capital: "Dispur",
    region: "North East"
  },
  // 26. Arunachal Pradesh (NE)
  {
    id: "arunachal",
    name: "Arunachal Pradesh (NE)",
    path: "M 620 210 C 675 190, 745 200, 768 225 C 765 248, 735 245, 705 238 C 665 232, 625 240, 620 210 Z",
    center: [705, 218],
    capital: "Itanagar",
    region: "North East"
  },
  // 27. Meghalaya (NE)
  {
    id: "meghalaya",
    name: "Meghalaya (NE)",
    path: "M 605 260 C 650 260, 650 260, 650 285 C 650 285, 605 285, 605 285 Z",
    center: [628, 272],
    capital: "Shillong",
    region: "North East"
  },
  // 28. Nagaland (NE)
  {
    id: "nagaland",
    name: "Nagaland (NE)",
    path: "M 725 235 C 750 245, 750 265, 735 280 C 720 280, 715 255, 725 235 Z",
    center: [732, 258],
    capital: "Kohima",
    region: "North East"
  },
  // 29. Manipur (NE)
  {
    id: "manipur",
    name: "Manipur (NE)",
    path: "M 710 280 C 738 280, 738 305, 730 322 C 710 322, 705 300, 710 280 Z",
    center: [722, 302],
    capital: "Imphal",
    region: "North East"
  },
  // 30. Mizoram (NE)
  {
    id: "mizoram",
    name: "Mizoram (NE)",
    path: "M 685 315 C 712 315, 712 345, 700 368 C 680 365, 675 338, 685 315 Z",
    center: [692, 342],
    capital: "Aizawl",
    region: "North East"
  },
  // 31. Tripura (NE)
  {
    id: "tripura",
    name: "Tripura (NE)",
    path: "M 655 315 C 680 315, 680 335, 675 352 C 655 350, 650 332, 655 315 Z",
    center: [665, 332],
    capital: "Agartala",
    region: "North East"
  },
  // 32. Lakshadweep Archipelago (Arabian Sea)
  {
    id: "lakshadweep",
    name: "Lakshadweep",
    path: "M 215 690 A 6 6 0 1 1 215 691 Z M 210 715 A 5 5 0 1 1 210 716 Z M 205 735 A 5 5 0 1 1 205 736 Z",
    center: [210, 715],
    capital: "Kavaratti",
    region: "UT"
  },
  // 33. Andaman & Nicobar Archipelago (Bay of Bengal)
  {
    id: "andaman",
    name: "Andaman & Nicobar",
    path: "M 724 660 C 735 660, 735 695, 724 705 C 715 695, 715 660, 724 660 Z M 728 725 C 738 725, 738 760, 728 768 C 720 760, 720 725, 728 725 Z",
    center: [726, 715],
    capital: "Port Blair",
    region: "UT"
  }
];

// Strategic Multi-State Corridors (India-Only Routes)
export const STRATEGIC_CORRIDORS_INDIA = [
  {
    id: "bullet-train",
    name: "Mumbai - Ahmedabad High Speed Rail (508 KM)",
    color: "#0284c7",
    points: [[300, 478], [240, 435], [200, 395], [168, 382]],
    costCr: 108000,
    progress: "59.86%",
    agency: "NHSRCL"
  },
  {
    id: "wdfc",
    name: "Western Dedicated Freight Corridor (1504 KM)",
    color: "#ea580c",
    points: [[328, 231], [272, 250], [220, 285], [168, 382], [300, 478]],
    costCr: 124005,
    progress: "96.00%",
    agency: "DFCCIL"
  },
  {
    id: "ne-gas-grid",
    name: "North East Gas Grid Pipeline Network (1656 KM)",
    color: "#166534",
    points: [[555, 355], [628, 272], [662, 258], [722, 302], [692, 342]],
    costCr: 9265,
    progress: "87.60%",
    agency: "IGGL / MoPNG"
  }
];

export default function NationalInfrastructureMap({ onSelectProject }) {
  const { t } = useLanguage();
  const [selectedMetric, setSelectedMetric] = useState('count'); // 'count', 'outlay', 'expenditure'
  const [activeStateName, setActiveStateName] = useState('Maharashtra');
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [showCorridors, setShowCorridors] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  // Map state dictionary
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
    const geo = INDIA_EXCLUSIVE_STATES.find(g => g.name.toLowerCase().includes(cleanKey)) || INDIA_EXCLUSIVE_STATES[0];
    return {
      ...stat,
      ...geo
    };
  }, [stateDataMap, activeStateName]);

  // Projects in the active selected state
  const stateProjects = useMemo(() => {
    if (!activeState) return [];
    const cleanName = (activeState.state || activeState.name || '').toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    return DETAILED_PROJECTS.filter(p => p.state.toLowerCase().includes(cleanName));
  }, [activeState]);

  // Color generator for choropleth state fills
  const getStateFillColor = (stateName, isSelected, isHovered) => {
    if (isSelected) return "#ff9933"; // Official National Saffron for active selected state
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
              PAIMANA Geospatial Portal ➔ <strong>{t('tabGisMap', 'National GIS Map')}</strong>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              {t('mapHeading', 'Geospatial Map of India: Central Sector Infrastructure Outlay')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {t('mapSubheading', 'Detailed spatial mapping of 1,981 Central Sector Projects across 35 States & UTs costing ₹150 Crore and above.')}
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
            { id: 'ALL', label: t('regionAll', 'All India (35 States)') },
            { id: 'North', label: t('regionNorth', 'North Region') },
            { id: 'West', label: t('regionWest', 'West Region') },
            { id: 'South', label: t('regionSouth', 'South Region') },
            { id: 'East', label: t('regionEast', 'East Region') },
            { id: 'Central', label: t('regionCentral', 'Central Region') },
            { id: 'North East', label: t('regionNE', 'North East Region') }
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

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              id="corridorsToggle"
              checked={showCorridors}
              onChange={(e) => setShowCorridors(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="corridorsToggle" style={{ fontSize: '0.75rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
              {t('corridorsToggle', 'Show Multi-State Mega Corridors')}
            </label>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Sovereign India Vector Map + State Intelligence Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(520px, 1.45fr) minmax(360px, 1fr)',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: High-Detail Vector Map Canvas with ONLY India & Oceans */}
        <div className="gov-card" style={{ padding: '1rem', background: '#ffffff', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="var(--gov-navy)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                Sovereign Cartography of India & Surrounding Oceans
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

          {/* SVG Map Container: Pure Oceanic Basin with ONLY India */}
          <div style={{
            width: '100%',
            height: '670px',
            background: 'radial-gradient(ellipse at center, #f0f9ff 0%, #e0f2fe 60%, #bae6fd 100%)',
            border: '1.5px solid var(--border-gov)',
            borderRadius: '4px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg
              viewBox="50 15 760 855"
              style={{
                width: '100%',
                height: '100%',
                transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
                transition: 'transform 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {/* Oceanic Bathymetric Water Waves */}
              {/* Arabian Sea Waves (West) */}
              <path d="M 70 470 Q 130 450, 160 520 T 110 620" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
              <path d="M 80 530 Q 140 510, 150 580 T 120 670" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
              
              {/* Bay of Bengal Waves (East) */}
              <path d="M 580 480 Q 650 460, 680 540 T 640 650" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" />
              <path d="M 590 550 Q 670 520, 690 600 T 660 710" fill="none" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

              {/* Indian Ocean Waves (South) */}
              <path d="M 220 790 Q 360 760, 500 790 T 640 820" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="8 5" opacity="0.8" />
              <path d="M 240 820 Q 380 790, 520 820 T 660 850" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="8 5" opacity="0.6" />

              {/* OCEAN LABELS (Bold, Crisp & Nautical) */}
              {/* 1. Arabian Sea */}
              <g opacity="0.9">
                <text x="130" y="550" fontSize="13" fontWeight="900" fill="#0369a1" letterSpacing="0.15em" textAnchor="middle">
                  {t('arabianSea', 'ARABIAN SEA')}
                </text>
                <text x="130" y="568" fontSize="10" fontWeight="700" fill="#0284c7" textAnchor="middle">
                  (अरब सागर)
                </text>
              </g>

              {/* 2. Bay of Bengal */}
              <g opacity="0.9">
                <text x="650" y="545" fontSize="13" fontWeight="900" fill="#0369a1" letterSpacing="0.15em" textAnchor="middle">
                  {t('bayOfBengal', 'BAY OF BENGAL')}
                </text>
                <text x="650" y="563" fontSize="10" fontWeight="700" fill="#0284c7" textAnchor="middle">
                  (बंगाल की खाड़ी)
                </text>
              </g>

              {/* 3. Indian Ocean */}
              <g opacity="0.95">
                <text x="390" y="825" fontSize="15" fontWeight="900" fill="#075985" letterSpacing="0.2em" textAnchor="middle">
                  {t('indianOcean', 'INDIAN OCEAN')}
                </text>
                <text x="390" y="843" fontSize="11" fontWeight="700" fill="#0369a1" textAnchor="middle">
                  (हिंद महासागर)
                </text>
              </g>

              {/* Grid Lat/Long Coordinates */}
              <line x1="50" y1="200" x2="810" y2="200" stroke="#bae6fd" strokeDasharray="3 3" />
              <text x="55" y="196" fill="#0284c7" fontSize="8" fontWeight="700">28° N</text>

              <line x1="50" y1="440" x2="810" y2="440" stroke="#bae6fd" strokeDasharray="3 3" />
              <text x="55" y="436" fill="#0284c7" fontSize="8" fontWeight="700">20° N</text>

              <line x1="50" y1="670" x2="810" y2="670" stroke="#bae6fd" strokeDasharray="3 3" />
              <text x="55" y="666" fill="#0284c7" fontSize="8" fontWeight="700">12° N</text>

              {/* 1. Render All Indian States SVG Polygons with Crisp Borders */}
              {INDIA_EXCLUSIVE_STATES.map((state) => {
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
                    style={{ opacity: isMatchingRegion ? 1 : 0.25, transition: 'all 0.15s ease' }}
                  >
                    {/* Crisp State Polygon */}
                    <path
                      d={state.path}
                      fill={fillColor}
                      stroke={isSelected ? "#ff9933" : "#ffffff"}
                      strokeWidth={isSelected ? "3.5" : "2"}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      filter={isSelected ? "drop-shadow(0 2px 8px rgba(255,153,51,0.6))" : undefined}
                    />

                    {/* Capital Pin Marker */}
                    <circle
                      cx={state.center[0]}
                      cy={state.center[1]}
                      r={isSelected ? 4.5 : 3}
                      fill={isSelected ? "#ffffff" : "rgba(0,34,68,0.85)"}
                      stroke={isSelected ? "#ff9933" : "#ffffff"}
                      strokeWidth={isSelected ? 2 : 1}
                    />

                    {/* State Name Label */}
                    <text
                      x={state.center[0]}
                      y={state.center[1] + 12}
                      fontSize="9.5"
                      fontWeight={isSelected ? "900" : "700"}
                      fill={isSelected ? "#002244" : "#0f172a"}
                      textAnchor="middle"
                      style={{ pointerEvents: 'none', userSelect: 'none' }}
                    >
                      {state.name.replace(' (NE)', '').replace(' (NCR)', '')}
                    </text>
                  </g>
                );
              })}

              {/* 2. Render Strategic Multi-State Corridors */}
              {showCorridors && STRATEGIC_CORRIDORS_INDIA.map(c => {
                const pathStr = c.points.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt[0]} ${pt[1]}`, "");
                return (
                  <g key={c.id}>
                    <path
                      d={pathStr}
                      fill="none"
                      stroke={c.color}
                      strokeWidth="3.5"
                      strokeDasharray="6 3"
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
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                pointerEvents: 'none',
                zIndex: 10,
                fontSize: '0.8rem'
              }}>
                <div style={{ fontWeight: 800, color: 'var(--gov-navy-dark)', fontSize: '0.95rem' }}>
                  {hoveredState.name} • {hoveredState.capital}
                </div>
                {stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()] && (
                  <div style={{ marginTop: '2px', color: '#334155' }}>
                    {t('projectsMonitored', 'Projects')}: <strong>{stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()].count}</strong> | 
                    {t('approvedOutlay', 'Outlay')}: <strong>₹{stateDataMap[hoveredState.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim()].costLakhCr}L Cr</strong>
                  </div>
                )}
                <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>Click to inspect state dossier</div>
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
              padding: '8px 12px',
              fontSize: '0.7rem',
              color: '#334155',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.08)'
            }}>
              <strong style={{ color: 'var(--gov-navy-dark)' }}>Choropleth Density Scale:</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#003366', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> High Density (&gt;100 Proj / &gt;₹4L Cr)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#3b82f6', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> Medium Density (25-100 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#93c5fd', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> Standard Density (&lt;25 Proj)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', height: '10px', background: '#ff9933', display: 'inline-block', border: '1px solid #c2410c' }}></span> Active Selected State
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
                  {activeState.name || activeState.state} • {t('stateProfile', 'Infrastructure Profile')}
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
                {activeState.count || 0} {t('projectsMonitored', 'Projects Monitored')}
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
                    ₹{activeState.costLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>{t('cumulativeExp', 'Cumulative Expenditure')}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#166534' }}>
                    ₹{activeState.expenditureLakhCr} <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Lakh Cr</span>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.8rem', marginBottom: '0.8rem', color: '#334155' }}>
                <strong>{t('keySector', 'Key Sectoral Focus')}:</strong> <span style={{ color: 'var(--gov-navy)' }}>{activeState.topSector}</span>
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

          {/* Strategic Multi-State Corridors Card */}
          <div className="gov-card">
            <div className="gov-card-header">
              <span className="gov-card-title">
                <Layers size={15} color="var(--gov-navy)" /> Multi-State Economic Corridors
              </span>
              <span className="gov-badge gov-badge-navy">PM GatiShakti</span>
            </div>

            <div style={{ padding: '0.8rem 1rem', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              {STRATEGIC_CORRIDORS_INDIA.map(c => (
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
                    Outlay: <strong>₹{c.costCr.toLocaleString()} Cr</strong> • {c.agency}
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
