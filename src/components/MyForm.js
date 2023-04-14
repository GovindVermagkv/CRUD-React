import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addData } from '../redux/dataSlice';
import './custom.css';

const MyForm = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(addData(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <input {...register('age')} placeholder="Age" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
