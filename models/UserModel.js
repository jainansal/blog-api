import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username : {
            type: String,
            requires:true,
            min: 4,
            unique: true
        },
        password : {
            type: String,
            required: true
        }
    }
);

const User = mongoose.model('User', UserSchema);

export default User;