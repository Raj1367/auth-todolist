import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';
import { useUserStore } from './Zustand/UserStore';
import { useEffect } from 'react';
function App() {

  const { checkAuthentication, isCheckingAuth } = useUserStore();

  useEffect(() => {
    checkAuthentication()
  }, [])

  if(isCheckingAuth) return (<p>Loading...</p>)

  return (
    <div className="flex flex-col min-h-screen m-2 md:m-0">
      <header><Navbar /></header>
      <main><Outlet /></main>
    </div>
  );
}

export default App;
