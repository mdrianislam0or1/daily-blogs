/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const EditBlog = () => {
    const [blog, setBlog] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const [html, setHtml] = useState('');
    const [imageId, setImageId] = useState('');

    useEffect(() => {
        const fetchBlog = async () => {
            const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`);
            const result = await res.json();
            setBlog(result.data);
            setHtml(result.data.description);
            reset(result.data);
        };
        fetchBlog();
    }, [params.id, reset]);

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

    const formSubmit = async (data) => {
        const newData = { ...data, description: html, image_id: imageId };

        const res = await fetch(`http://localhost:8000/api/blogs/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newData),
        });

        toast('Blog updated successfully.');

        navigate('/');
    };

    return (
        <div className="container mx-auto px-4 mb-5">
            <div className="flex justify-between items-center pt-5 mb-4">
                <h4 className="text-xl font-semibold">Edit Blog</h4>
                <a href="/" className="bg-black px-2 py-2 text-white">Back</a>
            </div>
            <div className="card border-0 shadow-lg">
                <form onSubmit={handleSubmit(formSubmit)}>
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
                            <Editor
                                value={html}
                                onChange={onChange}
                                containerProps={{ style: { height: '400px' } }}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500"
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
                        <button type="submit" className="bg-black px-2 py-2 text-white">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
