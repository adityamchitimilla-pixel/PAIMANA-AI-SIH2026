import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  User, 
  Building2, 
  Key, 
  CheckCircle2, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function GovtOfficialLogin({ onLoginSuccess, onBackToRoles }) {
  const [formData, setFormData] = useState({
    officialName: 'Dr. Rajiv Malhotra',
    designation: 'Joint Secretary (IPMD)',
    ministry: 'Ministry of Statistics & Programme Implementation',
    email: 'r.malhotra.ipmd@nic.in',
    securityPin: '••••••••',
    otp: '486192'
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLoginSuccess({
        role: 'govt',
        name: formData.officialName,
        designation: formData.designation,
        ministry: formData.ministry,
        email: formData.email,
        authType: 'NIC Parichay SSO'
      });
    }, 600);
  };

  const handleDemoFill = (type) => {
    if (type === 'mospi') {
      setFormData({
        officialName: 'Dr. Rajiv Malhotra',
        designation: 'Joint Secretary (IPMD)',
        ministry: 'Ministry of Statistics & Programme Implementation',
        email: 'r.malhotra.ipmd@nic.in',
        securityPin: '••••••••',
        otp: '486192'
      });
    } else if (type === 'nhai') {
      setFormData({
        officialName: 'Er. Sandeep Verma',
        designation: 'Chief Project Director (Highway Corridor)',
        ministry: 'Ministry of Road Transport & Highways (NHAI)',
        email: 's.verma.nhai@nic.in',
        securityPin: '••••••••',
        otp: '884012'
      });
    } else if (type === 'railways') {
      setFormData({
        officialName: 'Pooja Kulkarni',
        designation: 'Executive Director (Mega Projects)',
        ministry: 'Ministry of Railways (Railway Board)',
        email: 'pooja.kulkarni@gov.in',
        securityPin: '••••••••',
        otp: '705237'
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
          {/* Official Govt Parichay Top Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #002244 0%, #003366 100%)',
            color: '#ffffff',
            padding: '1.5rem 2rem',
            borderBottom: '3px solid var(--gov-saffron)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa'
              }}>
                <ShieldCheck size={26} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#93c5fd', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
                  Parichay / NIC Government Single Sign-On (SSO)
                </div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#ffffff' }}>
                  MoSPI / IPMD Official Login
                </h2>
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div style={{ padding: '2rem' }}>
            {/* Quick Demo Preset Selection for Hackathon / Jury evaluation */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '12px 14px',
              marginBottom: '1.5rem'
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={14} color="var(--gov-saffron)" />
                <span>Quick Demonstration Profiles (1-Click Login):</span>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => handleDemoFill('mospi')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #bfdbfe',
                    background: '#eff6ff',
                    color: '#1e40af',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🏛️ MoSPI Joint Secretary
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('nhai')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #fed7aa',
                    background: '#fff7ed',
                    color: '#9a3412',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🛣️ NHAI Project Director
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('railways')}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '4px',
                    border: '1px solid #bbf7d0',
                    background: '#f0fdf4',
                    color: '#166534',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  🚆 Railways Mega Projects
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Official Name
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.officialName}
                    onChange={(e) => setFormData({ ...formData, officialName: e.target.value })}
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
                  <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Designation / Cadre
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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
                    Government Email ID (NIC/GOV)
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  Ministry / Department
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    required
                    value={formData.ministry}
                    onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
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
                  <Building2 size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Security PIN / Token
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      required
                      value={formData.securityPin}
                      onChange={(e) => setFormData({ ...formData, securityPin: e.target.value })}
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
                    <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    2FA Parichay OTP
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
                className="gov-btn gov-btn-primary"
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {isAuthenticating ? (
                  <span>Verifying Parichay Token & Permissions...</span>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Authorize & Access Official Dashboard</span>
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
