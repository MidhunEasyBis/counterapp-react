import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab } from '@mui/material';

// Adjust the import paths based on your folder structure
import Counter from '../src/components/Counter/Counter';
import UserForm from '../src/components/UserForm/UserForm';
import RichTextEditor from '../src/components/RichTextEditor/RichTextEditor';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Tabs>
          <Tab label="Counter" component={Link} to="/" />
          <Tab label="User Form" component={Link} to="/form" />
          <Tab label="Editor" component={Link} to="/editor" />
        </Tabs>
      </AppBar>

      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/form" element={<UserForm />} />
        <Route path="/editor" element={<RichTextEditor />} />
      </Routes>
    </Router>
  );
}

export default App;
