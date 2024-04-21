import mongoose, {Schema} from 'mongoose';

const schema = mongoose.Schema;

const instructorSchema = new Schema({
    user: {
        _id: {type: Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'student'},
        profilePictureUrl: {
            type: String,
            default: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
        },
        isVerified: {type: Boolean, default: false},
        rememberToken: {type: String, default: null},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now},
    },
    registration_status: {
        type: String,
        default: 'pending',
    },
    phone_number: {
        type: String,
        required: true,
        unique: true,
    },
    summary: {
        type: String,
        required: true,
    },
    payment_data: {
        bank_name: {
            type: String,
        },
        account_number: {
            type: String,
        },
        account_name: {
            type: String,
        },
    },
    deletedAt: {type: Date, default: null},
});

const Instructor = mongoose.model('Instructor', instructorSchema);

export default Instructor;