"use client"

import React, { useEffect, useState } from 'react'
import { EditSchema } from '../YSchema/YupSchema';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const Dashboard = () => {

  const router = useRouter();

  const handleLogout = () => {
    const data = localStorage.getItem('User-details');
    if (data && data.length > 0) {
      localStorage.setItem('isUserActive', isNotActive);
      router.push('/login');
    }
  }


  const getPrefillData = () => {
    const data = localStorage.getItem('User-details');
    if (data && data.length > 0) {
      const parseData = JSON.parse(data);
      return parseData[0];
    }
  }

  const [data, setData] = useState([])
  const [formData, setFormData] = useState([])
  const [prefillData, setPrefillData] = useState(getPrefillData())
  const [isModalOpen, setIsModalOpen] = useState(false);
  var isNotActive = false;

  const { values, handleChange, handleSubmit, touched, handleReset, errors } = useFormik({
    initialValues: prefillData,
    validationSchema: EditSchema,
    onSubmit: (values, actions) => {
      if (values.new_password && values.confirm_new_password) {
        values.password = values.confirm_new_password;
        delete values.new_password;
        delete values.confirm_new_password;

        // Save data and make user login again
        localStorage.setItem('User-details', JSON.stringify([...formData, values]));
        localStorage.setItem('isUserActive', JSON.stringify(isNotActive));
        actions.resetForm();
        closeModal();
        router.push('/login');
      }
      
      // no need for user to login again 
      
      localStorage.setItem('User-details', JSON.stringify([...formData, values]));
      localStorage.setItem('isUserActive', JSON.stringify(isNotActive));
      actions.resetForm();
      closeModal();
      

    },
  })


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem('User-details'));
    const isUserActive = JSON.parse(localStorage.getItem('isUserActive'));

    if (user && user.length > 0) {
      setData(user)
    }

    if (user && isUserActive === false) {
      router.push('/login');
    }
    else {
      null;
    }

  }, [prefillData])

  const openModal = () => {
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false);
  }



  return (
    <>
      <div className="min-h-screen mx-auto max-w-[1200px] text-indigo-500 font-bold flex flex-col space-y-5 items-center justify-center">
        <h1 className="lg:text-5xl xl:text-5xl md:text-2xl text-sm">Welcome to the Dashboard</h1>
        {data.map(elem => (
          <h1 key={elem.name} className="text-slate-700  lg:text-5xl xl:text-5xl md:text-2xl text-sm">{elem.name}</h1>
        ))}
        <div className="flex items-center gap-x-4 mt-5 ">
          <button onClick={handleLogout} className="text-md bg-red-500 hover:bg-red-400 py-2 px-5 rounded-full text-white border-none ">Logout</button>
          <button onClick={openModal} className="text-md bg-indigo-500 hover:bg-indigo-400 py-2 px-5 rounded-full text-white border-none ">Edit</button>
        </div>
      </div>

      {
        isModalOpen && (
          <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">

              <div className="relative bg-white rounded-lg shadow ">

                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 ">
                    Edit Your Details
                  </h3>
                  <button onClick={closeModal} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="authentication-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>

                <div className="p-4 md:p-5">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                      <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " name="name" value={values.name} onChange={handleChange} autoComplete="off" />
                      {errors.name && touched.name ? (<p className='text-xs text-red-500 font-medium'>{errors.name}</p>) : null}
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                      <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " name="email" value={values.email} onChange={handleChange} autoComplete="off" />
                      {errors.email && touched.email ? (<p className='text-xs text-red-500 font-medium'>{errors.email}</p>) : null}
                    </div>

                    <div>
                      <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">Phone Number</label>
                      <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " name="phone_number" value={values.phone_number} onChange={handleChange} autoComplete="off" />
                      {errors.phone_number && touched.phone_number ? (<p className='text-xs text-red-500 font-medium'>{errors.phone_number}</p>) : null}
                    </div>

                    <div>
                      <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                      <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " name="new_password" value={values.new_password} onChange={handleChange} autoComplete="off" />
                      {errors.new_password && touched.new_password ? (<p className='text-xs text-red-500 font-medium'>{errors.new_password}</p>) : null}
                    </div>

                    <div>
                      <label htmlFor="confirm_new_password" className="block mb-2 text-sm font-medium text-gray-900">Confirm New Password</label>
                      <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " name="confirm_new_password" value={values.confirm_new_password} onChange={handleChange} autoComplete="off" />
                      {errors.confirm_new_password && touched.confirm_new_password ? (<p className='text-xs text-red-500 font-medium'>{errors.confirm_new_password}</p>) : null}
                    </div>

                    <div className="flex items-center justify-between gap-x-3">
                      <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Save</button>

                      <button onClick={closeModal} className="w-full text-white bg-red-600 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default Dashboard