import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
}

const schema = new Schema<IUser>(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default model<IUser>('users', schema);