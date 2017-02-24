import {Document} from "mongoose";

export interface IUser extends Document{
    email    : string;
    firstName: string;
    lastName : string;
}

export default IUser;