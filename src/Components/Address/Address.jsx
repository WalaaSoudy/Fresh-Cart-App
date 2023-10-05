import React from 'react'
import { useFormik } from 'formik';
import { useContext } from 'react';
import { CartOperationContext } from './../../Context/CartOperation';

const Address = () => {
    let{checkout,cartid} = useContext(CartOperationContext)
    async function SubmitForm(values) {
        try {
          let res = await checkout(cartid, values);
      
          if (res.data && res.data.session && res.data.session.url) {
            window.location.href = res.data.session.url;
          } else {
            // Handle the case where the response doesn't have the expected structure
            console.error("Invalid response from the server");
          }
        } catch (error) {
          // Handle any errors that might occur during the request
          console.error("Error during checkout:", error);
        }
      }
      
      
    
      let formik = useFormik({
        initialValues: {
          details: "",
          phone: "",
          city: ""
        },
        onSubmit: SubmitForm
      })
    
  return (
    <div className='container my-5'>
      <form onSubmit={formik.handleSubmit}>
        {/* Input field for 'details' */}
        <div className='mb-3'>
          <label htmlFor='details' className='form-label'>
            Details
          </label>
          <input
            type='text'
            id='details'
            name='details'
            className='form-control'
            onChange={formik.handleChange}
            value={formik.values.details}
          />
        </div>

        {/* Input field for 'phone' */}
        <div className='mb-3'>
          <label htmlFor='phone' className='form-label'>
            Phone
          </label>
          <input
            type='text'
            id='phone'
            name='phone'
            className='form-control'
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
        </div>

        {/* Input field for 'city' */}
        <div className='mb-3'>
          <label htmlFor='city' className='form-label'>
            City
          </label>
          <input
            type='text'
            id='city'
            name='city'
            className='form-control'
            onChange={formik.handleChange}
            value={formik.values.city}
          />
        </div>

        {/* Submit button */}
        <button type='submit' className='btn bg-main text-white'>
          Pay Now
        </button>
      </form>
    </div>
  )
}

export default Address
