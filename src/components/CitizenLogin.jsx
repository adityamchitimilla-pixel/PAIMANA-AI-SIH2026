import React, { useState } from 'react';
import { 
  Users, 
  ArrowLeft, 
  Key, 
  Phone, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck
} from 'lucide-react';

export default function CitizenLogin({ onLoginSuccess, onBackToRoles }) {
  const [formData, setFormData] = useState({
    aadhaarNumber: '5849 2018 4892',
    citizenName: 'Aarav Sharma',
    mobileNumber: '+91 98765 43210',
    state: 'Maharashtra',
    otp: '584912'
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess({
        role: 'citizen',
        name: formData.citizenName,
        aadhaarMasked: 'XXXX-XXXX-' + formData.aadhaarNumber.slice(-4),
        mobile: formData.mobileNumber,
        state: formData.state,
        authType: 'Aadhaar e-KYC Verified'
      });
    }, 600);
  };

  const handleQuickGuestAccess = () => {
    onLoginSuccess({
      role: 'citizen',
      name: 'Public Citizen (Verified Guest)',
      aadhaarMasked: 'XXXX-XXXX-4892',
      mobile: '+91 98765 43210',
      state: 'Maharashtra',
      authType: 'Direct Citizen Transparency Access'
    });
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
      <div style={{ width: '100%', maxWidth: '580px' }}>
        
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
            background: 'linear-gradient(135deg, #065f46 0%, #059669 100%)',
            color: '#ffffff',
            padding: '1.5rem 2rem',
            borderBottom: '3px solid #10b981'
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
                color: '#a7f3d0'
              }}>
                <Users size={26} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#a7f3d0', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  National Citizen Transparency & Feedback Portal
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  Common Citizen / Public Login
                </h2>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div style={{ padding: '2rem' }}>
            {/* Quick Access Helper */}
            <div style={{
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#065f46', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#059669" />
                  <span>Public Open Data Mode:</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: '#047857' }}>
                  Instant access to public project tracker & grievances
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickGuestAccess}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  border: 'none',
                  background: '#059669',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(5, 150, 105, 0.2)'
                }}
              >
                1-Click Instant Entry
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Citizen Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.citizenName}
                  onChange={(e) => setFormData({ ...formData, citizenName: e.target.value })}
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
                  Aadhaar Number (12-Digit)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.aadhaarNumber}
                    onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      fontSize: '0.88rem',
                      border: '1.5px solid #cbd5e1',
                      borderRadius: '6px',
                      outline: 'none',
                      letterSpacing: '1px',
                      boxSizing: 'border-box'
                    }}
                  />
                  <CreditCard size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Linked Mobile Number
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
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
                    <Phone size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Aadhaar OTP
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      required
                      value={formData.otp}
                      onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px 10px 38px',
                        fontSize: '0.88rem',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '6px',
                        outline: 'none',
                        letterSpacing: '2px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <Key size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  </div>
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
                  background: '#059669',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 6px rgba(5, 150, 105, 0.3)'
                }}
              >
                {isAuthenticating ? (
                  <span>Verifying Aadhaar OTP...</span>
                ) : (
                  <>
                    <Users size={18} />
                    <span>Verify & Enter Public Infrastructure Portal</span>
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
