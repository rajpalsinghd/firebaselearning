import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './Owner/pages/MainPage';
import SigninPage from './Owner/pages/SigninPage';
import OwnerPage from './Owner/pages/OwnerPage';
import UserPage from './User/pages/UserPage';
import Password from './Owner/components/password/password';
import PassPage from './User/pages/PassPage';

function App() {
  return (
   <BrowserRouter>
   <Routes>

   <Route exact path='/' element={<MainPage/>}/>
   <Route exact path='/signin' element={<SigninPage/>}/>
   <Route exact path='/owner' element={<OwnerPage/>}/>
   <Route exact path='/user' element={<UserPage/>}/>
   <Route exact path='/password' element={<Password/>}/>
   <Route exact path='/pass' element={<PassPage/>}/>
   
   </Routes>
   </BrowserRouter>
  );
}

export default App;
