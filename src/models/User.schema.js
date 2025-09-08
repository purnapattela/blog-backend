import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable:true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        immutable:true
    },
    password: {
        type: String,
        required: true,
        select : false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        select: false,
        immutable:true
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next()
})


userSchema.methods.generateJWT = function () {
    return jwt.sign({ _id: this._id, role: this.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY, issuer: "purnapattela" })
}

userSchema.methods.checkPassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

export default model("User", userSchema);