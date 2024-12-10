import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  repete_senha: string;
  userType: string;
}

const userSchema = new Schema<IUser>({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  repete_senha: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  userType: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', userSchema);
