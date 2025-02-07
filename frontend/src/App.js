import Header from "../src/components/header/Header"
import HomeImage from "../src/components/homeImage/HomeImage"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/home/Home";
import PostsPage from "./pages/posts/PostPage";
import LoginPage from "./pages/forms/Login";
import RegisterPage from "./pages/forms/Register";
import CreatePostPage from "./pages/createPost/CreatePost";
import AdminPage from "./pages/admin/adminPage";
import PostDetails from "./pages/postDetails/PostDetails";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import Profile from "./pages/profile/profile";
import { ToastContainer } from "react-toastify";
import UsersTable from "./pages/admin/UsersTable";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />

        <Route path="posts">
          <Route index element={<PostsPage/>} />
          <Route path="create-post" element={<CreatePostPage/>} />
          <Route path="details/:id" element={<PostDetails/>} />
          <Route path="categories/:category" element={<CategoryPage/>} />
        </Route>

        <Route path="/profile/:id"  element={<Profile />}/>

        <Route path="/admin-dashboard" element={<AdminPage/>} />
        <Route path="/admin-dashboard/users-table" element={<UsersTable />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
