import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Error Boundary Component to catch runtime errors (like missing API Key)
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
          <h1 style={{ color: '#dc2626' }}>Something went wrong</h1>
          <p style={{ color: '#4b5563' }}>Application crashed. Check the console for more details.</p>
          <div style={{ marginTop: '20px', padding: '15px', background: '#f3f4f6', borderRadius: '8px', textAlign: 'left', overflow: 'auto' }}>
            <strong>Error:</strong> {this.state.error?.toString()}
          </div>
          {this.state.error?.toString().includes("API_KEY") && (
             <div style={{ marginTop: '20px', color: '#059669', fontWeight: 'bold' }}>
                Tip: Please verify that you have added 'API_KEY' in your Netlify or Vercel Project Settings.
             </div>
          )}
        </div>
      );
    }

    return this.props.children; 
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);