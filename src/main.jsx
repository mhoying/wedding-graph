import React, { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught React Error Boundary Caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    localStorage.clear();
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f172a',
          color: '#f8fafc',
          fontFamily: 'Inter, sans-serif',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ec4899', marginBottom: '12px' }}>
            Wedding Guest Universe
          </h2>
          <p style={{ fontSize: '14px', color: '#94a3b8', maxWidth: '600px', marginBottom: '20px' }}>
            An unexpected error occurred while rendering the interactive canvas layout.
          </p>
          <pre style={{
            fontSize: '11px',
            color: '#ef4444',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '12px',
            borderRadius: '10px',
            maxWidth: '90vw',
            maxHeight: '400px',
            overflow: 'auto',
            textAlign: 'left',
            marginBottom: '20px'
          }}>
            {this.state.error?.stack || this.state.error?.toString() || 'Unknown Error'}
            {'\n\nComponent Stack:\n'}
            {this.state.errorInfo?.componentStack || 'No Component Stack'}
          </pre>
          <button 
            onClick={this.handleReset}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              background: '#38bdf8',
              color: '#0f172a',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Reset App & Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
