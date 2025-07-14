import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Mathventure from './Mathventure.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mathventure />
  </StrictMode>,
)

createRoot(document.getElementById('app')).render(
  <StrictMode>

  </StrictMode>
)
