/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const BlogCard = ({ blog, blogs, setBlogs }) => {
    const showImage = (img) => {
        return img ? 'http://localhost:8000/uploads/blogs/' + img : 'https://images.unsplash.com/photo-1713558014346-ceddc512a616?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
    };

    const deleteBlog = async (id) => {
        if (window.confirm("Are you sure you want to delete?")) {
            try {
                const res = await fetch(`http://localhost:8000/api/blogs/${id}`, {
                    method: 'DELETE'
                });

                if (!res.ok) {
                    throw new Error('Failed to delete blog');
                }

                const newBlogs = blogs.filter((blog) => blog.id !== id);
                setBlogs(newBlogs);

                toast("Blog deleted successfully.");
            } catch (error) {
                console.error('Delete blog error:', error);
                toast("Failed to delete blog.");
            }
        }
    };

    return (
        <div className="flex flex-col justify-between sm:flex-row sm:justify-start sm:items-center mb-8 border border-gray-300 shadow-md rounded-md overflow-hidden p-4">
            <div className="max-w-xs sm:max-w-md mx-auto sm:mx-0 mb-4 sm:mr-4">
                <img src={showImage(blog.image)} className="w-full h-auto" alt="Blog Image" />
            </div>
            <div className="max-w-xs sm:max-w-md">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="mb-4 text-gray-600">{blog.shortDesc}</p>
                <div className="flex flex-row justify-between items-center">
                    <Link to={`/blog/${blog.id}`} className="bg-black px-4 py-2 text-white rounded-lg hover:bg-gray-800 transition duration-300">Details</Link>
                    <div className="flex items-center">
                        <button className="text-danger mr-2" onClick={() => deleteBlog(blog.id)}>
                            Delete
                        </button>
                        <Link to={`/blog/edit/${blog.id}`} className="text-dark">
                           Edit
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
