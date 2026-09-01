import React, { useState } from 'react';
import { 
  HardHat, 
  ArrowLeft, 
  Building, 
  FileText, 
  Mail, 
  KeyRound, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert
} from 'lucide-react';

export default function TenderBidderLogin({ onLoginSuccess, onBackToRoles }) {
  const [formData, setFormData] = useState({
    companyName: 'ABC Infrastructure & Engineering Pvt. Ltd.',
    cin: 'U45200MH2012PTC239841',
    vendorCode: 'VND-2026-9041',
    email: 'bids@abcinfra.com',
    digitalToken: 'DSC-CLASS3-2026-VALID',
    otp: '914820'
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess({
        role: 'tender',
        companyName: formData.companyName,
        cin: formData.cin,
        vendorCode: formData.vendorCode,
        email: formData.email,
        authType: 'CPPP / GeM Digital Signature'
      });
    }, 600);
  };

  const handleDemoFill = (type) => {
    if (type === 'abc') {
      setFormData({
        companyName: 'ABC Infrastructure & Engineering Pvt. Ltd.',
        cin: 'U45200MH2012PTC239841',
        vendorCode: 'VND-2026-9041',
        email: 'bids@abcinfra.com',
        digitalToken: 'DSC-CLASS3-2026-VALID',
        otp: '914820'
      });
    } else if (type === 'lt') {
      setFormData({
        companyName: 'Larsen & Toubro Ltd. (Heavy Civil Infra)',
        cin: 'L99999MH1946PLC004768',
        vendorCode: 'VND-2026-0012',
        email: 'tenders@larsentoubro.com',
        digitalToken: 'DSC-CLASS3-2026-VALID',
        otp: '884012'
      });
    } else if (type === 'afcons') {
      setFormData({
        companyName: 'Afcons Infrastructure Limited',
        cin: 'U45200MH1976PLC019335',
        vendorCode: 'VND-2026-0488',
        email: 'commercial@afcons.com',
        digitalToken: 'DSC-CLASS3-2026-VALID',
        otp: '740192'
      });
    }
  };

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
      <div style={{ width: '100%', maxWidth: '620px' }}>
        
        {/* Back Button */}
        <button
          onClick={onBackToRoles}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            color: 'var(--gov-navy)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            marginBottom: '1rem',
            padding: '4px 8px',
            borderRadius: '4px'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Role Selection</span>
        </button>

        {/* Login Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          border: '1px solid var(--border-gov)',
          boxShadow: '0 4px 20px rgba(0, 34, 68, 0.08)',
          overflow: 'hidden'
        }}>
          {/* Top Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #78350f 0%, #b45309 100%)',
            color: '#ffffff',
            padding: '1.5rem 2rem',
            borderBottom: '3px solid #f59e0b'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fef08a'
              }}>
                <HardHat size={26} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Central Public Procurement Portal (CPPP) & GeM
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Tender Bidder / Contractor Login
                </h2>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div style={{ padding: '2rem' }}>
            {/* Quick Demo Presets */}
            <div style={{
              background: '#fffbeb',
              border: '1px solid #fde68a',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#92400e', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="#d97706" />
                <span>Quick Demonstration Bidder Accounts:</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleDemoFill('abc')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #fcd34d',
                    background: '#ffffff',
                    color: '#92400e',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🏗️ ABC Infra Pvt Ltd (EPC)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('lt')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #fcd34d',
                    background: '#ffffff',
                    color: '#92400e',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🏢 Larsen & Toubro Infra
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('afcons')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #fcd34d',
                    background: '#ffffff',
                    color: '#92400e',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🛣️ Afcons Infrastructure
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Registered Company / Entity Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Building size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Corporate Identity Number (CIN)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cin}
                    onChange={(e) => setFormData({ ...formData, cin: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    CPPP Vendor Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.vendorCode}
                    onChange={(e) => setFormData({ ...formData, vendorCode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Registered Bidder Email
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Digital Signature (Class 3 DSC)
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={formData.digitalToken}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #e2e8f0',
                      background: '#f8fafc',
                      borderRadius: '6px',
                      color: '#059669',
                      fontWeight: 700,
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Bidder Portal OTP
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      letterSpacing: '2px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  background: '#b45309',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(180, 83, 9, 0.3)'
                }}
              >
                {isAuthenticating ? (
                  <span>Authenticating CPPP Digital Signature...</span>
                ) : (
                  <>
                    <HardHat size={18} />
                    <span>Enter E-Tenders & Bidding Workspace</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
