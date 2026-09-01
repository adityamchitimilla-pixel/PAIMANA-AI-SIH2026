import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import RoleSelectionGateway from './components/RoleSelectionGateway';
import GovtOfficialLogin from './components/GovtOfficialLogin';
import TenderBidderLogin from './components/TenderBidderLogin';
import CitizenLogin from './components/CitizenLogin';
import GovtOfficialPortal from './components/GovtOfficialPortal';
import CompanyBidderPortal from './components/CompanyBidderPortal';
import CitizenPortal from './components/CitizenPortal';
import ProjectDetailModal from './components/ProjectDetailModal';
import ReportGeneratorModal from './components/ReportGeneratorModal';
import SearchModal from './components/SearchModal';
import { INITIAL_CITIZEN_REPORTS } from './data/citizenFeedbackData';

function MainAppContent() {
  // Navigation & View Flow State: 'gateway' | 'login-govt' | 'login-tender' | 'login-citizen' | 'portal-govt' | 'portal-tender' | 'portal-citizen'
  const [currentView, setCurrentView] = useState('gateway');
  const [currentRole, setCurrentRole] = useState(null); // 'govt' | 'tender' | 'citizen'
  const [currentUser, setCurrentUser] = useState(null);

  // Dynamic Shared Citizen Grievances State (Connects Citizens <-> Govt Officials)
  const [citizenReports, setCitizenReports] = useState(INITIAL_CITIZEN_REPORTS);

  // Global Modals State
  const [selectedProject, setSelectedProject] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { t } = useLanguage();

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

  // Handlers for Role Gateway and Login Flow
  const handleSelectRoleFromGateway = (roleId) => {
    setCurrentRole(roleId);
    if (roleId === 'govt') setCurrentView('login-govt');
    else if (roleId === 'tender') setCurrentView('login-tender');
    else if (roleId === 'citizen') setCurrentView('login-citizen');
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    if (userData.role === 'govt') setCurrentView('portal-govt');
    else if (userData.role === 'tender') setCurrentView('portal-tender');
    else if (userData.role === 'citizen') setCurrentView('portal-citizen');
  };

  const handleSwitchRoleOrLogout = () => {
    setCurrentUser(null);
    setCurrentRole(null);
    setCurrentView('gateway');
  };

  const handleAddCitizenReport = (newReport) => {
    setCitizenReports(prev => [newReport, ...prev]);
  };

  const handleUpdateReportStatus = (updatedReport) => {
    setCitizenReports(prev => prev.map(r => r.id === updatedReport.id ? updatedReport : r));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Official Government Header & Navbar */}
      <Navbar 
        currentRole={currentRole}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRoleOrLogout}
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
        {/* 1. GATEWAY: Role Selection Landing */}
        {currentView === 'gateway' && (
          <RoleSelectionGateway onSelectRole={handleSelectRoleFromGateway} />
        )}

        {/* 2. AUTHENTICATION PAGES */}
        {currentView === 'login-govt' && (
          <GovtOfficialLogin 
            onLoginSuccess={handleLoginSuccess}
            onBackToRoles={() => setCurrentView('gateway')}
          />
        )}

        {currentView === 'login-tender' && (
          <TenderBidderLogin 
            onLoginSuccess={handleLoginSuccess}
            onBackToRoles={() => setCurrentView('gateway')}
          />
        )}

        {currentView === 'login-citizen' && (
          <CitizenLogin 
            onLoginSuccess={handleLoginSuccess}
            onBackToRoles={() => setCurrentView('gateway')}
          />
        )}

        {/* 3. DEDICATED ROLE PORTALS */}
        {currentView === 'portal-govt' && currentUser && (
          <GovtOfficialPortal 
            govtUser={currentUser}
            citizenReports={citizenReports}
            onUpdateReportStatus={handleUpdateReportStatus}
            onSelectProject={(p) => setSelectedProject(p)}
            onOpenReport={() => setIsReportOpen(true)}
          />
        )}

        {currentView === 'portal-tender' && currentUser && (
          <CompanyBidderPortal 
            tenderUser={currentUser}
          />
        )}

        {currentView === 'portal-citizen' && currentUser && (
          <CitizenPortal 
            citizenUser={currentUser}
            citizenReports={citizenReports}
            onAddCitizenReport={handleAddCitizenReport}
            onSelectProject={(p) => setSelectedProject(p)}
          />
        )}
      </main>

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

      {/* Global Quick Search Modal (Ctrl+K) */}
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
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>System Personas & Roles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#cbd5e1', fontSize: '0.75rem' }}>
                <span>🛡️ <strong>MoSPI Official:</strong> Portfolio Monitoring & AI EWS</span>
                <span>🏗️ <strong>Tender Bidder:</strong> E-Procurement & AI Pre-Bid</span>
                <span>👥 <strong>Public Citizen:</strong> Transparency & Civic Audit</span>
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

export default function App() {
  return (
    <LanguageProvider>
      <MainAppContent />
    </LanguageProvider>
  );
}
