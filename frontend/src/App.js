import './App.css';
import Layout from './components/Layout';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from "./pages/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from './pages/Post';
import Profile from './pages/Profile'
import MyPost from './pages/MyPost';
import FavItem from './components/FavItem'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route path="profile" element={<Profile />}>
              <Route index path="mypost" element={<MyPost />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Signup />} />
              <Route path="fav" element={<FavItem />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
