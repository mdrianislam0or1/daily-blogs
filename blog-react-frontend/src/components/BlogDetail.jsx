import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const params = useParams();

    const fetchBlog = async () => {
        const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
        const result = await res.json();
        setBlog(result.data);
    };

    useEffect(() => {
        fetchBlog();
    }, []);

    return (
        <div className="container mx-auto px-4 pt-5">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-semibold">{blog.title}</h2>
                <div>
                    <Link to="/" className="bg-gray-900 px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition duration-300">Back to Blogs</Link>
                </div>
            </div>
            <div className="md:flex md:flex-wrap">
                <div className="md:w-1/2 md:pr-8 mb-8">
                    <p className="text-gray-600 mb-2">by <strong>{blog.author}</strong> on {blog.date}</p>
                    {blog.image && <img className="w-full h-auto rounded-lg" src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog Image" />}
                </div>
                <div className="md:w-1/2 md:pl-8">
                    <div className="mt-5" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
