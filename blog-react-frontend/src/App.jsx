import { Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold">React & Laravel Blog App</Link>
            {/* Navigation Links */}
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">Home</Link>
              </li>
              <li>
                <Link to="/create" className="text-white hover:text-gray-300">Create Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
      </Routes>

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default App;
