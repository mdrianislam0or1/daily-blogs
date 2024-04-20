import { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

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
                        className="form-control mr-2"
                        placeholder="Search Blogs"
                    />
                    <button type="submit" className="bg-black px-2 py-2 text-white">Search</button>
                    <button type="button" onClick={() => resetSearch()} className="btn btn-success ml-2">Reset</button>
                </form>
            </div>
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-xl font-semibold">Blogs</h4>
                <a href="/create" className="bg-black px-2 py-2 text-white">Create</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blogs={blogs} setBlogs={setBlogs} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default Blogs;
