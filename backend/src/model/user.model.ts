
import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    phone:string;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: String, required: true},
    
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const UserModel = model<User>('user', UserSchema);
