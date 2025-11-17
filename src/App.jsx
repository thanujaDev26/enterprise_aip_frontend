import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import MainDashboard from './pages/Dashboard/MainDashboard'
import ProjectList from './pages/Projects/ProjectList'
import ProjectCreate from './pages/Projects/ProjectCreate'
import ProjectDetails from './pages/Projects/ProjectDetails'
import AssetList from './pages/Assets/AssetList'
import AssetCreate from './pages/Assets/AssetCreate'
import AssetSummary from './pages/Assets/AssetSummary'
import DecisionDashboard from './pages/Decisions/DecisionDashboard'
import PrioritizeProjects from './pages/Decisions/PrioritizeProjects'
import BudgetOptimizer from './pages/Decisions/BudgetOptimizer'
import NotFound from './pages/NotFound'
import { Box } from '@mui/material'
import ProjectEdit from './pages/Projects/ProjectEdit'
import AssetDetails from './pages/Assets/AssetDetails'
import AssetEdit from './pages/Assets/AssetEdit'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<MainDashboard />} />
          <Route path='/projects' element={<ProjectList/>} />
          <Route path='/projects/create' element={<ProjectCreate/>} />
          <Route path='/projects/:code' element={<ProjectDetails/>} />
          <Route path='/projects/edit/:code' element={<ProjectEdit/>}/>
          <Route path='/assets' element={<AssetList/>} />
          <Route path='/assets/create' element={<AssetCreate/>} />
          <Route path="/assets/:id" element={<AssetDetails />} />
          <Route path="/assets/:id/edit" element={<AssetEdit />} />
          <Route path='/assets/summary/:projectCode' element={<AssetSummary/>} />
          <Route path='/decisions' element={<DecisionDashboard/>} />
          <Route path='/decisions/prioritize' element={<PrioritizeProjects/>} />
          <Route path='/decisions/optimize' element={<BudgetOptimizer/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
