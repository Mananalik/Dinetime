import * as Yup from "yup"; 
const validationSchema = Yup.object().shape({
    fullName:Yup.string().required("Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required").matches(/^[0-9]+$/,"Phone Number must be numeric").min(10,"Phone Number must be 10 digits").max(10,"Phone Number must be 10 digits") ,
});
export default validationSchema;