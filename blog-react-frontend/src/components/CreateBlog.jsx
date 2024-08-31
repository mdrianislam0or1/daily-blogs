import { useState } from 'react';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onChange = (value) => {
        setHtml(value);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/api/save-temp-image/', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to upload image');
            }

            const result = await res.json();

            if (!result.status) {
                alert(result.errors.image || 'Image upload failed');
                e.target.value = null;
            } else {
                setImageId(result.image.id);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image');
            e.target.value = null;
        } finally {
            setLoading(false);
        }
    };

    const formSubmit = async (e) => {
        e.preventDefault();

        if (!imageId) {
            toast.error('Image upload failed. Please try again.');
            return;
        }

        const formData = new FormData(e.target);
        formData.append('description', html);
        formData.append('image_id', imageId);

        setLoading(true);

        try {
            const res = await fetch('http://localhost:8000/api/blogs', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error('Failed to create blog');
            }

            const result = await res.json();

            if (result.status) {
                toast.success('Blog added successfully.');
                navigate('/');
            } else {
                toast.error('Failed to add blog: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Error creating blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 mb-5">
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-xl font-semibold text-gray-800">Create Blog</h4>
                <Link to="/" className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-md transition duration-300">
                    Back
                </Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <form onSubmit={formSubmit} className="p-6">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Title"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700">Short Description</label>
                        <textarea
                            id="shortDesc"
                            name="shortDesc"
                            rows="3"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Short Description"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={html}
                            onChange={(e) => onChange(e.target.value)}
                            style={{ height: '200px' }}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            type="file"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                        {loading && (
                            <div className="flex justify-center mt-4">
                                <MoonLoader size={24} color="#4A5568" />
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Author"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
