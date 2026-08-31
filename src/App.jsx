import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ExecutiveOverview from './components/ExecutiveOverview';
import AIPredictionDashboard from './components/AIPredictionDashboard';
import NationalInfrastructureMap from './components/NationalInfrastructureMap';
import ProjectExplorer from './components/ProjectExplorer';
import BenchmarkingAnalytics from './components/BenchmarkingAnalytics';
import NorthEastFocus from './components/NorthEastFocus';
import CUFSimulator from './components/CUFSimulator';
import DrishtiAIAssistant from './components/DrishtiAIAssistant';
import ProjectDetailModal from './components/ProjectDetailModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';
import SearchModal from './components/SearchModal';
import { Bot, ShieldCheck, FileText, ChevronUp, Globe } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K for Quick Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Official Government Header & Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenReport={() => setIsReportOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area */}
      <main style={{
        flex: 1,
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        padding: '0 1.5rem 2.5rem 1.5rem'
      }}>
        {activeTab === 'overview' && (
          <ExecutiveOverview 
            onSelectProject={(p) => setSelectedProject(p)} 
            onNavigateToTab={(tab) => setActiveTab(tab)} 
          />
        )}

        {activeTab === 'early-warning' && (
          <AIPredictionDashboard 
            onSelectProject={(p) => setSelectedProject(p)} 
          />
        )}

        {activeTab === 'gis-map' && (
          <NationalInfrastructureMap 
            onSelectProject={(p) => setSelectedProject(p)} 
          />
        )}

        {activeTab === 'projects' && (
          <ProjectExplorer 
            onSelectProject={(p) => setSelectedProject(p)} 
          />
        )}

        {activeTab === 'benchmarking' && (
          <BenchmarkingAnalytics />
        )}

        {activeTab === 'north-east' && (
          <NorthEastFocus 
            onSelectProject={(p) => setSelectedProject(p)} 
          />
        )}

        {activeTab === 'cuf-simulator' && (
          <CUFSimulator />
        )}

        {activeTab === 'assistant' && (
          <DrishtiAIAssistant 
            onSelectProject={(p) => setSelectedProject(p)} 
          />
        )}
      </main>

      {/* Floating AI Assistant Trigger (when not on assistant tab) */}
      {activeTab !== 'assistant' && (
        <button
          onClick={() => setActiveTab('assistant')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 90,
            background: 'var(--gov-navy)',
            color: '#ffffff',
            border: '2px solid #ff9933',
            borderRadius: '4px',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0, 34, 68, 0.4)',
            cursor: 'pointer',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}
        >
          <Bot size={16} color="#ff9933" />
          <span>Drishti AI Assistant</span>
        </button>
      )}

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* 486th Flash Report Dossier Generator Modal */}
      {isReportOpen && (
        <ReportGeneratorModal 
          onClose={() => setIsReportOpen(false)} 
        />
      )}

      {/* Global Quick Search Modal */}
      {isSearchOpen && (
        <SearchModal 
          onClose={() => setIsSearchOpen(false)} 
          onSelectProject={(p) => setSelectedProject(p)} 
        />
      )}

      {/* Official Government Footer */}
      <footer style={{
        background: '#002244',
        color: '#ffffff',
        borderTop: '3px solid var(--gov-saffron)',
        padding: '2rem 1.5rem 1.5rem 1.5rem',
        fontSize: '0.8rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '500px' }}>
              <div style={{ fontWeight: 800, fontSize: '1rem', color: '#ff9933', marginBottom: '4px' }}>
                PAIMANA • Project Assessment, Infrastructure Monitoring and Analytics for Nation-building
              </div>
              <p style={{ color: '#cbd5e1', fontSize: '0.8rem', lineHeight: '1.4' }}>
                Online Computerised Monitoring System (OCMS) modernized to PAIMANA integrated project-monitoring platform under the Infrastructure and Project Monitoring Division (IPMD), Ministry of Statistics and Programme Implementation (MoSPI).
              </p>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Government Portals</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#93c5fd', fontSize: '0.75rem' }}>
                <span>• National Portal of India (india.gov.in)</span>
                <span>• PM GatiShakti National Master Plan</span>
                <span>• Ministry of Statistics & PI (mospi.gov.in)</span>
                <span>• Open Government Data Platform (data.gov.in)</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>Technical Scope</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#cbd5e1', fontSize: '0.75rem' }}>
                <span>Problem Statement: <strong>SIH26103</strong></span>
                <span>Theme: <strong>Smart Automation</strong></span>
                <span>Category: <strong>Software</strong></span>
                <span>Data Source: <strong>486th Flash Report (April 2026)</strong></span>
              </div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.8rem',
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}>
            <div>
              Website Content Managed by <strong>Infrastructure & Project Monitoring Division (IPMD), MoSPI, Government of India</strong>
            </div>
            <div>
              Designed & Developed for <strong>Smart India Hackathon (SIH 2026)</strong>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
