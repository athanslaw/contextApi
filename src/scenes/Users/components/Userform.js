import { Formik } from "formik";
import React, { useState } from "react";
import {Link} from 'react-router-dom'

const UserForm = ({formFields, handleFormSubmit}) => {
    const [formValid, setFormValid] = useState(false);
    let initialValues = {
        name: '',
        username: '',
        email: '',
        city: '',
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Full name is required';
        }   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }   else {
            setFormValid(true);
        }
        return errors;
    }

    return (
        <div className="w-3/10">
            <Formik
                initialValues={formFields || initialValues}
                validate={values => validate(values)}
                onSubmit={handleFormSubmit}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Full Name"
                            />
                            {errors.name && touched.name && <span className="text-xs text-red-600">{errors.name}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Username"
                            />
                            {errors.username && touched.username && <span className="text-xs text-red-600">{errors.username}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="Email"
                            />
                            {errors.email && touched.email && <span className="text-xs text-red-600">{errors.email}</span>}
                        </div>
                        <div className="mt-4 mb-12">
                            <input
                                type="city"
                                name="city"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values?.address?.city}
                                className="w-full border border-primary rounded-sm py-3 px-2 focus:outline-none bg-transparent placeholder-darkerGray font-medium text-sm"
                                placeholder="City"
                            />
                            {errors.city && touched.city && <span className="text-xs text-red-600">{errors.city}</span>}
                        </div>
                        <div className="flex justify-between items-center">
                            <button type="submit" disabled={isSubmitting || (!formValid && !formFields)} className="bg-primary py-4 px-10 text-white font-bold rounded-sm focus:outline-none">
                                {formFields ? 'Save' : 'Add'}
                            </button>
                            <Link className="border border-primary py-4 px-10 text-primary font-bold rounded-sm focus:outline-none" to="/users">
                                Cancel
                            </Link>
                        </div>
                        <br/>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default UserForm;
