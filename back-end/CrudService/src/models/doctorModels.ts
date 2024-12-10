import { Schema, model, Document } from 'mongoose';

export interface IDoctor {
  nome: string;
  sobrenome: string;
  especialidade: string;
  pacientes: string;
  experiencia: string;
  avaliacao: number;
  visualizacao: string;
  sobre: string;
  horario: string;
  hospital: string; 
  foto: string; 
}


interface DoctorDocument extends IDoctor, Document {}

const doctorSchema = new Schema<DoctorDocument>({
  nome: { type: String, required: true, trim: true },
  sobrenome: { type: String, required: true, trim: true },
  especialidade: { type: String, required: true, trim: true },
  pacientes: { type: String, required: true }, 
  experiencia: { type: String, required: true }, 
  avaliacao: { type: Number, required: false, min: 0, max: 5 },
  visualizacao: { type: String, required: false },
  sobre: { type: String, trim: true },
  horario: { type: String, required: true }, 
  hospital: { type: String, required: true }, 
  foto: { type: String, trim: true }, 
});


const DoctorModel = model<DoctorDocument>('Doctor', doctorSchema);

export default DoctorModel;
