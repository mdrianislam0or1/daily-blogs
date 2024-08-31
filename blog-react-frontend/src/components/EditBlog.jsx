/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import { toast } from 'sonner';
import { Link, useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm();

    const [imageId, setImageId] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            const result = await res.json();
            setBlog(result.data);
            reset(result.data);
        };
        fetchBlog();
    }, [params.id, reset]);

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

    const formSubmit = async (data) => {
        const newData = { ...data, image_id: imageId };

        const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        if (res.ok) {
            toast('Blog updated successfully.');
            navigate('/');
        } else {
            toast('Failed to update blog.');
        }
    };

    return (
        <div className="container mx-auto px-4 mb-5">
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-3xl font-semibold text-gray-800">Edit Blog</h4>
                <Link to="/" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">Back</Link>
            </div>
            <div className="card border-0 shadow-lg">
                <form onSubmit={handleSubmit(formSubmit)} className='p-5'>
                    <div className="card-body">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                className={`form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 ${errors.title && 'border-red-500'}`}
                                placeholder="Title"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">Title field is required</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Short Description</label>
                            <textarea
                                {...register('shortDesc')}
                                rows="5"
                                className="form-textarea mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <Editor
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="form-textarea mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input onChange={handleFileChange} type="file" className="form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500" />
                            {blog.image && <img className="mt-3 w-1/2" src={`http://localhost:8000/uploads/blogs/${blog.image}`} alt="Blog Image" />}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Author</label>
                            <input
                                {...register('author', { required: true })}
                                type="text"
                                className={`form-input mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 ${errors.author && 'border-red-500'}`}
                                placeholder="Author"
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">Author field is required</p>}
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
