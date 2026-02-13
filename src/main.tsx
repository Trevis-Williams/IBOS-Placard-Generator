import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../app'
import '../styles/globals.css'

// #region agent log
console.log('[DEBUG-A] main.tsx loaded, attempting to render React app');
fetch('http://127.0.0.1:7243/ingest/7e27c436-579a-486b-81a3-278a1d88cdab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:8',message:'React app initializing',data:{rootExists: !!document.getElementById('root')},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
// #endregion

const rootElement = document.getElementById('root');

if (!rootElement) {
  // #region agent log
  console.error('[DEBUG-C] Root element not found!');
  fetch('http://127.0.0.1:7243/ingest/7e27c436-579a-486b-81a3-278a1d88cdab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:15',message:'Root element missing',data:{error:'no root'},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
  // #endregion
  document.body.innerHTML = '<h1 style="color:red;padding:20px;">ERROR: Root element not found</h1>';
} else {
  try {
    // #region agent log
    console.log('[DEBUG-C] Creating React root...');
    fetch('http://127.0.0.1:7243/ingest/7e27c436-579a-486b-81a3-278a1d88cdab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:22',message:'Creating React root',data:{},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
    
    // #region agent log
    console.log('[DEBUG-C] React render called successfully');
    fetch('http://127.0.0.1:7243/ingest/7e27c436-579a-486b-81a3-278a1d88cdab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:32',message:'React render complete',data:{},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
    // #endregion
  } catch (error) {
    // #region agent log
    console.error('[DEBUG-C] React render error:', error);
    fetch('http://127.0.0.1:7243/ingest/7e27c436-579a-486b-81a3-278a1d88cdab',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'main.tsx:37',message:'React render error',data:{error: String(error)},timestamp:Date.now(),hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    document.body.innerHTML = `<h1 style="color:red;padding:20px;">React Error: ${error}</h1>`;
  }
}
