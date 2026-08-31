import React, { useState } from 'react';
import { calculateRiskScore, predictCostOverrun, predictTimeOverrun } from '../utils/aiEngine';
import { 
  X, 
  Building, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert, 
  Lightbulb, 
  FileText, 
  Printer, 
  ArrowRight,
  Layers,
  Sparkles,
  DollarSign,
  Briefcase
} from 'lucide-react';

export default function ProjectDetailModal({ project, onClose }) {
  if (!project) return null;

  const risk = calculateRiskScore(project);
  const costPred = predictCostOverrun(project);
  const timePred = predictTimeOverrun(project);
  const [activeTab, setActiveTab] = useState('scurve'); // 'scurve', 'milestones', 'drivers'

  const hasCostOverrun = project.revisedCostCr > project.originalCostCr;
  const costOverrunPercent = project.originalCostCr > 0 
    ? (((project.revisedCostCr - project.originalCostCr) / project.originalCostCr) * 100).toFixed(1) 
    : 0;

  const currentProgress = parseFloat(project.physicalProgress) || 0;
  const financialProgress = project.originalCostCr > 0 ? (project.expenditureCr / project.originalCostCr) * 100 : 0;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.65)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      overflowY: 'auto'
    }}>
      <div className="gov-card" style={{
        width: '100%',
        maxWidth: '960px',
        maxHeight: '92vh',
        overflowY: 'auto',
        background: '#ffffff',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid var(--border-gov)',
          background: 'var(--gov-navy)',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '3px', fontSize: '0.75rem', fontWeight: 700 }}>
                PROJECT CODE: {project.id}
              </span>
              <span style={{ background: '#ff9933', color: '#000000', padding: '1px 6px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 800 }}>
                {project.sector}
              </span>
              <span className={`gov-badge gov-badge-${risk.riskLevel.toLowerCase()}`} style={{ background: '#ffffff', color: '#000000' }}>
                {risk.riskLevel} Risk ({risk.score}/100)
              </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: '1.3' }}>
              {project.name}
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '2px' }}>
              {project.agency} • {project.ministry} • {project.state}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <button
              onClick={() => window.print()}
              className="gov-btn gov-btn-secondary"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Printer size={13} /> Print
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '3px',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Key Outlay Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '8px'
          }}>
            <div style={{ padding: '10px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Original Cost</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy-dark)', fontFamily: 'var(--font-mono)' }}>
                ₹{project.originalCostCr.toLocaleString()} Cr
              </div>
            </div>

            <div style={{ padding: '10px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Revised Cost</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: hasCostOverrun ? '#dc2626' : '#166534', fontFamily: 'var(--font-mono)' }}>
                ₹{project.revisedCostCr.toLocaleString()} Cr
              </div>
              {hasCostOverrun && <div style={{ fontSize: '0.7rem', color: '#dc2626', fontWeight: 700 }}>+{costOverrunPercent}% Escalation</div>}
            </div>

            <div style={{ padding: '10px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Cumulative Expenditure</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-mono)' }}>
                ₹{project.expenditureCr.toLocaleString()} Cr
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{financialProgress.toFixed(1)}% of original budget</div>
            </div>

            <div style={{ padding: '10px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>Physical Progress</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy)', fontFamily: 'var(--font-mono)' }}>
                {project.physicalProgress}%
              </div>
              <div className="gov-progress-track" style={{ height: '5px', marginTop: '4px' }}>
                <div className="gov-progress-fill" style={{ width: `${project.physicalProgress}%` }}></div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-gov)', paddingBottom: '6px' }}>
            <button
              onClick={() => setActiveTab('scurve')}
              className={`gov-btn ${activeTab === 'scurve' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '4px 12px' }}
            >
              📈 S-Curve & Progress Trajectory
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`gov-btn ${activeTab === 'milestones' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '4px 12px' }}
            >
              🎯 Critical Milestones & CUF Status
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`gov-btn ${activeTab === 'drivers' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.8rem', padding: '4px 12px' }}
            >
              🔍 Escalation Drivers & AI Directives
            </button>
          </div>

          {/* S-Curve Tab */}
          {activeTab === 'scurve' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{
                padding: '1rem',
                background: '#ffffff',
                border: '1px solid var(--border-gov)',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
                  <strong style={{ fontSize: '0.9rem', color: 'var(--gov-navy-dark)' }}>
                    Physical vs Financial Progress S-Curve (Planned vs Actual vs AI Forecast)
                  </strong>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '0.75rem' }}>
                    <span style={{ color: '#64748b' }}>― Planned</span>
                    <span style={{ color: '#003366', fontWeight: 700 }}>― Physical ({currentProgress}%)</span>
                    <span style={{ color: '#b45309', fontWeight: 700 }}>― Financial ({financialProgress.toFixed(1)}%)</span>
                    <span style={{ color: '#dc2626', fontWeight: 700 }}>-- AI Forecast</span>
                  </div>
                </div>

                <div style={{ width: '100%', height: '200px' }}>
                  <svg viewBox="0 0 700 180" style={{ width: '100%', height: '100%' }}>
                    {/* Grid */}
                    <line x1="50" y1="20" x2="680" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x="25" y="24" fill="#64748b" fontSize="10">100%</text>

                    <line x1="50" y1="65" x2="680" y2="65" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x="30" y="69" fill="#64748b" fontSize="10">75%</text>

                    <line x1="50" y1="110" x2="680" y2="110" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x="30" y="114" fill="#64748b" fontSize="10">50%</text>

                    <line x1="50" y1="155" x2="680" y2="155" stroke="#e2e8f0" strokeDasharray="3 3" />
                    <text x="30" y="159" fill="#64748b" fontSize="10">25%</text>

                    <line x1="50" y1="170" x2="680" y2="170" stroke="#94a3b8" />
                    <text x="35" y="173" fill="#64748b" fontSize="10">0%</text>

                    {/* Timeline labels */}
                    <text x="50" y="180" fill="#64748b" fontSize="9">Sanction ({project.approvalDate})</text>
                    <text x="380" y="180" fill="#003366" fontSize="9" fontWeight="700">Today (April 2026)</text>
                    <text x="520" y="180" fill="#64748b" fontSize="9">Target ({project.originalTargetDoC})</text>
                    <text x="630" y="180" fill="#dc2626" fontSize="9">AI DoC ({timePred.projectedDoC})</text>

                    {/* Planned Curve */}
                    <path d="M 50 170 C 200 160, 260 100, 520 20" fill="none" stroke="#94a3b8" strokeWidth="2" />

                    {/* Financial Progress Curve */}
                    <path d={`M 50 170 C 180 165, 280 ${170 - (financialProgress * 1.3)}, 380 ${170 - Math.min(150, financialProgress * 1.5)}`} fill="none" stroke="#b45309" strokeWidth="2.5" />

                    {/* Physical Progress Curve */}
                    <path d={`M 50 170 C 170 168, 260 ${170 - (currentProgress * 1.1)}, 380 ${170 - (currentProgress * 1.5)}`} fill="none" stroke="#003366" strokeWidth="3" />

                    {/* Nodes */}
                    <circle cx="380" cy={170 - (currentProgress * 1.5)} r="4" fill="#003366" />
                    <circle cx="380" cy={170 - Math.min(150, financialProgress * 1.5)} r="4" fill="#b45309" />

                    {/* AI Projected Extension */}
                    <path d={`M 380 ${170 - (currentProgress * 1.5)} C 480 ${170 - (currentProgress * 1.5) - 20}, 560 50, 640 20`} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />
                    <circle cx="640" cy="20" r="4" fill="#dc2626" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Milestones Tab */}
          {activeTab === 'milestones' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'DPR Approval & Technical Sanction', completed: true, date: project.approvalDate },
                { name: 'EPC Contract Award & Site Mobilization', completed: true, date: project.startDate },
                { name: 'Stage-I Forest & Land Compensation Disbursal', completed: project.cufAttributes?.landAcquiredPct > 80, date: 'Completed' },
                { name: 'Civil Substructure & Earthwork (50% Milestone)', completed: currentProgress >= 50, date: currentProgress >= 50 ? 'Achieved' : 'In Progress' },
                { name: 'E&M / Plant & Equipment Installation (80% Milestone)', completed: currentProgress >= 80, date: currentProgress >= 80 ? 'Achieved' : 'Pending' },
                { name: 'Integrated Safety Inspection & Commercial Commissioning', completed: currentProgress >= 98, date: `Target: ${project.revisedDoC || project.originalTargetDoC}` }
              ].map((m, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 12px',
                  background: m.completed ? '#f0fdf4' : '#f8fafc',
                  border: m.completed ? '1px solid #bbf7d0' : '1px solid var(--border-light)',
                  borderRadius: '3px',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {m.completed ? <CheckCircle2 size={14} color="#166534" /> : <Clock size={14} color="#64748b" />}
                    <span style={{ fontWeight: m.completed ? 600 : 400, color: m.completed ? '#166534' : '#1e293b' }}>
                      {m.name}
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#64748b' }}>
                    {m.date}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px' }}>
                <strong style={{ color: '#991b1b', fontSize: '0.85rem' }}>Identified Implementation Bottlenecks:</strong>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {project.primaryDrivers?.map((d, idx) => (
                    <span key={idx} className="gov-badge gov-badge-high" style={{ fontSize: '0.75rem' }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px' }}>
                <strong style={{ color: '#166534', fontSize: '0.85rem' }}>Prescriptive MoSPI Administrative Directive:</strong>
                <p style={{ fontSize: '0.85rem', color: '#14532d', marginTop: '4px', lineHeight: '1.4' }}>
                  {project.aiPrescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
