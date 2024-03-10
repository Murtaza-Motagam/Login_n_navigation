"use client"

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { LoginSchema } from '../YSchema/YupSchema';
import { useRouter } from 'next/navigation';

const initialValues = {
  email: "",
  password: ""

}

const Login = () => {


  const router = useRouter();

  var isActive = true;

  const { values, handleChange, handleSubmit, touched, handleReset, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, actions) => {

      const storedUser = JSON.parse(localStorage.getItem('User-details'));

      if (storedUser[0].email === values.email && storedUser[0].password === values.password) {
        localStorage.setItem('isUserActive', JSON.stringify(isActive))
        actions.resetForm();
        router.push('/dashboard')
      } else {
        alert("Invalid Credentials Try again!")
      }

    },
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('User-details'));
    const isUserActive = JSON.parse(localStorage.getItem('isUserActive'));

    if (user && isUserActive === true) {
      router.push('/dashboard');
    }
    else {
      null;
    }
  }, [])



  return (
    <div className=" min-h-screen max-w-[1200px] mx-auto lg:p-20 xl:p-20 p-5">
      <form className="w-full lg:w-1/2 xl:w-1/2 md:w-full rounded-md shadow-md shadow-gray-400 mx-auto bg-white p-5" onSubmit={handleSubmit} method="POST">
        <h1 className="text-center lg:text-2xl xl:text-2xl md:text-lg text-sm text-gray-900 mb-10 font-semibold">Signup the form</h1>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />

          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          {errors.email && touched.email ? (<p className='text-xs text-red-500 font-medium mt-1 mb-3'>{errors.email}</p>) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
          {errors.password && touched.password ? (<p className='text-xs text-red-500 font-medium mt-1 mb-3'>{errors.password}</p>) : null}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
      </form>
    </div>
  )
}

export default Login