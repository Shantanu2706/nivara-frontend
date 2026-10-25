import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ProposalHistory from './pages/ProposalHistory';
import Proposal from './pages/Proposal';
import AppTheme from './AppTheme';
import Layout from './components/Layout';
import MyProfile from './pages/MyProfile';
import Register from './pages/Register';
import PremiumPlans from './pages/PremiumPlans';
import { useColorScheme } from '@mui/material';
import { useEffect } from 'react';
import OAuthSuccess from './pages/OAuthSuccess';
import Transactions from './pages/Transactions';
import Feedback from './pages/Feedback';

const App = () => {
  const { mode, setMode } = useColorScheme();

  useEffect(() => {
    setMode('dark');
  })

  return (
    <AppTheme>
      <Routes>
          <Route path="/" element={<Home />} />
      </Routes>
    </AppTheme>


  )
}

export default App;