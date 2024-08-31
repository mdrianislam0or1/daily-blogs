import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            const result = await res.json();
            setBlog(result.data);
        } catch (error) {
            console.error('Error fetching blog:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                navigate('/');
            } else {
                console.error('Failed to delete the blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <MoonLoader size={60} color="#4A5568" />
            </div>
        );
    }

    return (
        <div className="container mx-auto h-screen w-screen px-4 pt-5 grid grid-rows-[auto_1fr] grid-cols-1 gap-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-3xl font-semibold text-gray-800">{blog.title}</h2>
                <div className="space-x-2">
                    <Link to="/" className="bg-gray-900 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition duration-300">Home</Link>
                    <Link to={`/edit/${blog.id}`} className="bg-blue-600 px-4 py-2 text-white rounded-lg hover:bg-blue-500 transition duration-300">Edit</Link>
                    <button onClick={handleDelete} className="bg-red-600 px-4 py-2 text-white rounded-lg hover:bg-red-500 transition duration-300">Delete</button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-gray-300 p-4 rounded-lg">
                    <p className="text-gray-600 mb-2">by <strong>{blog.author}</strong> on {blog.date}</p>
                    {blog.image && (
                        <img
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                            src={`http://localhost:8000/uploads/blogs/${blog.image}`}
                            alt="Blog Image"
                        />
                    )}
                </div>
                <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
