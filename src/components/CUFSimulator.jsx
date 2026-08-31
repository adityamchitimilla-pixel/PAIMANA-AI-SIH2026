import React, { useState } from 'react';
import { 
  MINISTRIES_DATA, 
  STATES_SUMMARY 
} from '../data/paimanaData';
import { 
  predictCostOverrun, 
  predictTimeOverrun, 
  calculateRiskScore,
  runWhatIfSimulation 
} from '../utils/aiEngine';
import { 
  Cpu, 
  Sliders, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  RefreshCw,
  PlusCircle,
  FileCheck,
  Building
} from 'lucide-react';

export default function CUFSimulator() {
  // Base CUF Form State
  const [formData, setFormData] = useState({
    id: "709921",
    name: "Greenfield Multi-Modal Logistics Hub & Corridor Link",
    agency: "NHAI / NHIDCL",
    ministry: "Ministry of Road Transport & Highways",
    sector: "Roads & Highways",
    state: "Maharashtra",
    originalCostCr: 2450.00,
    revisedCostCr: 2450.00,
    expenditureCr: 620.00,
    physicalProgress: 38.5,
    delayMonths: 8,
    approvalDate: "06/2023",
    startDate: "01/2024",
    originalTargetDoC: "12/2026",
    revisedDoC: "08/2027",
    isMega: true,
    cufAttributes: {
      landAcquiredPct: 82.0,
      clearancesObtainedPct: 85.0,
      contractorsActive: 4,
      criticalMilestonesTotal: 40,
      criticalMilestonesAchieved: 15
    }
  });

  // What-If Parameters
  const [simParams, setSimParams] = useState({
    landSpeedBoostPct: 20,
    clearanceFastTrackMonths: 6,
    contractorLiquidityBoost: true,
    weatherDisruptionMonths: 0
  });

  // Calculate live results
  const liveCostPred = predictCostOverrun(formData);
  const liveTimePred = predictTimeOverrun(formData);
  const liveRisk = calculateRiskScore(formData);
  const simulationResult = runWhatIfSimulation(formData, simParams);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCufChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      cufAttributes: {
        ...prev.cufAttributes,
        [field]: parseFloat(value) || 0
      }
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1rem 0' }}>
      
      {/* Official Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
          <span className="gov-badge gov-badge-navy">Outcome (c) & (d) Simulation Engine</span>
          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Common Upload Form (CUF) Sandbox</span>
        </div>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
          Common Upload Form (CUF) Registration & What-If Policy Sandbox
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', maxWidth: '850px', marginTop: '2px' }}>
          Register prospective project parameters in the standard CUF format to execute live AI predictive models, and simulate policy interventions (Land acquisition fast-track, environmental clearances, and contractor cashflow relief).
        </p>
      </div>

      {/* Main Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
        gap: '1rem'
      }}>
        {/* Left Column: CUF Form */}
        <div className="gov-card" style={{ padding: '1.2rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '8px', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--gov-navy-dark)' }}>
              Project Common Upload Form (CUF) Fields
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Project Name / Title:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border-gov)', borderRadius: '3px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Ministry:</label>
                <select
                  value={formData.ministry}
                  onChange={(e) => handleInputChange('ministry', e.target.value)}
                  style={{ width: '100%', padding: '6px', border: '1px solid var(--border-gov)', borderRadius: '3px' }}
                >
                  {MINISTRIES_DATA.map(m => (
                    <option key={m.name} value={m.name}>{m.code} - {m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Sector:</label>
                <input
                  type="text"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border-gov)', borderRadius: '3px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>State / Territory:</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  style={{ width: '100%', padding: '6px', border: '1px solid var(--border-gov)', borderRadius: '3px' }}
                >
                  {STATES_SUMMARY.map(s => (
                    <option key={s.state} value={s.state}>{s.state}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Agency:</label>
                <input
                  type="text"
                  value={formData.agency}
                  onChange={(e) => handleInputChange('agency', e.target.value)}
                  style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--border-gov)', borderRadius: '3px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Original Cost (₹ Cr):</label>
                <input
                  type="number"
                  value={formData.originalCostCr}
                  onChange={(e) => handleInputChange('originalCostCr', parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '6px', border: '1px solid var(--border-gov)', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Revised Cost (₹ Cr):</label>
                <input
                  type="number"
                  value={formData.revisedCostCr}
                  onChange={(e) => handleInputChange('revisedCostCr', parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '6px', border: '1px solid var(--border-gov)', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, color: '#334155', marginBottom: '2px' }}>Expenditure (₹ Cr):</label>
                <input
                  type="number"
                  value={formData.expenditureCr}
                  onChange={(e) => handleInputChange('expenditureCr', parseFloat(e.target.value) || 0)}
                  style={{ width: '100%', padding: '6px', border: '1px solid var(--border-gov)', borderRadius: '3px', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#f8fafc', padding: '8px', border: '1px solid var(--border-light)', borderRadius: '3px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '2px' }}>Physical Progress: <strong>{formData.physicalProgress}%</strong></label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.physicalProgress}
                  onChange={(e) => handleInputChange('physicalProgress', parseFloat(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '2px' }}>Reported Delay: <strong style={{ color: '#991b1b' }}>{formData.delayMonths} mo</strong></label>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={formData.delayMonths}
                  onChange={(e) => handleInputChange('delayMonths', parseInt(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: AI Live Inference & What-If Simulator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Live AI Inference Result */}
          <div className="gov-card" style={{ padding: '1rem', borderLeft: '4px solid var(--gov-navy)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ color: 'var(--gov-navy-dark)', fontSize: '0.95rem' }}>AI Model Inference Result</strong>
              <span className={`gov-badge gov-badge-${liveRisk.riskLevel.toLowerCase()}`}>
                Risk: {liveRisk.score}/100 ({liveRisk.riskLevel})
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ padding: '8px 10px', background: '#e8f0fe', borderRadius: '4px', border: '1px solid #bfdbfe' }}>
                <div style={{ fontSize: '0.7rem', color: '#1e40af' }}>Forecasted Completion Cost:</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy-dark)', fontFamily: 'var(--font-mono)' }}>
                  ₹{liveCostPred.predictedFinalCostCr.toLocaleString()} Cr
                </div>
                <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: 600 }}>
                  +{liveCostPred.predictedEscalationPercent}% Overrun
                </div>
              </div>

              <div style={{ padding: '8px 10px', background: '#fef3c7', borderRadius: '4px', border: '1px solid #fde68a' }}>
                <div style={{ fontSize: '0.7rem', color: '#92400e' }}>Projected Completion Date:</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#78350f', fontFamily: 'var(--font-mono)' }}>
                  {liveTimePred.projectedDoC}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: 600 }}>
                  Total Delay: {liveTimePred.totalPredictedDelayMonths} Months
                </div>
              </div>
            </div>
          </div>

          {/* What-If Policy Intervention Card */}
          <div className="gov-card" style={{ padding: '1.2rem', background: '#f0fdf4', border: '1px solid #bbf7d0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <strong style={{ color: '#166534', fontSize: '0.95rem' }}>
                What-If Policy Simulation Levers
              </strong>
              <span className="gov-badge gov-badge-low">Prescriptive Tool</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>Land Handover Acceleration:</span>
                  <strong>+{simParams.landSpeedBoostPct}%</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={simParams.landSpeedBoostPct}
                  onChange={(e) => setSimParams(prev => ({ ...prev, landSpeedBoostPct: parseInt(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                  <span>Stage-II Environmental Fast-Track:</span>
                  <strong>{simParams.clearanceFastTrackMonths} Months Saved</strong>
                </div>
                <input
                  type="range"
                  min="0"
                  max="18"
                  value={simParams.clearanceFastTrackMonths}
                  onChange={(e) => setSimParams(prev => ({ ...prev, clearanceFastTrackMonths: parseInt(e.target.value) }))}
                  style={{ width: '100%' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingTop: '4px' }}>
                <input
                  type="checkbox"
                  id="govContractorBoost"
                  checked={simParams.contractorLiquidityBoost}
                  onChange={(e) => setSimParams(prev => ({ ...prev, contractorLiquidityBoost: e.target.checked }))}
                />
                <label htmlFor="govContractorBoost" style={{ cursor: 'pointer', fontWeight: 600 }}>
                  Release 15% Escrow / EPC Working Capital Liquidity
                </label>
              </div>
            </div>

            {/* Impact Results */}
            <div style={{
              marginTop: '10px',
              padding: '10px',
              background: '#ffffff',
              border: '1px solid #86efac',
              borderRadius: '4px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px',
              textAlign: 'center'
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Cost Avoided</div>
                <strong style={{ color: '#166534', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                  ₹{simulationResult.simulated.costSavedCr.toLocaleString()} Cr
                </strong>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Time Saved</div>
                <strong style={{ color: 'var(--gov-navy)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                  {simulationResult.simulated.timeSavedMonths} Mo
                </strong>
              </div>

              <div>
                <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Risk Score</div>
                <strong style={{ color: '#b45309', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>
                  {simulationResult.baseline.riskScore} ➔ {simulationResult.simulated.riskScore}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
