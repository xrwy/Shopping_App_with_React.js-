import * as yup from 'yup'

const signinSchema = yup.object().shape({
    email:yup.string().email("Field should contain a valid email.").required("Required Field").max(255),
    password:yup.string().min(6,"Your password must be at least 6 characters.").required(),
})

export default signinSchema;

