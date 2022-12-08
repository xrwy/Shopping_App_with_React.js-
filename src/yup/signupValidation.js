import * as yup from 'yup';

const signupSchema = yup.object().shape({
    email:yup.string().email("Field should contain a valid email.").required("Required Field").max(255),
    password:yup.string().min(6,"Your password must be at least 6 characters.").required(),
    passwordConfirm:yup.string().oneOf([yup.ref('password')],"Passwords Do Not Match").required(),
})

export default signupSchema;