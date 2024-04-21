import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Blogs from "./components/Blogs";
import CreateBlog from "./components/CreateBlog";
import BlogDetail from "./components/BlogDetail";
import EditBlog from "./components/EditBlog";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false); // Make sure to set isLoggedIn to false if either token or email is missing
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsLoggedIn(false);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-indigo-400 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-white text-2xl font-bold">
            (  React & Laravel) Blog App
            </Link>
            {/* Navigation Links */}
            <ul className="flex space-x-4">
              {isLoggedIn && (
                <>
                  <li>
                    <span className="text-white">
                      Logged in as {localStorage.getItem("email")}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-gray-300"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link to="/" className="text-white hover:text-gray-300">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create"
                      className="text-white hover:text-gray-300"
                    >
                      Create Blog
                    </Link>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="text-white hover:text-gray-300"
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="text-white hover:text-gray-300"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        {isLoggedIn && (
          <>
            <Route path="/create" element={<CreateBlog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/blog/edit/:id" element={<EditBlog />} />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      
    </>
  );
}

export default App;
