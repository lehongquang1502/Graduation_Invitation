import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { PreferencesProvider } from './preferences'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PreferencesProvider><App /></PreferencesProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
