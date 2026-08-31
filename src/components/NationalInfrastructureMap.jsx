import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import L from 'leaflet';
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
  Waves,
  Navigation
} from 'lucide-react';

// Exact GPS Centroids for all 35 Indian States & Union Territories
export const INDIA_STATES_GPS = [
  { id: "maharashtra", name: "Maharashtra", lat: 19.7515, lng: 75.7139, capital: "Mumbai", region: "West" },
  { id: "up", name: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, capital: "Lucknow", region: "North" },
  { id: "ap", name: "Andhra Pradesh", lat: 15.9129, lng: 79.7400, capital: "Amaravati", region: "South" },
  { id: "bihar", name: "Bihar", lat: 25.0961, lng: 85.3131, capital: "Patna", region: "East" },
  { id: "mp", name: "Madhya Pradesh", lat: 22.9734, lng: 78.6569, capital: "Bhopal", region: "Central" },
  { id: "gujarat", name: "Gujarat", lat: 22.2587, lng: 71.1924, capital: "Gandhinagar", region: "West" },
  { id: "karnataka", name: "Karnataka", lat: 15.3173, lng: 75.7139, capital: "Bengaluru", region: "South" },
  { id: "odisha", name: "Odisha", lat: 20.9517, lng: 85.0985, capital: "Bhubaneswar", region: "East" },
  { id: "jharkhand", name: "Jharkhand", lat: 23.6102, lng: 85.2799, capital: "Ranchi", region: "East" },
  { id: "telangana", name: "Telangana", lat: 18.1124, lng: 79.0193, capital: "Hyderabad", region: "South" },
  { id: "assam", name: "Assam (NE)", lat: 26.2006, lng: 92.9376, capital: "Dispur", region: "North East" },
  { id: "wb", name: "West Bengal", lat: 22.9868, lng: 87.8550, capital: "Kolkata", region: "East" },
  { id: "rajasthan", name: "Rajasthan", lat: 27.0238, lng: 74.2179, capital: "Jaipur", region: "North" },
  { id: "chhattisgarh", name: "Chhattisgarh", lat: 21.2787, lng: 81.8661, capital: "Raipur", region: "Central" },
  { id: "tn", name: "Tamil Nadu", lat: 11.1271, lng: 78.6569, capital: "Chennai", region: "South" },
  { id: "punjab", name: "Punjab", lat: 31.1471, lng: 75.3412, capital: "Chandigarh", region: "North" },
  { id: "uk", name: "Uttarakhand", lat: 30.0668, lng: 79.0193, capital: "Dehradun", region: "North" },
  { id: "jk", name: "Jammu and Kashmir", lat: 33.7782, lng: 76.5762, capital: "Srinagar", region: "North" },
  { id: "manipur", name: "Manipur (NE)", lat: 24.6637, lng: 93.9063, capital: "Imphal", region: "North East" },
  { id: "hp", name: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, capital: "Shimla", region: "North" },
  { id: "kerala", name: "Kerala", lat: 10.8505, lng: 76.2711, capital: "Thiruvananthapuram", region: "South" },
  { id: "arunachal", name: "Arunachal Pradesh (NE)", lat: 28.2180, lng: 94.7278, capital: "Itanagar", region: "North East" },
  { id: "mizoram", name: "Mizoram (NE)", lat: 23.1645, lng: 92.9376, capital: "Aizawl", region: "North East" },
  { id: "nagaland", name: "Nagaland (NE)", lat: 26.1584, lng: 94.5624, capital: "Kohima", region: "North East" },
  { id: "delhi", name: "Delhi (NCR)", lat: 28.7041, lng: 77.1025, capital: "New Delhi", region: "North" },
  { id: "meghalaya", name: "Meghalaya (NE)", lat: 25.4670, lng: 91.3662, capital: "Shillong", region: "North East" },
  { id: "sikkim", name: "Sikkim (NE)", lat: 27.5330, lng: 88.5122, capital: "Gangtok", region: "North East" },
  { id: "tripura", name: "Tripura (NE)", lat: 23.9408, lng: 91.9882, capital: "Agartala", region: "North East" },
  { id: "goa", name: "Goa", lat: 15.2993, lng: 74.1240, capital: "Panaji", region: "West" },
  { id: "puducherry", name: "Puducherry", lat: 11.9416, lng: 79.8083, capital: "Puducherry", region: "South" },
  { id: "dnh", name: "Dadra & Nagar Haveli", lat: 20.1809, lng: 73.0169, capital: "Silvassa", region: "West" },
  { id: "andaman", name: "Andaman & Nicobar", lat: 11.7401, lng: 92.6586, capital: "Port Blair", region: "UT" },
  { id: "ladakh", name: "Ladakh", lat: 34.1526, lng: 77.5771, capital: "Leh", region: "North" },
  { id: "lakshadweep", name: "Lakshadweep", lat: 10.5667, lng: 72.6417, capital: "Kavaratti", region: "UT" },
  { id: "haryana", name: "Haryana", lat: 29.0588, lng: 76.0856, capital: "Chandigarh", region: "North" }
];

// Strategic Multi-State Mega Corridors with Exact GPS Polylines
export const STRATEGIC_CORRIDORS_GPS = [
  {
    id: "bullet-train",
    name: "Mumbai - Ahmedabad High Speed Rail (508 KM)",
    color: "#0284c7",
    agency: "NHSRCL",
    costCr: 108000,
    progress: "59.86%",
    speed: "320 km/h Bullet Train",
    waypoints: [
      [19.0760, 72.8777], // Mumbai BKC
      [19.2183, 72.9781], // Thane
      [19.4564, 72.7925], // Virar
      [19.8036, 72.7523], // Boisar
      [20.3712, 72.9044], // Vapi
      [20.8038, 72.9566], // Bilimora
      [21.1702, 72.8311], // Surat
      [21.7051, 72.9959], // Bharuch
      [22.3072, 73.1812], // Vadodara
      [22.5645, 72.9289], // Anand
      [23.0225, 72.5714], // Ahmedabad
      [23.0805, 72.5850]  // Sabarmati
    ]
  },
  {
    id: "wdfc",
    name: "Western Dedicated Freight Corridor (1,504 KM)",
    color: "#ea580c",
    agency: "DFCCIL",
    costCr: 124005,
    progress: "96.00%",
    speed: "Heavy Haul Electric Freight",
    waypoints: [
      [28.5500, 77.5500], // Dadri / NCR
      [28.1920, 76.6190], // Rewari (Haryana)
      [26.8720, 75.2420], // Phulera / Jaipur (Rajasthan)
      [25.7333, 73.3667], // Marwar Jn
      [24.1720, 72.4340], // Palanpur (Gujarat)
      [23.0225, 72.5714], // Ahmedabad
      [22.3072, 73.1812], // Vadodara
      [21.1702, 72.8311], // Surat
      [20.3712, 72.9044], // Valsad
      [19.4564, 72.7925], // Vaitarna
      [18.9500, 72.9500]  // JNPT Port Mumbai
    ]
  },
  {
    id: "ne-gas-grid",
    name: "North East Gas Grid Pipeline Network (1,656 KM)",
    color: "#166534",
    agency: "IGGL / MoPNG",
    costCr: 9265,
    progress: "87.60%",
    speed: "Hydrocarbon Arterial Grid",
    waypoints: [
      [25.6093, 85.1235], // Barauni (Bihar)
      [26.7509, 88.4312], // Siliguri (WB)
      [26.1445, 91.7362], // Guwahati (Assam)
      [27.0844, 93.6053], // Itanagar (Arunachal)
      [25.5788, 91.8933], // Shillong (Meghalaya)
      [25.6751, 94.1086], // Dimapur / Kohima (Nagaland)
      [24.8170, 93.9368], // Imphal (Manipur)
      [23.7271, 92.7176], // Aizawl (Mizoram)
      [23.8315, 91.2868]  // Agartala (Tripura)
    ]
  },
  {
    id: "frontier-hwy",
    name: "NH-913 Arunachal Frontier Strategic Highway",
    color: "#7c3aed",
    agency: "MoRTH / NHIDCL",
    costCr: 27000,
    progress: "42.50%",
    speed: "Strategic Frontier Highway",
    waypoints: [
      [27.5861, 91.8653], // Tawang
      [27.2645, 92.4172], // Bomdila
      [27.5950, 93.8350], // Ziro
      [28.0667, 95.3333], // Pasighat
      [28.2500, 95.8300], // Roing
      [27.9167, 96.1667], // Tezu
      [27.1990, 96.9940]  // Vijaynagar / Kibithu
    ]
  }
];

export default function NationalInfrastructureMap({ onSelectProject }) {
  const { t } = useLanguage();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layersRef = useRef({ circles: [], polylines: [] });

  const [selectedMetric, setSelectedMetric] = useState('count'); // 'count', 'outlay', 'expenditure'
  const [activeStateName, setActiveStateName] = useState('Maharashtra');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [showCorridors, setShowCorridors] = useState(true);
  const [mapTileStyle, setMapTileStyle] = useState('carto'); // 'carto', 'osm', 'satellite'

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

  // Selected State object
  const activeState = useMemo(() => {
    const cleanKey = activeStateName.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    const stat = stateDataMap[cleanKey] || STATES_SUMMARY.find(s => s.state.toLowerCase().includes(cleanKey)) || STATES_SUMMARY[0];
    const geo = INDIA_STATES_GPS.find(g => g.name.toLowerCase().includes(cleanKey)) || INDIA_STATES_GPS[0];
    return {
      ...stat,
      ...geo
    };
  }, [stateDataMap, activeStateName]);

  // Projects in active selected state
  const stateProjects = useMemo(() => {
    if (!activeState) return [];
    const cleanName = (activeState.state || activeState.name || '').toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
    return DETAILED_PROJECTS.filter(p => p.state.toLowerCase().includes(cleanName));
  }, [activeState]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Create map centered on India
      const map = L.map(mapContainerRef.current, {
        center: [22.8, 80.5],
        zoom: 5,
        minZoom: 4,
        maxZoom: 10,
        zoomControl: false
      });

      // Add Custom Zoom Control in top right
      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Tile Layer based on mapTileStyle
    let tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    let attribution = '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap';

    if (mapTileStyle === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else if (mapTileStyle === 'satellite') {
      tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      attribution = '&copy; Esri World Imagery';
    }

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 18,
      subdomains: 'abcd'
    }).addTo(map);

    return () => {
      // cleanup on unmount
    };
  }, [mapTileStyle]);

  // Update State Circles & Corridors on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old circles and polylines
    layersRef.current.circles.forEach(c => map.removeLayer(c));
    layersRef.current.polylines.forEach(p => map.removeLayer(p));
    layersRef.current.circles = [];
    layersRef.current.polylines = [];

    // 1. Draw Strategic Corridors (if enabled)
    if (showCorridors) {
      STRATEGIC_CORRIDORS_GPS.forEach(corridor => {
        const polyline = L.polyline(corridor.waypoints, {
          color: corridor.color,
          weight: 4,
          opacity: 0.85,
          dashArray: '8, 6',
          lineCap: 'round'
        }).addTo(map);

        polyline.bindPopup(`
          <div style="font-family: sans-serif; padding: 4px;">
            <strong style="color: #002244; font-size: 13px;">${corridor.name}</strong>
            <div style="font-size: 11px; color: #475569; margin-top: 4px;">
              Agency: <strong>${corridor.agency}</strong> | Cost: <strong>₹${corridor.costCr.toLocaleString()} Cr</strong>
            </div>
            <div style="font-size: 11px; color: #166534; font-weight: bold; margin-top: 2px;">
              Progress: ${corridor.progress} (${corridor.speed})
            </div>
          </div>
        `);

        layersRef.current.polylines.push(polyline);
      });
    }

    // 2. Draw Interactive State Circles
    INDIA_STATES_GPS.forEach(state => {
      const cleanKey = state.name.toLowerCase().replace(' (ne)', '').replace(' (ncr)', '').trim();
      const data = stateDataMap[cleanKey];
      if (!data) return;

      const isSelected = activeStateName.toLowerCase().includes(cleanKey);
      const isRegionMatch = selectedRegion === 'ALL' || state.region === selectedRegion;

      // Metric calculations for radius and color
      let radius = 22000;
      let fillColor = '#3b82f6';
      let strokeColor = '#003366';

      if (selectedMetric === 'count') {
        const count = data.count || 0;
        radius = Math.max(16000, count * 750);
        if (count >= 120) fillColor = '#003366';
        else if (count >= 50) fillColor = '#0284c7';
        else fillColor = '#38bdf8';
      } else if (selectedMetric === 'outlay') {
        const outlay = data.costLakhCr || 0;
        radius = Math.max(16000, outlay * 28000);
        if (outlay >= 3.0) fillColor = '#9a3412';
        else if (outlay >= 1.0) fillColor = '#ea580c';
        else fillColor = '#fb923c';
        strokeColor = '#7c2d12';
      } else {
        const exp = data.expenditureLakhCr || 0;
        radius = Math.max(16000, exp * 32000);
        if (exp >= 2.0) fillColor = '#14532d';
        else if (exp >= 0.8) fillColor = '#166534';
        else fillColor = '#4ade80';
        strokeColor = '#052e16';
      }

      if (isSelected) {
        fillColor = '#ff9933'; // National Saffron for selected state
        strokeColor = '#c2410c';
        radius = radius * 1.25;
      }

      const circle = L.circle([state.lat, state.lng], {
        radius: isRegionMatch ? radius : radius * 0.7,
        fillColor: fillColor,
        fillOpacity: isRegionMatch ? (isSelected ? 0.95 : 0.75) : 0.15,
        color: isSelected ? '#ff9933' : strokeColor,
        weight: isSelected ? 3.5 : 1.5
      }).addTo(map);

      // State Label Tooltip
      circle.bindTooltip(`
        <div style="font-family: sans-serif; font-size: 11px; padding: 2px;">
          <strong style="color: #002244;">${state.name.replace(' (NE)', '').replace(' (NCR)', '')}</strong> (${state.capital})<br/>
          Projects: <strong>${data.count}</strong> | Outlay: <strong>₹${data.costLakhCr}L Cr</strong><br/>
          Expenditure: <strong style="color: #166534;">₹${data.expenditureLakhCr}L Cr</strong>
        </div>
      `, {
        permanent: isSelected,
        direction: 'top',
        className: isSelected ? 'leaflet-active-state-tooltip' : ''
      });

      // Click Handler
      circle.on('click', () => {
        setActiveStateName(state.name);
        map.panTo([state.lat, state.lng], { animate: true, duration: 0.5 });
      });

      layersRef.current.circles.push(circle);
    });

  }, [selectedMetric, activeStateName, selectedRegion, showCorridors, stateDataMap]);

  // Quick region zoom helper
  const handleZoomToRegion = (regionCode) => {
    setSelectedRegion(regionCode);
    const map = mapInstanceRef.current;
    if (!map) return;

    if (regionCode === 'ALL') {
      map.setView([22.8, 80.5], 5, { animate: true });
    } else if (regionCode === 'North East') {
      map.setView([26.0, 93.0], 6.5, { animate: true });
    } else if (regionCode === 'North') {
      map.setView([30.0, 76.5], 6, { animate: true });
    } else if (regionCode === 'West') {
      map.setView([21.0, 73.0], 6, { animate: true });
    } else if (regionCode === 'South') {
      map.setView([13.5, 77.5], 6, { animate: true });
    } else if (regionCode === 'East') {
      map.setView([23.5, 86.5], 6, { animate: true });
    } else if (regionCode === 'Central') {
      map.setView([22.5, 80.0], 6, { animate: true });
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

        {/* Region & Basemap Controls */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          marginTop: '0.8rem',
          paddingTop: '0.6rem',
          borderTop: '1px solid var(--border-light)',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Quick Region:</span>
          {[
            { id: 'ALL', label: t('regionAll', 'All India (35 States)') },
            { id: 'North', label: t('regionNorth', 'North') },
            { id: 'West', label: t('regionWest', 'West') },
            { id: 'South', label: t('regionSouth', 'South') },
            { id: 'East', label: t('regionEast', 'East') },
            { id: 'Central', label: t('regionCentral', 'Central') },
            { id: 'North East', label: t('regionNE', 'North East (NER)') }
          ].map(r => (
            <button
              key={r.id}
              onClick={() => handleZoomToRegion(r.id)}
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

          {/* Map Tile Switcher */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Basemap:</span>
            <select
              value={mapTileStyle}
              onChange={(e) => setMapTileStyle(e.target.value)}
              style={{
                padding: '2px 6px',
                fontSize: '0.75rem',
                borderRadius: '3px',
                border: '1px solid var(--border-gov)',
                background: '#ffffff',
                color: 'var(--gov-navy)',
                fontWeight: 600,
                outline: 'none'
              }}
            >
              <option value="carto">🏛️ Carto Clean (Gov Theme)</option>
              <option value="osm">🗺️ OpenStreetMap (Detailed)</option>
              <option value="satellite">🛰️ Satellite Terrain (Esri)</option>
            </select>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <input
                type="checkbox"
                id="corridorsToggle"
                checked={showCorridors}
                onChange={(e) => setShowCorridors(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <label htmlFor="corridorsToggle" style={{ fontSize: '0.75rem', color: '#334155', cursor: 'pointer', fontWeight: 600 }}>
                {t('corridorsToggle', 'Show Corridors')}
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: GIS Leaflet Map with Oceans & Boundaries + State Intelligence Panel */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(540px, 1.45fr) minmax(360px, 1fr)',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Interactive GIS Map Canvas */}
        <div className="gov-card" style={{ padding: '0.8rem', background: '#ffffff', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Compass size={16} color="var(--gov-navy)" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
                GIS Cartography: All 35 Indian States & Surrounding Oceans
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Waves size={12} color="#0284c7" /> Arabian Sea • Bay of Bengal • Indian Ocean
              </span>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div 
            ref={mapContainerRef} 
            style={{
              width: '100%',
              height: '660px',
              borderRadius: '4px',
              border: '1.5px solid var(--border-gov)',
              zIndex: 1
            }} 
          />

          {/* Floating Map Legend */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '20px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(4px)',
            border: '1px solid var(--border-gov)',
            borderRadius: '4px',
            padding: '8px 12px',
            fontSize: '0.7rem',
            color: '#334155',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000
          }}>
            <strong style={{ color: 'var(--gov-navy-dark)' }}>Project Density Legend:</strong>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#003366', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> Very High (&gt;120 Proj / &gt;₹3L Cr)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#0284c7', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> High Density (50-120 Proj)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block', border: '1px solid #cbd5e1' }}></span> Standard Density (&lt;50 Proj)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff9933', display: 'inline-block', border: '1px solid #c2410c' }}></span> Active Selected State
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
              {STRATEGIC_CORRIDORS_GPS.map(c => (
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
