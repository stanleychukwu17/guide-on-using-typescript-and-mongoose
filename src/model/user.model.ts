import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserInput {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

export interface UserDocument extends UserInput, Document{
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true}
})

// indexes the email so that any search for a user using the email will be extremely fast
userSchema.index({email: 1})

//Virtual method for the fullName of the UserDocument and in essence the userSchema
userSchema.virtual("fullName").get(function(this: UserDocument) {
    return `${this.lastName} ${this.firstName}`
})

// hashing the password before we save the new user to our mongodb database
userSchema.pre("save", async function (next) {
    const user = this as UserDocument

    // we only want to hash the password when it has not been modified or hashed
    if (!user.isModified("password")) return next();

    // use bcrypt to generate a new password
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(user.password, salt);

    // update the current user password to the hashed one
    user.password = hash;

    // move on with the next function
    return next();
})

// this method will be used to compare the received password vs the existing password when a user wants to login into their account
userSchema.methods.comparePassword = async function (receivedPassword: string): Promise<boolean> {
    const user = this as UserDocument
    const check: boolean = await bcrypt.compare(user.password, receivedPassword)

    if (!check) { return false }
    return check
}

// exports the model
const Users = mongoose.model<UserDocument>('Users', userSchema);
export default Users;