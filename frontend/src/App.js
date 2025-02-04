import Header from "../src/components/header/Header"
import HomeImage from "../src/components/homeImage/HomeImage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/home/Home";
import PostsPage from "./pages/posts/PostPage";
import LoginPage from "./pages/forms/Login";
import RegisterPage from "./pages/forms/Register";
import CreatePostPage from "./pages/createPost/CreatePost";
import AdminPage from "./pages/admin/adminPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/posts/" element={<PostsPage/>} />
        <Route path="/posts/create-post" element={<CreatePostPage/>} />
        <Route path="/admin" element={<AdminPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
