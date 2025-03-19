import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { 
    timestamps: true // this will automatically create a timestamp when a new user is created 
});



export default mongoose.model('User', userSchema);


// end of user.model.js