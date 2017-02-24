import * as mongoose from "mongoose";
import {IUser} from "../interfaces/user";
import DataAccess from "../DataAccess";

const mongooseConnection = DataAccess._mongooseConnection;

export const userSchema: mongoose.Schema = new mongoose.Schema({
    createAt : Date,
    email    : String,
    firstName: String,
    lastName : String
}).pre("save", function (next) {
    if(!this.createAt) {
        this.createAt = new Date();
    }
    next();
});

export interface IUserModel extends IUser, mongoose.Document {

}

const User = mongooseConnection.model<IUserModel>("User", userSchema);

export default User;

