import './App.css';
import { ApolloProvider } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResumeApp from './components/ResumeApp';
import Home from './pages/Home';
import client from './utils/apollo.js';
import jwt_decode from 'jwt-decode';
import NavBar from './components/NavBar.jsx'

function App() {
  //checks login
  const token = localStorage.getItem('token');
  let userId;

  console.log("15", token);

  if (token) {

    const decodedToken = jwt_decode(token);
    userId = decodedToken.authenticatedPerson._id;

    console.log("19", userId);
    
  }

  return (
    <ApolloProvider client={client}>
      <NavBar/>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="resume/*" element={<ResumeApp userId={userId} />} />
          <Route path="home" element={<Home />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;