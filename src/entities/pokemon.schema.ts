import { Document, Schema, model } from 'mongoose';

export interface IPokemon extends Document {
  name: string;
  type: string;
  level: number;
}

const schema = new Schema<IPokemon>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      type: {
        type: String,
        required: true,
        unique: false,
      },
      level: {
        type: Number,
        required: true,
        unique: false,
      },
    },
    {
      timestamps: true,
    }
  );
  
  export default model<IPokemon>('pokemon', schema);