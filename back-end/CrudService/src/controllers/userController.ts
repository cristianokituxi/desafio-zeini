import { Request, Response } from 'express';
import { User } from '../models/userModels';
import bcrypt from 'bcryptjs';

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { senha, ...rest } = req.body;

    const hashedPassword = await bcrypt.hash(senha, 10);

    const newUser = await User.create({
      ...rest,
      senha: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
};


export const deleteUser = async (req: Request, res: Response | any) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar o usuário" });
  }
};



export const updateUser = async (req: Request, res: Response | any) => {
  try {
    const { id } = req.params;
    const { senha, repete_senha, ...updates } = req.body;

    // Se uma senha foi fornecida, criptografá-la
    if (senha) {
      if (senha !== repete_senha) {
        return res.status(400).json({ message: "As senhas não coincidem" });
      }


      const hashedPassword = await bcrypt.hash(senha, 10);
      updates.senha = hashedPassword;
      updates.repete_senha = hashedPassword
    }


    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário atualizado com sucesso", user: updatedUser });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro ao atualizar o usuário" });
  }
};

export const recoverPassword= async (req: Request, res: Response | any) => {
  try {
    const { email, senha, repete_senha } = req.body;

    if (!email) {
      return res.status(400).json({ message: "E-mail é obrigatório." });
    }

    if (senha !== repete_senha) {
      return res.status(400).json({ message: "As senhas não correspondem." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);;

    user.senha = hashedPassword;
    user.repete_senha = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Senha alterada com sucesso!" });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ message: "Erro ao alterar a senha." });
  }
};

