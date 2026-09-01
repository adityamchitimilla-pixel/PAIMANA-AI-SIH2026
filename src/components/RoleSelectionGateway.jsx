import React from 'react';
import { 
  ShieldCheck, 
  HardHat, 
  Users, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Activity, 
  FileCheck2, 
  Eye, 
  Compass,
  CheckCircle2
} from 'lucide-react';

export default function RoleSelectionGateway({ onSelectRole }) {
  const roles = [
    {
      id: 'govt',
      title: 'MoSPI / IPMD Official',
      subtitle: 'Central Executive & Project Monitoring Authorities',
      description: 'Portfolio monitoring, AI early warning radar, milestone delay analytics, early interventions, and citizen grievance resolution.',
      icon: ShieldCheck,
      iconColor: '#1d4ed8',
      iconBg: '#eff6ff',
      borderAccent: '#3b82f6',
      badge: 'Parichay / NIC SSO',
      badgeColor: '#dbeafe',
      badgeTextColor: '#1e40af',
      features: ['486th Flash Report Insights', 'AI Risk & Cost Escalation Radar', 'Intervention Management', 'Citizen Complaint Oversight']
    },
    {
      id: 'tender',
      title: 'Tender Bidder / Implementing Agency & Company',
      subtitle: 'Infrastructure Contractors, EPC Vendors & Bidders',
      description: 'E-Tenders portal, automated AI pre-bid eligibility analysis, bid preparation, document vault, and post-award debrief analytics.',
      icon: HardHat,
      iconColor: '#d97706',
      iconBg: '#fffbeb',
      borderAccent: '#f59e0b',
      badge: 'CPPP / GeM Vendor Portal',
      badgeColor: '#fef3c7',
      badgeTextColor: '#92400e',
      features: ['Central E-Procurement Registry', 'AI Eligibility Pre-Screener', 'Online Bid Submission', 'Debrief & Disqualification Reasons']
    },
    {
      id: 'citizen',
      title: 'Common Citizen / Public Portal',
      subtitle: 'Public Transparency & Civic Engagement',
      description: 'Open national infrastructure dashboard, interactive GIS project maps, project status tracking, and ground-level issue reporting.',
      icon: Users,
      iconColor: '#059669',
      iconBg: '#ecfdf5',
      borderAccent: '#10b981',
      badge: 'Aadhaar / Public Access',
      badgeColor: '#d1fae5',
      badgeTextColor: '#065f46',
      features: ['National Macro Transparency', 'Interactive GIS Project Map', 'Public Search by State/Sector', '📢 Report Ground Issue & Feedback']
    }
  ];

  return (
    <div style={{
      minHeight: '85vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
      backgroundColor: 'var(--bg-page)'
    }}>
      {/* Top Title Banner */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', maxWidth: '850px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(0, 51, 102, 0.08)',
          border: '1px solid rgba(0, 51, 102, 0.2)',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: 'var(--gov-navy)',
          marginBottom: '0.8rem'
        }}>
          <Sparkles size={14} color="var(--gov-saffron)" />
          <span>Smart India Hackathon 2026 • AI-Powered Infrastructure Portal</span>
        </div>

        <h1 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: 'var(--gov-navy-dark)',
          letterSpacing: '-0.03em',
          marginBottom: '0.4rem'
        }}>
          PAIMANA AI
        </h1>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          fontWeight: 500,
          margin: 0
        }}>
          Project Assessment, Infrastructure Monitoring and Analytics for Nation-building
        </p>
      </div>

      {/* Main Role Selection Container */}
      <div style={{
        width: '100%',
        maxWidth: '860px',
        background: '#ffffff',
        borderRadius: '12px',
        border: '1px solid var(--border-gov)',
        boxShadow: '0 4px 20px rgba(0, 34, 68, 0.08)',
        padding: '2.2rem 2rem'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--gov-navy-dark)',
            marginBottom: '4px'
          }}>
            Select System Role
          </h2>
          <p style={{
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            margin: 0
          }}>
            SIH 2026 Demonstration Authentication Gateway
          </p>
        </div>

        {/* 3 Role Options List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => onSelectRole(role.id)}
                role="button"
                tabIndex={0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '10px',
                  border: '1.5px solid #e2e8f0',
                  borderLeft: `6px solid ${role.borderAccent}`,
                  background: '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = role.borderAccent;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 34, 68, 0.1)';
                  e.currentTarget.style.background = '#fafcff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.borderLeftColor = role.borderAccent;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.background = '#ffffff';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flex: 1 }}>
                  {/* Role Icon */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    backgroundColor: role.iconBg,
                    color: role.iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Icon size={26} />
                  </div>

                  {/* Role Details */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <h3 style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--gov-navy-dark)',
                        margin: 0
                      }}>
                        {role.title}
                      </h3>
                      <span style={{
                        backgroundColor: role.badgeColor,
                        color: role.badgeTextColor,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}>
                        {role.badge}
                      </span>
                    </div>

                    <p style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {role.description}
                    </p>

                    {/* Feature Highlights */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
                      {role.features.map((feat, idx) => (
                        <span key={idx} style={{
                          fontSize: '0.72rem',
                          color: '#475569',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <CheckCircle2 size={12} color={role.borderAccent} />
                          <span>{feat}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Arrow Action */}
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  marginLeft: '1rem',
                  flexShrink: 0
                }}>
                  <ArrowRight size={20} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & SIH Notice footer */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.2rem',
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--gov-green)', fontWeight: 700 }}>● SSL 256-Bit Encrypted</span>
            <span>|</span>
            <span>MoSPI / IPMD National Architecture</span>
          </div>
          <div>
            Click any role to access its dedicated authentication portal
          </div>
        </div>
      </div>
    </div>
  );
}
