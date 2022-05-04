import { compare, hashSync } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    return await compare(password, this.password);
};

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        this.password = hashSync(this.password, 10);
    }
    next();
});

const User = model("User", userSchema);

export default User;