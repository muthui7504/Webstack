import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <BackButton />
      <h1 className='text-4xl font-semibold my-6 text-center'>Edit Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col bg-white border border-gray-200 shadow-lg rounded-2xl w-full max-w-lg p-8 mx-auto'>
        <div className='my-4'>
          <label className='text-lg font-medium text-gray-600'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none transition duration-200'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-medium text-gray-600'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none transition duration-200'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-medium text-gray-600'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='mt-2 border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-sky-500 outline-none transition duration-200'
          />
        </div>
        <button
          className='w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-md transition duration-300 mt-4'
          onClick={handleEditBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;

