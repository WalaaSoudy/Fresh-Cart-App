import { Audio } from  'react-loader-spinner'
import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
const Register = () => {
  const [erorr,setError] = useState(null)
  const [success,setSuccess] = useState(false)
  let navigate = useNavigate()
  async function registerSumbit(values)
  {
    setSuccess(true)
    let {data} = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values).
    catch(err => {setError(err.response.data.message)
    setSuccess(false)
    }
    )
    console.log(data);
    if(data.message === "success")
    {
     setSuccess(false)
      navigate('/login')
    }
  }
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  let validationSchema = Yup.object({
        name: Yup.string().min(3,"min is 3").max(15,"max is 15").required('Name is required'),
        email: Yup.string().email('Invalid Email').required('Email is required'),
        phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
        password: Yup.string()
        .required('No password provided.') 
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match')
    })
    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',   
        },validationSchema,
        onSubmit: registerSumbit
    })
  return (
    <>
    <div className="container">
   {erorr!== null?<div className="alert alert-danger">{erorr}</div> : null}
  
    <h1 className="text-center my-3">Register</h1>
    <div className="row justify-content-center align-items-center my-4">
    <div className="col-md-6">
    <form onSubmit={formik.handleSubmit}>
    <div className="form-group">
    <label htmlFor="name">Name</label>
    <input type="text" name="name" id="name" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} />
   {formik.touched.name && formik.errors.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div> : null}
    <label htmlFor="email">Email</label>
    <input type="email" name="email" id="email" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} />
    {formik.touched.email && formik.errors.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : null}
    <label htmlFor="phone">Phone</label>
    <input type="tel" name="phone" id="phone" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} />
    {formik.touched.phone && formik.errors.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : null}
    <label htmlFor="password">Password</label>
    <input type="password" name="password" id="password" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} />
    {formik.touched.password && formik.errors.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : null}
    <label htmlFor="rePassword">Re-Password</label>
    <input type="password" name="rePassword" id="rePassword" className="form-control" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} />
    {formik.touched.rePassword && formik.errors.rePassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div> : null}
    {success?<button  type="button" className="btn bg-main text-white w-100 mt-3">
    <Audio
    height = "80"
    width = "80"
    radius = "9"
    color = 'white'
    ariaLabel = 'three-dots-loading'     
    wrapperStyle
    wrapperClass
  />
  </button>: <button disabled={!(formik.isValid && formik.dirty)} 
  type="submit" className="btn bg-main text-white w-100 mt-3">Register</button>}
   
    
    </div>
    </form>
    
    </div>
    </div>
    </div>
    </>
  )
}

export default Register
