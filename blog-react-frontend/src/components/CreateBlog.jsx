import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');
    const navigate = useNavigate();

    const onChange = (value) => {
        setHtml(value);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        const res = await fetch('http://localhost:8000/api/save-temp-image/', {
            method: 'POST',
            body: formData,
        });

        const result = await res.json();

        if (!result.status) {
            alert(result.errors.image);
            e.target.value = null;
        }

        setImageId(result.image.id);
    };


    const formSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.append('description', html);
        formData.append('image_id', imageId);

        const res = await fetch('http://localhost:8000/api/blogs', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            toast('Blog added successfully.');
            navigate('/');
        } else {
            toast.error('Failed to add blog.');
        }
    };


    return (
        <div className="container mx-auto px-4 mb-5">
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-3xl font-semibold">Create Blog</h4>
                <Link to="/" className="bg-gray-900 px-4 py-2 text-white rounded-lg">Back</Link>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8">
                <form onSubmit={formSubmit}>
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                            placeholder="Title"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="shortDesc" className="block text-sm font-medium text-gray-700">Short Description</label>
                        <textarea
                            id="shortDesc"
                            name="shortDesc"
                            rows="5"
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                            placeholder="Short Description"
                        ></textarea>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            value={html}
                            onChange={(e) => onChange(e.target.value)}
                            style={{ height: '400px' }}
                            className="form-textarea mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                            placeholder="Description"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            id="image"
                            name="image"
                            onChange={handleFileChange}
                            type="file"
                            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                        <input
                            id="author"
                            name="author"
                            type="text"
                            className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                            placeholder="Author"
                        />
                    </div>
                    <button type="submit" className="bg-black px-4 py-2 text-white rounded-md hover:bg-gray-900 transition duration-300">Create</button>
                </form>
            </div>
        </div>
    );
};

export default CreateBlog;
