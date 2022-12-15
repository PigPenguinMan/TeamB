
import { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { DataProvider } from './data/DataContext';
import History from './pages/History';
import Home from './pages/Home';
import Layout from './pages/Layout';
import SearchBar from './pages/MedicalCourse';
import MyPage from './pages/Mypage';
import SignUp from './pages/SignUp';
import Hospital from './json/Hospital.json'
import Filter from './components/Filter';
import MajorDetail from './components/MajorDetail';
import MajorDetailInfo from './components/MajorDetailInfo';
import PlaceDetail from './components/PlaceDetail';
import PlaceDetailInfo from './components/PlaceDetailInfo';
import Reservation from './components/Reservation';
import { DataProvider } from './data/DataContext';
import Main from './pages/Main';
import Login_C from './pages/Login';
import Question from './components/Question';
import FirebaseSignUp from './pages/FirebaseSignUp';

export const Context = createContext;

function App() {
  return (
    <div className="App ">
      <DataProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/history' element={<History />} />
            <Route path='/mypage' element={<MyPage />} />
            <Route path='/usersignup' element={<FirebaseSignUp />} />
            <Route path='/searchhospital' element={<SearchBar />}/>
            <Route path='/question' element={<Question/>}/>
            <Route path='/filter' element={<Filter />}></Route>
            <Route path='placedetail/:id/' element={<PlaceDetail />}/>
            <Route path='/majordetail/:id/' element={<MajorDetail />}/>
            <Route path='/majordetail/:id/:majorid' element={<MajorDetailInfo />} > </Route>
            <Route path='/placedetail/:id/:placeid' element={<PlaceDetailInfo />} > </Route>
            <Route path='/reservation/:bookid' element={<Reservation />}></Route>
            <Route path='/main' element={<Main />} />
            <Route path='/loginc' element={<Login_C />} />
          </Route>
        </Routes>
      </DataProvider>
    </div>

  );
}

export default App;
