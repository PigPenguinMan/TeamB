
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DataProvider } from './data/DataContext';
import History from './pages/History';
import Home from './pages/Home';
import Layout from './pages/Layout';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Mypage from './pages/Mypage';

function App() {
  return (
    <div className="App ">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/history' element={<History/>}/> 
          <Route path ='/login' element={<LoginPage />} />
          <Route path ='/signup' element={<SignUp />} />
          <Route path='/mypage' element={<Mypage/>}/>
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
