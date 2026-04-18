import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import ProposalWizard from './pages/ProposalWizard.tsx';
import ProposalHistory from './pages/ProposalHistory.tsx';
import Proposal from './pages/Proposal.tsx';
import AppTheme from './AppTheme.tsx';
import Layout from './components/Layout.tsx';
import MyProfile from './pages/MyProfile.tsx';
import Register from './pages/Register.tsx';

const App = () => {

  return (
    <AppTheme>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<ProposalWizard />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/history" element={<ProposalHistory />} />
          <Route path="/history/:proposalId" element={<Proposal />} />
        </Route>
      </Routes>
    </AppTheme>


  )
}

export default App;