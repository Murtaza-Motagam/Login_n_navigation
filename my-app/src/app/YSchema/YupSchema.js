import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required')
        .min(5, 'Name should must be at least 5 character long'),
    
    email: Yup.string().email('Invalid email').required('Email is required'),

    phone_number: Yup.string()
        .matches(/^\d+$/, 'Phone number must be digits only')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone Number is required'),
        
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .matches(/\d/, 'Password must contain at least one digit'),

    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const EditSchema = Yup.object().shape({
    name: Yup.string().required('Full Name is required')
        .min(5, 'Name should must be at least 5 character long'),
    
    email: Yup.string().email('Invalid email').required('Email is required'),

    phone_number: Yup.string()
        .matches(/^\d+$/, 'Phone number must be digits only')
        .min(10, 'Phone number must be at least 10 digits')
        .required('Phone Number is required'),

    new_password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .matches(/\d/, 'Password must contain at least one digit'),

    confirm_new_password: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),
});

export const LoginSchema = Yup.object().shape({

    email: Yup.string().email('Invalid email').required('Email is required'),

    password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
});