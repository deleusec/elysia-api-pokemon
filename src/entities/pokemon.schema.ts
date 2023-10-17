import { Document, Schema, model } from 'mongoose';

export interface IPokemon extends Document {
  pokemonId: Number;
  name: string;
  type: string;
  level: number;
}

const schema = new Schema<IPokemon>(
    {
      pokemonId: {
        type: Number,
        required: true,
        unique: true
      },
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