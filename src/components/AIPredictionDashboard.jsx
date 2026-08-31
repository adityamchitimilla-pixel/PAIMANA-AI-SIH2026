import React, { useState } from 'react';
import { 
  DETAILED_PROJECTS 
} from '../data/paimanaData';
import { 
  predictCostOverrun, 
  predictTimeOverrun, 
  calculateRiskScore,
  getCUFAttributionData 
} from '../utils/aiEngine';
import { 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Zap, 
  Cpu, 
  TrendingUp, 
  Clock, 
  ArrowRight,
  ShieldAlert,
  FileCheck2,
  Filter,
  BarChart,
  Lightbulb,
  Info
} from 'lucide-react';

export default function AIPredictionDashboard({ onSelectProject }) {
  const [selectedRiskFilter, setSelectedRiskFilter] = useState('ALL');
  const [selectedProject, setSelectedProject] = useState(DETAILED_PROJECTS[0]);

  // Compute live AI metrics for all projects
  const enrichedProjects = DETAILED_PROJECTS.map(p => ({
    ...p,
    costPrediction: predictCostOverrun(p),
    timePrediction: predictTimeOverrun(p),
    riskAssessment: calculateRiskScore(p)
  }));

  const filteredProjects = selectedRiskFilter === 'ALL'
    ? enrichedProjects
    : enrichedProjects.filter(p => p.riskAssessment.riskLevel.toUpperCase() === selectedRiskFilter);

  const criticalCount = enrichedProjects.filter(p => p.riskAssessment.riskLevel === 'Critical').length;
  const highCount = enrichedProjects.filter(p => p.riskAssessment.riskLevel === 'High').length;
  const moderateCount = enrichedProjects.filter(p => p.riskAssessment.riskLevel === 'Moderate').length;
  const lowCount = enrichedProjects.filter(p => p.riskAssessment.riskLevel === 'Low').length;

  const cufAttribution = getCUFAttributionData();

  // Active analyzed project calculations
  const activeCostPred = predictCostOverrun(selectedProject);
  const activeTimePred = predictTimeOverrun(selectedProject);
  const activeRisk = calculateRiskScore(selectedProject);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
              <span className="gov-badge gov-badge-critical">
                <AlertOctagon size={12} /> AI Predictive Radar
              </span>
              <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                MoSPI Early Warning Decision-Support Framework
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
              AI Early Warning & Project Risk Scoring Radar
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Statistical ML models analyzing physical vs financial progress divergence, historical milestone velocity, and clearance friction to forecast cost escalation and schedule delays.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setSelectedRiskFilter('ALL')}
              className={`gov-btn ${selectedRiskFilter === 'ALL' ? 'gov-btn-primary' : 'gov-btn-secondary'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              All Projects ({enrichedProjects.length})
            </button>
            <button
              onClick={() => setSelectedRiskFilter('CRITICAL')}
              className="gov-btn"
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                background: selectedRiskFilter === 'CRITICAL' ? 'var(--status-critical-bg)' : '#ffffff',
                color: 'var(--status-critical-text)',
                borderColor: 'var(--status-critical-border)',
                fontWeight: selectedRiskFilter === 'CRITICAL' ? 700 : 500
              }}
            >
              🔴 Critical ({criticalCount})
            </button>
            <button
              onClick={() => setSelectedRiskFilter('HIGH')}
              className="gov-btn"
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                background: selectedRiskFilter === 'HIGH' ? 'var(--status-high-bg)' : '#ffffff',
                color: 'var(--status-high-text)',
                borderColor: 'var(--status-high-border)',
                fontWeight: selectedRiskFilter === 'HIGH' ? 700 : 500
              }}
            >
              🟠 High ({highCount})
            </button>
            <button
              onClick={() => setSelectedRiskFilter('MODERATE')}
              className="gov-btn"
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                background: selectedRiskFilter === 'MODERATE' ? 'var(--status-moderate-bg)' : '#ffffff',
                color: 'var(--status-moderate-text)',
                borderColor: 'var(--status-moderate-border)',
                fontWeight: selectedRiskFilter === 'MODERATE' ? 700 : 500
              }}
            >
              🟡 Moderate ({moderateCount})
            </button>
            <button
              onClick={() => setSelectedRiskFilter('LOW')}
              className="gov-btn"
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                background: selectedRiskFilter === 'LOW' ? 'var(--status-low-bg)' : '#ffffff',
                color: 'var(--status-low-text)',
                borderColor: 'var(--status-low-border)',
                fontWeight: selectedRiskFilter === 'LOW' ? 700 : 500
              }}
            >
              🟢 Healthy ({lowCount})
            </button>
          </div>
        </div>

        {/* Official Advisory Ticker */}
        <div style={{
          marginTop: '1rem',
          padding: '8px 12px',
          background: '#fef2f2',
          borderLeft: '4px solid #dc2626',
          borderRadius: '3px',
          fontSize: '0.8rem',
          color: '#991b1b',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={14} color="#dc2626" />
          <span>
            <strong>Action Alert:</strong> 3 Central Sector Mega Projects currently require immediate Inter-Ministerial Cabinet Taskforce escalation (Polavaram Project, BharatNet Phase-II, and Jiribam-Imphal Rail Link).
          </span>
        </div>
      </div>

      {/* Main Dual Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(320px, 420px) 1fr',
        gap: '1rem',
        alignItems: 'start'
      }}>
        
        {/* Left Column: Monitored Projects List */}
        <div className="gov-card" style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
              Projects Under Assessment ({filteredProjects.length})
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Select to inspect</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '700px', overflowY: 'auto', paddingRight: '4px' }}>
            {filteredProjects.map(p => {
              const isSelected = selectedProject.id === p.id;
              const risk = p.riskAssessment;

              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  style={{
                    padding: '8px 10px',
                    borderRadius: '4px',
                    background: isSelected ? '#e8f0fe' : '#ffffff',
                    border: isSelected ? '2px solid var(--gov-navy)' : '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.75rem', color: 'var(--gov-navy)' }}>
                      {p.id}
                    </span>
                    <span className={`gov-badge gov-badge-${risk.riskLevel.toLowerCase()}`} style={{ fontSize: '0.65rem' }}>
                      {risk.riskLevel} • {risk.score}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0f172a', lineHeight: '1.3' }}>
                    {p.name}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#475569', marginTop: '2px' }}>
                    <span>{p.sector} • {p.state}</span>
                    <span>Phys: <strong style={{ color: '#166534' }}>{p.physicalProgress}%</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: AI Model Intelligence Dossier */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Active Project Header Card */}
          <div className="gov-card">
            <div className="gov-card-header" style={{ background: '#003366', color: '#ffffff' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.2)', padding: '1px 6px', borderRadius: '3px' }}>
                    PROJECT ID: {selectedProject.id}
                  </span>
                  <span>{selectedProject.sector}</span>
                  <span>• {selectedProject.state}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  {selectedProject.name}
                </h3>
              </div>

              <div style={{
                background: '#ffffff',
                padding: '6px 12px',
                borderRadius: '4px',
                textAlign: 'center',
                border: '1px solid var(--border-gov)'
              }}>
                <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>AI RISK INDEX</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 900, color: activeRisk.score >= 70 ? '#dc2626' : '#b45309' }}>
                  {activeRisk.score}/100
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', background: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.8rem', color: '#475569' }}>
                Implementing Agency: <strong style={{ color: '#0f172a' }}>{selectedProject.agency}</strong> | {selectedProject.ministry}
              </div>
              <button
                onClick={() => onSelectProject(selectedProject)}
                className="gov-btn gov-btn-secondary"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                Open Full Project S-Curve Dossier ➔
              </button>
            </div>

            {/* Prediction Models Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              padding: '1rem'
            }}>
              {/* Cost Overrun Forecast */}
              <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <TrendingUp size={16} color="var(--gov-navy)" />
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gov-navy-dark)' }}>Cost Overrun Forecast Model</strong>
                </div>

                <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ color: '#475569' }}>Original Budget:</span>
                  <strong>₹{activeCostPred.originalCostCr.toLocaleString()} Cr</strong>
                </div>

                <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#475569' }}>Current Official Revised:</span>
                  <strong style={{ color: activeCostPred.currentRevisedCostCr > activeCostPred.originalCostCr ? '#dc2626' : 'inherit' }}>
                    ₹{activeCostPred.currentRevisedCostCr.toLocaleString()} Cr
                  </strong>
                </div>

                <div style={{ padding: '8px', background: '#e8f0fe', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '0.75rem', color: '#1e40af' }}>AI Forecasted Final Cost:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--gov-navy-dark)', fontFamily: 'var(--font-mono)' }}>
                    ₹{activeCostPred.predictedFinalCostCr.toLocaleString()} Cr
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#b91c1c', fontWeight: 600 }}>
                    Forecasted Escalation: +{activeCostPred.predictedEscalationPercent}%
                  </div>
                </div>
              </div>

              {/* Schedule Slip Forecast */}
              <div style={{ padding: '12px', background: '#f8fafc', border: '1px solid var(--border-gov)', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Clock size={16} color="#b45309" />
                  <strong style={{ fontSize: '0.85rem', color: 'var(--gov-navy-dark)' }}>Schedule Delay Forecast Model</strong>
                </div>

                <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span style={{ color: '#475569' }}>Original Target DoC:</span>
                  <strong>{selectedProject.originalTargetDoC}</strong>
                </div>

                <div style={{ fontSize: '0.8rem', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#475569' }}>Reported Revised DoC:</span>
                  <strong style={{ color: selectedProject.delayMonths > 0 ? '#b45309' : 'inherit' }}>
                    {selectedProject.revisedDoC || 'On Target'}
                  </strong>
                </div>

                <div style={{ padding: '8px', background: '#fef3c7', borderRadius: '4px', border: '1px solid #fde68a' }}>
                  <div style={{ fontSize: '0.75rem', color: '#92400e' }}>AI Projected Date of Completion:</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#78350f', fontFamily: 'var(--font-mono)' }}>
                    {activeTimePred.projectedDoC}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: 600 }}>
                    Projected Total Delay: {activeTimePred.totalPredictedDelayMonths} Months
                  </div>
                </div>
              </div>
            </div>

            {/* AI Prescriptive MoSPI Directive */}
            <div style={{ padding: '0 1rem 1rem 1rem' }}>
              <div style={{
                padding: '12px 14px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: '4px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 700, fontSize: '0.85rem', marginBottom: '4px' }}>
                  <Lightbulb size={16} /> Prescriptive MoSPI Administrative Directive:
                </div>
                <p style={{ fontSize: '0.85rem', color: '#14532d', lineHeight: '1.4' }}>
                  {selectedProject.aiPrescription}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.75rem', color: '#15803d' }}>
                  <span>Escalation Protocol: <strong>{activeRisk.urgency}</strong></span>
                  <span>Recommended Action: <strong>{activeRisk.recommendedAction}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* CUF Feature Attribution Table */}
          <div className="gov-card">
            <div className="gov-card-header">
              <span className="gov-card-title">
                <BarChart size={15} color="var(--gov-navy)" /> CUF Fields vs External Factors Predictive Gain Analysis
              </span>
              <span className="gov-badge gov-badge-navy">Feature Importance</span>
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {cufAttribution.map(item => (
                <div key={item.feature} style={{ fontSize: '0.8rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span>
                      <span style={{
                        padding: '1px 5px',
                        borderRadius: '2px',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        background: item.isCUF ? '#e8f0fe' : '#fef3c7',
                        color: item.isCUF ? '#1e40af' : '#92400e',
                        marginRight: '6px',
                        border: '1px solid #cbd5e1'
                      }}>
                        {item.isCUF ? 'CUF FIELD' : 'NON-CUF'}
                      </span>
                      <strong>{item.feature}</strong>
                    </span>
                    <strong style={{ color: item.isCUF ? 'var(--gov-navy)' : '#b45309' }}>{item.importancePct}%</strong>
                  </div>

                  <div className="gov-progress-track" style={{ height: '6px' }}>
                    <div
                      className="gov-progress-fill"
                      style={{
                        width: `${item.importancePct * 3.2}%`,
                        background: item.isCUF ? 'var(--gov-navy)' : 'var(--gov-saffron)'
                      }}
                    />
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
