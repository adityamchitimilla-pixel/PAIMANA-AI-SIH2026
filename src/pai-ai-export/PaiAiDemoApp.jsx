import React from 'react';
import PaiAiAssistant from './PaiAiAssistant';

/**
 * Example Standalone Demo App
 * 
 * Demonstrates how to mount and run the PAI AI Copilot component.
 */
export default function PaiAiDemoApp() {
  const handleSelectProject = (projectId) => {
    console.log("Selected project ID from PAI AI:", projectId);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f1f5f9',
      padding: '2rem 1rem',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{ width: '100%', maxWidth: '1000px' }}>
        <header style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#002244', marginBottom: '0.3rem' }}>
            PAI AI Copilot Integration Preview
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Natural Language Infrastructure Intelligence & Tendering Analysis
          </p>
        </header>

        {/* The Standalone PAI AI Component */}
        <PaiAiAssistant onSelectProject={handleSelectProject} />
      </div>
    </div>
  );
}
