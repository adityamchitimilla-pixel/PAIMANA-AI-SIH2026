import React, { useState, useEffect } from 'react';
import { DETAILED_PROJECTS } from '../data/paimanaData';
import { Search, X, Layers, MapPin, Building2, ArrowRight } from 'lucide-react';

export default function SearchModal({ onClose, onSelectProject }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = DETAILED_PROJECTS.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.id.toLowerCase().includes(query.toLowerCase()) ||
    p.agency.toLowerCase().includes(query.toLowerCase()) ||
    p.state.toLowerCase().includes(query.toLowerCase()) ||
    p.sector.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1100,
      background: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '4rem 1rem 1rem 1rem'
    }}>
      <div className="gov-card" style={{
        width: '100%',
        maxWidth: '650px',
        background: '#ffffff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Search Header */}
        <div style={{
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-gov)',
          background: 'var(--gov-navy)',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Search size={18} color="#ff9933" />
          <input
            type="text"
            placeholder="Search projects by ID (e.g. 705728), Name, Agency, State..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '3px',
              width: '26px',
              height: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer'
            }}
          >
            <X size={15} />
          </button>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '8px' }}>
          {searchResults.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: '#64748b', fontSize: '0.85rem' }}>
              No matching project records found for "{query}"
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {searchResults.map(p => (
                <div
                  key={p.id}
                  onClick={() => { onSelectProject(p); onClose(); }}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '3px',
                    background: '#ffffff',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f1f5f9'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--gov-navy)' }}>{p.id}</span>
                      <span style={{ color: '#64748b' }}>• {p.agency}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0f172a' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '2px' }}>
                      {p.sector} • {p.state} • Budget: ₹{p.originalCostCr.toLocaleString()} Cr
                    </div>
                  </div>

                  <ArrowRight size={14} color="#94a3b8" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
