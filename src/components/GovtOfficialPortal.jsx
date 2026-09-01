import React, { useState } from 'react';
import { 
  Building2, 
  Activity, 
  Layers, 
  BarChart3, 
  MapPin, 
  Cpu, 
  Bot, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ExecutiveOverview from './ExecutiveOverview';
import AIPredictionDashboard from './AIPredictionDashboard';
import NationalInfrastructureMap from './NationalInfrastructureMap';
import ProjectExplorer from './ProjectExplorer';
import BenchmarkingAnalytics from './BenchmarkingAnalytics';
import NorthEastFocus from './NorthEastFocus';
import CUFSimulator from './CUFSimulator';
import PaiAiAssistant from './PaiAiAssistant';
import CitizenFeedbackReview from './CitizenFeedbackReview';

export default function GovtOfficialPortal({ 
  govtUser, 
  citizenReports, 
  onUpdateReportStatus, 
  onSelectProject,
  onOpenReport
}) {
  const [activeTab, setActiveTab] = useState('overview');

  const govtNavTabs = [
    { id: 'overview', label: 'Executive Dashboard', icon: Building2 },
    { id: 'early-warning', label: 'AI Risk & Prediction Radar', icon: Activity, badge: 'AI Model' },
    { id: 'projects', label: 'Project Monitoring Registry (1,981)', icon: Layers },
    { id: 'feedback-review', label: 'Citizen Grievances & Feedback', icon: MessageSquare, badge: `${citizenReports.filter(r => r.status !== 'Resolved').length} Active` },
    { id: 'gis-map', label: 'National GIS Map', icon: MapPin },
    { id: 'benchmarking', label: 'Macro & Sector Analytics', icon: BarChart3 },
    { id: 'north-east', label: 'NER Special Focus (229)', icon: MapPin },
    { id: 'cuf-simulator', label: 'CUF & What-If Sandbox', icon: Cpu },
    { id: 'assistant', label: 'PAIMANA AI Assistant', icon: Bot, badge: 'Copilot' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', width: '100%', padding: '0.8rem 0 3rem 0' }}>
      
      {/* Official Executive Header Card */}
      <div className="gov-card" style={{
        padding: '1.4rem 1.8rem',
        background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 100%)',
        borderLeft: '6px solid var(--gov-navy)',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>
                MoSPI / IPMD Executive Portal
              </span>
              <span style={{ fontSize: '0.75rem', color: '#1e40af', fontWeight: 600 }}>
                {govtUser.authType || 'Parichay SSO Authenticated'} • Central Sector Oversight
              </span>
            </div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: 0 }}>
              Welcome, {govtUser.name || 'Joint Secretary (IPMD)'}
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              {govtUser.designation} • {govtUser.ministry}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: '#ffffff',
              border: '1px solid #bfdbfe',
              borderRadius: '6px',
              padding: '8px 14px',
              fontSize: '0.78rem',
              color: 'var(--gov-navy)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={16} color="var(--gov-navy)" />
              <span>486th Flash Report Live Dataset</span>
            </div>

            <button
              onClick={onOpenReport}
              className="gov-btn gov-btn-primary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              <span>Download Flash Report</span>
            </button>
          </div>
        </div>

        {/* Secondary Sub-Navbar Tabs */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          marginTop: '1.2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e2e8f0'
        }}>
          {govtNavTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  border: isActive ? '2px solid var(--gov-navy)' : '1px solid #cbd5e1',
                  background: isActive ? 'var(--gov-navy)' : '#ffffff',
                  color: isActive ? '#ffffff' : '#334155',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={15} color={isActive ? '#ff9933' : 'var(--gov-navy)'} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span style={{
                    fontSize: '0.68rem',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    background: isActive ? '#ff9933' : '#eff6ff',
                    color: isActive ? '#002244' : '#1e40af',
                    fontWeight: 800
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <main>
        {activeTab === 'overview' && (
          <ExecutiveOverview 
            onSelectProject={onSelectProject} 
            onNavigateToTab={(t) => setActiveTab(t)} 
          />
        )}

        {activeTab === 'early-warning' && (
          <AIPredictionDashboard 
            onSelectProject={onSelectProject} 
          />
        )}

        {activeTab === 'projects' && (
          <ProjectExplorer 
            onSelectProject={onSelectProject} 
          />
        )}

        {activeTab === 'feedback-review' && (
          <CitizenFeedbackReview 
            citizenReports={citizenReports}
            onUpdateReportStatus={onUpdateReportStatus}
            onSelectProject={onSelectProject}
          />
        )}

        {activeTab === 'gis-map' && (
          <NationalInfrastructureMap 
            onSelectProject={onSelectProject} 
          />
        )}

        {activeTab === 'benchmarking' && (
          <BenchmarkingAnalytics />
        )}

        {activeTab === 'north-east' && (
          <NorthEastFocus 
            onSelectProject={onSelectProject} 
          />
        )}

        {activeTab === 'cuf-simulator' && (
          <CUFSimulator />
        )}

        {activeTab === 'assistant' && (
          <PaiAiAssistant 
            onSelectProject={onSelectProject} 
          />
        )}
      </main>

    </div>
  );
}
