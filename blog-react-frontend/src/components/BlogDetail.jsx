import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <div>
                    <a href="/" className="bg-black px-2 py-2 text-white">Back to Blogs</a>
                </div>
            </div>
            <div className="md:flex md:flex-wrap">
                <div className="md:w-1/2 md:pr-4 mb-4">
                    <p>by <strong>{blog.author}</strong> on {blog.date}</p>
                    {blog.image && <img className="w-full h-auto" src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog Image" />}
                </div>
                <div className="md:w-1/2 md:pl-4">
                    <div className="mt-5" dangerouslySetInnerHTML={{ __html: blog.description }}></div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
