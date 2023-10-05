import { Audio } from "react-loader-spinner";
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from './../../Context/Token';

const LogIn = () => {
    function register(){
        navigate("/register")
    }
    let {setUserToken} = useContext(TokenContext)
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MTY5MmQ5NTMyODA0OTliNzRlMzI5MCIsIm5hbWUiOiJBaG1lZCBBYmQgQWwtTXV0aSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk1OTc4MjAyLCJleHAiOjE3MDM3NTQyMDJ9.zaDB0D1OEdqkfvhXI8OZoAXVqaLPYxi3KVtXGehndqU"
    const [erorr, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    let navigate = useNavigate();
    async function loginSumbit(values) {
        setSuccess(true);
        let { data } = await axios
            .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
            .catch((err) => {
                setError(err.response.data.message);
                setSuccess(false);
            });
        console.log(data);
        if (data.message === "success") {
            setSuccess(false);
            localStorage.setItem("token", data.token);
            setUserToken(data.token)
            navigate("/home");
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().email("Invalid Email").required("Email is required"),

        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum.")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    });
    let formik = useFormik({
        initialValues: {
            email: "",

            password: "",
        },
        validationSchema,
        onSubmit: loginSumbit,
    });
    return (
        <>
            <div className="container">
                {erorr !== null ? (
                    <div className="alert alert-danger">{erorr}</div>
                ) : null}

                <h1 className="text-center my-3">Log In</h1>
                <div className="row justify-content-center align-items-center my-4">
                    <div className="col-md-6">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="alert alert-danger p-2 mt-2">
                                        {formik.errors.email}
                                    </div>
                                ) : null}

                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="alert alert-danger p-2 mt-2">
                                        {formik.errors.password}
                                    </div>
                                ) : null}

                                {success ? (
                                    <button
                                        type="button"
                                        className="btn bg-main text-white w-100 mt-3"
                                    >
                                        <Audio
                                            height="80"
                                            width="80"
                                            radius="9"
                                            color="white"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle
                                            wrapperClass
                                        />
                                    </button>
                                ) : (
                                    <button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        type="submit"
                                        className="btn bg-main text-white w-100 mt-3"
                                    >
                                        Log In
                                    </button>
                                )}
                            </div>
                            <button
                                        disabled={!(formik.isValid && formik.dirty)}
                                        type="submit" onClick={() => register()}
                                        className="btn bg-main text-white w-100 mt-3"
                                    >
                                       Register
                                    </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default LogIn;
