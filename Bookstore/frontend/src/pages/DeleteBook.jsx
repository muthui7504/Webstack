import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
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
      <h1 className='text-4xl font-semibold my-6 text-center'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center bg-white border border-gray-200 shadow-lg rounded-2xl w-full max-w-lg p-8 mx-auto'>
        <h3 className='text-2xl font-medium mb-6 text-gray-800'>
          Are you sure you want to delete this book?
        </h3>
        <button
          className='w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-md transition duration-300'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;

