import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Mathventure from './Mathventure.jsx'
import Title from './Title.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Mathventure />
  </StrictMode>,
)
