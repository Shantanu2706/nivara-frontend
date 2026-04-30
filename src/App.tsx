import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import ProposalWizard from './pages/Home';
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<ProposalWizard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/history" element={<ProposalHistory />} />
          <Route path="/history/:proposalId" element={<Proposal />} />
          <Route path="/plans" element={<PremiumPlans />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </AppTheme>


  )
}

export default App;