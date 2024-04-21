import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchBlogs = async () => {
        const res = await fetch('http://localhost:8000/api/blogs');
        const result = await res.json();
        setBlogs(result.data);
    };

    const searchBlogs = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:8000/api/blogs?keyword=${keyword}`);
        const result = await res.json();
        setBlogs(result.data);
    };

    const resetSearch = () => {
        fetchBlogs();
        setKeyword('');
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center pt-5">
                <form onSubmit={(e) => searchBlogs(e)} className="flex items-center">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 mr-2 focus:outline-none"
                        placeholder="Search Blogs"
                    />
                    <button type="submit" className="bg-gray-900 text-white px-4 py-2 rounded-md">Search</button>
                    <button type="button" onClick={() => resetSearch()} className="bg-green-500 text-white px-4 py-2 rounded-md ml-2">Reset</button>
                </form>
            </div>
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-xl font-semibold">Blogs</h4>
                <Link to="/create" className="bg-gray-900 text-white px-4 py-2 rounded-md">Create</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blogs={blogs} setBlogs={setBlogs} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
