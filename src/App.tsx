import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import About from './pages/About';
import AddContact from './pages/AddContact';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import { BASE_URL } from './utils/utils';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (formData) => {

    const requestObj = {
      email: formData.email,
      password: formData.password,
    }
    fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObj)
    })
      .then((resp) => resp.json())
      .then((json) => {
        if (json.token) {
          localStorage.setItem('isAuthenticated', 'true')
          localStorage.setItem('jwt', json.token)
          setIsAuthenticated(true);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.log('error in login', error);
      })
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false')
    localStorage.setItem('jwt', '')
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <NavigationBar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addcontact" element={<AddContact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;