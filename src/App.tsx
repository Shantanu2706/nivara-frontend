import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import ProposalWizard from './pages/ProposalWizard.tsx';
import ProposalHistory from './pages/ProposalHistory.tsx';
import Proposal from './pages/Proposal.tsx';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { isTokenValid } from './utils/auth.ts';

const App = () => {

  return (
    <>
    {
      isTokenValid() &&
      <Drawer
    sx={{width:240}}
    variant='permanent'>
      <Toolbar />
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </Drawer>
    }
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProposalWizard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <ProposalHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history/:proposalId"
          element={
            <ProtectedRoute>
              <Proposal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>


  )
}

export default App;