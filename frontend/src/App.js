import Header from "../src/components/header/Header"
import HomeImage from "../src/components/homeImage/HomeImage"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
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
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/notFoundPage/NotFound";
import { useSelector } from "react-redux";

function App() {
  const {user} = useSelector(state => state.auth)
  return (
    <BrowserRouter>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={ !user ? <LoginPage/> : <Navigate to="/"/> } />
        <Route path="/register" element={ !user ? <RegisterPage/> : <Navigate to="/"/> }/>

        <Route path="posts">
          <Route index element={<PostsPage/>} />
          <Route path="create-post" element={ user ? <CreatePostPage/> : <Navigate to="/"/> } />
          <Route path="details/:id" element={<PostDetails/>} />
          <Route path="categories/:category" element={<CategoryPage/>} />
        </Route>

        <Route path="/profile/:id"  element={<Profile />}/>

        <Route path="/admin-dashboard">
          <Route index element={ user?.isAdmin ? <AdminPage/> : <Navigate to="/"/> } />
          <Route path="users-table" element={ user?.isAdmin ? <UsersTable /> : <Navigate to="/"/>} />
          <Route path="posts-table" element={ user?.isAdmin ? <PostsTable /> : <Navigate to="/"/>}/>
          <Route path="categories-table" element={ user?.isAdmin ? <CategoriesTable /> : <Navigate to="/"/>} />
          <Route path="comments-table" element={ user?.isAdmin ? <CommentsTable /> : <Navigate to="/"/>} />
        </Route>

        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>



        <Route path="*" element={<NotFound />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
