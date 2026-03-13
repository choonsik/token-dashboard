import { useState, useEffect } from 'react';
import { KeyRound, Activity, Sparkles, CheckCircle2, AlertCircle, Save, Loader2, BarChart2 } from 'lucide-react';
import './index.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [provider, setProvider] = useState('gemini');
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const [localUsage, setLocalUsage] = useState(0);

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem('token_dashboard_key');
    const storedUsage = localStorage.getItem('token_dashboard_usage');
    if (stored) {
      setApiKey(stored);
      setSavedKey(stored);
    }
    if (storedUsage) {
      setLocalUsage(parseInt(storedUsage, 10));
    }
  }, []);

  const handleSaveKey = async () => {
    if (!apiKey.trim()) return;
    setTesting(true);
    setStatus(null);
    
    try {
      if (provider === 'gemini') {
        // Test Gemini API Key by fetching models
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!res.ok) throw new Error('Invalid API Key');
      } else {
        // Test OpenAI API Key (using models endpoint)
        const res = await fetch('https://api.openai.com/v1/models', {
          headers: { 'Authorization': `Bearer ${apiKey}` }
        });
        if (!res.ok) throw new Error('Invalid API Key');
      }
      
      localStorage.setItem('token_dashboard_key', apiKey);
      setSavedKey(apiKey);
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('error');
    } finally {
      setTesting(false);
    }
  };

  const currentQuotaLimit = provider === 'gemini' ? 1000000 : 50000;
  const usagePercentage = Math.min((localUsage / currentQuotaLimit) * 100, 100);

  return (
    <div className="app-container" style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '16px', color: 'var(--accent-color)' }}>
            <Activity size={32} />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }} className="text-gradient">Token Monitor</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Beautiful tracking for your AI API usage and quotas
        </p>
      </header>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 1fr)' }}>
        
        {/* Settings Panel */}
        <section className="glass-panel animate-fade-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', marginBottom: '1.5rem', color: 'white' }}>
            <KeyRound size={20} color="var(--accent-color)" /> API Configuration
          </h2>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            {['gemini', 'openai'].map(p => (
              <button 
                key={p}
                onClick={() => setProvider(p)}
                style={{ 
                  flex: 1, 
                  padding: '12px', 
                  borderRadius: '12px',
                  background: provider === p ? 'var(--accent-glow)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${provider === p ? 'var(--accent-color)' : 'var(--glass-border)'}`,
                  color: provider === p ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  fontWeight: provider === p ? 600 : 400
                }}
              >
                {p} API
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="password"
              className="glass-input"
              style={{ flex: 1 }}
              placeholder={provider === 'gemini' ? 'Enter Google Gemini API Key' : 'Enter OpenAI API Key (sk-...)'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button className="glass-button" onClick={handleSaveKey} disabled={testing}>
              {testing ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {testing ? 'Linking...' : 'Connect'}
            </button>
          </div>

          {status === 'success' && (
            <p style={{ color: 'var(--success-color)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.9rem' }}>
              <CheckCircle2 size={16} /> Successfully connected to {provider.toUpperCase()} API
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', fontSize: '0.9rem' }}>
              <AlertCircle size={16} /> Invalid API Key or connection failed.
            </p>
          )}
        </section>

        {/* Dashboard Panel */}
        <section className="glass-panel animate-fade-in" style={{ padding: '2rem', animationDelay: '0.2s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.25rem', color: 'white' }}>
              <BarChart2 size={20} color="var(--accent-color)" /> Usage Dashboard
            </h2>
            {savedKey ? (
              <span style={{ fontSize: '0.85rem', padding: '4px 12px', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success-color)', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success-color)', boxShadow: '0 0 8px var(--success-color)' }} /> Active
              </span>
            ) : (
              <span style={{ fontSize: '0.85rem', padding: '4px 12px', background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-secondary)', borderRadius: '20px' }}>
                Not Connected
              </span>
            )}
          </div>

          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Monthly Token Usage (Local Tracked)
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '4px', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '3rem', fontWeight: 700, color: 'white' }}>{localUsage.toLocaleString()}</span>
              <span style={{ color: 'var(--text-secondary)' }}>/ {currentQuotaLimit.toLocaleString()}</span>
            </div>
            
            {/* Progress Bar */}
            <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '6px', overflow: 'hidden', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', top: 0, left: 0, height: '100%', 
                width: `${usagePercentage}%`,
                background: `linear-gradient(90deg, var(--accent-color), #8b5cf6)`,
                boxShadow: '0 0 10px var(--accent-glow)',
                transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '12px' }}>
              {provider === 'gemini' 
                ? "Note: Gemini API doesn't expose a global quota endpoint via API keys yet. Tracking is local." 
                : "Usage estimated locally for OpenAI."}
            </p>
          </div>

          {/* Token Calculator Feature */}
           <TokenCalculator apikey={savedKey} provider={provider} onUsageAdd={(val) => {
             const newUsage = localUsage + val;
             setLocalUsage(newUsage);
             localStorage.setItem('token_dashboard_usage', newUsage);
           }} />

        </section>
      </div>
{/* Make generic CSS classes available globally */}
      <style>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// Token Calculator Component
function TokenCalculator({ apikey, provider, onUsageAdd }) {
  const [text, setText] = useState('');
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    if (!text.trim() || !apikey) return;
    setCalculating(true);
    setResult(null);

    try {
      if (provider === 'gemini') {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:countTokens?key=${apikey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text }] }] })
        });
        const data = await res.json();
        if (data.totalTokens) {
          setResult(data.totalTokens);
          onUsageAdd(data.totalTokens);
        } else throw new Error('Failed to calculate');
      } else {
        // Mock for OpenAI since tiktoken requires heavy setup in frontend
        const mockTokens = Math.ceil(text.length / 4);
        setResult(mockTokens);
        onUsageAdd(mockTokens);
      }
    } catch (err) {
      alert("Error calculating tokens. Please check your API key.");
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem', marginBottom: '1rem', color: 'white' }}>
        <Sparkles size={18} color="var(--accent-color)" /> Token Calculator & Tracker
      </h3>
      <textarea 
        className="glass-input"
        style={{ minHeight: '100px', resize: 'vertical', marginBottom: '1rem' }}
        placeholder="Paste text here to see how many tokens it uses (this will simulate usage in the dashboard)..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          className="glass-button" 
          onClick={handleCalculate}
          disabled={!apikey || calculating || !text}
          style={{ opacity: (!apikey || !text) ? 0.5 : 1 }}
        >
          {calculating ? <Loader2 className="animate-spin" size={16} /> : "Calculate & Track"}
        </button>
        {result !== null && (
          <span className="animate-fade-in" style={{ fontWeight: 600, color: 'var(--success-color)', background: 'rgba(16, 185, 129, 0.1)', padding: '6px 12px', borderRadius: '8px' }}>
            {result} Tokens Used
          </span>
        )}
      </div>
      {!apikey && <p style={{ color: 'var(--warning-color)', fontSize: '0.85rem', marginTop: '12px' }}>Please connect an API key first to use the exact calculator.</p>}
    </div>
  );
}

export default App;
