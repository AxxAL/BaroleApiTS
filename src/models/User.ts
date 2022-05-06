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
},
{
    toObject: {
        transform: function(doc, converted) {}
    },
    toJSON: {
        virtuals: true,
        transform: function (doc, converted) {
            delete converted._id;
            delete converted.password;
            delete converted.__v
        }
      },
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