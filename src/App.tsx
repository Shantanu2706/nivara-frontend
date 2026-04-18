import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import ProposalWizard from './pages/ProposalWizard';
import ProposalHistory from './pages/ProposalHistory';
import Proposal from './pages/Proposal';
import AppTheme from './AppTheme';
import Layout from './components/Layout';
import MyProfile from './pages/MyProfile';
import Register from './pages/Register';

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