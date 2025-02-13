import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Created successfully', { variant: 'success' });
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
      <h1 className='text-4xl font-semibold my-6 text-center'>Create Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col bg-white border border-gray-200 shadow-lg rounded-2xl w-full max-w-lg p-8 mx-auto'>
        <div className='my-4'>
          <label className='text-lg font-medium mb-2 text-gray-700'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
            placeholder='Enter book title'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-medium mb-2 text-gray-700'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
            placeholder='Enter author name'
          />
        </div>
        <div className='my-4'>
          <label className='text-lg font-medium mb-2 text-gray-700'>Publish Year</label>
          <input
            type='number'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sky-500'
            placeholder='Enter publish year'
          />
        </div>
        <button
          className='bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-md mt-6 transition duration-300'
          onClick={handleSaveBook}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateBooks;

