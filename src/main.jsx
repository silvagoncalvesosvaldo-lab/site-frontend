import React from 'react'
import ReactDOM from 'react-dom/client'
import SiteLayout from './layouts/SiteLayout.jsx'
import HomeClean from './pages/HomeClean.jsx'
// import HomePage from './pages/HomePage.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteLayout>
      <HomeClean />
      {/* <HomePage /> */}
    </SiteLayout>
  </React.StrictMode>,
)