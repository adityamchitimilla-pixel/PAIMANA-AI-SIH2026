import React, { useState } from 'react';
import { 
  ShieldCheck, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Building2, 
  Send, 
  ExternalLink,
  Filter,
  UserCheck
} from 'lucide-react';

export default function CitizenFeedbackReview({ 
  citizenReports, 
  onUpdateReportStatus, 
  onSelectProject 
}) {
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedReport, setSelectedReport] = useState(citizenReports[0] || null);
  const [actionRemarks, setActionRemarks] = useState('');
  const [updatedBanner, setUpdatedBanner] = useState(false);

  const filteredReports = citizenReports.filter(r => {
    const matchesSeverity = filterSeverity === 'All' || r.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const handleUpdateStatus = (newStatus) => {
    if (!selectedReport) return;
    const updated = {
      ...selectedReport,
      status: newStatus,
      statusColor: newStatus === 'Resolved' ? '#10b981' : newStatus === 'Action Initiated' ? '#ef4444' : '#f59e0b',
      officialResponse: actionRemarks || `Official intervention recorded on ${new Date().toISOString().split('T')[0]}. Directive issued to ${selectedReport.assignedAgency}.`
    };
    onUpdateReportStatus(updated);
    setSelectedReport(updated);
    setActionRemarks('');
    setUpdatedBanner(true);
    setTimeout(() => setUpdatedBanner(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      
      {/* Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>Civic Intelligence Oversight</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-time Ground Reports via Citizen Transparency App</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gov-navy-dark)', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
              <MessageSquare size={24} color="#0066cc" />
              <span>Citizen Feedback & Ground Issue Review Desk</span>
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', margin: 0 }}>
              Bridge between public citizens, implementing agencies, and central ministry monitoring.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="All">All Severities</option>
              <option value="Critical">🔴 Critical Severity</option>
              <option value="High">🟠 High Severity</option>
              <option value="Medium">🟡 Medium Severity</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                border: '1px solid #cbd5e1',
                borderRadius: '6px',
                outline: 'none',
                background: '#ffffff'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Under Investigation">Under Investigation</option>
              <option value="Action Initiated">Action Initiated</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {updatedBanner && (
        <div style={{ background: '#dcfce7', border: '1px solid #86efac', borderRadius: '6px', padding: '10px 16px', fontSize: '0.85rem', color: '#166534', fontWeight: 600 }}>
          ✓ Grievance status and official directive recorded successfully!
        </div>
      )}

      {/* Main Split Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: '1.2rem' }}>
        
        {/* Left Column: List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxHeight: '720px', overflowY: 'auto' }}>
          {filteredReports.map(report => {
            const isSelected = selectedReport?.id === report.id;
            return (
              <div
                key={report.id}
                onClick={() => setSelectedReport(report)}
                className="gov-card"
                style={{
                  padding: '1rem 1.2rem',
                  cursor: 'pointer',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  borderColor: isSelected ? 'var(--gov-navy)' : 'var(--border-gov)',
                  borderLeft: `5px solid ${report.severity === 'Critical' ? '#ef4444' : report.severity === 'High' ? '#f59e0b' : '#3b82f6'}`
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--gov-navy)' }}>
                    {report.id}
                  </span>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: report.status === 'Resolved' ? '#dcfce7' : report.status === 'Action Initiated' ? '#fee2e2' : '#fef3c7',
                    color: report.status === 'Resolved' ? '#166534' : report.status === 'Action Initiated' ? '#991b1b' : '#92400e'
                  }}>
                    ● {report.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)', margin: '0 0 4px 0' }}>
                  {report.projectName}
                </h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                  📍 {report.location} ({report.state}) • Issue: <strong>{report.issueType}</strong>
                </div>

                <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  "{report.description}"
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Review & Action Box */}
        {selectedReport ? (
          <div className="gov-card" style={{ padding: '1.5rem', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>
                  Report ID: {selectedReport.id}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy-dark)', margin: '4px 0 2px 0' }}>
                  {selectedReport.projectName}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Reported by: <strong>{selectedReport.reportedBy}</strong> on {selectedReport.reportedDate}
                </div>
              </div>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                background: selectedReport.severity === 'Critical' ? '#fee2e2' : selectedReport.severity === 'High' ? '#fef3c7' : '#e0f2fe',
                color: selectedReport.severity === 'Critical' ? '#991b1b' : selectedReport.severity === 'High' ? '#92400e' : '#075985'
              }}>
                Severity: {selectedReport.severity}
              </span>
            </div>

            {/* Ground Details Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', background: '#f8fafc', padding: '1rem', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Location / Landmarking:</span>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>📍 {selectedReport.location}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Assigned Implementing Agency:</span>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>🏛️ {selectedReport.assignedAgency}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Issue Category:</span>
                <div style={{ fontWeight: 700, color: '#1e293b' }}>⚠️ {selectedReport.issueType}</div>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>Current Handling Status:</span>
                <div style={{ fontWeight: 700, color: selectedReport.statusColor }}>● {selectedReport.status}</div>
              </div>
            </div>

            {/* Description */}
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '4px' }}>
                CITIZEN ON-GROUND TESTIMONY:
              </div>
              <div style={{ background: '#f1f5f9', borderLeft: '4px solid var(--gov-navy)', padding: '10px 14px', borderRadius: '4px', fontSize: '0.85rem', color: '#1e293b', lineHeight: '1.4' }}>
                "{selectedReport.description}"
              </div>
            </div>

            {/* Official Action Controls */}
            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '6px' }}>
                MoSPI Executive Directive / Agency Remark:
              </label>
              <textarea
                rows={2}
                placeholder="Enter official action note or directive issued to implementing agency..."
                value={actionRemarks}
                onChange={(e) => setActionRemarks(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '0.82rem',
                  border: '1.5px solid #cbd5e1',
                  borderRadius: '6px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  marginBottom: '10px'
                }}
              />

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Action Initiated')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: '1px solid #f87171',
                    background: '#fef2f2',
                    color: '#991b1b',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  🔴 Issue Urgent Notice (Action Initiated)
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Under Investigation')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: '1px solid #fbbf24',
                    background: '#fffbeb',
                    color: '#92400e',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  🟡 Send for Site Inspection
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus('Resolved')}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '6px',
                    border: '1px solid #4ade80',
                    background: '#f0fdf4',
                    color: '#166534',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  🟢 Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="gov-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Select a citizen grievance report from the list to review details and issue directives.
          </div>
        )}
      </div>
    </div>
  );
}
