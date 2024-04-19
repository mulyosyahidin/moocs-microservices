import mongoose, {Schema} from 'mongoose';

const schema = mongoose.Schema;

const resetPasswordSchema = new Schema({
    email: {type: String, required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
});

const ResetPassword = mongoose.model('ResetPassword', resetPasswordSchema);

export default ResetPassword;