import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TENDERS_DATA } from '../data/tendersData';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  Filter, 
  Send, 
  ShieldCheck, 
  Building2, 
  IndianRupee, 
  Calendar, 
  Award, 
  HelpCircle, 
  Layers, 
  ChevronRight, 
  X, 
  Download, 
  Info,
  Check,
  AlertCircle,
  FileCheck,
  Briefcase,
  Cpu,
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';

export default function TendersBiddingPlatform() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('ongoing'); // 'ongoing', 'upcoming', 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('ALL');
  
  // Modals state
  const [selectedTenderForBidding, setSelectedTenderForBidding] = useState(null);
  const [selectedTenderForDebrief, setSelectedTenderForDebrief] = useState(null);
  const [selectedDebriefBidder, setSelectedDebriefBidder] = useState(null);

  // Filtered tenders list
  const filteredTenders = useMemo(() => {
    return TENDERS_DATA.filter(tender => {
      const matchesTab = tender.status === activeTab;
      const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === 'ALL' || tender.sector === selectedSector;
      return matchesTab && matchesSearch && matchesSector;
    });
  }, [activeTab, searchQuery, selectedSector]);

  // Unique sectors list for filter
  const sectorsList = useMemo(() => {
    const set = new Set();
    TENDERS_DATA.forEach(t => set.add(t.sector));
    return ['ALL', ...Array.from(set)];
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', padding: '1rem 0' }}>
      
      {/* Official Top Government E-Procurement Header */}
      <div className="gov-card" style={{ padding: '1.2rem 1.5rem', background: '#ffffff', borderRadius: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="gov-badge gov-badge-navy" style={{ fontSize: '0.7rem' }}>CPPP & GeM Integrated</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>General Financial Rules (GFR 2017) Transparent Procurement</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--gov-navy-dark)', letterSpacing: '-0.02em' }}>
              {t('tabTenders', 'E-Tenders & Bidding Intelligence Portal')}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px', maxWidth: '850px' }}>
              Official computerized bidding platform for upcoming, active, and completed central sector infrastructure packages with <strong>automated AI compliance validation</strong> and <strong>transparent debriefing reason analysis</strong> for non-winning bidders.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Briefcase size={20} color="var(--gov-navy)" />
              <div>
                <div style={{ fontSize: '0.68rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>Active Outlay Open</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>₹10,050 Cr</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Stage Switcher (Ongoing, Upcoming, Completed) */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          marginTop: '1.2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #f1f5f9'
        }}>
          {/* Main Stage Tabs */}
          <div style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '4px',
            borderRadius: '6px',
            gap: '4px'
          }}>
            <button
              onClick={() => setActiveTab('ongoing')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: activeTab === 'ongoing' ? 800 : 500,
                background: activeTab === 'ongoing' ? '#ffffff' : 'transparent',
                color: activeTab === 'ongoing' ? 'var(--gov-navy)' : '#64748b',
                border: 'none',
                boxShadow: activeTab === 'ongoing' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Clock size={15} color={activeTab === 'ongoing' ? '#16a34a' : '#94a3b8'} />
              <span>Ongoing Tenders ({TENDERS_DATA.filter(t => t.status === 'ongoing').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: activeTab === 'upcoming' ? 800 : 500,
                background: activeTab === 'upcoming' ? '#ffffff' : 'transparent',
                color: activeTab === 'upcoming' ? 'var(--gov-navy)' : '#64748b',
                border: 'none',
                boxShadow: activeTab === 'upcoming' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Calendar size={15} color={activeTab === 'upcoming' ? '#ea580c' : '#94a3b8'} />
              <span>Upcoming RFPs & Notices ({TENDERS_DATA.filter(t => t.status === 'upcoming').length})</span>
            </button>

            <button
              onClick={() => setActiveTab('completed')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: activeTab === 'completed' ? 800 : 500,
                background: activeTab === 'completed' ? '#ffffff' : 'transparent',
                color: activeTab === 'completed' ? 'var(--gov-navy)' : '#64748b',
                border: 'none',
                boxShadow: activeTab === 'completed' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Award size={15} color={activeTab === 'completed' ? 'var(--gov-navy)' : '#94a3b8'} />
              <span>Awarded & Debriefs ({TENDERS_DATA.filter(t => t.status === 'completed').length})</span>
            </button>
          </div>

          {/* Search & Sector Filters */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', minWidth: '220px' }}>
              <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search tender ID, agency, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px 6px 30px',
                  fontSize: '0.78rem',
                  border: '1px solid #cbd5e1',
                  borderRadius: '4px',
                  outline: 'none'
                }}
              />
            </div>

            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              style={{
                padding: '6px 10px',
                fontSize: '0.78rem',
                border: '1px solid #cbd5e1',
                borderRadius: '4px',
                background: '#ffffff',
                color: '#334155',
                outline: 'none',
                fontWeight: 600
              }}
            >
              {sectorsList.map(s => (
                <option key={s} value={s}>{s === 'ALL' ? 'All Sectors' : s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tender Cards Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredTenders.length === 0 ? (
          <div className="gov-card" style={{ padding: '3rem 1.5rem', textAlign: 'center', background: '#ffffff', borderRadius: '8px' }}>
            <FileText size={36} color="#94a3b8" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ fontSize: '1.1rem', color: 'var(--gov-navy-dark)', fontWeight: 700 }}>No Tenders Found</h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
              No tender notices match the selected stage and search criteria.
            </p>
          </div>
        ) : (
          filteredTenders.map(tender => (
            <div 
              key={tender.id}
              className="gov-card"
              style={{
                padding: '1.4rem',
                background: '#ffffff',
                borderRadius: '8px',
                borderLeft: `4px solid ${
                  tender.status === 'ongoing' ? '#16a34a' :
                  tender.status === 'upcoming' ? '#ea580c' : 'var(--gov-navy)'
                }`,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}
            >
              {/* Card Header Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.82rem', background: '#e8f0fe', padding: '2px 8px', borderRadius: '3px' }}>
                      {tender.id}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                      {tender.agency} • {tender.ministry}
                    </span>
                    <span className={`gov-badge ${
                      tender.status === 'ongoing' ? 'gov-badge-low' :
                      tender.status === 'upcoming' ? 'gov-badge-high' : 'gov-badge-navy'
                    }`} style={{ fontSize: '0.68rem' }}>
                      {tender.statusLabel}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', lineHeight: '1.35' }}>
                    {tender.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '4px', lineHeight: '1.4' }}>
                    {tender.description}
                  </p>
                </div>

                {/* Financial Summary Pill */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  textAlign: 'right',
                  minWidth: '180px'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                    {tender.status === 'completed' ? 'Awarded Value' : 'Estimated Value'}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: tender.status === 'completed' ? '#166534' : 'var(--gov-navy-dark)' }}>
                    ₹{(tender.awardedCostCr || tender.estimatedCostCr).toLocaleString()} <span style={{ fontSize: '0.8rem' }}>Cr</span>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                    {tender.procurementType}
                  </div>
                </div>
              </div>

              {/* Key Parameter Badges & Criteria */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '10px',
                background: '#f8fafc',
                padding: '10px 14px',
                borderRadius: '6px',
                fontSize: '0.78rem',
                border: '1px solid #f1f5f9'
              }}>
                <div>
                  <span style={{ color: '#64748b' }}>Location:</span>{' '}
                  <strong style={{ color: '#1e293b' }}>{tender.location}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Execution Period:</span>{' '}
                  <strong style={{ color: '#1e293b' }}>{tender.workDurationMonths} Months</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>EMD / Bid Security:</span>{' '}
                  <strong style={{ color: '#9a3412' }}>₹{tender.emdAmountCr} Cr</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>
                    {tender.status === 'ongoing' ? 'Bid Closing:' :
                     tender.status === 'upcoming' ? 'Pre-Bid Meeting:' : 'Award Date:'}
                  </span>{' '}
                  <strong style={{ color: tender.status === 'ongoing' ? '#dc2626' : '#1e293b' }}>
                    {tender.status === 'ongoing' ? '15 May 2026 (17:00 IST)' :
                     tender.status === 'upcoming' ? tender.preBidMeetingDate : tender.awardDate}
                  </strong>
                </div>
              </div>

              {/* Mandatory Eligibility Quick Checklist */}
              {tender.mandatoryRequirements && (
                <div style={{ fontSize: '0.75rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 700, color: 'var(--gov-navy-dark)' }}>Mandatory Gates:</span>
                  <span>• Min Turnover: <strong>₹{tender.mandatoryRequirements.minAnnualTurnoverCr} Cr</strong></span>
                  <span>• Min Single Work: <strong>₹{tender.mandatoryRequirements.minSingleWorkCr} Cr</strong></span>
                  <span>• Min Experience: <strong>{tender.mandatoryRequirements.minSimilarExperienceYears} Years</strong></span>
                  <span>• Solvency: <strong>₹{tender.mandatoryRequirements.financialSolvencyCr} Cr</strong></span>
                </div>
              )}

              {/* Action Bar based on Status */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #f1f5f9',
                paddingTop: '10px',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} color="var(--gov-navy)" />
                  {tender.status === 'ongoing' && (
                    <span><strong>{tender.bidsReceivedCount} bids</strong> received so far under sealed envelope protocol.</span>
                  )}
                  {tender.status === 'upcoming' && (
                    <span>Draft technical specs published on CPPP portal. Pre-registration open.</span>
                  )}
                  {tender.status === 'completed' && (
                    <span>Awarded to <strong>{tender.awardedContractor}</strong>. Full debrief reports published.</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  {tender.status === 'ongoing' && (
                    <button
                      onClick={() => setSelectedTenderForBidding(tender)}
                      className="gov-btn gov-btn-primary"
                      style={{ padding: '7px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Send size={14} />
                      <span>Participate & Submit Bid</span>
                    </button>
                  )}

                  {tender.status === 'upcoming' && (
                    <button
                      onClick={() => alert(`Pre-Bid registration recorded for Tender ${tender.id}. Official link will be sent to registered GeM vendor profile.`)}
                      className="gov-btn gov-btn-secondary"
                      style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                    >
                      <span>Register for Pre-Bid Notice</span>
                    </button>
                  )}

                  {tender.status === 'completed' && (
                    <button
                      onClick={() => {
                        setSelectedTenderForDebrief(tender);
                        setSelectedDebriefBidder(tender.biddersDebrief?.[1] || tender.biddersDebrief?.[0]);
                      }}
                      className="gov-btn gov-btn-saffron"
                      style={{ padding: '7px 16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ShieldCheck size={14} />
                      <span>Inspect Bid Debrief & Rejection Reasons</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ============================================================== */}
      {/* 1. INTERACTIVE BID SUBMISSION MODAL FOR BIDDERS                */}
      {/* ============================================================== */}
      {selectedTenderForBidding && (
        <BidSubmissionModal 
          tender={selectedTenderForBidding} 
          onClose={() => setSelectedTenderForBidding(null)} 
        />
      )}

      {/* ============================================================== */}
      {/* 2. BID DEBRIEF & REJECTION REASON BREAKDOWN MODAL             */}
      {/* ============================================================== */}
      {selectedTenderForDebrief && (
        <BidDebriefModal 
          tender={selectedTenderForDebrief}
          selectedBidder={selectedDebriefBidder}
          onSelectBidder={(b) => setSelectedDebriefBidder(b)}
          onClose={() => {
            setSelectedTenderForDebrief(null);
            setSelectedDebriefBidder(null);
          }}
        />
      )}
    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: BID SUBMISSION PORTAL WITH AI PRE-VALIDATION GATES
// =========================================================================
function BidSubmissionModal({ tender, onClose }) {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bidReceiptId, setBidReceiptId] = useState('');

  // Bidder Company Form State
  const [companyName, setCompanyName] = useState('L&T Geotech Infrastructure Ltd');
  const [gstin, setGstin] = useState('27AAACL1234F1Z8');
  const [gemVendorId, setGemVendorId] = useState('GEM-VEND-2026-8849');
  const [localSupplierClass, setLocalSupplierClass] = useState('Class-I (Local Content >= 50%)');
  
  // Financial Bid State
  const [quotedPriceCr, setQuotedPriceCr] = useState(tender.estimatedCostCr * 0.98);
  const [emdTxnRef, setEmdTxnRef] = useState('SBI-EMD-BG-2026-991204');
  
  // Technical Credentials State
  const [annualTurnoverCr, setAnnualTurnoverCr] = useState(tender.mandatoryRequirements.minAnnualTurnoverCr * 1.2);
  const [singleWorkValueCr, setSingleWorkValueCr] = useState(tender.mandatoryRequirements.minSingleWorkCr * 1.1);
  const [experienceYears, setExperienceYears] = useState(tender.mandatoryRequirements.minSimilarExperienceYears + 2);
  const [hasIsoCert, setHasIsoCert] = useState(true);
  const [hasEquipmentDeclared, setHasEquipmentDeclared] = useState(true);
  const [hasSolvencyCert, setHasSolvencyCert] = useState(true);

  // Automated Real-Time AI Compliance Pre-Check
  const complianceResults = useMemo(() => {
    const checks = [
      {
        gate: "Clause 4.1: Minimum Annual Turnover",
        required: `≥ ₹${tender.mandatoryRequirements.minAnnualTurnoverCr} Cr`,
        provided: `₹${annualTurnoverCr} Cr`,
        isPass: annualTurnoverCr >= tender.mandatoryRequirements.minAnnualTurnoverCr
      },
      {
        gate: "Clause 5.2: Single Completed Similar Work",
        required: `≥ ₹${tender.mandatoryRequirements.minSingleWorkCr} Cr`,
        provided: `₹${singleWorkValueCr} Cr`,
        isPass: singleWorkValueCr >= tender.mandatoryRequirements.minSingleWorkCr
      },
      {
        gate: "Clause 6.1: Technical Experience in Sector",
        required: `≥ ${tender.mandatoryRequirements.minSimilarExperienceYears} Years`,
        provided: `${experienceYears} Years`,
        isPass: experienceYears >= tender.mandatoryRequirements.minSimilarExperienceYears
      },
      {
        gate: "Clause 7.3: Mandatory Machinery & Pavers",
        required: "Declared & Verified Inventory",
        provided: hasEquipmentDeclared ? "Yes (Full Ownership Proof)" : "Incomplete",
        isPass: hasEquipmentDeclared
      },
      {
        gate: "Clause 8.1: ISO 9001 & Safety Certifications",
        required: "ISO 9001:2015 / ISO 45001",
        provided: hasIsoCert ? "Valid & Attached" : "Missing",
        isPass: hasIsoCert
      },
      {
        gate: "Clause 9.4: Bank Solvency Certificate",
        required: `≥ ₹${tender.mandatoryRequirements.financialSolvencyCr} Cr from Scheduled Bank`,
        provided: hasSolvencyCert ? "Valid SBI Solvency Attached" : "Not Provided",
        isPass: hasSolvencyCert
      }
    ];

    const passCount = checks.filter(c => c.isPass).length;
    const isFullyCompliant = passCount === checks.length;
    return { checks, passCount, total: checks.length, isFullyCompliant };
  }, [tender, annualTurnoverCr, singleWorkValueCr, experienceYears, hasEquipmentDeclared, hasIsoCert, hasSolvencyCert]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = `BID-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    setBidReceiptId(token);
    setIsSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 34, 68, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'var(--gov-navy-dark)',
          color: '#ffffff',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#ff9933', textTransform: 'uppercase', fontWeight: 700 }}>
              Official CPPP E-Procurement Bidding Desk
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '2px', color: '#ffffff' }}>
              Tender Bid Submission: {tender.id}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--gov-navy-dark)' }}>
                Tender Bid Successfully Submitted & Encrypted!
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '540px', margin: '8px auto 0 auto' }}>
                Your bid has been digitally signed and sealed in the CPPP national vault. It will be decrypted on the official bid opening date: <strong>{tender.bidOpeningDate}</strong>.
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1.5px dashed var(--gov-navy)',
                borderRadius: '6px',
                padding: '1rem',
                maxWidth: '480px',
                margin: '1.5rem auto',
                textAlign: 'left',
                fontSize: '0.8rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Acknowledgment Ref:</span>
                  <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--gov-navy)' }}>{bidReceiptId}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Bidder Entity:</span>
                  <strong>{companyName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#64748b' }}>Quoted Commercial Price:</span>
                  <strong style={{ color: '#166534' }}>₹{Number(quotedPriceCr).toLocaleString()} Crore</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>AI Eligibility Pre-Score:</span>
                  <strong style={{ color: '#166534' }}>100% (6/6 Mandatory Clauses Cleared)</strong>
                </div>
              </div>

              <button
                onClick={onClose}
                className="gov-btn gov-btn-primary"
                style={{ padding: '8px 24px', fontSize: '0.85rem' }}
              >
                Done & Return to Portal
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* Step indicator */}
              <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.8rem', gap: '1.5rem' }}>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.85rem' }}>
                  1. Company Profile
                </span>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.85rem' }}>
                  2. Financial Bid
                </span>
                <span style={{ fontWeight: 800, color: 'var(--gov-navy)', fontSize: '0.85rem' }}>
                  3. Technical Compliance
                </span>
              </div>

              {/* Section 1: Bidder Company Details */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '8px' }}>
                  1. Bidder Corporate Information
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Registered Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      GSTIN / Tax ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      GeM / CPPP Vendor ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={gemVendorId}
                      onChange={(e) => setGemVendorId(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Make in India Class *
                    </label>
                    <select
                      value={localSupplierClass}
                      onChange={(e) => setLocalSupplierClass(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px', background: '#ffffff' }}
                    >
                      <option>Class-I (Local Content &gt;= 50%)</option>
                      <option>Class-II (Local Content 20% - 50%)</option>
                      <option>Non-Local Supplier (&lt; 20%)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Financial Price Quotation */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '8px' }}>
                  2. Commercial Price Bid & Bid Security (EMD)
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Total Commercial Bid Quote (in ₹ Crore) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={quotedPriceCr}
                      onChange={(e) => setQuotedPriceCr(Number(e.target.value))}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 700, color: '#166534' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                      Estimated Benchmark: ₹{tender.estimatedCostCr.toLocaleString()} Cr ({quotedPriceCr < tender.estimatedCostCr ? `${Math.abs(Math.round(((quotedPriceCr - tender.estimatedCostCr)/tender.estimatedCostCr)*100))}% Below Estimate` : 'Above Estimate'})
                    </span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      EMD / Bank Guarantee Ref Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={emdTxnRef}
                      onChange={(e) => setEmdTxnRef(e.target.value)}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#9a3412' }}>
                      Required EMD Amount: ₹{tender.emdAmountCr} Crore
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 3: Technical Qualification Parameters */}
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '8px' }}>
                  3. Technical & Experience Credentials
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Avg Annual Turnover (₹ Cr) *
                    </label>
                    <input
                      type="number"
                      required
                      value={annualTurnoverCr}
                      onChange={(e) => setAnnualTurnoverCr(Number(e.target.value))}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Min: ₹{tender.mandatoryRequirements.minAnnualTurnoverCr} Cr</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Single Work Completed (₹ Cr) *
                    </label>
                    <input
                      type="number"
                      required
                      value={singleWorkValueCr}
                      onChange={(e) => setSingleWorkValueCr(Number(e.target.value))}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Min: ₹{tender.mandatoryRequirements.minSingleWorkCr} Cr</span>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#475569', display: 'block', marginBottom: '3px' }}>
                      Experience in Sector (Years) *
                    </label>
                    <input
                      type="number"
                      required
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      style={{ width: '100%', padding: '6px 10px', fontSize: '0.8rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Min: {tender.mandatoryRequirements.minSimilarExperienceYears} Years</span>
                  </div>
                </div>

                {/* Checkbox Declarations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', fontSize: '0.78rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={hasEquipmentDeclared} onChange={(e) => setHasEquipmentDeclared(e.target.checked)} />
                    <span>I certify that mandatory machinery (pavers, batching plants, testing rigs) are available in operational condition.</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={hasIsoCert} onChange={(e) => setHasIsoCert(e.target.checked)} />
                    <span>Valid ISO 9001:2015 Quality & ISO 45001 Safety Certificates are attached.</span>
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={hasSolvencyCert} onChange={(e) => setHasSolvencyCert(e.target.checked)} />
                    <span>Financial Solvency Certificate of ₹{tender.mandatoryRequirements.financialSolvencyCr} Cr from Scheduled Commercial Bank is attested.</span>
                  </label>
                </div>
              </div>

              {/* Section 4: Automated AI Pre-Validation Checklist */}
              <div style={{
                background: complianceResults.isFullyCompliant ? '#f0fdf4' : '#fffbeb',
                border: `1px solid ${complianceResults.isFullyCompliant ? '#bbf7d0' : '#fde68a'}`,
                borderRadius: '6px',
                padding: '12px 14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Cpu size={16} color={complianceResults.isFullyCompliant ? '#16a34a' : '#d97706'} />
                    <strong style={{ fontSize: '0.85rem', color: complianceResults.isFullyCompliant ? '#166534' : '#92400e' }}>
                      Automated Pre-Submission Compliance Verification ({complianceResults.passCount}/{complianceResults.total} Gates Cleared)
                    </strong>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: complianceResults.isFullyCompliant ? '#166534' : '#92400e' }}>
                    {complianceResults.isFullyCompliant ? '100% ELIGIBLE' : 'ACTION REQUIRED'}
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '0.72rem' }}>
                  {complianceResults.checks.map((chk, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {chk.isPass ? (
                        <Check size={14} color="#16a34a" />
                      ) : (
                        <XCircle size={14} color="#dc2626" />
                      )}
                      <span style={{ color: chk.isPass ? '#1e293b' : '#dc2626', fontWeight: chk.isPass ? 400 : 700 }}>
                        {chk.gate}: {chk.provided}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={onClose}
                  className="gov-btn gov-btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!complianceResults.isFullyCompliant}
                  className="gov-btn gov-btn-primary"
                  style={{
                    padding: '8px 24px',
                    fontSize: '0.8rem',
                    opacity: complianceResults.isFullyCompliant ? 1 : 0.5,
                    cursor: complianceResults.isFullyCompliant ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Send size={14} />
                  <span>Encrypt & Submit Final Bid</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// SUB-COMPONENT: BID DEBRIEF & REJECTION REASONS MODAL
// =========================================================================
function BidDebriefModal({ tender, selectedBidder, onSelectBidder, onClose }) {
  const isWinner = selectedBidder?.isWinner;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 34, 68, 0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '8px',
        maxWidth: '920px',
        width: '100%',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        overflow: 'hidden'
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'var(--gov-navy-dark)',
          color: '#ffffff',
          padding: '1.2rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#ff9933', textTransform: 'uppercase', fontWeight: 700 }}>
              CVC & GFR 2017 Transparent Bid Evaluation Debrief
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginTop: '2px', color: '#ffffff' }}>
              Comparative Bid Debriefing: {tender.id}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body: Split view of Participating Bidders & Detailed Debrief */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(260px, 1fr) 2fr',
          flex: 1,
          overflowY: 'auto'
        }}>
          
          {/* Left Column: List of All Bidders with Outcome Tag */}
          <div style={{
            background: '#f8fafc',
            borderRight: '1px solid #e2e8f0',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--gov-navy-dark)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Participating Bidders ({tender.biddersDebrief?.length || 0})
            </div>

            {tender.biddersDebrief?.map((bidder, idx) => {
              const isSelected = selectedBidder?.companyName === bidder.companyName;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectBidder(bidder)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '6px',
                    background: isSelected ? '#ffffff' : 'transparent',
                    border: `1.5px solid ${isSelected ? 'var(--gov-navy)' : '#e2e8f0'}`,
                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                    <span className={`gov-badge ${
                      bidder.isWinner ? 'gov-badge-low' :
                      bidder.status.includes('DISQUALIFIED') ? 'gov-badge-critical' : 'gov-badge-moderate'
                    }`} style={{ fontSize: '0.62rem' }}>
                      {bidder.status}
                    </span>
                    {bidder.financialQuoteCr > 0 && (
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#166534' }}>
                        ₹{bidder.financialQuoteCr} Cr
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>
                    {bidder.companyName}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Debrief & Non-Winning Reason Explanation */}
          <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', overflowY: 'auto' }}>
            {selectedBidder && (
              <>
                {/* Result Headline Banner */}
                <div style={{
                  padding: '14px 16px',
                  borderRadius: '6px',
                  background: isWinner ? '#f0fdf4' : selectedBidder.status.includes('DISQUALIFIED') ? '#fef2f2' : '#fffbeb',
                  border: `1.5px solid ${isWinner ? '#86efac' : selectedBidder.status.includes('DISQUALIFIED') ? '#fca5a5' : '#fde68a'}`,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}>
                  {isWinner ? (
                    <CheckCircle2 size={24} color="#16a34a" style={{ flexShrink: 0 }} />
                  ) : selectedBidder.status.includes('DISQUALIFIED') ? (
                    <XCircle size={24} color="#dc2626" style={{ flexShrink: 0 }} />
                  ) : (
                    <AlertTriangle size={24} color="#d97706" style={{ flexShrink: 0 }} />
                  )}

                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: isWinner ? '#166534' : selectedBidder.status.includes('DISQUALIFIED') ? '#991b1b' : '#92400e' }}>
                      Evaluation Decision: {selectedBidder.status}
                    </div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                      {selectedBidder.companyName}
                    </h4>
                    <p style={{ fontSize: '0.82rem', color: '#334155', marginTop: '4px', lineHeight: '1.4' }}>
                      {selectedBidder.reason}
                    </p>
                  </div>
                </div>

                {/* Score & Financial Comparison Matrix */}
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '8px' }}>
                    1. Commercial & Technical Scoring Matrix
                  </h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Financial Bid Quoted</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                        {selectedBidder.financialQuoteCr > 0 ? `₹${selectedBidder.financialQuoteCr} Cr` : 'Not Opened'}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        Winner Quote: ₹{tender.winnerFinancialQuoteCr} Cr
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Technical Score</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: selectedBidder.technicalScore >= 75 ? '#166534' : '#dc2626', marginTop: '2px' }}>
                        {selectedBidder.technicalScore > 0 ? `${selectedBidder.technicalScore} / 100` : 'Disqualified'}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        Min Threshold: 75.0 / 100
                      </div>
                    </div>

                    <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Composite QCBS Rank</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--gov-navy)', marginTop: '2px' }}>
                        {selectedBidder.compositeScore > 0 ? `${selectedBidder.compositeScore} pts` : 'N/A'}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                        Winner Score: 95.36 pts
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specific Disqualification Grounds (if any) */}
                {selectedBidder.disqualificationReasons && (
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#991b1b', marginBottom: '8px' }}>
                      2. Mandatory Non-Compliance Findings
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {selectedBidder.disqualificationReasons.map((r, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '8px 10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', fontSize: '0.78rem', color: '#991b1b' }}>
                          <XCircle size={15} color="#dc2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Gap Analysis */}
                {selectedBidder.detailedGapAnalysis && (
                  <div>
                    <h5 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gov-navy-dark)', marginBottom: '8px' }}>
                      2. Gap Analysis vs L1 Winning Bidder
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', background: '#f8fafc', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                      <div>
                        <strong>Price Difference:</strong> <span style={{ color: '#dc2626' }}>{selectedBidder.detailedGapAnalysis.financialVariance}</span>
                      </div>
                      <div>
                        <strong>Technical Differential:</strong> <span style={{ color: '#475569' }}>{selectedBidder.detailedGapAnalysis.technicalScoreVariance}</span>
                      </div>
                      <div>
                        <strong>Compliance Status:</strong> <span style={{ color: '#166534' }}>{selectedBidder.detailedGapAnalysis.complianceStatus}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actionable Recommendations for Future Bids */}
                {selectedBidder.recommendationsForFutureBids && (
                  <div style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: '6px',
                    padding: '12px 14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Sparkles size={16} color="var(--gov-navy)" />
                      <strong style={{ fontSize: '0.82rem', color: 'var(--gov-navy-dark)' }}>
                        AI Guidance for Future Government Tenders
                      </strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#1e3a8a', lineHeight: '1.4' }}>
                      {selectedBidder.recommendationsForFutureBids}
                    </p>
                  </div>
                )}

                {/* Official Debrief Certificate Download Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'auto' }}>
                  <button
                    onClick={() => alert(`Official CPPP Debrief Certificate downloaded for ${selectedBidder.companyName}`)}
                    className="gov-btn gov-btn-secondary"
                    style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px' }}
                  >
                    <Download size={13} />
                    <span>Download Official Debrief Report (PDF)</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
