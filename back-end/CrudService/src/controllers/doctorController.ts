import { Request, Response } from "express";
import Doctor from "../models/doctorModels"; // Ajuste o caminho para o seu modelo

// Criar um novo Doctor
export const createDoctor = async (req: Request, res: Response | any) => {
  try {
    const { 
      nome, 
      sobrenome,
      especialidade, 
      pacientes, 
      experiencia, 
      avaliacao, 
      sobre, 
      horario, 
      hospital, 
      foto,
      visualizacao 
    } = req.body;

    // Verifica se os campos obrigatórios estão presentes
    if (!nome || !especialidade || !horario || !hospital) {
      return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    const newDoctor = await Doctor.create({ 
      nome, 
      sobrenome,
      especialidade, 
      pacientes, 
      experiencia, 
      avaliacao, 
      sobre, 
      horario, 
      hospital, 
      foto, 
      visualizacao
    });

    res.status(201).json({ message: "Médico criado com sucesso.", newDoctor });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar o médico.", error });
  }
};

// Buscar todos os Doctors
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().populate("hospital"); // Popula o campo 'hospital' com os dados relacionados
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar os médicos.", error });
  }
};

// Buscar um Doctor por ID
export const getDoctorById = async (req: Request, res: Response | any) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id).populate("hospital");

    if (!doctor) {
      return res.status(404).json({ message: "Médico não encontrado." });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar o médico.", error });
  }
};

// Atualizar um Doctor
export const updateDoctor = async (req: Request, res: Response | any) => {
  try {
    const { id } = req.params;
    const { 
      nome, 
      sobrenome,
      especialidade, 
      pacientes, 
      experiencia, 
      avaliacao, 
      sobre, 
      horario, 
      hospital, 
      foto, 
      visualizacao
    } = req.body;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      { 
        nome, 
        sobrenome,
        especialidade, 
        pacientes, 
        experiencia, 
        avaliacao, 
        sobre, 
        horario, 
        hospital, 
        foto,
        visualizacao 
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Médico não encontrado." });
    }

    res.status(200).json({ message: "Médico atualizado com sucesso.", doctor: updatedDoctor });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o médico.", error });
  }
};

// Excluir um Doctor
export const deleteDoctor = async (req: Request, res: Response | any) => {
  try {
    const { id } = req.params;

    const deletedDoctor = await Doctor.findByIdAndDelete(id);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Médico não encontrado." });
    }

    res.status(200).json({ message: "Médico excluído com sucesso." });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir o médico.", error });
  }
};
