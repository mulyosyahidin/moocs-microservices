import {validate} from "../validations/validation.js";
import {registerInstructorValidation} from "../validations/instructor-validation.js";
import axios from "axios";
import ErrorResponse from "../utils/error-response.js";
import Instructor from "../models/Instructor.js";

const register = async (req) => {
    let instructor = validate(registerInstructorValidation, req);
    const user = {...instructor};

    try {
        user.phone_number = undefined;
        user.summary = undefined;
        user.role = 'instructor';

        const registerUser = await axios.post(`${process.env.GATEWAY_URL}/auth/register`, user);

        if (!registerUser) {
            throw new ErrorResponse(400, 'Terjadi kesalahan tidak terduga, harap coba lagi nanti');
        }

        await Instructor.create({
            'user': registerUser.data.data.user,
            'phone_number': instructor.phone_number,
            'summary': instructor.summary,
        });
    } catch (e) {
        console.log(e);
        throw new ErrorResponse(e.response.status, e.response.data.message);
    }
}

export default {
    register,
}