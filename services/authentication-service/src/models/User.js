import mongoose, {Schema} from 'mongoose';

const schema = mongoose.Schema;

const userSchema = new Schema({
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
});

const User = mongoose.model('User', userSchema);

export default User;